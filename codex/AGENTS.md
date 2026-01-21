You are an expert Frontend Developer specializing in Next.js (App Router), React, Tailwind CSS, and motion-driven UI.
Please build a modern, immersive, and conversion-optimized website for a startup product called "Sprint".

Sprint is a "Hiring Sprint" platform: instead of resume screening, companies propose a real (or realistic) work challenge and applicants form cross-major teams to solve it in a short, intense sprint. Top-performing teams earn internship opportunities. This lets startups reduce hiring risk while also solving an immediate business task.

Core message to reflect in copy and UX:
- Startups often face high-impact but repetitive or operational tasks, yet hiring a full-time role is heavy, and managing interns is also overhead.
- Traditional hiring filters by major and resumes, which misses hidden talent and doesn't verify real execution.
- Hiring Sprint verifies practical skill and teamwork through outcomes, while also producing a deliverable the company can use.
(Use this tone and structure inspired by the outreach email template.) 

====================================================
1) Project Context & Branding
====================================================

- Product Name: Sprint
- Product Type: Hiring Sprint (Outcome-based hiring)
- One-liner (use as default unless a repo constant overrides):
  "Stop screening. Start sprinting."
  Korean variant:
  "서류 대신 실무. 짧게 몰입하고 빠르게 검증합니다."

- Core Values:
  - Speed & Focus: short timeframe, high intensity, fast validation
  - Proof over claims: outcomes > resume keywords
  - Cross-major advantage: diverse perspectives produce better solutions
  - Win-win: hire validated talent + solve a real bottleneck

- Primary Target Audience (B2B first):
  1) Startup founders / hiring managers / team leads
  2) SMEs with lean teams and frequent operational bottlenecks
- Secondary Audience:
  1) Students / early-career applicants who want to try real work without long commitment

====================================================
2) Design Direction (Immersive, High-Intent, Modern)
====================================================

Overall vibe:
- “High-energy, crisp, confident, tech-forward”
- Dynamic but not flashy. Motion should guide attention and increase immersion.

Color System:
- Base: near-black / deep navy for cinematic intro
- Accent: electric blue or neon cyan (use sparingly for CTAs and highlights)
- Neutral: off-white / slate gray for readable sections
- Provide a Tailwind-friendly palette (CSS variables recommended)

Typography:
- Use a modern sans family (Inter preferred).
- Headings: bold, condensed feel.
- Body: highly readable, generous line-height.

Motion & Interaction (must-have):
- Use Framer Motion for page transitions and section reveals.
- Intro page should feel “strong” on first load:
  - subtle animated background (gradient mesh / particles / noise)
  - headline enters with motion
  - CTA button has micro-interaction
- Use scroll-based cues:
  - sticky navigation after intro
  - section reveal on scroll
  - optional scroll progress indicator

Accessibility & Performance:
- Lighthouse-oriented. Avoid heavy videos unless optimized.
- Respect prefers-reduced-motion.
- Keyboard navigable CTAs.

====================================================
3) Page Flow (Critical Requirement)
====================================================

Do NOT drop users directly into the product/browse page.

Implement a 2-step entry:

(A) Intro / Manifesto Page (first load route: "/")
- Full-screen cinematic hero with strong copy and motion.
- Short narrative:
  1) Hiring is slow and risky for startups
  2) Resumes don’t prove execution
  3) Sprint verifies talent by outcomes
- Primary CTA: "Start a Hiring Sprint" (for companies)
- Secondary CTA: "Join a Sprint" (for applicants)
- A “Enter” interaction that transitions to the main site (route "/home")
- Add a small “Skip intro” text link (accessible)

(B) Main Landing (route: "/home")
- Standard scroll landing with sections, trust, and clear CTAs.

====================================================
4) Content Requirements (Main Landing: /home)
====================================================

Section 1. Hero (Main Landing)
- Headline (English + Korean optional, but default Korean-first):
  "실무 과제로 검증하는 채용, Hiring Sprint"
- Subheadline:
  "지원자는 짧게 몰입해 결과로 증명하고, 기업은 채용 실패 리스크 없이 검증된 인재와 결과물을 얻습니다."
- CTAs:
  - Primary: "Hiring Sprint 시작하기" -> "/company/create"
  - Secondary: "Sprint 참여하기" -> "/sprints"

Section 2. The Problem (Startups)
- Bullet cards describing:
  - 반복적이지만 중요한 업무 병목
  - 정규 채용은 무겁고 인턴 온보딩도 부담
  - 서류/전공 중심 필터로 실무 역량 검증이 어려움
- Use iconography (lucide-react) and tight copy.

Section 3. The Solution: Hiring Sprint
- Explain the mechanism:
  - 기업이 과제를 제시
  - 지원자들이 팀을 구성
  - 짧은 기간 집중 수행
  - 데모/평가를 통해 우수팀 선발
  - 인턴십 오퍼 + 결과물 확보
- Add a simple visual timeline component.

Section 4. How It Works (5 steps, must be visual)
1) Company posts a Challenge (scope, deliverable, rubric)
2) Teams apply (cross-major encouraged)
3) Sprint Week (collaboration, checkpoints)
4) Demo Day (evaluation with rubric)
5) Hire & Onboard (internship offers to winners)

Section 5. What You Get (Dual-sided value)
- For companies:
  - validated talent
  - deliverable asset
  - reduced hiring risk
  - faster decision cycle
- For applicants:
  - real work exposure
  - portfolio-ready output
  - feedback + rubric
  - internship opportunity

Section 6. Featured Sprints (Mock Data Cards)
Show 4–6 cards with tags and structure:
- Title
- Company / Team
- Duration (e.g., 7 days, 10 days, 2 weeks)
- Deliverable type (dashboard, analysis, prototype, automation script, etc.)
- Required skills
- Reward (Internship interview / paid internship / fast-track)
- Tag examples: "Operations", "Data", "Growth", "Prototype", "Automation"
Important: Mark these as sample data.

Section 7. Evaluation Rubric (Trust Builder)
- Show a rubric grid:
  - Execution speed
  - Clarity of thinking
  - Collaboration
  - Deliverable quality
  - Practicality / adoption readiness
- Provide a small note: “서류보다 결과 중심”

Section 8. Social Proof / Trust
- Use placeholders without fake numbers:
  - “Pilot-ready”
  - “B2B partners (coming soon)”
  - logos placeholder row
- Add FAQ:
  - 비용 구조(placeholder)
  - 과제 범위는 어떻게 정하나
  - 지원자는 어떤 방식으로 팀을 구성하나
  - 결과물 저작권/사용 범위(placeholder policy link)

Section 9. Final CTA
- Split panel:
  - Left: Company CTA (primary)
  - Right: Applicant CTA (secondary)
- Reinforce “Start sprinting” message.

Footer
- Simple, clean. Include:
  - Contact email placeholder
  - Copyright
  - Links: Terms / Privacy (placeholder routes)

====================================================
5) Product Pages (Lightweight but Real)
====================================================

Create minimal but believable pages:
- "/sprints" : browse list + filters (duration, skill, category, reward)
- "/sprints/[id]" : sprint detail with deliverables, timeline, rubric, apply CTA
- "/company/create" : create a sprint (multi-step form UI, but can be mock)
- "/company" : dashboard mock (your sprints, applicants, rubric view)
- "/apply" or "/talent" : applicant onboarding (profile, skills, portfolio links)

No backend required. Use mock data JSON and local state.

====================================================
6) Technical Requirements
====================================================

Stack:
- Next.js App Router (TypeScript)
- Tailwind CSS
- Framer Motion
- lucide-react icons
- shadcn/ui components if available in repo; otherwise implement clean components.

Implementation rules:
- Functional components, hooks.
- Use Tailwind only (no external CSS files).
- Create reusable components:
  - CTAButton
  - SprintCard
  - Timeline
  - RubricGrid
  - Section container
- Add smooth page transition between "/" -> "/home".
- Respect prefers-reduced-motion.

====================================================
7) Copywriting Style
====================================================

Write copy that feels:
- confident and concise
- startup-friendly
- outcome-driven
- minimal fluff

Avoid academic tone.
Avoid vague marketing clichés.
Keep Korean as the default language, with optional short English punchlines.

====================================================
8) Deliverables
====================================================

- Fully working Next.js app with the routes above.
- Responsive design (mobile-first).
- Polished intro experience that leaves a strong first impression.
- No dead-end pages. Every CTA should lead somewhere.
