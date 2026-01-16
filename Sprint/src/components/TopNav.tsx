import { NavLink, Link } from "react-router-dom";
import { Zap } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function TopNav() {
  const { auth, logout } = useAuth();
  const navItems =
    auth.role === "company"
      ? [
          { label: "메인", to: "/home" },
          { label: "스프린트", to: "/sprints" },
          { label: "기업 대시보드", to: "/company" },
          { label: "스프린트 만들기", to: "/company/create" },
          { label: "커뮤니티", to: "/community" },
          { label: "resume screening", to: "/resume-screener" },
        ]
      : [
          { label: "메인", to: "/home" },
          { label: "스프린트", to: "/sprints" },
          { label: "지원하기", to: "/apply" },
          { label: "커뮤니티", to: "/community" },
          { label: "resume screening", to: "/resume-screener" },
        ];

  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-night/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-4 px-6 py-5 md:flex-row md:flex-nowrap md:items-center md:justify-between md:gap-6">
        <Link className="flex items-center gap-3 md:flex-shrink-0" to="/home">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent">
            <Zap className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-semibold tracking-[0.18em] text-white">SPRINT</p>
            <p className="whitespace-nowrap text-xs text-slate">Stop screening. Start sprinting.</p>
          </div>
        </Link>
        <nav className="flex w-full flex-wrap items-center gap-2 text-[13px] font-semibold text-slate md:flex-1 md:justify-between md:gap-0 md:px-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              end={item.to === "/company"}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-full px-3 py-1.5 transition ${
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
            {auth.isLoggedIn ? (
              <>
                <span className="rounded-full border border-white/15 px-3 py-2 text-xs text-white/70">
                  {auth.role === "company" ? "기업" : "학생"} / {auth.userId}
                </span>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-white transition hover:border-white/40"
                  onClick={logout}
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-white transition hover:border-white/40"
                  to="/login"
                >
                  로그인
                </Link>
                <Link
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-ink shadow-glow transition hover:-translate-y-0.5 hover:bg-accentStrong"
                  to="/signup"
                >
                  회원가입
                </Link>
              </>
            )}
          </div>
          <Link
            className="inline-flex w-full items-center justify-center rounded-full border border-white/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.28em] text-white/60 transition hover:border-white/25 hover:text-white"
            to="/mypage"
          >
            마이페이지
          </Link>
        </div>
      </div>
    </div>
  );
}
