# Seunghwan Lee — 개인 연구자 사이트

GitHub Pages 정적 사이트입니다. 주소: https://saa4563123.github.io/
디자인은 SER Lab 사이트(https://knut-serl.github.io/)와 같은 스타일을 따릅니다.

## 무엇을 어디서 고치나

| 하고 싶은 일 | 고칠 파일 |
|---|---|
| 연구 분야 추가 | `data/site-data.js` → `research: [ ]` (예시가 주석에 있음). 그림은 `images/research/` |
| 프로젝트 추가 | `data/site-data.js` → `projects: [ ]`. `featured: true` 인 것은 홈에도 표시(최대 3개). 사진은 `images/projects/` |
| 논문 추가 | `data/site-data.js` → `papers: [ ]` 맨 위에 추가 (최신이 위). 내 이름은 `me:` 표기대로 자동 굵게 |
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

## 캐시 버전
JS/CSS 를 바꾸면 모든 `.html` 의 `?v=N` 과 `js/common.js` 의 `ASSET_V` 를 같은 숫자로 올립니다.
(데이터·이미지만 바꿀 때는 그대로 둡니다.) 반영이 안 보이면 1~2분 후 Ctrl+F5.
