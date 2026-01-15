import { motion, useReducedMotion, useScroll } from "framer-motion";
import {
  AlarmClock,
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  Compass,
  ShieldOff,
  Target,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import CTAButton from "../components/CTAButton";
import Section from "../components/Section";
import SprintCard from "../components/SprintCard";
import Timeline from "../components/Timeline";
import RubricGrid from "../components/RubricGrid";
import ScrollReveal from "../components/ScrollReveal";
import { sprints } from "../data/sprints";

export default function Home() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const solutionSteps = [
    {
      title: "과제 제시",
      description: "기업이 해결해야 할 실제 업무를 명확한 과제로 정의합니다.",
    },
    {
      title: "팀 구성",
      description: "전공을 가리지 않고 팀이 구성되어 다양한 시각을 만듭니다.",
    },
    {
      title: "집중 실행",
      description: "짧은 기간 몰입해 실행과 결과를 빠르게 확인합니다.",
    },
    {
      title: "검증된 결과",
      description: "루브릭 기반 평가로 실력과 협업을 검증합니다.",
    },
    {
      title: "채용 연결",
      description: "성과가 입증된 팀에게 인턴십 제안을 연결합니다.",
    },
  ];

  const workSteps = [
    {
      title: "Challenge 게시",
      description: "범위, 산출물, 평가 기준을 정의합니다.",
    },
    {
      title: "팀 지원",
      description: "교차 전공 팀이 지원하고 스프린트에 합류합니다.",
    },
    {
      title: "Sprint Week",
      description: "협업과 체크포인트로 집중 실행을 관리합니다.",
    },
    {
      title: "Demo Day",
      description: "루브릭으로 실행력과 완성도를 평가합니다.",
    },
    {
      title: "Hire & Onboard",
      description: "우수 팀에게 인턴십을 제안합니다.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
      transition={{ duration: reduceMotion ? 0 : 0.5 }}
      className="bg-mist"
    >
      <motion.div
        className="fixed left-0 top-0 z-50 h-[3px] w-full origin-left bg-accent"
        style={{ scaleX: scrollYProgress }}
      />

      <section className="relative overflow-hidden bg-night py-20 text-white md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(45,212,255,0.15),transparent_55%)]" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-6">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.4em] text-slate">
              Hiring Sprint
            </div>
            <h1 className="mt-6 text-4xl font-semibold leading-tight md:text-6xl">
              실무 과제로 검증하는 채용, Hiring Sprint
            </h1>
            <p className="mt-6 max-w-2xl text-base text-slate md:text-lg">
              지원자는 짧게 몰입해 결과로 증명하고, 기업은 채용 리스크 없이 검증된
              인재와 결과물을 받습니다.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <CTAButton to="/company/create">Hiring Sprint 시작하기</CTAButton>
              <CTAButton to="/sprints" variant="secondary">
                Sprint 참여하기
              </CTAButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Section
        eyebrow="Problem"
        title="스타트업이 겪는 채용 문제"
        subtitle="반복적이지만 중요한 일, 그리고 느린 채용 사이에서 팀이 지칩니다."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: <AlarmClock className="h-5 w-5 text-accent" />,
              title: "중요하지만 반복적인 업무 병목",
              description: "운영/분석 업무가 쌓이고 핵심 팀은 집중하지 못합니다.",
            },
            {
              icon: <ShieldOff className="h-5 w-5 text-accent" />,
              title: "정규 채용은 무겁고 인턴은 관리 부담",
              description: "리스크를 줄이려 하지만 검증 비용이 커집니다.",
            },
            {
              icon: <Briefcase className="h-5 w-5 text-accent" />,
              title: "서류 중심 필터는 실행을 증명 못함",
              description: "전공/경력 키워드만으로 실무 실행을 판단하기 어렵습니다.",
            },
          ].map((item) => (
            <ScrollReveal key={item.title}>
              <div className="rounded-2xl border border-ink/10 bg-white/90 p-6 shadow-[0_30px_80px_-60px_rgba(10,15,31,0.5)]">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                    {item.icon}
                  </span>
                  <p className="text-sm font-semibold text-ink">{item.title}</p>
                </div>
                <p className="mt-4 text-sm text-ink/70">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Solution"
        title="Hiring Sprint 방식"
        subtitle="결과로 증명하고, 팀워크까지 확인하는 초단기 검증 프로세스"
        className="bg-white"
      >
        <Timeline steps={solutionSteps} />
      </Section>

      <Section
        eyebrow="How It Works"
        title="5단계로 움직이는 스프린트"
        subtitle="짧고 집중된 주기를 통해 실력을 검증합니다."
      >
        <Timeline steps={workSteps} />
      </Section>

      <Section
        eyebrow="What You Get"
        title="기업과 지원자 모두의 성과"
        subtitle="검증된 실행력은 기업과 인재 모두에게 이익이 됩니다."
        className="bg-white"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <ScrollReveal>
            <div className="rounded-2xl border border-ink/10 bg-white/90 p-6">
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-accent" />
                <h3 className="text-lg font-semibold text-ink">기업이 얻는 것</h3>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-ink/70">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accentStrong" />
                  검증된 인재를 빠르게 확보
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accentStrong" />
                  즉시 활용 가능한 결과물 확보
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accentStrong" />
                  채용 리스크 및 시간 비용 감소
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accentStrong" />
                  팀워크까지 검증된 결정
                </li>
              </ul>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="rounded-2xl border border-ink/10 bg-white/90 p-6">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-accent" />
                <h3 className="text-lg font-semibold text-ink">지원자가 얻는 것</h3>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-ink/70">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accentStrong" />
                  실제 업무에 가까운 경험
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accentStrong" />
                  포트폴리오로 쓰는 결과물
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accentStrong" />
                  루브릭 기반 피드백
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accentStrong" />
                  인턴십 제안 기회
                </li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      <Section
        eyebrow="Featured"
        title="Featured Sprints"
        subtitle="샘플 데이터입니다. 실제 스프린트는 곧 오픈됩니다."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {sprints.slice(0, 4).map((sprint) => (
            <ScrollReveal key={sprint.id}>
              <SprintCard sprint={sprint} />
            </ScrollReveal>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Rubric"
        title="평가 루브릭"
        subtitle="서류보다 결과 중심으로 판단합니다."
        className="bg-white"
      >
        <RubricGrid
          items={[
            "Execution Speed",
            "Clarity of Thinking",
            "Collaboration",
            "Deliverable Quality",
            "Practicality",
          ]}
        />
        <p className="text-sm text-ink/60">서류보다 결과 중심 평가</p>
      </Section>

      <Section
        eyebrow="Trust"
        title="신뢰를 만드는 요소"
        subtitle="파일럿 단계에서 빠르게 검증할 수 있도록 설계했습니다."
      >
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
          <ScrollReveal>
            <div className="rounded-2xl border border-ink/10 bg-white/90 p-6">
              <div className="flex items-center gap-3">
                <Compass className="h-5 w-5 text-accent" />
                <p className="text-lg font-semibold text-ink">Pilot-ready</p>
              </div>
              <p className="mt-3 text-sm text-ink/70">
                첫 스프린트부터 명확한 목표와 산출물을 제시합니다.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3 text-xs text-ink/50">
                <div className="rounded-lg border border-ink/10 px-3 py-2 text-center">
                  Logo
                </div>
                <div className="rounded-lg border border-ink/10 px-3 py-2 text-center">
                  Logo
                </div>
                <div className="rounded-lg border border-ink/10 px-3 py-2 text-center">
                  Logo
                </div>
              </div>
              <p className="mt-4 text-xs text-ink/50">B2B partners (coming soon)</p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="rounded-2xl border border-ink/10 bg-white/90 p-6">
              <p className="text-sm font-semibold text-ink">FAQ</p>
              <div className="mt-4 space-y-4 text-sm text-ink/70">
                <div>
                  <p className="font-semibold text-ink">비용 구조는 어떻게 되나요?</p>
                  <p>파일럿 단계 기준으로 협의 중입니다.</p>
                </div>
                <div>
                  <p className="font-semibold text-ink">과제 범위는 어떻게 정하나요?</p>
                  <p>해결하고 싶은 병목을 기준으로 스코프를 설계합니다.</p>
                </div>
                <div>
                  <p className="font-semibold text-ink">지원자는 어떻게 팀을 구성하나요?</p>
                  <p>전공/직무 교차 팀을 기본 원칙으로 안내합니다.</p>
                </div>
                <div>
                  <p className="font-semibold text-ink">결과물 권한과 사용 범위는?</p>
                  <p>정책 문서를 준비 중입니다.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      <section className="bg-night py-16 text-white md:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-2xl font-semibold">기업을 위한 Sprint</h3>
            <p className="mt-4 text-sm text-slate">
              실무 과제로 검증된 인재와 결과물을 동시에 확보하세요.
            </p>
            <CTAButton to="/company/create" className="mt-6">
              Start a Hiring Sprint
              <ArrowUpRight className="h-4 w-4" />
            </CTAButton>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-2xl font-semibold">지원자를 위한 Sprint</h3>
            <p className="mt-4 text-sm text-slate">
              짧은 기간 집중해서 실력을 증명하고 인턴십 기회를 얻으세요.
            </p>
            <CTAButton to="/sprints" variant="secondary" className="mt-6">
              Sprint 참여하기
              <ArrowUpRight className="h-4 w-4" />
            </CTAButton>
          </div>
        </div>
      </section>

      <footer className="bg-night py-10 text-slate">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 text-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-white">Sprint</p>
            <p className="text-xs text-slate">contact@sprint.ai (placeholder)</p>
          </div>
          <div className="flex flex-wrap gap-4 text-xs">
            <Link to="/terms" className="hover:text-white">
              Terms
            </Link>
            <Link to="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <span>&copy; 2026 Sprint</span>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
