"use client";

import { useReveal } from "@/hooks/useScrollReveal";

const steps = [
  { n: "01", title: "Assessment", desc: "Understand your history, movement and symptoms — not a cookie-cutter intake form.", icon: "🔍" },
  { n: "02", title: "Diagnosis & Plan", desc: "Identify contributing factors and build a personalized treatment plan with you.", icon: "📋" },
  { n: "03", title: "Hands-on Treatment", desc: "Manual therapy, movement-based treatment and techniques matched to your condition.", icon: "💪" },
  { n: "04", title: "Home Program", desc: "Exercises, education and follow-ups to support long-term improvement and prevent recurrence.", icon: "🏠" },
];

export function HowItWorks() {
  const sectionRef = useReveal();

  return (
    <section className="bg-mesh-section px-6 md:px-22 py-14 md:py-22">
      <div ref={sectionRef} className="relative">
        <div className="flex flex-col gap-3 max-w-2xl mb-14">
          <span className="reveal text-[13px] font-bold tracking-[0.12em] uppercase text-primary">
            Treatment philosophy
          </span>
          <h2 className="reveal reveal-delay-1 font-display text-[28px] md:text-[38px] font-semibold text-ink leading-[1.15]">
            A clear plan from<br />
            <span className="text-primary">assessment to recovery.</span>
          </h2>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-[52px] left-[calc(8%+28px)] right-[calc(8%+28px)] h-[2px]" aria-hidden="true">
            <div className="w-full h-full bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200 rounded-full overflow-hidden">
              <div className="h-full w-full bg-gradient-to-r from-primary to-secondary" style={{ animation: "gradientShift 3s ease infinite", backgroundSize: "200% 100%" }} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
            {steps.map((s, i) => (
              <div
                key={s.n}
                className={`reveal reveal-delay-${i + 1} flex flex-col items-center text-center gap-4 relative`}
              >
                {/* Step circle with pulse ring */}
                <div className="relative">
                  <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-[0_8px_24px_rgba(13,148,136,0.25)] relative z-10">
                    <span className="font-display text-[22px] font-bold text-paper">{s.n}</span>
                  </div>
                  <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" style={{ animationDuration: "3s" }} />
                </div>

                <div className="flex flex-col gap-2 -mt-2">
                  <span className="text-[17px] font-semibold text-ink">{s.title}</span>
                  <span className="text-[14px] leading-relaxed text-ink/60 max-w-[220px]">{s.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
