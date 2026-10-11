"use client";

import { useReveal } from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { StarIcon, ArrowRightIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";
import { doctor } from "@/lib/data/doctor";
import { useCountUp } from "@/hooks/useCountUp";

function AnimatedShape({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <div
      className={`absolute rounded-full opacity-[0.07] ${className}`}
      style={{ animationDelay: `${delay}s` }}
    />
  );
}

export function Hero() {
  const heroRef = useReveal({ once: true });
  const statsRef = useReveal({ once: true, threshold: 0.3 });
  const rating = useCountUp({ end: 5, duration: 2000 });
  const count729 = useCountUp({ end: 729, duration: 2500, suffix: "+" });

  return (
    <section className="relative overflow-hidden bg-mesh-hero px-6 md:px-22 py-14 md:py-24">
      {/* Decorative shapes */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <AnimatedShape className="shape-float w-[300px] h-[300px] bg-primary -top-20 -right-20" delay={0} />
        <AnimatedShape className="shape-float-delayed w-[200px] h-[200px] bg-secondary top-1/3 -left-10" delay={1} />
        <AnimatedShape className="shape-float-slow w-[150px] h-[150px] bg-primary bottom-10 right-1/4" delay={0.5} />

        {/* Abstract spine/body illustration using CSS */}
        <div className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2 w-[280px] h-[360px] opacity-[0.06]">
          <svg viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full shape-float">
            <path d="M100 20 L100 280" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary"/>
            <ellipse cx="100" cy="50" rx="50" ry="35" stroke="currentColor" strokeWidth="2.5" className="text-primary"/>
            <ellipse cx="100" cy="110" rx="45" ry="30" stroke="currentColor" strokeWidth="2.5" className="text-primary"/>
            <ellipse cx="100" cy="165" rx="42" ry="28" stroke="currentColor" strokeWidth="2.5" className="text-primary"/>
            <ellipse cx="100" cy="220" rx="38" ry="25" stroke="currentColor" strokeWidth="2.5" className="text-primary"/>
            <circle cx="100" cy="270" r="15" stroke="currentColor" strokeWidth="2.5" className="text-primary"/>
          </svg>
        </div>
      </div>

      <div ref={heroRef} className="relative flex flex-col lg:flex-row items-center gap-12 lg:gap-18">
        <div className="flex-1 flex flex-col gap-6 max-w-xl">
          <span className="reveal text-[13px] font-bold tracking-[0.12em] uppercase text-primary">
            Physiotherapy &amp; Rehabilitation, Lucknow
          </span>

          <h1 className="reveal reveal-delay-1 font-display text-[36px] md:text-[52px] lg:text-[58px] font-semibold leading-[1.08] text-ink">
            Move better.<br />
            Feel stronger.<br />
            <span className="text-primary">Live free.</span>
          </h1>

          <p className="reveal reveal-delay-2 text-[16px] md:text-[18px] leading-[1.7] text-ink/65 max-w-[480px]">
            Personalized physiotherapy, chiropractic &amp; osteopathic care by{" "}
            <strong className="text-ink/85">{doctor.name} {doctor.suffix}</strong>,
            helping patients manage pain, improve movement and return to everyday life.
          </p>

          <div className="reveal reveal-delay-3 flex flex-wrap items-center gap-3.5 mt-1">
            <Button href="/book" className="btn-glow !px-8 !py-4.5 !text-base">
              Book Appointment
            </Button>
            <WhatsAppButton className="!px-6 !py-3.5" />
          </div>

          {/* Doctor proof line */}
          <div className="reveal reveal-delay-4 flex flex-col gap-1.5 mt-3 pt-5 border-t border-ink/10">
            <span className="text-sm font-semibold text-ink">
              {doctor.name} {doctor.suffix}, {doctor.title}
            </span>
            <span className="text-[13px] text-ink/50">
              {doctor.yearsExperience} years in practice &middot; Ph.D. Scholar &middot; FOMT Australia
            </span>
          </div>

          {/* Animated stats */}
          <div ref={statsRef} className="reveal reveal-delay-5 flex items-center gap-5 mt-2">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-primary/60 tracking-[0.05em] uppercase">Rated</span>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} size={14} className="text-accent" />
                ))}
              </div>
            </div>
            <div className="h-4 w-px bg-ink/10" />
            <div className="flex flex-col">
              <span className="flex items-baseline gap-1">
                <span ref={rating.ref} className="font-display text-lg font-semibold text-ink stat-number">
                  {rating.count}
                </span>
                <span className="text-xs text-ink/50">/5</span>
              </span>
              <span className="text-[12px] text-ink/50">
                {siteConfig.googleReviewCount}+ verified reviews
              </span>
            </div>
          </div>
        </div>

        {/* Abstract figure */}
        <div className="lg:flex-1 shrink-0 relative w-full max-w-[480px] h-[320px] md:h-[420px] lg:h-[460px]">
          {/* Main decorative circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[280px] h-[280px] md:w-[340px] md:h-[340px] rounded-full bg-gradient-to-br from-primary-100 via-primary-200/60 to-primary-300/30 shape-float" />

            {/* Inner ring */}
            <div className="absolute w-[200px] h-[200px] md:w-[260px] md:h-[260px] rounded-full border-2 border-primary/15 shape-float-delayed" />

            {/* Center icon */}
            <div className="absolute w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-[0_16px_48px_rgba(13,148,136,0.3)] shape-float-slow">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 14c2-6 4-9 8-9s6 3 8 9" />
                <path d="M4 14c0 3.5 3.5 6 8 6s8-2.5 8-6" />
              </svg>
            </div>

            {/* Orbiting dots */}
            <div className="absolute w-[320px] h-[320px] md:w-[380px] md:h-[380px]" style={{ animation: "spinSlow 20s linear infinite" }}>
              <div className="absolute -top-2 left-1/2 w-3 h-3 rounded-full bg-primary/30" />
              <div className="absolute top-1/3 -right-2 w-2 h-2 rounded-full bg-primary/40" />
              <div className="absolute bottom-8 left-1/4 w-2.5 h-2.5 rounded-full bg-primary/20" />
            </div>
          </div>

          {/* Floating rating card */}
          <div className="absolute -left-4 md:-left-8 bottom-6 md:bottom-10 bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-4 md:px-6 md:py-5 shadow-[0_16px_40px_rgba(13,148,136,0.12)] border border-primary/10 w-[200px] md:w-[230px] shape-float-slow">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-3xl md:text-4xl font-bold text-ink leading-none">
                {siteConfig.googleRating}
              </span>
              <div className="flex gap-0.5">
                <StarIcon size={12} className="text-accent" />
              </div>
            </div>
            <p className="text-[11px] md:text-xs text-ink/50 mt-1.5 leading-relaxed">
              {siteConfig.googleReviewCount}+ verified reviews across our 3 clinics on Google
            </p>
          </div>

          {/* Floating badge */}
          <div className="absolute -right-2 md:-right-4 top-8 md:top-12 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-[0_12px_32px_rgba(13,148,136,0.1)] border border-primary/10 shape-float">
            <span className="text-[11px] font-bold tracking-[0.06em] uppercase text-primary/80">18+ Years</span>
            <span className="block text-[10px] text-ink/50">of excellence</span>
          </div>
        </div>
      </div>
    </section>
  );
}
