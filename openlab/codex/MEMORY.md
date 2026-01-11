# 2026-01-06
User: # AGENTS.md instructions for C:\Users\ë³€?ì›\openLab
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
User:   <cwd>C:\Users\ë³€?ì›\openLab</cwd>
User:   <approval_policy>on-request</approval_policy>
User:   <sandbox_mode>read-only</sandbox_mode>
User:   <network_access>restricted</network_access>
User:   <shell>powershell</shell>
User: </environment_context>
User: ?¹ì‚¬?´íŠ¸ ê°œë°œ? ê±´??AGENTS.md ì°¸ê³ ?´ì„œ ?„ë¡ ?¸ë§Œ ?¼ë‹¨ ë§Œë“¤?´ì¤˜.
Assistant: ì§€ê¸?`C:\Users\ë³€?ì›\openLab`?ëŠ” `AGENTS.md`/`MEMORY.md`ë§??ˆê³  React/Tailwind ?„ë¡œ?íŠ¸ê°€ ?†ì–´???´ë””??ì»´í¬?ŒíŠ¸ë¥?ë§Œë“¤?´ì•¼ ? ì? ?ë‹¨?????¼ìš”. ?í•˜?œëŠ” ë°©ì‹ ?Œë ¤ì£¼ì„¸?? 1) ê¸°ì¡´ React+Tailwind ?„ë¡œ?íŠ¸ ê²½ë¡œë¥??Œë ¤ì£¼ê¸° 2) ???´ë”????React+Tailwind ?„ë¡œ?íŠ¸ë¥?ì´ˆê¸°?”í•´???˜ë©´ ?¹ì¸ ?”ì²­? ê²Œ???í•˜?œëŠ” ë²ˆí˜¸ë§??Œë ¤ì£¼ì„¸??
User: 2ë²ˆìœ¼ë¡??´ì¤˜. ?ˆë¡œ ì²˜ìŒë¶€??ë§Œë“¤ê±°ì•¼. ?¼ë‹¨ ê°„ë‹¨???˜ì´ì§€ë§??œì‘?´ì¤˜. ?¸ë? UI/UX?¤ì? ë³´ë©´???œì°¨?ìœ¼ë¡?ì¶”ê??´ë‚˜ê°€?? ê·¸ë¦¬ê³??°ë¦¬ê°€ ?˜ëŠ” ?€?”ë? ?˜ë‚˜??ë¹ ì§?†ì´ ? ì§œë³„ë¡œ MEMORY.md ???€?¥í•´ì¤?
Assistant: ??Vite React + Tailwind ?„ë¡œ?íŠ¸ë¥?`openlab/`??ë§Œë“¤ê³? ?”ì²­???¹ì…˜?¼ë¡œ ?¨ì¼ ?œë”© ?˜ì´ì§€ë¥?êµ¬ì„±?ˆì–´. Hero/Problem & Solution/How It Works/Featured Projects/Footerë¥?ì¹´ë“œ ê¸°ë°˜ ?ˆì´?„ì›ƒê³?alternating ë°°ê²½?¼ë¡œ ?£ì—ˆê³? Lucide ?„ì´ì½˜ì„ ?¬ìš©?ˆì–´. `openLab/MEMORY.md`???¤ëŠ˜ ?€???„ì²´ë¥?ê¸°ë¡?´ë‘?ˆì–´.
Assistant: 
Assistant: ë³€ê²??„ì¹˜
Assistant: - `openlab/src/App.tsx`: ?¹ì…˜ êµ¬ì„± ë°?ì½˜í…ì¸? Lucide ?„ì´ì½? CTA
Assistant: - `openlab/src/main.tsx`: React ?”íŠ¸ë¦?
Assistant: - `openlab/src/style.css`: Tailwind ë² ì´??ë°?ê¸°ë³¸ ?€?´í¬ ?¤ì •
Assistant: - `openlab/tailwind.config.js`: ì»¬ëŸ¬ ?”ë ˆ???ë„ ?•ì¥
Assistant: - `openlab/index.html`: Manrope ?°íŠ¸ ë¡œë“œ, ?€?´í?, ?”íŠ¸ë¦?ë³€ê²?
Assistant: - `openlab/vite.config.ts`: React ?ŒëŸ¬ê·¸ì¸
Assistant: 
Assistant: ì°¸ê³ : ?°íŠ¸??Manropeë¡?ì§€?•í–ˆ?”ë° Inter/Robotoë¡?ë°”ê¾¸ê¸??í•˜ë©?ë§í•´ì¤?
Assistant: 
Assistant: ?¤ìŒ ?¨ê³„ ?œì•ˆ
Assistant: 1) `cd openlab` ??`npm run dev`ë¡??•ì¸
Assistant: 2) ?í•˜???¹ì…˜/UX ?”í…Œ?¼ì„ ?Œë ¤ì£¼ë©´ ?œì°¨?ìœ¼ë¡?ì¶”ê?

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
# 2026-01-08 (ì¶”ê? ?‘ì—…)
Assistant: ë©”ë‰´ë°??¼ìš°??ê³µê³ /ë¡œê·¸???Œì›ê°€??ë§ˆì´?˜ì´ì§€ê¹Œì? ?•ì¥, UI ?•ë ¬ ë°˜ë³µ ?˜ì •.
Assistant: - `openlab/src/components/TopNav.tsx`: ë©”ë‰´ ??ª© ì¶”ê?(ë§ˆì´?˜ì´ì§€), ë¡œê·¸???Œì›ê°€??ë°°ì¹˜ ì¡°ì •, ë¡œê³  ?ìŠ¤???„ì´ì½?ë³? ?¤í???ë³€ê²? Unbundling ë¬¸êµ¬ ?„ì¹˜/?¤í???ì¡°ì •.
Assistant: - `openlab/src/pages/Notices.tsx`: ê³µê³  ê²Œì‹œ???˜ì´ì§€ ì¶”ê?(ê°„ë‹¨ ?Œì´ë¸?ì¹´ë“œ??.
Assistant: - `openlab/src/pages/Login.tsx`, `openlab/src/pages/Signup.tsx`: ?¼ë°˜ ?¬ìš©?????¬ìš©??ë¶„ê¸° ??UI ì¶”ê?.
Assistant: - `openlab/src/pages/MyPage.tsx`: ?´ë ¥???™ë ¥/ê²½ë ¥/?¤í‚¬ ?¤íƒ ê´€ë¦?UI ì¶”ê?.
Assistant: - `openlab/src/pages/Home.tsx`: CTA ë²„íŠ¼???¼ìš°??ë§í¬ë¡?ë³€ê²?`/notices`, `/post`).
Assistant: - `openlab/src/App.tsx`: ?¼ìš°??ì¶”ê?(`/notices`, `/login`, `/signup`, `/mypage` ??.
Assistant: - `openlab/src/main.tsx`: `BrowserRouter` ?ìš©.
Assistant: - `openlab/package.json`: `react-router-dom` ì¶”ê? ë°?JSON/BOM ë¬¸ì œ ?˜ì •.
Assistant: Vercel ë¹Œë“œ ?¤ë¥˜ ?€?‘ìœ¼ë¡?`TopNav.tsx`??ë¯¸ì‚¬???„ì´ì½?import ?œê±°.
Assistant: ?¸ë? ëª¨ë¸ ?ˆí¬ë¥?`model/`ë¡??´ë¡ ?˜ê³  êµ¬ì¡° ë¶„ì„ ??`model/pages` ?Œì¼ëª?ê¸°ëŠ¥ë³„ë¡œ ë³€ê²?
Assistant: - `model/pages/*`: page1~6 ??`web_crawler_query.py`, `resume_screening.py`, `document_chat.py`, `pdf_reader.py`, `data_analysis_viz.py`, `brand_archive.py`.
Assistant: - `model_v2/modelAgents.md`: OpenLAB ?´ë ¥??ê³µê³  êµ¬ì¡°??ë§ëŠ” LLM ?¤í¬ë¦¬ë‹ ?„ë¡¬?„íŠ¸/?¤í‚¤ë§ˆë¡œ ?¬ì‘??

# 2026-01-08 (ì¶”ê? ?‘ì—… 2)
Assistant: TopNav ë¡œê³ /?„ì´ì½??•ë ¬ ì¡°ì • ë°?Unbundling ?ìŠ¤???„ì¹˜ ë³€ê²? ë³??„ì´ì½˜ë§Œ ?¨ê¸°ê³??¬ê¸° ?•ë?.
Assistant: - `openlab/src/components/TopNav.tsx`: ë¡œê³  ?ìŠ¤???€ë¬¸ì ?œê±°, ?ê°„/êµµê¸°/?¬ê¸° ì¡°ì •, ë³??„ì´ì½??„ì¹˜ ë³€ê²?ë°??Œë‘ë¦?ë°°ê²½ ?œê±°, ë¡œê·¸???Œì›ê°€???•ë ¬ ë³€ê²?
Assistant: Home CTA ë²„íŠ¼??ë§í¬ë¡?ë³€ê²½í•˜ê³?ë¬¸êµ¬ ì¤„ë°”ê¿?ì²˜ë¦¬.
Assistant: - `openlab/src/pages/Home.tsx`: CTA ë²„íŠ¼ `/notices` `/post` ë§í¬?? ?¬ë¡œê±?ì¤„ë°”ê¿??ìš©.
Assistant: model ?ˆí¬ ?´ë¡  ë°??˜ì´ì§€ ?Œì¼ëª??•ë¦¬.
Assistant: - `model/`: Git ?¼ë°˜ ?´ë”ë¡??¬í•¨?˜ë„ë¡?`.git` ?œê±° ë°??¸ë±???¬ì¶”ê°€.
Assistant: - `model/pages/*`: ê¸°ëŠ¥ë³??Œì¼ëª…ìœ¼ë¡?ë¦¬ë„¤??? ì?.
Assistant: model_v2 ?„ë¡¬?„íŠ¸ë¥??„ë¡œ?íŠ¸ êµ¬ì¡°??ë§ê²Œ ?…ë°?´íŠ¸.
Assistant: - `model_v2/modelAgents.md`: resume_form/job_posting ê¸°ë°˜ ?¤í‚¤ë§?ê·œì¹™ ë°˜ì˜.
Assistant: MEMORY.md???‘ì—… ?´ìš© ì¶”ê? ?”ì²­ ?˜í–‰.
