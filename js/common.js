/* ============================================================
   공통 내비게이션·푸터 + 화면 그리기 도우미 — 모든 페이지가 이 파일 하나를 씁니다.
   메뉴를 바꾸려면 아래 MENU 배열만 수정하세요.
   ============================================================ */
"use strict";

/* 캐시 갱신용 버전 문자열 — JS/CSS 를 고쳤는데 옛 내용이 보이면 숫자를 올리세요.
   (모든 HTML 안의 ?v=1 도 같은 숫자로 함께 올립니다.) */
const ASSET_V = "?v=7";

const MENU = [
  ["index.html", "Home"],
  ["about.html", "About"],
  ["research.html", "Research"],
  ["projects.html", "Projects"],
  ["publications.html", "Publications"],
  ["contact.html", "Contact"]
];

const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

document.addEventListener("DOMContentLoaded", () => {
  const here = location.pathname.split("/").pop() || "index.html";
  const L = window.SITE.links;

  const nav = document.createElement("nav");
  nav.className = "nav";
  nav.innerHTML = `
    <div class="in">
      <a class="logo" href="index.html">Seunghwan Lee<span>.</span></a>
      <button class="burger" aria-label="menu">☰</button>
      <ul>${MENU.map(([href, label]) =>
        `<li><a href="${href}" class="${here === href ? "on" : ""}">${label}</a></li>`).join("")}
      </ul>
    </div>`;
  document.body.prepend(nav);
  nav.querySelector(".burger").onclick = () => nav.querySelector(".in > ul").classList.toggle("open");

  // 푸터: 왼쪽 학교 로고(흰색 버전) + 이름·소속 / 아래 저작권
  const foot = document.createElement("footer");
  foot.className = "site";
  foot.innerHTML = `
    <div class="in">
      <div class="foot-main">
        <a class="foot-logo" href="https://www.ut.ac.kr" target="_blank" rel="noopener"
           title="Korea National University of Transportation">
          <img src="images/knut-logo-white.png" alt="Korea National University of Transportation"></a>
        <div class="foot-lab">
          <b>Seunghwan Lee</b>
          <p>B.S.–M.S. Combined Program Student · <a href="${L.lab}" target="_blank" rel="noopener">Soft Electronics &amp; Robotics Lab.</a><br>
             Korea National University of Transportation, Chungju, Republic of Korea<br>
             <a href="mailto:${L.email}">${L.email}</a> ·
             <a href="${L.github}" target="_blank" rel="noopener">GitHub</a> ·
             <a href="${L.scholar}" target="_blank" rel="noopener">Google Scholar</a></p>
        </div>
      </div>
      <div class="foot-sub">
        <p>Copyright © ${new Date().getFullYear()} Seunghwan Lee. All rights reserved.</p>
      </div>
    </div>`;
  document.body.append(foot);
});

/* ---- 저자 목록에서 내 이름(SITE.me) 굵게 ---- */
function boldMe(authors) {
  let out = esc(authors);
  for (const n of [...window.SITE.me].sort((a, b) => b.length - a.length))
    out = out.replace(new RegExp(`(^|, )(${esc(n).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})(?=,|$)`, "g"), "$1<b>$2</b>");
  return out;
}

/* ---- 논문 목록 = 구글 스칼라 자동 목록(data/publications.js) + 직접 적은 papers(data/site-data.js) ----
   · 같은 논문(DOI 가 같거나, 제목·국문 제목이 스칼라 제목과 같음)이면 하나로 합치고 직접 적은 값이 우선
   · 스칼라에 없는 논문은 직접 적은 그대로 추가 · hide: true 로 적으면 숨김
   · 결과는 최신이 위 (연도 → 날짜 → 원래 순서) */
/* 비교용 글자: 대소문자·기호·공백 무시 ("Seung-Hwan Lee" = "seunghwan lee") */
const textKey = t => String(t ?? "").normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");

function allPapers() {
  const key = textKey;
  const doiOf = u => (String(u ?? "").match(/10\.\d{4,9}\/[^\s?#]+/) || [""])[0].toLowerCase();
  const sameKey = (a, b) => a === b || (Math.min(a.length, b.length) >= 30 && (a.startsWith(b) || b.startsWith(a)));
  const same = (auto, mine) => {
    const d = doiOf(mine.link || mine.doi);
    if (d && d === doiOf(auto.link || auto.doi)) return true;
    const mineKeys = [mine.title, mine.titleKo].map(key).filter(Boolean);
    return [auto.title, auto.scholarTitle].map(key).filter(Boolean)
      .some(a => mineKeys.some(m => sameKey(a, m)));
  };
  const filled = o => Object.fromEntries(Object.entries(o)
    .filter(([, v]) => v !== "" && v != null && !(Array.isArray(v) && !v.length)));

  const auto = (window.SCHOLAR?.papers || []).map(p => ({ titleKo: "", badges: [], ...p }));
  const used = new Set(), extra = [];
  for (const mine of window.SITE.papers || []) {
    const hit = auto.find(a => !used.has(a) && same(a, mine));
    if (hit) { used.add(hit); Object.assign(hit, filled(mine)); }
    else extra.push({ ...mine });
  }
  return [...auto, ...extra].filter(p => !p.hide)
    .map((p, i) => ({ p, i }))
    .sort((x, y) => (+y.p.year || 0) - (+x.p.year || 0)
      || String(y.p.date || "").localeCompare(String(x.p.date || "")) || x.i - y.i)
    .map(x => x.p);
}

/* ---- 논문 배지: 색인(SCIE·KCI) → 상위 저널(Q1 등) → 저자 순서(주저자·공저자) → 그 밖의 badges ----
   · 색인·상위 저널: data/site-data.js 의 journals 에서 학술지 이름(venue)으로 찾음
   · 저자 순서: 저자 목록에서 내 이름(SITE.me)이 맨 앞이면 First Author, 그 밖의 자리면 Co-author
   · 논문마다 index / rank / role 을 직접 적으면 그 값이 우선 (예: role: "Co-first Author") */
function paperBadges(w) {
  const venue = textKey(w.venue);
  const j = (window.SITE.journals || []).find(j => textKey(j.match) && venue.includes(textKey(j.match))) || {};
  const me = new Set((window.SITE.me || []).map(textKey));
  const pos = String(w.authors ?? "").split(/\s*[,，]\s*/).findIndex(a => me.has(textKey(a)));
  const role = w.role || (pos === 0 ? "First Author" : pos > 0 ? "Co-author" : "");
  const index = w.index || j.index, rank = w.rank || j.rank;
  const seen = new Set();
  return [
    index && [index, /kci/i.test(index) ? "kci" : "sci"],
    rank && [rank, "top"],
    role && [role, /first/i.test(role) ? "first" : "co"],
    ...(w.badges || []).map(b => [b, "man"])
  ].filter(b => b && !seen.has(b[0].toLowerCase()) && seen.add(b[0].toLowerCase()))
    .map(([t, c]) => `<span class="bdg ${c}">${esc(t)}</span>`).join("");
}

/* ---- 연구 분야 한 줄 (Research 페이지) ---- */
function researchRow(r, i) {
  return `
    <div class="rrow${r.image ? "" : " noimg"}" id="research-${i + 1}">
      ${r.image ? `<img src="${encodeURI(r.image)}" alt="${esc(r.title)}" loading="lazy" onerror="this.remove()">` : ""}
      <div>
        <h3>${esc(r.title)}</h3>
        <p>${esc(r.desc)}</p>
        ${r.keywords?.length ? `<div class="kw">${r.keywords.map(k => `<span class="chip">${esc(k)}</span>`).join("")}</div>` : ""}
      </div>
    </div>`;
}

/* ---- 프로젝트 카드 (Projects 페이지·홈) ---- */
function projectCard(p, i) {
  const meta = [p.year, p.program, p.status].filter(Boolean)
    .map(m => m === "Ongoing" ? `<span class="on">● Ongoing</span>` : esc(m)).join(" · ");
  const ext = u => /^https?:/.test(u) ? ` target="_blank" rel="noopener"` : "";
  return `
    <div class="card proj" id="project-${i + 1}">
      ${p.image ? `<img class="fig" src="${encodeURI(p.image)}" alt="${esc(p.title)}" loading="lazy" onerror="this.remove()">` : ""}
      ${meta ? `<div class="meta">${meta}</div>` : ""}
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.desc)}</p>
      ${p.tags?.length ? `<div class="chips">${p.tags.map(t => `<span class="chip">${esc(t)}</span>`).join("")}</div>` : ""}
      ${p.links?.length ? `<div class="links">${p.links.map(([l, u]) => `<a href="${esc(u)}"${ext(u)}>${esc(l)} →</a>`).join("")}</div>` : ""}
    </div>`;
}
