"use client";

import { useState } from "react";
import { useReveal } from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { StarIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";
import { doctor } from "@/lib/data/doctor";
import { clinics } from "@/lib/data/clinics";
import { conditions } from "@/lib/data/conditions";
import { useCountUp } from "@/hooks/useCountUp";

export function Hero() {
  const heroRef = useReveal({ once: true });
  const rating = useCountUp({ end: 5, duration: 2000 });
  const count729 = useCountUp({ end: 729, duration: 2500, suffix: "+" });
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setShowForm(false);
      setSubmitted(false);
      setName("");
      setPhone("");
    }, 3000);
  }

  return (
    <section className="relative overflow-hidden bg-mesh-hero px-6 md:px-22 py-16 md:py-28">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-primary-100/40 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-secondary/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div ref={heroRef} className="relative flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
        {/* Left: Content */}
        <div className="flex-1 flex flex-col gap-7 max-w-xl">
          <span className="reveal text-[12px] font-bold tracking-[0.14em] uppercase text-primary/80">
            Physiotherapy &amp; Rehabilitation, Lucknow
          </span>

          <h1 className="reveal reveal-delay-1 font-display text-[40px] md:text-[56px] lg:text-[64px] font-bold leading-[1.06] text-ink">
            Move better.<br />
            Feel stronger.<br />
            <span className="text-primary italic">Live free.</span>
          </h1>

          <p className="reveal reveal-delay-2 text-[16px] md:text-[18px] leading-[1.75] text-ink/60 max-w-[480px]">
            Personalized physiotherapy, chiropractic &amp; osteopathic care by{" "}
            <strong className="text-ink/80">{doctor.name} {doctor.suffix}</strong>,
            helping patients manage pain, improve movement and return to everyday life.
          </p>

          <div className="reveal reveal-delay-3 flex flex-wrap items-center gap-3 mt-2">
            <Button href="/book" className="btn-glow !px-8 !py-4 !text-base">
              Book Appointment
            </Button>
            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-primary/30 text-primary font-semibold text-sm hover:bg-primary-50 hover:border-primary/50 transition-all"
            >
              Quick Book <span className="text-lg leading-none">{showForm ? "−" : "+"}</span>
            </button>
          </div>

          {/* Inline booking form */}
          {showForm && !submitted && (
            <form onSubmit={handleSubmit} className="reveal flex flex-col gap-3 max-w-md">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                required
                className="premium-input"
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
                required
                className="premium-input"
              />
              <button type="submit" className="w-full h-12 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors">
                Book Appointment →
              </button>
            </form>
          )}

          {submitted && (
            <div className="reveal flex items-center gap-3 bg-primary-50 border border-primary-200 rounded-xl px-5 py-4 max-w-md">
              <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">Appointment requested!</p>
                <p className="text-xs text-ink/60">We&apos;ll call you to confirm your slot.</p>
              </div>
            </div>
          )}

          <div className="reveal reveal-delay-4 flex flex-col gap-1.5 mt-2 pt-5 border-t border-ink/10">
            <span className="text-sm font-semibold text-ink">
              {doctor.name} {doctor.suffix}, {doctor.title}
            </span>
            <span className="text-[13px] text-ink/50">
              {doctor.yearsExperience} years in practice · Ph.D. Scholar · FOMT Australia
            </span>
          </div>

          {/* Animated stats row */}
          <div className="reveal reveal-delay-5 flex items-center gap-6 mt-3">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span ref={rating.ref} className="font-display text-2xl font-bold text-ink">
                  {rating.count}
                </span>
                <span className="text-sm text-ink/40">/5</span>
              </div>
              <span className="text-[11px] text-ink/50">{siteConfig.googleReviewCount}+ reviews</span>
            </div>
            <div className="h-8 w-px bg-ink/10" />
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold text-ink">{doctor.yearsExperience}+</span>
              <span className="text-[11px] text-ink/50">years practice</span>
            </div>
            <div className="h-8 w-px bg-ink/10" />
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold text-ink">3</span>
              <span className="text-[11px] text-ink/50">clinics</span>
            </div>
          </div>
        </div>

        {/* Right: Premium card with doctor info */}
        <div className="lg:flex-1 shrink-0 relative w-full max-w-[440px]">
          <div className="absolute -inset-4 bg-gradient-to-br from-primary-100/60 via-transparent to-secondary/10 rounded-[32px] blur-2xl" aria-hidden="true" />

          <div className="beam-card relative p-8 md:p-10">
            {/* Doctor header */}
            <div className="flex items-center gap-5 mb-8">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg shrink-0">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 14c2-6 4-9 8-9s6 3 8 9" />
                  <path d="M4 14c0 3.5 3.5 6 8 6s8-2.5 8-6" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-display text-xl text-ink leading-tight">{doctor.fullName}</h3>
                <p className="text-sm text-ink/50 mt-0.5">{doctor.title}</p>
                <div className="flex items-center gap-1.5 mt-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} size={13} className="text-warning" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-ink/60">{siteConfig.googleRating}/5</span>
                </div>
              </div>
            </div>

            {/* Quick clinic selector */}
            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-ink/40 mb-1">
                Visit our clinic
              </span>
              {clinics.map((c) => (
                <a
                  key={c.slug}
                  href="/clinics"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 border border-ink/8 hover:border-primary/30 hover:bg-primary-50/50 transition-all group"
                >
                  <span className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-semibold text-ink group-hover:text-primary transition-colors">{c.name}</span>
                    <span className="block text-xs text-ink/50">{c.area}</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wide bg-primary-50 text-primary px-2 py-0.5 rounded-full">
                    {c.tag}
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-ink/8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} size={12} className="text-warning" />
                  ))}
                </div>
                <span className="text-xs text-ink/50">
                  {siteConfig.googleReviewCount}+ verified reviews
                </span>
              </div>
              <WhatsAppButton className="!p-2.5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
