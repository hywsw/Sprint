import { NavLink, Link } from "react-router-dom";
import { ArrowUpRight, Zap } from "lucide-react";

export default function TopNav() {
  const navItems = [
    { label: "메인", to: "/home" },
    { label: "스프린트", to: "/sprints" },
    { label: "기업 대시보드", to: "/company" },
    { label: "스프린트 만들기", to: "/company/create" },
    { label: "지원하기", to: "/apply" },
  ];

  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-night/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-4 px-6 py-5 md:flex-row md:flex-nowrap md:items-center md:justify-between md:gap-6">
        <Link className="flex items-center gap-3 md:flex-shrink-0" to="/home">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent">
            <Zap className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <p className="text-xl font-semibold tracking-[0.2em] text-white">SPRINT</p>
            <p className="whitespace-nowrap text-xs text-slate">Stop screening. Start sprinting.</p>
          </div>
        </Link>
        <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate md:flex-1 md:justify-center md:gap-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-full px-4 py-2 transition ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-slate hover:bg-white/10 hover:text-white"
                }`
              }
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex flex-col gap-2 text-sm font-semibold text-slate md:flex-shrink-0 md:items-end md:self-center">
          <div className="flex items-center gap-3 md:gap-4">
            <Link
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-white transition hover:border-white/40"
              to="/apply"
            >
              지원하기
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-ink shadow-glow transition hover:-translate-y-0.5 hover:bg-accentStrong"
              to="/company/create"
            >
              Hiring Sprint 시작
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
