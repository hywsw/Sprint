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
