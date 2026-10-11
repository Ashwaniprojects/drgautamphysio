"use client";

import { useReveal } from "@/hooks/useScrollReveal";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { treatments } from "@/lib/data/treatments";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export function TreatmentsGrid() {
  const sectionRef = useReveal();
  const ctaRef = useReveal({ threshold: 0.2 });

  return (
    <section id="treatments" className="bg-paper px-6 md:px-22 py-14 md:py-22">
      <div ref={sectionRef}>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div className="flex flex-col gap-3 max-w-2xl">
            <span className="reveal text-[13px] font-bold tracking-[0.12em] uppercase text-primary">
              Advanced techniques
            </span>
            <h2 className="reveal reveal-delay-1 font-display text-[28px] md:text-[38px] font-semibold text-ink leading-[1.15]">
              Personalized to your condition,<br />
              <span className="text-primary">not applied by default.</span>
            </h2>
            <p className="reveal reveal-delay-2 text-[15px] text-ink/60 leading-relaxed">
              Selected at assessment, based on what you actually need. Dr. Gautam draws from these eleven approaches.
            </p>
          </div>
          <Link href="/treatments" className="reveal reveal-delay-2 inline-flex items-center gap-1.5 text-primary text-[15px] font-semibold shrink-0 hover:gap-2.5 transition-all">
            See all techniques <ArrowRightIcon size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-8">
          {treatments.map((t, i) => (
            <div
              key={t.name}
              className={`reveal reveal-delay-${Math.min(i % 5 + 1, 5)} card-hover bg-white rounded-2xl p-5 md:p-6 border border-ink/8 group`}
            >
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <span className="text-lg">🏥</span>
              </div>
              <span className="text-[15px] md:text-base font-semibold text-ink group-hover:text-primary transition-colors leading-snug">{t.name}</span>
              <span className="text-[13px] text-ink/50 mt-1.5 leading-relaxed">{t.description}</span>
            </div>
          ))}
        </div>

        {/* Home visit CTA */}
        <div ref={ctaRef} className="reveal">
          <div className="gradient-border bg-paper p-6 md:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M3 10.5L12 4l9 6.5" />
                  <path d="M5 9.5V20h14V9.5" />
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[15px] md:text-[16px] font-semibold text-ink">Can&apos;t travel? Ask about Physio Home Visits.</span>
                <span className="text-sm text-ink/55">Available across Lucknow for select conditions.</span>
              </div>
            </div>
            <WhatsAppButton className="shrink-0" />
          </div>
        </div>
      </div>
    </section>
  );
}
