"use client";

import { useReveal } from "@/hooks/useScrollReveal";
import Link from "next/link";
import { ConditionIcon } from "@/components/ConditionIcon";
import { ArrowRightIcon } from "@/components/icons";
import { conditions } from "@/lib/data/conditions";

export function SymptomTiles() {
  const sectionRef = useReveal();

  return (
    <section id="conditions" className="relative bg-paper px-6 md:px-22 py-14 md:py-22 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, var(--color-primary) 1px, transparent 0)", backgroundSize: "32px 32px" }}
      />

      <div ref={sectionRef} className="relative">
        <div className="flex flex-col gap-3 max-w-2xl mb-10">
          <span className="reveal text-[13px] font-bold tracking-[0.12em] uppercase text-primary">
            What brings you here
          </span>
          <h2 className="reveal reveal-delay-1 font-display text-[28px] md:text-[38px] font-semibold text-ink leading-[1.15]">
            Tell us where it hurts.<br />
            <span className="text-primary">We&apos;ll show you the path back.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {conditions.map((c, i) => (
            <Link
              key={c.slug}
              href={`/conditions/${c.slug}`}
              className={`reveal reveal-delay-${Math.min(i + 1, 5)} card-hover bg-white rounded-2xl p-5 md:p-6 flex flex-col gap-3.5 border border-ink/8 group`}
            >
              <span className="w-12 h-12 rounded-[14px] bg-primary-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <ConditionIcon icon={c.icon} />
              </span>
              <span className="text-[15px] md:text-base font-semibold text-ink group-hover:text-primary transition-colors">{c.title}</span>
              <ArrowRightIcon size={14} className="text-ink/20 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Link>
          ))}

          <Link
            href="/conditions"
            className={`reveal reveal-delay-5 bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-5 md:p-6 flex flex-col justify-center gap-2.5 text-paper hover:shadow-[0_12px_40px_rgba(13,148,136,0.3)] transition-all duration-300`}
          >
            <span className="text-[15px] md:text-base font-semibold">Not sure what&apos;s wrong?</span>
            <span className="inline-flex items-center gap-1.5 text-paper/90 text-sm font-semibold">
              View all conditions <ArrowRightIcon size={14} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
