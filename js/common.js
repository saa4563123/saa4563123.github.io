/* ============================================================
   공통 내비게이션·푸터 + 화면 그리기 도우미 — 모든 페이지가 이 파일 하나를 씁니다.
   메뉴를 바꾸려면 아래 MENU 배열만 수정하세요.
   ============================================================ */
"use strict";

/* 캐시 갱신용 버전 문자열 — JS/CSS 를 고쳤는데 옛 내용이 보이면 숫자를 올리세요.
   (모든 HTML 안의 ?v=1 도 같은 숫자로 함께 올립니다.) */
const ASSET_V = "?v=6";

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
