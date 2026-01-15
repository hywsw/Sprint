import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import CTAButton from "../components/CTAButton";

export default function Intro() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative min-h-screen overflow-hidden bg-night text-white">
      <div className="absolute inset-0">
        <motion.div
          className="absolute -left-32 -top-24 h-72 w-72 rounded-full bg-accent/30 blur-[120px]"
          animate={
            reduceMotion ? undefined : { x: [0, 40, -20], y: [0, 20, -10] }
          }
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[-10%] top-10 h-80 w-80 rounded-full bg-white/10 blur-[140px]"
          animate={
            reduceMotion ? undefined : { x: [0, -30, 20], y: [0, 30, -20] }
          }
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(45,212,255,0.12),transparent_55%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center gap-12 px-6 py-16">
        <Link className="self-end text-xs text-slate underline" to="/home">
          Skip intro
        </Link>
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.4em] text-slate">
            <Sparkles className="h-4 w-4 text-accent" />
            Hiring Sprint
          </div>
          <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
            Stop screening. <br />
            Start sprinting.
          </h1>
          <p className="max-w-2xl text-base text-slate md:text-lg">
            서류는 느리고, 실무는 급합니다. Sprint는 짧은 집중 스프린트로 실행력을
            증명하고, 결과물로 채용 리스크를 줄입니다.
          </p>
          <div className="grid gap-4 text-sm text-slate md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              채용은 늦고 리스크는 큽니다.
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              이력서로는 실행을 검증할 수 없습니다.
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              스프린트로 결과와 팀워크를 증명합니다.
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, delay: 0.1 }}
          className="flex flex-wrap gap-4"
        >
          <CTAButton to="/company/create">Start a Hiring Sprint</CTAButton>
          <CTAButton to="/sprints" variant="secondary">
            Join a Sprint
          </CTAButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, delay: 0.2 }}
          className="flex items-center gap-4"
        >
          <Link
            to="/home"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent"
          >
            Enter Sprint
            <ArrowRight className="h-4 w-4" />
          </Link>
          <span className="text-xs text-slate">/ 메인 랜딩으로 이동</span>
        </motion.div>
      </div>
    </div>
  );
}
