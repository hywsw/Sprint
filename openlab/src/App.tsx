import { useMemo } from "react";
import {
  BadgeCheck,
  BrainCircuit,
  ClipboardList,
  GraduationCap,
  LineChart,
  MessageCircle,
  Sparkles,
  UserSquare2,
} from "lucide-react";

const steps = [
  {
    title: "OpenLAB Posting",
    description: "Labs publish unbundled micro-tasks that match real research needs.",
    icon: ClipboardList,
  },
  {
    title: "AI Screening",
    description: "LLM-based agents review resumes and skills for quick matching.",
    icon: BrainCircuit,
  },
  {
    title: "Interview",
    description: "Short, focused interview with the project manager to align goals.",
    icon: MessageCircle,
  },
  {
    title: "Participation",
    description: "Join the project and earn a skill-based certificate.",
    icon: BadgeCheck,
  },
];

const projects = [
  {
    title: "Stock Prediction Transformer Model - Data Preprocessing",
    lab: "Prof. B's Industrial Engineering Lab",
    duration: "1 Month",
    skill: "Pandas, Python",
    tag: "Unbundled Task",
  },
  {
    title: "Bio-Signal Classification - Feature Extraction",
    lab: "NeuroTech Research Group",
    duration: "3 Weeks",
    skill: "NumPy, Signal Processing",
    tag: "Micro-Project",
  },
  {
    title: "Smart Campus Energy Forecasting - Data Labeling",
    lab: "Urban Systems Lab",
    duration: "2 Weeks",
    skill: "Labeling, Excel",
    tag: "Quick Start",
  },
];

export default function App() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="bg-white text-navy">
      <section className="relative overflow-hidden bg-white">
        <div className="absolute -top-40 right-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute bottom-10 left-0 h-56 w-56 rounded-full bg-navy/10 blur-3xl" />
        <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-16 pt-10 md:pt-16">
          <header className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-white shadow-glow">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                  OpenLAB
                </p>
                <p className="text-xs text-navy/60">Light Commitment, Heavy Impact</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm text-navy/70">
              <Sparkles className="h-4 w-4" />
              Unbundling of Research
            </div>
          </header>

          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-6">
              <p className="inline-flex items-center gap-2 rounded-full bg-slate px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-navy/70">
                <LineChart className="h-4 w-4 text-accent" />
                Research Built For Skills
              </p>
              <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
                OpenLAB: Unbundling of Research
              </h1>
              <p className="text-lg text-navy/70">
                Experience graduate-level research with light commitment. Switch from
                Degree-based to Skill-based specs.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-[#1557D6]">
                  Find a Project
                </button>
                <button className="rounded-full border border-navy/20 px-6 py-3 text-sm font-semibold text-navy transition hover:-translate-y-0.5 hover:border-navy/40">
                  Post a Lab Opening
                </button>
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-navy/60">
                <div className="flex items-center gap-2">
                  <UserSquare2 className="h-4 w-4 text-accent" />
                  Student-ready micro-tasks
                </div>
                <div className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-accent" />
                  Skill-based certificates
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-navy/10 bg-slate p-8 shadow-xl">
              <div className="space-y-6">
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    Live Project
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">
                    Stock Prediction Transformer Model
                  </h3>
                  <p className="mt-2 text-sm text-navy/60">
                    1-month data preprocessing sprint with Prof. B's lab.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-navy/60">
                    <span className="rounded-full bg-accent/10 px-3 py-1 text-accent">
                      Unbundled Task
                    </span>
                    <span>Python • Pandas</span>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white p-5 text-sm text-navy/70 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                      For Students
                    </p>
                    <p className="mt-2">Try research without a year-long commitment.</p>
                  </div>
                  <div className="rounded-2xl bg-white p-5 text-sm text-navy/70 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                      For Labs
                    </p>
                    <p className="mt-2">Fill your pipeline with skilled contributors fast.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Why OpenLAB?
            </p>
            <h2 className="text-3xl font-semibold">Solve the Dilemma of Choice</h2>
            <p className="text-base text-navy/70">
              Students worry about committing to the wrong major. Labs struggle with
              labor shortages for routine research tasks.
            </p>
            <div className="rounded-2xl border border-navy/10 bg-white p-5 text-sm text-navy/70 shadow-sm">
              <p className="font-semibold text-navy">The Problem</p>
              <p className="mt-2">
                Fear of wrong major choice + lack of research support.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                The Solution
              </p>
              <h3 className="mt-2 text-2xl font-semibold">Micro-projects</h3>
              <p className="mt-2 text-sm text-navy/70">
                Instead of a 1-year commitment, join a 1-month “Data Preprocessing”
                task and build real research skills faster.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white p-5 text-sm text-navy/70 shadow-sm">
                <p className="font-semibold text-navy">Students</p>
                <p className="mt-2">Experiment with labs by skill, not degree.</p>
              </div>
              <div className="rounded-2xl bg-white p-5 text-sm text-navy/70 shadow-sm">
                <p className="font-semibold text-navy">Professors</p>
                <p className="mt-2">Access vetted talent for foundational tasks.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                How It Works
              </p>
              <h2 className="text-3xl font-semibold">Four steps to impact</h2>
              <p className="text-base text-navy/70">
                A streamlined flow that keeps labs moving and students learning.
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm text-navy/60">
              <Sparkles className="h-4 w-4 text-accent" />
              LLM screening + quick interviews
            </div>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="group rounded-2xl border border-navy/10 bg-slate p-6 shadow-sm transition hover:-translate-y-1 hover:bg-white"
                >
                  <div className="flex items-center justify-between">
                    <Icon className="h-5 w-5 text-accent" />
                    <span className="text-xs font-semibold text-navy/40">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-navy/70">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Featured Projects
              </p>
              <h2 className="text-3xl font-semibold">
                Start with a focused micro-task
              </h2>
            </div>
            <button className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
              Browse more projects
              <Sparkles className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.title}
                className="flex h-full flex-col justify-between rounded-3xl border border-navy/10 bg-white p-6 shadow-sm"
              >
                <div className="space-y-4">
                  <span className="inline-flex w-fit items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                    {project.tag}
                  </span>
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <p className="text-sm text-navy/70">{project.lab}</p>
                </div>
                <div className="mt-6 space-y-2 text-sm text-navy/60">
                  <div className="flex items-center justify-between">
                    <span>Duration</span>
                    <span className="font-semibold text-navy">{project.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Skill</span>
                    <span className="font-semibold text-navy">{project.skill}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-navy py-12 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em]">
                  OpenLAB
                </p>
                <p className="text-xs text-white/60">Unbundling of Research</p>
              </div>
            </div>
            <p className="text-sm text-white/70">
              Credentialing through verified certificates and SaaS-based screening
              that makes research work accessible to everyone.
            </p>
          </div>
          <div className="grid gap-4 text-sm text-white/70 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <BadgeCheck className="mt-1 h-4 w-4 text-accent" />
              <div>
                <p className="font-semibold text-white">Credentialing</p>
                <p className="text-white/60">
                  Earn certificates tied to real lab outcomes.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <LineChart className="mt-1 h-4 w-4 text-accent" />
              <div>
                <p className="font-semibold text-white">SaaS Screening</p>
                <p className="text-white/60">
                  AI-backed skill matching for faster hiring.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-2 px-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© {year} OpenLAB. All rights reserved.</p>
          <p>Light Commitment, Heavy Impact.</p>
        </div>
      </footer>
    </div>
  );
}
