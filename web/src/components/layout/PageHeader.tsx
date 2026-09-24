import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="bg-tint px-6 md:px-22 py-10 md:py-14 flex flex-col gap-3">
      <span className="text-[13px] font-bold tracking-[0.12em] uppercase text-primary">{eyebrow}</span>
      <h1 className="font-display text-[28px] md:text-[40px] font-semibold text-ink leading-[1.15]">{title}</h1>
      {children && <p className="text-[15px] md:text-base text-ink/65 max-w-2xl">{children}</p>}
    </div>
  );
}
