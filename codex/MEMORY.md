# 2026-01-06
User requested a modern, responsive landing page for OpenLAB (React + Tailwind). Requirements included: navy/bright-blue palette, Inter/Roboto, Lucide icons, grid layout, and sections (Hero, Problem/Solution, How It Works, Featured Projects, Footer).
Assistant response summary:
- Proposed new Vite React + Tailwind setup and a single-page landing layout.
- Implemented sections with alternating backgrounds, CTA buttons, and Lucide icons.
- Added Manrope font, basic Tailwind base styles, and color tokens.
- Suggested running `npm run dev` after setup.

# 2026-01-08
- OpenLAB landing implemented with Hero, Problem/Solution, How It Works, Featured Projects, Footer.
- Added mock project cards and CTA buttons.
- Noted: run `npm install` and `vite` to start.

# 2026-01-11
- Base setup: Vite + React + TS + Tailwind, Manrope font, Navy/Accent/Slate theme (`openlab/index.html`, `openlab/tailwind.config.js`, `openlab/src/style.css`).
- Routing/layout: TopNav + ProtectedRoute, ComingSoon sections, AuthContext with localStorage login and mode switching (`openlab/src/App.tsx`, `openlab/src/components/TopNav.tsx`, `openlab/src/components/ProtectedRoute.tsx`, `openlab/src/context/AuthContext.tsx`).
- Core screens: Home, Notices list/status management, NoticeDetail apply/applicant view, Login/Signup, MyPage profile/resume/skills, PostNotice, ResumeScreener (`openlab/src/pages/*`).
- Data/storage: static notice seed, localStorage notices/applications with dedupe, applicant profile storage (`openlab/src/data/notices.ts`, `openlab/src/lib/openlabStore.ts`).
- Serverless APIs: notice post/list, application upload + PDF parsing + evaluation, resume-screen Python integration with fallback, OpenAI eval fallback (`openlab/api/*.ts`, `openlab/api/_lib/*.ts`).
- Build/deploy: Vite build, Vercel rewrite, API proxy config (`openlab/vite.config.ts`, `openlab/vercel.json`, `openlab/tsconfig.json`, `openlab/postcss.config.js`, `openlab/package.json`).
- Note: some files show mojibake/encoding damage and may need cleanup (NoticeDetail/PostNotice/ResumeScreener, notices data, API files).
- Added edit flow for posted notices using `Edit` button and edit mode in `PostNotice` (`openlab/src/pages/Notices.tsx`, `openlab/src/pages/PostNotice.tsx`, `openlab/src/lib/openlabStore.ts`).
- TopNav layout adjusted: left/right alignment, no-wrap slogan, and spacing tweaks (`openlab/src/components/TopNav.tsx`).

# 2026-01-08 (additional)
- TopNav: added MyPage, adjusted login/logout placement, slogan spacing, and logo spacing (`openlab/src/components/TopNav.tsx`).
- Notices: added simple card UI (`openlab/src/pages/Notices.tsx`).
- Login/Signup: improved toggle UI and layout (`openlab/src/pages/Login.tsx`, `openlab/src/pages/Signup.tsx`).
- MyPage: added education/experience/skills selection UI (`openlab/src/pages/MyPage.tsx`).
- Home: CTA buttons link to `/notices` and `/post` (`openlab/src/pages/Home.tsx`).
- App routes: `/notices`, `/login`, `/signup`, `/mypage` (`openlab/src/App.tsx`).
- main: added `BrowserRouter` (`openlab/src/main.tsx`).
- package: added `react-router-dom`, fixed JSON/BOM issue (`openlab/package.json`).
- Vercel build fix: removed unused import in `TopNav.tsx`.
- Model: reorganized under `model/pages/*` by feature.
- model_v2: updated prompts to match OpenLAB notice structure.

# 2026-01-08 (additional 2)
- TopNav: logo/title spacing and Unbundling subtitle placement refined; nav spacing adjusted.
- Home: CTA links updated to `/notices` and `/post` with line breaks in copy.
- Model: added `model/` to Git ignores and cleaned folder structure.
- model_v2: updated prompt/schema to resume_form/job_posting rules.
- Memory: agreed to keep a structured template for future updates.

# 2026-01-11 (backend and auth)
- Resume screener: FastAPI(8000) + Ollama notes; fallback behavior when Ollama is unavailable.
- Notice edit: edit mode routed via `/post?edit=`.
- TopNav: logo/slogan spacing updates (`openlab/src/components/TopNav.tsx`).
- Backend scaffold: `backend/` with Fastify + Prisma + MySQL, CORS/health, Prisma schema (User/Notice), `.env`/`.gitignore` added.
- DB setup: Prisma migrations and shadow DB notes.
- Auth API: `/auth/signup`, `/auth/login` (bcrypt) (`backend/src/routes/auth.ts`, `backend/src/server.ts`).
- Frontend auth: Signup/Login API integration with student/company login (`openlab/src/pages/Signup.tsx`, `openlab/src/pages/Login.tsx`).

# 2026-01-15 (Sprint Vite migration and updates)
- Stack: Vite + React + TypeScript + Tailwind; framer-motion and lucide-react added.
- Rebrand: OpenLAB -> Sprint; Space Grotesk font; CSS variable theme (ink/night/accent) with Tailwind mappings; dark/navy hero with strong CTAs.
- Routes: 2-step entry `/` Intro/Manifesto -> `/home`, plus `/sprints`, `/sprints/:id`, `/company`, `/company/create`, `/apply`, `/community`, `/resume-screener`, `/mypage`, `/terms`, `/privacy`.
- Motion: AnimatePresence page transitions, scroll reveals, respects prefers-reduced-motion.
- Reusable UI: CTAButton, Section, ScrollReveal, SprintCard, Timeline, RubricGrid.
- Data: mock sprints JSON with list/detail pages.
- Pages: Intro/Home/Sprints/Detail/Company dashboard & create/Apply/Community/ResumeScreener/MyPage/Terms/Privacy.
- Navigation & access control: role-based menu for company/student; RequireRole and RequireAuth added.
  - Company-only: `/company`, `/company/create`
  - Login required: `/apply`, `/mypage`, `/resume-screener`
- Auth context: localStorage auth with demo accounts.
  - Student: student01 / sprint1234
  - Company: company01 / sprint1234
- Signup: role tabs, duplicate checks, company-name field.
- General cleanup: removed OpenLAB-only folders/files, unused deps (formidable, pdf-parse), updated README (root and Sprint/README.md).
- Files touched: routes, auth, navigation, pages, components, data, styles, configs, docs.
- Memory format: agreed to use a structured template for future entries (stack/branding/routes/motion/components/pages/nav/auth/docs/files).

# 2026-01-15 (additional)
- Login redirect: RequireAuth/RequireRole store `location.state.from` and Login restores redirect after auth.
- MyPage: applicant profile form state saved to localStorage; skill tag add/remove; file upload button; spacing tweaks.
- Navbar: menu spacing and role-based menu tweaks; MyPage button moved next to logout.
- Signup: duplicate check button + company name field.
- Files: RequireAuth/RequireRole/Login/MyPage/TopNav updated accordingly.

# 2026-01-16
- Resume screening 작업 착수: FastAPI `resume_screening/main.py`에 기본 JD/criteria 로더 추가( `model/job_description.txt`, `model/criteria.txt`, `resume_screening/config/*.json` 우선순위) 및 텍스트 트리밍 유틸 추가.
- FastAPI에 `/defaults` 엔드포인트 추가, `/analyze-resume`에서 JD/criteria 누락 시 기본값 자동 보완, 응답에 `extracted_text` 포함하도록 수정.
- `model/criteria.txt`, `model/job_description.txt`에 기본 문구 작성.
- 프론트 `Sprint/src/pages/ResumeScreener.tsx`를 업로드/분석 UI로 교체: `/defaults`로 기본값 로드, `/analyze-resume`에 FormData 전송, 결과/판정/criteria 리스트/파싱 텍스트 표시.
- 진행 중단 지점: `resume_screening/main.py` 인코딩 깨짐(기존 주석/로그 텍스트) 확인 필요, `/defaults` 및 분석 흐름 실동작 테스트 미수행. 프론트는 `VITE_RESUME_SCREENER_URL` 없으면 `http://localhost:8000`으로 호출.

# 2026-01-19
- Resume screening 백엔드 복구: `resume_screening/main.py` 인코딩/문법 오류 정리, Ollama 호출/파싱/폴백 로직 정상화. PDF 텍스트 추출 보강, 로깅 정리.
- 정책 변경: Ollama 응답 없으면 폴백 대신 실패 처리(`success=false`, 에러 메시지 반환)로 변경.
- Python 환경: conda `resume-screening`(Python 3.9) 생성. libmamba로 3.9 설치 실패하여 classic solver로 성공. `resume_screening/requirements.txt`를 Python 3.13 호환 버전으로 갱신 후 conda env에 설치. venv `.venv_win` 생성 후 제거.
- Ollama: 11434 포트에 `ollama.exe` 실행 확인. `ollama pull llama3`로 모델 다운로드 완료. `ollama run llama3 "hello"` 워밍업 후 `/analyze-resume` 성공 응답 확인.
- Ollama 연결 이슈: `/health`에 `model: "llama3"`가 유지되어 `llama3:latest`와 불일치로 응답 없음 발생. `OLLAMA_MODEL` 환경변수를 설정한 동일 터미널에서 FastAPI 재시작 필요.
- Resume screening UX 변경:
  - JD/criteria는 지원자가 입력하지 않고 스프린트 공고에서 선택하도록 변경.
  - `Sprint/src/data/sprints.ts`에 `jobDescription`, `criteria` 필드 추가(샘플 데이터).
  - `/resume-screener`에 스프린트 선택 박스 추가, JD/criteria는 읽기 전용 표시.
  - 스프린트 찾기 흐름: `/resume-screener`에서 “스프린트 찾기” 버튼 → `/sprints?selectFor=resume` → 스프린트 클릭 시 `/resume-screener?sprintId=...` 복귀 및 선택 반영.
  - `Sprint/src/pages/Sprints.tsx`에서 `selectFor=resume` 모드 지원(클릭 시 resume-screener로 이동).
  - 스프린트 찾기 버튼은 “Hiring Sprint” 라벨 아래, 선택 박스 밑으로 위치 조정 및 크기 축소.

# 2026-01-20
- Resume screening 안정화/모델 이슈: Ollama 모델 태그 불일치(예: llama3 vs llama3:latest)와 응답 지연으로 프론트에서 "서버 응답 없음" 발생. 백엔드에서 `/api/tags`로 모델명 자동 해석 및 `/health`에 requested_model/실사용 모델 반환하도록 보완. `OLLAMA_TIMEOUT_SEC` 환경변수 추가(기본 180s) 및 JD/criteria/resume 텍스트 길이 트리밍으로 지연 완화.
- Qwen2.5 판단 오류 대응: 이력서에 MySQL 언급이 있는데 SQL 경험을 놓치는 케이스 분석. 프롬프트에 "MySQL/SQLite/PostgreSQL/...은 SQL 경험으로 간주" 문구 추가 + 후처리에서 SQL/DB 관련 기준의 false를 MySQL 키워드로 보정하는 override 추가.
- 모델 기본값 변경: resume_screening `OLLAMA_MODEL` 기본을 `qwen2.5:7b-instruct`로 변경.
- ResumeScreener UI: "스프린트 찾기"와 "파일 선택" 버튼을 동일한 베이스 클래스 + 사이즈 분리 방식으로 통일. 파일 선택은 라벨 버튼으로 교체하고, 선택된 파일명을 버튼 위로 표시. 파일 선택 버튼 크기 소폭 축소.
- 인코딩 주의: ResumeScreener 파일 인코딩 깨짐 이슈가 있어 바이트 기반 수정 방식(ISO-8859-1 roundtrip)으로 변경 적용.

# 2026-01-21
- 로그인 UX 개선: 보호된 메뉴 접근 시 원래 경로(+query)로 돌아가도록 `RequireAuth/RequireRole`에서 `state.from`에 `location.search` 포함. 로그인 완료 후 `replace` 이동 + 로그인 상태에서 `/login` 접근 시 즉시 리다이렉트.
- 로그인 초기 상태: 세션 단위로만 유지되도록 `localStorage` 대신 `sessionStorage` 사용하여 첫 접속 시 자동 로그인 방지.
- Apply 템플릿 정렬: `Apply` 페이지를 `MyPage` 필드 구조(기본/학력/경력·역량/포트폴리오·이력서)로 통일, 마이페이지 저장값 불러오기 버튼 및 상태 메시지 추가.
- 내비게이션 정리: 학생 메뉴에서 `/apply` 항목 제거(스프린트 상세 CTA로만 진입).
# 2026-01-21
- Sprint 생성/편집: CompanyCreate 편집 모드 추가(/company/create?edit=)로 수정 시 새로 생성하지 않고 update 처리.
- 대시보드: 모든 스프린트 수정 버튼 노출, 리스트 전체 표시 + 최신 생성순 정렬, 페이징(기본 6개/페이지, 이전·다음) 추가.
- 진행 상태: status에 종료(closed) 추가, 대시보드 통계는 종료만 종료로 집계, 나머지는 진행 중 포함.
- 스프린트 메타: createdAt 저장 및 기본 샘플 시드 생성, 상태/지원팀 메타 유지.
