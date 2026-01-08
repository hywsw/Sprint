You are an expert Frontend Developer specializing in React and Tailwind CSS.
Please build a modern, responsive, and clean landing page for a startup called "OpenLAB".

## 1. Project Context & Branding
- **Name:** OpenLAB
- **Slogan:** Unbundling of Research 
- **Core Value:** "Light Commitment, Heavy Impact" 
- **Concept:** A platform that connects undergraduate students with university research labs by breaking down large research projects into small, skill-based micro-tasks (unbundled tasks). 
- **Target Audience:**
    1. Students: Want to experience research without heavy commitment (e.g., Degree-based -> Skill-based). 
    2. Professors: Need help with simple tasks (e.g., Data Preprocessing). 

## 2. Design Guidelines (Clean & Tech Startup Vibe)
- **Color Palette:**
    - Primary: Deep Navy Blue (Trust, Academic).
    - Accent: Bright Blue (Tech, Innovation).
    - Background: Clean White / Light Gray.
- **Typography:** Sans-serif (Inter or Roboto), clean and readable.
- **Layout:** Use a grid system, plenty of whitespace, and card-based UI for project listings.
- **Icons:** Use 'Lucide-React' for icons.

## 3. Page Structure & Content Requirements
Please implement the following sections in a single-page scrolling layout:

### A. Hero Section
- **Headline:** "OpenLAB: Unbundling of Research"
- **Sub-headline:** "Experience graduate-level research with light commitment. Switch from Degree-based to Skill-based specs." 
- **CTA Buttons:** "Find a Project" (Primary), "Post a Lab Opening" (Secondary).

### B. Problem & Solution (Why OpenLAB?)
- **Problem:** The "Dilemma of Choice" for students (fear of wrong major choice) and "Labor Shortage" for labs. 
- **Solution:** "Micro-projects". Example: Instead of a 1-year commitment, join a 1-month "Data Preprocessing" task. 

### C. How It Works (4 Steps) 
Use a step-by-step visual flow:
1. **OpenLAB Posting:** Labs post unbundled tasks.
2. **AI Screening:** LLM-based Agent analyzes resumes and skills. 
3. **Interview:** Quick interview with the project manager.
4. **Participation:** Join the project and earn a skill-based certificate.

### D. Featured Projects (Mockup Data)
- Display 3 cards as examples.
- **Card 1 Example:**
    - Title: "Stock Prediction Transformer Model - Data Preprocessing" 
    - Lab: Prof. B's Industrial Engineering Lab
    - Duration: 1 Month
    - Skill: Pandas, Python 
    - Tag: "Unbundled Task"

### E. Business & Trust (Footer area)
- Mention "Credentialing" (Certificates) and "SaaS-based Screening". 
- Simple footer with copyright.

## 4. Technical Constraints
- Use functional components with React hooks.
- Use Tailwind CSS for all styling (no external CSS files).
- Make it fully responsive (mobile-friendly).
- Use distinct sections with alternating background colors (White / Light Gray).