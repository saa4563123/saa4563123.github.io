# Seunghwan Lee — 개인 연구자 사이트

GitHub Pages 정적 사이트입니다. 주소: https://saa4563123.github.io/
디자인은 SER Lab 사이트(https://knut-serl.github.io/)와 같은 스타일을 따릅니다.

## 무엇을 어디서 고치나

| 하고 싶은 일 | 고칠 파일 |
|---|---|
| 연구 분야 추가 | `data/site-data.js` → `research: [ ]` (예시가 주석에 있음). 그림은 `images/research/` |
| 프로젝트 추가 | `data/site-data.js` → `projects: [ ]`. `featured: true` 인 것은 홈에도 표시(최대 3개). 사진은 `images/projects/` |
| 논문 추가 | **자동** — 구글 스칼라 프로필에 올라오면 다음 날 아침 반영 (아래 "논문 자동 반영") |
| 논문에 국문 제목·DOI 붙이기, 스칼라에 없는 논문 추가, 숨기기 | `data/site-data.js` → `papers: [ ]` (주석에 방법). 내 이름은 `me:` 표기대로 자동 굵게 |
| 논문 배지 (SCIE·KCI, JCR Q1, First Author·Co-author) | 자동. 새 학술지에 실리면 `data/site-data.js` → `journals: [ ]` 에 한 줄 추가 (기준: Web of Science·KCI 등재, JCR 분위) |
| 특허 추가 | `data/site-data.js` → `patents: [ ]` (비어 있으면 칸이 숨겨짐) |
| 수상 추가 | `data/site-data.js` → `awards: [ ]`. 연도별로 자동 정렬, 같은 해에서는 적힌 순서(중요한 상을 위로). `scope`(National/Campus)·`role`(Team Leader 등)은 배지로 표시 |
| 상장 사진 | `images/awards/` 에 사진을 올리고 그 상의 `image:` 에 경로를 적으면 Certificate 버튼(클릭 시 확대)이 생김 |
| 홈 소개 문구 | `index.html` → 히어로의 `class="tag"` 한 줄, "About Me" 의 `class="sub"` 문단 |
| 학력·경력·수상·기술 | `about.html` → `<dd class="dated"><time>기간</time><div>내용</div></dd>` 한 줄이 한 항목 |
| 연락처 | `contact.html` |
| 프로필 사진 | `images/profile.png` 를 같은 이름으로 덮어쓰기 |
| 메뉴 | `js/common.js` → `MENU` |
| 푸터·공통 링크 | `js/common.js` 푸터 부분, `data/site-data.js` → `links` |
| 색·글꼴 | `css/style.css` 맨 위 `:root` 변수 |

목록이 비어 있으면 화면에 "Coming soon." 이 표시됩니다.

## 논문 자동 반영 (구글 스칼라)
- `.github/workflows/update-publications.yml` 이 **매일 06:17(KST)** `scripts/update_publications.py` 를 실행합니다.
  스칼라 프로필(`data/site-data.js` → `links.scholar`)의 논문 목록을 읽고, 잘린 제목·저자·DOI 는
  Crossref 에서 채워 `data/publications.js` 에 저장합니다. 바뀐 것이 있을 때만 커밋합니다.
- **바로 반영**: GitHub 저장소 → Actions → `update-publications` → Run workflow
- `data/publications.js` 는 자동 생성 파일이라 직접 고치지 않습니다. 고칠 내용은 `site-data.js` 의 `papers` 에 적으면
  같은 논문(제목 또는 DOI 가 같음)끼리 합쳐지고 직접 적은 값이 우선합니다.
- 구글 스칼라는 공식 API 가 없어 가끔 자동 요청을 막습니다. 그럴 때는 Actions 에 노란 경고만 남고 사이트는 마지막 목록을
  그대로 보여 주며, 다음 날 다시 시도합니다. 빨간 X 는 페이지 구조가 바뀌는 등 확인이 필요할 때만 뜹니다.
- 스크립트는 robots.txt 가 허용하는 프로필 첫 쪽(최대 100편)만 읽습니다.
- 저장소에 60일 동안 커밋이 없으면 GitHub 가 예약 실행을 멈춥니다 (메일로 알려 줌). Actions 탭에서 다시 켜면 됩니다.
- 직접 실행: `python scripts/update_publications.py` (표준 라이브러리만 사용)

## 캐시 버전
JS/CSS 를 바꾸면 모든 `.html` 의 `?v=N` 과 `js/common.js` 의 `ASSET_V` 를 같은 숫자로 올립니다.
(데이터·이미지만 바꿀 때는 그대로 둡니다.) 반영이 안 보이면 1~2분 후 Ctrl+F5.
