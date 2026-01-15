# 2026-01-06
User: # AGENTS.md instructions for C:\Users\변?�원\openLab
User: <INSTRUCTIONS>
User: You are an expert Frontend Developer specializing in React and Tailwind CSS.
User: Please build a modern, responsive, and clean landing page for a startup called "OpenLAB".
User: 
User: ## 1. Project Context & Branding
User: - **Name:** OpenLAB
User: - **Slogan:** Unbundling of Research 
User: - **Core Value:** "Light Commitment, Heavy Impact" 
User: - **Concept:** A platform that connects undergraduate students with university research labs by breaking down large research projects into small, skill-based micro-tasks (unbundled tasks). 
User: - **Target Audience:**
User:     1. Students: Want to experience research without heavy commitment (e.g., Degree-based -> Skill-based). 
User:     2. Professors: Need help with simple tasks (e.g., Data Preprocessing). 
User: 
User: ## 2. Design Guidelines (Clean & Tech Startup Vibe)
User: - **Color Palette:**
User:     - Primary: Deep Navy Blue (Trust, Academic).
User:     - Accent: Bright Blue (Tech, Innovation).
User:     - Background: Clean White / Light Gray.
User: - **Typography:** Sans-serif (Inter or Roboto), clean and readable.
User: - **Layout:** Use a grid system, plenty of whitespace, and card-based UI for project listings.
User: - **Icons:** Use 'Lucide-React' for icons.
User: 
User: ## 3. Page Structure & Content Requirements
User: Please implement the following sections in a single-page scrolling layout:
User: 
User: ### A. Hero Section
User: - **Headline:** "OpenLAB: Unbundling of Research"
User: - **Sub-headline:** "Experience graduate-level research with light commitment. Switch from Degree-based to Skill-based specs." 
User: - **CTA Buttons:** "Find a Project" (Primary), "Post a Lab Opening" (Secondary).
User: 
User: ### B. Problem & Solution (Why OpenLAB?)
User: - **Problem:** The "Dilemma of Choice" for students (fear of wrong major choice) and "Labor Shortage" for labs. 
User: - **Solution:** "Micro-projects". Example: Instead of a 1-year commitment, join a 1-month "Data Preprocessing" task. 
User: 
User: ### C. How It Works (4 Steps) 
User: Use a step-by-step visual flow:
User: 1. **OpenLAB Posting:** Labs post unbundled tasks.
User: 2. **AI Screening:** LLM-based Agent analyzes resumes and skills. 
User: 3. **Interview:** Quick interview with the project manager.
User: 4. **Participation:** Join the project and earn a skill-based certificate.
User: 
User: ### D. Featured Projects (Mockup Data)
User: - Display 3 cards as examples.
User: - **Card 1 Example:**
User:     - Title: "Stock Prediction Transformer Model - Data Preprocessing" 
User:     - Lab: Prof. B's Industrial Engineering Lab
User:     - Duration: 1 Month
User:     - Skill: Pandas, Python 
User:     - Tag: "Unbundled Task"
User: 
User: ### E. Business & Trust (Footer area)
User: - Mention "Credentialing" (Certificates) and "SaaS-based Screening". 
User: - Simple footer with copyright.
User: 
User: ## 4. Technical Constraints
User: - Use functional components with React hooks.
User: - Use Tailwind CSS for all styling (no external CSS files).
User: - Make it fully responsive (mobile-friendly).
User: - Use distinct sections with alternating background colors (White / Light Gray).
User: </INSTRUCTIONS>
User: <environment_context>
User:   <cwd>C:\Users\변?�원\openLab</cwd>
User:   <approval_policy>on-request</approval_policy>
User:   <sandbox_mode>read-only</sandbox_mode>
User:   <network_access>restricted</network_access>
User:   <shell>powershell</shell>
User: </environment_context>
User: ?�사?�트 개발?�건??AGENTS.md 참고?�서 ?�론?�만 ?�단 만들?�줘.
Assistant: 지�?`C:\Users\변?�원\openLab`?�는 `AGENTS.md`/`MEMORY.md`�??�고 React/Tailwind ?�로?�트가 ?�어???�디??컴포?�트�?만들?�야 ?��? ?�단?????�요. ?�하?�는 방식 ?�려주세?? 1) 기존 React+Tailwind ?�로?�트 경로�??�려주기 2) ???�더????React+Tailwind ?�로?�트�?초기?�해???�면 ?�인 ?�청?�게???�하?�는 번호�??�려주세??
User: 2번으�??�줘. ?�로 처음부??만들거야. ?�단 간단???�이지�??�작?�줘. ?��? UI/UX?��? 보면???�차?�으�?추�??�나가?? 그리�??�리가 ?�는 ?�?��? ?�나??빠짐?�이 ?�짜별로 MEMORY.md ???�?�해�?
Assistant: ??Vite React + Tailwind ?�로?�트�?`openlab/`??만들�? ?�청???�션?�로 ?�일 ?�딩 ?�이지�?구성?�어. Hero/Problem & Solution/How It Works/Featured Projects/Footer�?카드 기반 ?�이?�웃�?alternating 배경?�로 ?�었�? Lucide ?�이콘을 ?�용?�어. `openLab/MEMORY.md`???�늘 ?�???�체�?기록?�두?�어.
Assistant: 
Assistant: 변�??�치
Assistant: - `openlab/src/App.tsx`: ?�션 구성 �?콘텐�? Lucide ?�이�? CTA
Assistant: - `openlab/src/main.tsx`: React ?�트�?
Assistant: - `openlab/src/style.css`: Tailwind 베이??�?기본 ?�?�포 ?�정
Assistant: - `openlab/tailwind.config.js`: 컬러 ?�레???�도 ?�장
Assistant: - `openlab/index.html`: Manrope ?�트 로드, ?�?��?, ?�트�?변�?
Assistant: - `openlab/vite.config.ts`: React ?�러그인
Assistant: 
Assistant: 참고: ?�트??Manrope�?지?�했?�데 Inter/Roboto�?바꾸�??�하�?말해�?
Assistant: 
Assistant: ?�음 ?�계 ?�안
Assistant: 1) `cd openlab` ??`npm run dev`�??�인
Assistant: 2) ?�하???�션/UX ?�테?�을 ?�려주면 ?�차?�으�?추�?

# 2026-01-08
Assistant: OpenLAB ?? ???? ?? ?? ??? ???? ???????, ?? ?? ???? ????.
Assistant: - `src/App.tsx`: ???/??-??/?? ??/????/?? ??? ???? ??, ?? ??? ??/?? ?? ??, ??? ???? ??, ??? ??.
Assistant: - `src/App.tsx`: ???? ???? ???/??/??? ???? ??.
Assistant: ??? ??? ?? `npm install`? ???? `vite` ?? ??? ????.

# 2026-01-11
- Base setup includes Vite + React + TS + Tailwind, Manrope font, Navy/Accent/Slate theme (`openlab/index.html`, `openlab/tailwind.config.js`, `openlab/src/style.css`).
- Routing/layout: TopNav + ProtectedRoute, ComingSoon sections, AuthContext with localStorage login and mode switching (`openlab/src/App.tsx`, `openlab/src/components/TopNav.tsx`, `openlab/src/components/ProtectedRoute.tsx`, `openlab/src/context/AuthContext.tsx`).
- Core screens: Home, Notices list/status management, NoticeDetail apply/applicant view, Login/Signup, MyPage profile/resume/skills, PostNotice, ResumeScreener (`openlab/src/pages/*`).
- Data/storage: static notice seed, localStorage notices/applications with dedupe, applicant profile storage (`openlab/src/data/notices.ts`, `openlab/src/lib/openlabStore.ts`).
- Serverless APIs: notice post/list, application upload + PDF parsing + evaluation, resume-screen Python integration with fallback, OpenAI eval fallback (`openlab/api/*.ts`, `openlab/api/_lib/*.ts`).
- Build/deploy: Vite build, Vercel rewrite, API proxy config (`openlab/vite.config.ts`, `openlab/vercel.json`, `openlab/tsconfig.json`, `openlab/postcss.config.js`, `openlab/package.json`).
- Note: some files show mojibake/encoding damage and may need cleanup (NoticeDetail/PostNotice/ResumeScreener, notices data, API files).
- Added edit flow for posted notices using `Edit` button and edit mode in `PostNotice` (`openlab/src/pages/Notices.tsx`, `openlab/src/pages/PostNotice.tsx`, `openlab/src/lib/openlabStore.ts`).
- TopNav layout adjusted: left/right alignment, no-wrap slogan, and spacing tweaks (`openlab/src/components/TopNav.tsx`).
# 2026-01-08 (추�? ?�업)
Assistant: 메뉴�??�우??공고/로그???�원가??마이?�이지까�? ?�장, UI ?�렬 반복 ?�정.
Assistant: - `openlab/src/components/TopNav.tsx`: 메뉴 ??�� 추�?(마이?�이지), 로그???�원가??배치 조정, 로고 ?�스???�이�?�? ?��???변�? Unbundling 문구 ?�치/?��???조정.
Assistant: - `openlab/src/pages/Notices.tsx`: 공고 게시???�이지 추�?(간단 ?�이�?카드??.
Assistant: - `openlab/src/pages/Login.tsx`, `openlab/src/pages/Signup.tsx`: ?�반 ?�용?????�용??분기 ??UI 추�?.
Assistant: - `openlab/src/pages/MyPage.tsx`: ?�력???�력/경력/?�킬 ?�택 관�?UI 추�?.
Assistant: - `openlab/src/pages/Home.tsx`: CTA 버튼???�우??링크�?변�?`/notices`, `/post`).
Assistant: - `openlab/src/App.tsx`: ?�우??추�?(`/notices`, `/login`, `/signup`, `/mypage` ??.
Assistant: - `openlab/src/main.tsx`: `BrowserRouter` ?�용.
Assistant: - `openlab/package.json`: `react-router-dom` 추�? �?JSON/BOM 문제 ?�정.
Assistant: Vercel 빌드 ?�류 ?�?�으�?`TopNav.tsx`??미사???�이�?import ?�거.
Assistant: ?��? 모델 ?�포�?`model/`�??�론?�고 구조 분석 ??`model/pages` ?�일�?기능별로 변�?
Assistant: - `model/pages/*`: page1~6 ??`web_crawler_query.py`, `resume_screening.py`, `document_chat.py`, `pdf_reader.py`, `data_analysis_viz.py`, `brand_archive.py`.
Assistant: - `model_v2/modelAgents.md`: OpenLAB ?�력??공고 구조??맞는 LLM ?�크리닝 ?�롬?�트/?�키마로 ?�작??

# 2026-01-08 (추가 작업 2)
Assistant: TopNav 로고/아이콘/정렬 조정 및 Unbundling 텍스트 위치 변경, 별 아이콘만 남기고 크기 확대.
Assistant: - `openlab/src/components/TopNav.tsx`: 로고 텍스트 대문자 제거, 자간/굵기/크기 조정, 별 아이콘 위치 변경 및 테두리/배경 제거, 로그인/회원가입 정렬 변경.
Assistant: Home CTA 버튼을 링크로 변경하고 문구 줄바꿈 처리.
Assistant: - `openlab/src/pages/Home.tsx`: CTA 버튼 `/notices` `/post` 링크화, 슬로건 줄바꿈 적용.
Assistant: model 레포 클론 및 페이지 파일명 정리.
Assistant: - `model/`: Git 일반 폴더로 포함되도록 `.git` 제거 및 인덱스 재추가.
Assistant: - `model/pages/*`: 기능별 파일명으로 리네임 유지.
Assistant: model_v2 프롬프트를 프로젝트 구조에 맞게 업데이트.
Assistant: - `model_v2/modelAgents.md`: resume_form/job_posting 기반 스키마/규칙 반영.
Assistant: MEMORY.md에 작업 내용 추가 요청 수행.


# 2026-01-11 (?? ??)
- Resume screener: FastAPI(8000)? Ollama ?? ??, Ollama ??/?? ? ?? ???? ??.
- Notice edit: ??? ??? Edit ??? ?? ??(`/post?edit=`) ??, ?? ?? ????? ??.
- TopNav: ??/??? ?? ??? ?/?? ??, ??? ??? ?? (`openlab/src/components/TopNav.tsx`).
- Backend scaffold: `backend/` ??, Fastify + Prisma + MySQL ?? ??, CORS/health ??, Prisma ???(User/Notice) ? `.env`/`.gitignore` ??.
- DB setup: MySQL ?? ? Prisma migrate ??, shadow DB ?? ?? ??.
- Auth API: `/auth/signup`, `/auth/login` ?? (bcrypt ?? ??) (`backend/src/routes/auth.ts`, `backend/src/server.ts`).
- Frontend auth: Signup/Login API ?? ? ??/?? ?? (`openlab/src/pages/Signup.tsx`, `openlab/src/pages/Login.tsx`).
# 2026-01-15 (Sprint Vite 전환/정리/기능 업데이트)
- 기반 유지: Next.js 전환은 보류하고 Vite + React + TS + Tailwind 환경 유지.
- 디자인/브랜딩: OpenLAB -> Sprint로 전면 교체, Space Grotesk 폰트 적용, CSS 변수 기반 컬러 시스템(ink/night/accent 등)으로 Tailwind 색상 매핑, 다크 톤 네비/히어로 포함.
- 라우팅/플로우: 2-step entry("/" Intro/Manifesto -> "/home" 메인 랜딩) + 주요 라우트(/sprints, /sprints/:id, /company, /company/create, /apply, /community, /resume-screener, /mypage, /terms, /privacy) 구성.
- 모션: framer-motion 추가(AnimatePresence, page transitions, scroll reveal, reduced motion 대응).
- UI 컴포넌트: CTAButton, Section, ScrollReveal, SprintCard, Timeline, RubricGrid 등 재사용 컴포넌트 생성.
- 데이터: 스프린트 샘플 데이터(JSON) 추가로 카드/상세 페이지 렌더.
- 페이지 구성: Intro/메인 랜딩(문제-해결-작동-루브릭-FAQ-CTA), 스프린트 목록/상세, 기업 대시보드/생성(멀티스텝 UI), 지원자 온보딩, 커뮤니티/리줌 스크리닝/마이페이지(플레이스홀더+CTA).
- 실행/정리: npm install 수행(프론트 실행 확인), 불필요 OpenLAB 잔여 파일/폴더 제거(src/context, src/lib, notices, auth 등), 사용하지 않는 deps(formidable, pdf-parse) 제거.
- 문서: 루트 README를 Sprint 기준으로 갱신 + Sprint/README.md 추가(실행 방법/라우트 요약).
- 네비게이션: 메뉴 구성 조정(학생/기업 분기), 마이페이지는 로그인/회원가입 아래 얇은 버튼으로 이동, 메뉴 과밀 문제 해결.
- 인증(더미): AuthContext 추가(localStorage 기반), 학생/기업 더미 계정(student01/company01, password sprint1234) 제공, 로그인 페이지에서 자동 입력 버튼 제공.
- 접근 제어: RequireRole(기업 전용) + RequireAuth(로그인 필수) 추가.
  - 기업 전용: /company, /company/create
  - 로그인 필수: /apply, /mypage, /resume-screener
- 로그인/회원가입 UI: 역할 탭(학생/기업) 추가, 회원가입 폼에 아이디+중복체크 버튼/기업명(기업일 때) 추가, 인코딩 깨짐 이슈 수정(한글 복구).
