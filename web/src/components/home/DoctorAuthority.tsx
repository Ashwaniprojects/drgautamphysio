"use client";

import { useReveal } from "@/hooks/useScrollReveal";
import Link from "next/link";
import { doctor } from "@/lib/data/doctor";
import { ArrowRightIcon, StarIcon } from "@/components/icons";

const stats = [
  { value: "18+", label: "Years of practice since 2008", icon: "📅" },
  { value: "10+", label: "Awards at national & international conferences", icon: "🏆" },
  { value: "729+", label: "Verified Google reviews across 3 clinics", icon: "⭐" },
];

export function DoctorAuthority() {
  const sectionRef = useReveal();

  return (
    <section className="relative bg-mesh-section px-6 md:px-22 py-14 md:py-20 overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-primary-200/20 to-transparent rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div ref={sectionRef} className="relative">
        {/* Header */}
        <div className="flex flex-col gap-2.5 max-w-2xl mb-12">
          <span className="reveal text-[13px] font-bold tracking-[0.12em] uppercase text-primary">
            Expertise
          </span>
          <h2 className="reveal reveal-delay-1 font-display text-[26px] md:text-[36px] font-semibold text-ink leading-[1.15]">
            Expertise built through<br />
            advanced training &amp; experience
          </h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {stats.map((s, i) => (
            <div
              key={s.value}
              className={`reveal reveal-delay-${i + 1} gradient-border p-6 flex flex-col gap-2 bg-paper`}
            >
              <span className="font-display text-[28px] font-bold text-primary">{s.value}</span>
              <span className="text-sm text-ink/60 leading-relaxed">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Credentials grid */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
          {/* Left: About text */}
          <div className="flex-1 flex flex-col gap-5">
            <div className="reveal bg-white rounded-2xl p-6 md:p-8 border border-ink/8 shadow-sm">
              <h3 className="font-display text-xl font-semibold text-ink mb-3">
                {doctor.fullName} {doctor.suffix}
              </h3>
              <p className="text-sm text-ink/60 leading-relaxed mb-4">
                {doctor.title}. Founder and Director of Dr. Gautam&apos;s Physio & Rehab Centre.
                State Treasurer, Indian Association of Physiotherapists (IAP), Uttar Pradesh.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["FOMT", "FNT", "FDM", "FNMT", "CST", "Dry Needling"].map((cert) => (
                  <span key={cert} className="text-[11px] font-bold tracking-[0.06em] uppercase bg-primary-50 text-primary-800 px-3 py-1.5 rounded-full border border-primary-200/60">
                    {cert}
                  </span>
                ))}
              </div>
              <Link href="/about" className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:gap-2.5 transition-all">
                Full qualifications & awards <ArrowRightIcon size={14} />
              </Link>
            </div>
          </div>

          {/* Right: Credential cards */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
            {doctor.headlineCredentials.map((c, i) => (
              <div
                key={c.label}
                className={`reveal reveal-delay-${Math.min(i + 1, 5)} bg-white rounded-2xl p-5 border border-ink/8 hover:border-primary/20 transition-all duration-300 group`}
              >
                <span className="text-[14px] font-semibold text-ink leading-snug group-hover:text-primary transition-colors">{c.label}</span>
                {c.detail && <span className="text-sm text-ink/50 mt-1 block">{c.detail}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
