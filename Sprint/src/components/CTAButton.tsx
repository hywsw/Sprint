import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type CTAButtonProps = {
  to: string;
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
  className?: string;
};

const variants = {
  primary: "bg-accent text-ink shadow-glow hover:bg-accentStrong",
  secondary: "border border-white/20 text-white hover:border-white/40",
  ghost: "border border-ink/20 text-ink hover:border-ink/40",
};

export default function CTAButton({
  to,
  variant = "primary",
  children,
  className = "",
}: CTAButtonProps) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition hover:-translate-y-0.5 ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
