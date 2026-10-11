"use client";

import Link from "next/link";
import { ArrowRightIcon, StarIcon } from "@/components/icons";
import { doctor } from "@/lib/data/doctor";
import { ScrollReveal } from "@/components/ScrollReveal";

export function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative bg-gradient-to-b from-primary-50 to-tint px-6 md:px-22 py-10 md:py-14 overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-primary-200/20 to-transparent rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <ScrollReveal>
        <div className="relative flex flex-col gap-3">
          <span className="text-[13px] font-bold tracking-[0.12em] uppercase text-primary">{eyebrow}</span>
          <h1 className="font-display text-[28px] md:text-[42px] font-semibold text-ink leading-[1.12]">{title}</h1>
          {children && <p className="text-[15px] md:text-base text-ink/60 max-w-2xl leading-relaxed">{children}</p>}
        </div>
      </ScrollReveal>
    </div>
  );
}
