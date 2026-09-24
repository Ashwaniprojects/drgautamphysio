const steps = [
  { n: "01", title: "Assessment", desc: "A full history and hands-on physical exam, not a cookie-cutter intake form." },
  { n: "02", title: "Diagnosis & Plan", desc: "A specific treatment plan and realistic timeline, explained in plain language." },
  { n: "03", title: "Hands-on Sessions", desc: "Manual therapy delivered by Dr. Gautam himself, tracked visit to visit." },
  { n: "04", title: "Home Program & Recall", desc: "A home routine plus a check-in so recovery doesn't stall after you feel better." },
];

export function HowItWorks() {
  return (
    <section className="bg-paper px-6 md:px-22 py-14 md:py-22">
      <div className="flex flex-col gap-2.5 max-w-2xl mb-12">
        <span className="text-[13px] font-bold tracking-[0.12em] uppercase text-primary">
          How treatment works
        </span>
        <h2 className="font-display text-[28px] md:text-[36px] font-semibold text-ink">
          A clear plan from the first visit, not a guessing game
        </h2>
      </div>

      <div className="relative flex flex-col md:flex-row gap-8 md:gap-0">
        <div className="hidden md:block absolute top-8 left-16 right-16 h-0.5 bg-primary/20" />
        {steps.map((s) => (
          <div key={s.n} className="flex md:flex-1 md:flex-col items-start md:items-center gap-4 md:gap-4 md:text-center md:px-6">
            <div className="w-16 h-16 rounded-full bg-primary text-paper flex items-center justify-center font-display text-[22px] font-semibold relative z-10 shrink-0">
              {s.n}
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[17px] font-semibold text-ink">{s.title}</span>
              <span className="text-[14.5px] leading-relaxed text-ink/65">{s.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
