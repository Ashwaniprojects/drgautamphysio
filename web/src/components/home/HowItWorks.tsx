"use client";

import { useReveal } from "@/hooks/useScrollReveal";

const steps = [
  {
    n: "01",
    title: "Assessment",
    desc: "Your history, movement patterns, and symptoms — evaluated individually, not from a checklist.",
  },
  {
    n: "02",
    title: "Diagnosis & Plan",
    desc: "Identifying the root cause and building a treatment plan designed around your goals.",
  },
  {
    n: "03",
    title: "Treatment",
    desc: "Manual therapy, movement-based techniques, and specialized approaches matched to your condition.",
  },
  {
    n: "04",
    title: "Recovery Program",
    desc: "Home exercises, education, and follow-ups for lasting improvement and prevention.",
  },
];

export function HowItWorks() {
  const sectionRef = useReveal();

  return (
    <section className="bg-paper px-6 md:px-22 py-20 md:py-28">
      <div ref={sectionRef} className="relative">
        <div className="flex flex-col gap-3 max-w-2xl mb-16">
          <span className="reveal text-[12px] font-bold tracking-[0.14em] uppercase text-primary">
            How it works
          </span>
          <h2 className="reveal reveal-delay-1 font-display text-[36px] md:text-[48px] font-bold text-ink leading-[1.1]">
            From first visit to<br />
            <span className="text-primary italic">full recovery.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/6 rounded-2xl overflow-hidden">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className={`reveal reveal-delay-${i + 1} bg-white p-7 md:p-8 flex flex-col gap-4 group hover:bg-paper-warm transition-colors duration-300`}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-3xl text-primary/20 group-hover:text-primary/40 transition-colors">
                  {s.n}
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink/15 group-hover:text-primary transition-colors">
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </div>
              <h3 className="text-[17px] font-semibold text-ink">{s.title}</h3>
              <p className="text-[13.5px] leading-relaxed text-ink/55">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
