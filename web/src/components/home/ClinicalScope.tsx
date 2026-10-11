"use client";

import { useReveal } from "@/hooks/useScrollReveal";
import { treatmentAreas } from "@/lib/data/doctor";

export function ClinicalScope() {
  const sectionRef = useReveal();

  return (
    <section className="bg-mesh-section px-6 md:px-22 py-14 md:py-20 overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[300px] bg-gradient-to-tr from-primary-200/15 to-transparent rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div ref={sectionRef} className="relative">
        <div className="flex flex-col gap-3 max-w-2xl mb-10">
          <span className="reveal text-[13px] font-bold tracking-[0.12em] uppercase text-primary">
            Conditions we treat
          </span>
          <h2 className="reveal reveal-delay-1 font-display text-[28px] md:text-[38px] font-semibold text-ink leading-[1.15]">
            Care across every stage<br />
            <span className="text-primary">of recovery.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {treatmentAreas.map((a, i) => (
            <div
              key={a.name}
              className={`reveal reveal-delay-${Math.min(i + 1, 5)} bg-white rounded-2xl p-6 md:p-7 border border-ink/8 card-hover group relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50/0 to-primary-50/0 group-hover:from-primary-50/80 group-hover:to-primary-100/40 transition-all duration-500" />
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-primary-50 group-hover:bg-primary flex items-center justify-center mb-3.5 transition-all duration-300">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-primary group-hover:text-white transition-colors">
                    <path d="M4 14c2-6 4-9 8-9s6 3 8 9" />
                    <path d="M4 14c0 3.5 3.5 6 8 6s8-2.5 8-6" />
                  </svg>
                </div>
                <span className="text-[16px] font-semibold text-ink group-hover:text-primary transition-colors">{a.name}</span>
                <span className="text-[13.5px] text-ink/55 mt-1.5 leading-relaxed block">{a.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
