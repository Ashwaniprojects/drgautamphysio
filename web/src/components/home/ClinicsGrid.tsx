"use client";

import { useReveal } from "@/hooks/useScrollReveal";
import Link from "next/link";
import { PinIcon, StarIcon, ArrowRightIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { clinics } from "@/lib/data/clinics";

export function ClinicsGrid() {
  const sectionRef = useReveal();

  return (
    <section id="clinics" className="bg-mesh-section px-6 md:px-22 py-14 md:py-22 overflow-hidden">
      <div ref={sectionRef}>
        <div className="flex flex-col gap-3 max-w-2xl mb-10">
          <span className="reveal text-[13px] font-bold tracking-[0.12em] uppercase text-primary">
            Our 3 clinics
          </span>
          <h2 className="reveal reveal-delay-1 font-display text-[28px] md:text-[38px] font-semibold text-ink leading-[1.15]">
            Come in wherever<br />
            <span className="text-primary">suits you best.</span>
          </h2>
          <p className="reveal reveal-delay-2 text-[15px] text-ink/55 max-w-lg">
            Three convenient locations across Lucknow — Subhash Marg, Neera Hospital & Medox Hospital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {clinics.map((c, i) => (
            <div
              key={c.slug}
              className={`reveal reveal-delay-${i + 1} card-shimmer group bg-white rounded-2xl overflow-hidden border border-ink/8 hover:border-primary/25 hover:shadow-[0_20px_50px_-12px_rgba(13,148,136,0.15)] transition-all duration-500`}
            >
              {/* Map placeholder with gradient */}
              <div className="relative h-[140px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-primary-50 to-primary-200/50 group-hover:from-primary-200/80 group-hover:to-primary-300/60 transition-all duration-500" />
                {/* Stylized location pin */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <PinIcon size={24} className="text-primary" />
                    </div>
                    <div className="absolute inset-0 w-14 h-14 rounded-full border-2 border-primary/20 animate-ping" style={{ animationDuration: "2.5s" }} />
                  </div>
                </div>
                {/* Tag badge */}
                <div className="absolute top-4 left-4">
                  <span className="text-[11px] font-bold tracking-[0.06em] uppercase bg-white/90 backdrop-blur-sm text-primary px-3 py-1.5 rounded-full border border-primary/10">
                    {c.tag}
                  </span>
                </div>
              </div>

              <div className="p-5 md:p-6 flex flex-col gap-3">
                <h3 className="text-[17px] font-semibold text-ink group-hover:text-primary transition-colors">
                  {c.name}
                </h3>

                <div className="flex items-start gap-2 text-[13px] text-ink/55">
                  <PinIcon size={14} className="shrink-0 mt-0.5 text-primary/40" />
                  <span>{c.address}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <StarIcon key={idx} size={13} className="text-accent" />
                    ))}
                  </div>
                  <span className="text-[13px] font-semibold text-ink">{c.rating}</span>
                  <span className="text-[12px] text-ink/45">({c.reviewCount} Google reviews)</span>
                </div>

                <Button href="/book" variant="solid-teal" className="mt-1 w-full !py-2.75 text-sm btn-glow">
                  Book Appointment <ArrowRightIcon size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
