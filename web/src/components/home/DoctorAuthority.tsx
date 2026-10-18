"use client";

import { useReveal } from "@/hooks/useScrollReveal";
import Link from "next/link";
import { doctor } from "@/lib/data/doctor";
import { ArrowRightIcon } from "@/components/icons";
import { useCountUp } from "@/hooks/useCountUp";

function StatBlock({ end, suffix, label, delay }: { end: number; suffix: string; label: string; delay: number }) {
  const count = useCountUp({ end, duration: 2500, suffix, delay });
  return (
    <div className="flex flex-col items-center text-center">
      <span ref={count.ref} className="font-display text-5xl md:text-6xl text-ink leading-none">
        {count.count}
      </span>
      <span className="text-[13px] text-ink/50 mt-2 max-w-[160px]">{label}</span>
    </div>
  );
}

export function DoctorAuthority() {
  const sectionRef = useReveal();

  return (
    <section className="relative bg-mesh-section px-6 md:px-22 py-20 md:py-28 overflow-hidden">
      <div ref={sectionRef} className="relative">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-6 mb-16 pb-16 border-b border-ink/8">
          <StatBlock end={18} suffix="+" label="Years in clinical practice" delay={0} />
          <StatBlock end={12} suffix="+" label="Awards at conferences" delay={0.2} />
          <StatBlock end={729} suffix="+" label="Verified patient reviews" delay={0.4} />
        </div>

        {/* Bio and credentials */}
        <div className="flex flex-col lg:flex-row gap-14 lg:gap-20">
          <div className="flex-1 flex flex-col gap-6">
            <span className="reveal text-[12px] font-bold tracking-[0.14em] uppercase text-primary">
              About the doctor
            </span>
            <h2 className="reveal reveal-delay-1 font-display text-[32px] md:text-[44px] font-bold text-ink leading-[1.15]">
              A career built on<br />
              <span className="text-primary italic">advanced expertise.</span>
            </h2>
            <p className="reveal reveal-delay-2 text-[15px] text-ink/60 leading-relaxed max-w-lg">
              {doctor.fullName} {doctor.suffix} is the founder and director of Dr. Gautam&apos;s Physio &amp; Rehab
              Centre. He leads the physiotherapy department at Neera Hospital and consults at Medox
              Hospital, bringing together physiotherapy, chiropractic, and osteopathic care in one practice.
            </p>
            <p className="reveal reveal-delay-2 text-[15px] text-ink/60 leading-relaxed max-w-lg">
              State Treasurer of the Indian Association of Physiotherapists (IAP), Uttar Pradesh.
              Session chairperson and judge at multiple national physiotherapy conferences.
            </p>
            <Link href="/about" className="reveal reveal-delay-3 inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:gap-2.5 transition-all">
              Full qualifications &amp; career <ArrowRightIcon size={14} />
            </Link>
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {doctor.headlineCredentials.map((c, i) => (
                <div
                  key={c.label}
                  className={`reveal reveal-delay-${Math.min(i + 1, 5)} bg-white rounded-xl p-5 border border-ink/6 hover:border-primary/20 hover:shadow-sm transition-all duration-300 group`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary transition-all">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary group-hover:text-white transition-colors">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <path d="M22 4L12 14.01l-3-3" />
                      </svg>
                    </span>
                    <div>
                      <span className="text-[14px] font-semibold text-ink leading-snug block">{c.label}</span>
                      {c.detail && <span className="text-[12px] text-ink/50 block mt-0.5">{c.detail}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
