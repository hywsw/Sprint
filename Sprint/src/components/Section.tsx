import type { ReactNode } from "react";

type SectionProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

export default function Section({
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
}: SectionProps) {
  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6">
        {(eyebrow || title || subtitle) && (
          <div className="max-w-3xl space-y-4">
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
                {eyebrow}
              </p>
            )}
            {title && <h2 className="text-3xl font-semibold text-ink md:text-4xl">{title}</h2>}
            {subtitle && <p className="text-base text-ink/70 md:text-lg">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
