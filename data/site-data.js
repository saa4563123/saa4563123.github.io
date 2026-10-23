/* ============================================================================
   ★★★  사이트 데이터 파일 — 연구 분야 · 프로젝트 · 논문 · 특허  ★★★

   [수정 방법]
   1) 이 파일을 메모장(또는 GitHub 웹의 연필 아이콘)으로 연다
   2) 아래 섹션의 예시(주석)를 복사해 [ ] 안에 붙여 넣고 값을 고친다
   3) 저장 후 GitHub 에 올리면(커밋) 1~2분 안에 사이트에 반영

   [이 파일에 없는 것] 경력·학력 등 프로필(about.html) · 연락처(contact.html) — README.md 참고

   [형식 규칙 — 이것만 지키면 안 깨집니다]
   · 글자 값은 반드시 따옴표로 감싼다:  title: "Legged Robot Locomotion",
   · 각 항목(중괄호 덩어리) 끝에는 쉼표를 붙인다:  { ... },
   · 항목을 지울 때는 { 부터 }, 까지 통째로 지운다
   · 비워둘 값은 "" 로 남겨둔다
   · 목록이 비어 있으면 화면에 "coming soon" 이 표시된다
   ============================================================================ */
"use strict";
window.SITE = {

  /* ==========================================================================
     [1] 연구 분야  →  Research 페이지 + 홈 카드 (홈에는 앞의 3개만)
     image: images/research/ 에 그림을 올리고 경로를 적는다 (없으면 "" → 글만 표시)

     예시:
     {
       title: "연구 주제 제목",
       desc: "두세 문장 설명",
       keywords: ["키워드1", "키워드2"],
       image: "images/research/topic1.jpg"
     },
     ========================================================================== */
  research: [
  ],

  /* ==========================================================================
     [2] 프로젝트  →  Projects 페이지 + 홈 카드 (featured: true 인 것만 홈에 최대 3개)
     status: "Ongoing" 이면 초록색으로 표시
     links: [ ["버튼 이름", "주소"], ... ]   (없으면 [])
     image: images/projects/ 에 사진을 올리고 경로를 적는다 (없으면 "")

     예시:
     {
       title: "프로젝트 이름",
       year: "2026", status: "Ongoing", featured: true,
       desc: "프로젝트 설명",
       tags: ["ROS 2", "C++"],
       links: [["Paper", "https://doi.org/..."]],
       image: "images/projects/project1.jpg"
     },
     ========================================================================== */
  projects: [
  ],

  /* ==========================================================================
     [3] 논문  →  Publications 페이지 + 홈 "Recent Publications" (앞의 3편)
     새 논문은 목록 "맨 위"에 추가 (최신이 위)
     me: 저자 목록에서 굵게 표시할 내 이름 표기들
     link: DOI 주소나 논문 페이지 (없으면 "") · titleKo: 국문 제목 (없으면 "")
     badges: 예) ["SCI", "First Author"]

     예시:
     {
       year: 2026,
       title: "Paper title",
       titleKo: "",
       authors: "Seunghwan Lee, Co Author, Da Wan Kim",
       venue: "Journal Name, 1(1), 1–10",
       link: "https://doi.org/...",
       badges: ["First Author"]
     },
     ========================================================================== */
  me: ["Seunghwan Lee", "이승환"],
  papers: [
  ],

  /* ==========================================================================
     [4] 특허  →  Publications 페이지 아래 (비어 있으면 칸이 나타나지 않음)
     예시: { year: 2026, title: "...", inventors: "...", number: "10-xxxx", country: "Korea Patent" },
     ========================================================================== */
  patents: [
  ],

  /* ==========================================================================
     [5] 수상  →  About 페이지 "Awards & Honors" (연도별로 묶고, 같은 해에서는 적힌 순서대로)
     중요한 상을 위에 적는다.
     scope: "National"(전국대회) 또는 "Campus"(교내대회) → 배지로 표시
     role:  "Team Leader" 처럼 적으면 금색 배지, 그 밖의 역할은 회색 배지
     image: 상장 사진을 images/awards/ 에 올리고 경로를 적으면 "Certificate" 버튼이 생김 (없으면 "")
     ========================================================================== */
  awards: [
    { year: 2026, prize: "Grand Prize", event: "Undergraduate Research Program (URP) Competition",
      by: "President's Award, Korea National University of Transportation",
      scope: "Campus", role: "Team Leader", image: "" },

    { year: 2023, prize: "First Prize", event: "NURA Rocket Launch Competition",
      by: "President's Award, Korea Aerospace Research Institute (KARI)",
      scope: "National", role: "Control Team Leader", image: "" },
    { year: 2023, prize: "First Prize", event: "K-Tour Idea Challenge 2023",
      by: "CEO's Award, Korea Tourism Organization",
      scope: "National", role: "Team Leader", image: "" },
    { year: 2023, prize: "Excellence Award", event: "ICT Smart Device-thon",
      by: "President's Award, Chungbuk Science & Technology Innovation Agency",
      scope: "National", role: "Team Member", image: "" },
    { year: 2023, prize: "Bronze Prize (Preliminary Round)", event: "Yeungnam University Consortium Creative Capstone Design Competition",
      by: "Director's Award, Center for Innovative Engineering Education, Yeungnam University",
      scope: "National", role: "Team Member", image: "" },
    { year: 2023, prize: "Grand Prize", event: "K-Tour Idea Challenge 2023 (Campus Round)",
      by: "Director's Award, KNUT LINC 3.0 Project Group",
      scope: "Campus", role: "Team Leader", image: "" },
    { year: 2023, prize: "Gold Prize", event: "Creative Design Program (CDP) Competition",
      by: "Director's Award, Center for Innovative Engineering Education, KNUT",
      scope: "Campus", role: "Team Member", image: "" }
  ],

  /* ==========================================================================
     [6] 링크  →  푸터에 공통으로 쓰임
     ========================================================================== */
  links: {
    email: "saa4563123@naver.com",
    scholar: "https://scholar.google.com/citations?user=Gwwt5F8AAAAJ",
    github: "https://github.com/saa4563123",
    lab: "https://knut-serl.github.io/"
  }
};
