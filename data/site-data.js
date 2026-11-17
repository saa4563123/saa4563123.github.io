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
     program: 프로그램·소속 (예: "URP", "Capstone Design") → 연도 옆에 표시
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
    {
      title: "Autonomous Long-Range Navigation of a Quadruped Robot with Bioinspired Sensing Pads",
      year: "2026", program: "Advanced URP", status: "Ongoing", featured: true,
      desc: "Follow-up to the dog-paw pad project: combining bioinspired foot pads with an array pressure sensor " +
            "and a GNSS/LTE communication payload to build an unmanned long-range autonomous navigation system " +
            "for a quadruped robot.",
      tags: ["Quadruped Robot", "Pressure Sensor Array", "GNSS", "LTE", "Autonomous Navigation"],
      links: [],
      image: ""
    },
    {
      title: "Dog-Paw-Inspired Foot Pads for Stable Quadruped Locomotion on Unstructured Terrain",
      year: "2026", program: "URP", status: "", featured: true,
      desc: "Research and development of foot pads that mimic the structure of a dog's paw to improve the " +
            "walking stability of quadruped robots on unstructured terrain. " +
            "Won the Grand Prize at the 2026 URP Competition (team leader).",
      tags: ["Biomimetics", "Quadruped Robot", "Foot Pad"],
      links: [],
      image: ""
    },
    {
      title: "LTE Cat.M1 Real-Time Telemetry for Sounding Rockets",
      year: "2023", program: "TAURUS Rocketry Club", status: "", featured: true,
      desc: "Research and development of a real-time communication system for sounding rockets based on " +
            "LTE Cat.M1. The conformity test results were published in JCCT (2024) as first author, and the team " +
            "won the Top Excellence Award (2nd place) at the 2023 NURA Rocket Launch Competition.",
      tags: ["LTE Cat.M1", "Telemetry", "Embedded Systems", "Rocketry"],
      links: [["Paper (DOI)", "https://doi.org/10.17703/JCCT.2024.10.4.589"]],
      image: ""
    },
    {
      title: "Multipurpose Sounding Rocket and Mission Payload",
      year: "2023", program: "Creative Design Program (CDP)", status: "", featured: false,
      desc: "Development of a multipurpose sounding rocket and its mission equipment. " +
            "Won the Gold Prize at the 2023 CDP Competition and, as a follow-up, the Bronze Prize in the preliminary " +
            "round of the Yeungnam University Consortium Creative Capstone Design Competition.",
      tags: ["Rocketry", "Mission Payload"],
      links: [],
      image: ""
    },
    {
      title: "Generative-AI Multi-Emotion Communication Platform for Socially Vulnerable Groups",
      year: "2023", program: "Social Value Capstone Design", status: "", featured: false,
      desc: "A communication platform that uses generative AI to help socially vulnerable people express and " +
            "share multiple emotions. The idea was further developed for the K-Tour Idea Challenge 2023, winning " +
            "the Grand Prize in the campus round and the Top Excellence Award in the national round.",
      tags: ["Generative AI", "Social Value"],
      links: [],
      image: ""
    }
  ],

  /* ==========================================================================
     [3] 논문  →  Publications 페이지 + 홈 "Recent Publications" (최신 3편)

     ★ 논문 목록은 구글 스칼라에서 매일 자동으로 받아 옵니다 (data/publications.js — 직접 고치지 않음).
       구글 스칼라 프로필에 논문이 올라오면 다음 날 아침 사이트에 저절로 나타납니다.
       스칼라 주소는 아래 [6] links.scholar 를 씁니다.

     아래 papers 는 "직접 덧붙이거나 고칠 것"만 적습니다:
       ① 자동 목록의 논문에 배지·국문 제목·영문 제목·DOI 등을 덧붙이거나 고치기
          → 제목(title 또는 titleKo)이 스칼라 제목과 같거나 link 의 DOI 가 같으면 같은 논문으로 보고,
            여기 적은 값이 우선합니다. 비워 둔 값("")은 자동 값을 그대로 씁니다.
       ② 스칼라에 없는 논문 추가 → 그대로 목록에 들어갑니다
       ③ 자동 목록의 논문 숨기기 → { title: "스칼라에 보이는 제목", hide: true },
     순서는 상관없습니다 (연도 → 날짜 순으로 자동 정렬).

     me: 저자 목록에서 굵게 표시할 내 이름 표기들 (스칼라의 약어 표기 "SH Lee" 포함)
     link: DOI 주소나 논문 페이지 (없으면 "") · titleKo: 국문 제목 (없으면 "")

     배지는 자동으로 붙습니다 (적지 않아도 됨):
       · SCIE / KCI, 상위 저널(JCR Q1 등) → 아래 [3-1] journals 표에서 학술지 이름으로 찾음
       · First Author / Co-author → 저자 목록에서 me 이름의 위치로 판단
     자동 판단을 바꾸고 싶을 때만 논문에 적습니다:
       role: "Co-first Author" / "Corresponding Author" 처럼 적으면 저자 배지를 그 글자로 바꿈
       badges: 그 밖에 덧붙일 배지, 예) ["Cover Article"]

     예시:
     {
       year: 2026,
       title: "Paper title",
       titleKo: "",
       authors: "Seunghwan Lee, Co Author, Da Wan Kim",
       venue: "Journal Name, 1(1), 1–10",
       link: "https://doi.org/...",
       badges: []
     },
     ========================================================================== */
  me: ["Seunghwan Lee", "Seung-Hwan Lee", "이승환", "SH Lee"],
  papers: [
    // 스칼라에는 국문 제목만 있어 영문 제목·영문 저자·DOI 를 덧붙임 (titleKo 로 자동 목록과 연결)
    {
      year: 2024,
      title: "LTE-Cat.M1 Conformity Test in Sounding Rocket Communication Systems",
      titleKo: "Sounding Rocket 통신 시스템에서의 LTE-Cat. M1 사용 적합성 시험",
      authors: "Seung-Hwan Lee, Tae-Hoon Kim, Hyemin Kim, Da Wan Kim",
      venue: "The Journal of the Convergence on Culture Technology (JCCT), 10(4), 589–594",
      link: "https://doi.org/10.17703/JCCT.2024.10.4.589",
      badges: []
    }
  ],

  /* ==========================================================================
     [3-1] 학술지 표  →  논문 배지 (SCIE·KCI, 상위 저널)
     논문의 학술지 이름(venue)에 match 글자가 들어 있으면 그 학술지의 배지가 붙습니다
     (대소문자·기호 무시). 스칼라에서 자동으로 들어온 논문에도 똑같이 적용됩니다.
     새 학술지에 논문이 실리면 여기에 한 줄만 추가하세요.

     기준은 하나로 통일합니다 — 다른 지표(SJR·Scopus 분위, 집계 사이트 수치)는 쓰지 않습니다.
       index: 국제 학술지 = Clarivate Web of Science 등재 색인 ("SCIE" 등)
                확인: https://mjl.clarivate.com (Master Journal List, 무료)
              국내 학술지 = "KCI" (KCI 등재학술지)  확인: https://www.kci.go.kr
       rank:  JCR(Journal Citation Reports) 분위가 Q1 일 때만 "JCR Q1" 이라고 적음 → 금색 배지
              기준: 논문이 나온 때의 최신 JCR, 저널이 여러 카테고리에 있으면 그중 하나라도 Q1 이면 Q1
              확인: 학교 도서관 → Web of Science / JCR (유료). Q1 이 아니면 "" 로 둠
              같은 학술지라도 해마다 분위가 바뀔 수 있으니, 논문마다 다르면 그 논문에 rank 를 직접 적음
       source: 무엇을 보고 적었는지 메모 (화면에는 안 나옴)
     ========================================================================== */
  journals: [
    { match: "ACS Applied Electronic Materials", index: "SCIE", rank: "",
      source: "JCR 2025 (SCIE): Engineering, Electrical & Electronic 104/370 Q2 (JIF 백분위 72.0), " +
              "Materials Science, Multidisciplinary 184/473 Q2 → Q1 아님. 2026-11-17 JCR 화면에서 확인" },
    { match: "Convergence on Culture Technology", index: "KCI", rank: "",
      source: "KCI 등재학술지 (2019 선정, 2022 재인증) — kci.go.kr SER000004186" }
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

    { year: 2023, prize: "Top Excellence Award", event: "NURA Rocket Launch Competition",
      by: "President's Award, Korea Aerospace Research Institute (KARI)",
      scope: "National", role: "Control Team Leader", image: "" },
    { year: 2023, prize: "Top Excellence Award", event: "K-Tour Idea Challenge 2023",
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
