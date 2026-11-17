"""구글 스칼라 프로필 → data/publications.js (논문 목록 자동 갱신)

.github/workflows/update-publications.yml 이 매일 실행합니다. 직접 돌려 보려면:
    python scripts/update_publications.py

하는 일
  1) data/site-data.js 의 links.scholar 에서 스칼라 ID(user=...)를 읽는다
  2) 그 프로필의 논문 목록 페이지 "한 장"만 받는다
     (robots.txt 가 허용하는 /citations?user= 주소만 사용 — 논문 상세 페이지·다음 쪽(cstart)은 읽지 않음)
  3) 목록에서는 제목·저자가 잘려 보일 수 있어, 같은 제목을 Crossref(공식 공개 API)에서 찾아
     전체 제목·저자·학술지 권호·DOI 를 채운다 (못 찾으면 스칼라 값 그대로)
  4) 내용이 바뀌었을 때만 data/publications.js 를 다시 쓴다

문제가 생기면 파일을 건드리지 않고 끝난다 → 사이트는 이전 목록 그대로.
  · 일시 차단(429·캡차·접속 오류): 경고만 남기고 정상 종료 → 다음 날 다시 시도 (매일 실패 메일이 오지 않게)
  · 구조 문제(프로필 페이지 모양이 바뀜 등): 종료 코드 1 → Actions 탭에 빨간 X, 사람이 확인 필요
표준 라이브러리만 사용 (pip 설치 불필요).
"""
import html
import json
import re
import sys
import unicodedata
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE_DATA = ROOT / "data" / "site-data.js"
OUT = ROOT / "data" / "publications.js"

UA = "personal-site-publication-sync/1.0 (GitHub Actions; python-urllib)"
SCHOLAR = "https://scholar.google.com"
PAGE_SIZE = 100          # 한 쪽에 받을 최대 편수 (다음 쪽은 robots.txt 금지라 읽지 않음)
CROSSREF_TYPES = {"journal-article", "proceedings-article", "book-chapter", "posted-content",
                  "report", "dissertation", "monograph", "book"}

HEADER = """/* ============================================================================
   자동 생성 파일 — 직접 고치지 마세요 (다음 동기화 때 덮어써집니다)
   만드는 곳: scripts/update_publications.py · 실행: .github/workflows/update-publications.yml (매일)

   논문 정보를 고치거나 배지·국문 제목·링크를 붙이려면 data/site-data.js 의 papers 에 적으세요.
   (제목이나 DOI 가 같은 논문끼리 자동으로 합쳐지고, 직접 적은 값이 우선합니다)
   ============================================================================ */
window.SCHOLAR = """


def fail(msg, transient=False):
    """transient=True: 일시적 문제 → GitHub 경고만 남기고 성공 처리 / False: 실패(빨간 X)"""
    print(f"[중단] {msg}\n       data/publications.js 는 바꾸지 않았습니다 (사이트는 이전 목록 그대로).")
    if transient:
        print(f"::warning title=구글 스칼라 동기화 건너뜀::{msg}")
    sys.exit(0 if transient else 1)


def fetch(url, timeout=30):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept-Language": "en"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        body = r.read()
        charset = r.headers.get_content_charset()
    if not charset:
        m = re.search(rb'charset=["\']?([\w-]+)', body[:4000])
        charset = m.group(1).decode() if m else "utf-8"
    return body.decode(charset, errors="replace")


def text(s):
    """태그 제거 + HTML 엔티티 풀기 + 공백 정리"""
    s = html.unescape(re.sub(r"<[^>]+>", "", s or ""))
    return re.sub(r"\s+", " ", s.replace("\xa0", " ")).strip()


def norm(s):
    """제목 비교용: 대소문자·기호·공백 무시 (한글 포함 글자와 숫자만 남김)"""
    s = unicodedata.normalize("NFKC", text(s)).lower()
    return "".join(ch for ch in s if ch.isalnum())


def scholar_id():
    src = SITE_DATA.read_text(encoding="utf-8")
    m = re.search(r'scholar\s*:\s*"[^"]*[?&]user=([\w-]+)', src)
    if not m:
        fail("data/site-data.js 의 links.scholar 에서 user=... 를 찾지 못했습니다.")
    return m.group(1)


def load_previous():
    if not OUT.exists():
        return None
    src = OUT.read_text(encoding="utf-8")
    try:
        return json.loads(src[src.index("window.SCHOLAR =") + len("window.SCHOLAR ="):].strip().rstrip(";"))
    except (ValueError, json.JSONDecodeError):
        print("[경고] 기존 data/publications.js 를 읽지 못해 새로 만듭니다.")
        return None


def tag(row, cls, name="a"):
    """row 안에서 class 가 cls 로 시작하는 <name> 태그 하나 → (속성 문자열, 안쪽 HTML)"""
    m = re.search(rf'<{name}\b([^>]*\bclass="{cls}[^"]*"[^>]*)>(.*?)</{name}>', row, re.S)
    return (m.group(1), m.group(2)) if m else ("", "")


def href(attrs):
    m = re.search(r'href="([^"]*)"', attrs)
    if not m or not m.group(1) or m.group(1).startswith("javascript"):
        return ""
    return urllib.parse.urljoin(SCHOLAR, html.unescape(m.group(1)))


def parse_profile(page, user):
    if 'id="gsc_prf_in"' not in page:
        if re.search(r"captcha|unusual traffic|sorry/index", page, re.I):
            fail("구글 스칼라가 캡차(자동 요청 확인) 페이지를 보냈습니다. 다음 실행 때 다시 시도합니다.", transient=True)
        fail("구글 스칼라 프로필 페이지 모양이 예상과 다릅니다 (ID가 바뀌었거나 페이지 구조 변경). "
             "scripts/update_publications.py 의 parse_profile 확인 필요.")
    papers = []
    for row in re.findall(r'<tr class="gsc_a_tr">(.*?)</tr>', page, re.S):
        t_attrs, t_html = tag(row, "gsc_a_at")
        link = href(t_attrs)
        cid = urllib.parse.parse_qs(urllib.parse.urlparse(link).query).get("citation_for_view", [""])[0]
        title = text(t_html)
        if not title:
            continue
        grays = re.findall(r'<div class="gs_gray">(.*?)</div>', row, re.S)
        authors = re.sub(r"\s*[,，]\s*", ", ", text(grays[0])) if grays else ""
        venue = text(re.sub(r'<span class="gs_oph">.*?</span>', "", grays[1], flags=re.S)) if len(grays) > 1 else ""
        c_attrs, c_html = tag(row, "gsc_a_ac")
        cites_q = urllib.parse.parse_qs(urllib.parse.urlparse(href(c_attrs)).query).get("cites", [""])[0]
        y = re.search(r'class="gsc_a_h gsc_a_hc[^"]*">\s*(\d{4})', row)
        papers.append({
            "id": cid,
            "year": int(y.group(1)) if y else "",
            "date": "",
            "title": title,
            "authors": authors,
            "venue": venue,
            "doi": "",
            "link": "",
            "cites": int(text(c_html)) if text(c_html).isdigit() else 0,
            "citesUrl": f"{SCHOLAR}/scholar?oi=bibs&hl=en&cites={cites_q}" if cites_q else "",
            # 상세 페이지 주소는 방문자용 링크로만 쓰고, 이 스크립트는 열지 않는다
            "scholarUrl": f"{SCHOLAR}/citations?view_op=view_citation&hl=en&user={user}&citation_for_view={cid}" if cid else "",
            "scholarTitle": title,
        })
    return papers


def crossref_lookup(p):
    """스칼라 제목으로 Crossref 를 찾아 같은 논문이면 보충 정보를 돌려준다 (없으면 None)"""
    raw = re.sub(r"\s*(…|\.\.\.)$", "", p["scholarTitle"])
    truncated = raw != p["scholarTitle"]
    want = norm(raw)
    if len(want) < 12:
        return None
    q = urllib.parse.urlencode({
        "query.bibliographic": raw, "rows": 5,
        "select": "DOI,title,container-title,volume,issue,page,published,issued,author,type",
    })
    items = json.loads(fetch(f"https://api.crossref.org/works?{q}", timeout=25))["message"]["items"]
    for it in items:
        if it.get("type") not in CROSSREF_TYPES or not it.get("title"):
            continue
        got = norm(it["title"][0])
        if not (got == want or (truncated and got.startswith(want))):
            continue
        parts = ((it.get("published") or it.get("issued") or {}).get("date-parts") or [[None]])[0]
        if p["year"] and parts[0] and abs(parts[0] - p["year"]) > 1:
            continue
        names = [" ".join(x for x in (a.get("given"), a.get("family")) if x) or a.get("name", "")
                 for a in it.get("author", [])]
        journal = text((it.get("container-title") or [""])[0])
        vol = (it.get("volume") or "") + (f"({it['issue']})" if it.get("issue") and it.get("volume") else "")
        pages = (it.get("page") or "").replace("-", "–")
        return {
            "title": text(it["title"][0]),
            "authors": ", ".join(n for n in names if n) or p["authors"],
            "venue": ", ".join(x for x in (journal, vol, pages) if x) or p["venue"],
            "date": "-".join(f"{n:02d}" for n in parts if n) if parts[0] else "",
            "doi": it["DOI"],
            "link": f"https://doi.org/{it['DOI']}",
        }
    return None


ENRICHED = ("title", "authors", "venue", "date", "doi", "link")


def main():
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")   # Windows 콘솔에서 직접 실행할 때 글자 깨짐 방지
    user = scholar_id()
    url = f"{SCHOLAR}/citations?user={user}&hl=en&pagesize={PAGE_SIZE}&sortby=pubdate"
    print(f"구글 스칼라 프로필 읽는 중: {url}")
    try:
        page = fetch(url)
    except urllib.error.HTTPError as e:
        # 404 = 프로필 ID 오류 → 사람이 고쳐야 함 / 그 밖(429 요청 과다, 503 등) = 일시적
        fail(f"구글 스칼라 응답 오류: HTTP {e.code}", transient=e.code != 404)
    except Exception as e:  # noqa: BLE001 — 네트워크 오류 등은 일시적인 것으로 본다
        fail(f"구글 스칼라 접속 실패: {e}", transient=True)

    papers = parse_profile(page, user)
    # 연도 최신순 (같은 해 안에서는 스칼라가 준 순서 유지) — 입력 순서와 관계없이 같은 결과
    papers.sort(key=lambda p: -(p["year"] or 0))
    prev = load_previous()
    prev_by_id = {p.get("id"): p for p in (prev or {}).get("papers", []) if p.get("id")}
    if not papers and prev_by_id:
        fail("프로필은 열렸지만 논문이 0편으로 읽혔습니다 (페이지 구조 변경 가능성). 기존 목록을 유지합니다.")
    if len(papers) >= PAGE_SIZE:
        print(f"[알림] 논문이 {PAGE_SIZE}편 이상이라 앞의 {PAGE_SIZE}편만 반영합니다.")

    for p in papers:
        old = prev_by_id.get(p["id"])
        # 이미 Crossref 로 찾아 둔 논문(제목 그대로)은 다시 묻지 않는다
        if old and old.get("doi") and old.get("scholarTitle") == p["scholarTitle"]:
            p.update({k: old[k] for k in ENRICHED})
            continue
        try:
            found = crossref_lookup(p)
        except Exception as e:  # noqa: BLE001
            print(f"  [경고] Crossref 조회 실패 ({e}) — 이전 값 유지: {p['scholarTitle'][:60]}")
            if old and old.get("scholarTitle") == p["scholarTitle"]:
                p.update({k: old[k] for k in ENRICHED})
            continue
        if found:
            p.update(found)
        print(f"  {'DOI ' + p['doi'] if p['doi'] else '(DOI 없음 — 스칼라 값 사용)'} · {p['title'][:70]}")

    if prev is not None and prev.get("papers") == papers:
        print(f"변경 없음 ({len(papers)}편) — 파일을 그대로 둡니다.")
        return

    data = {
        "updated": datetime.now(timezone(timedelta(hours=9))).date().isoformat(),
        "profile": f"{SCHOLAR}/citations?user={user}",
        "papers": papers,
    }
    OUT.write_text(HEADER + json.dumps(data, ensure_ascii=False, indent=2) + ";\n", encoding="utf-8")
    print(f"갱신 완료: data/publications.js ({len(papers)}편)")


if __name__ == "__main__":
    main()
