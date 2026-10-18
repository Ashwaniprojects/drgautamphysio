"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReveal } from "@/hooks/useScrollReveal";
import { doctor } from "@/lib/data/doctor";

const featuredAwards = doctor.awards.slice(0, 6);

const gridStyle = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
  backgroundSize: "60px 60px",
};

function AwardCard({ award, index }: { award: { title: string; event: string; year: string }; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y }}
      className="group relative rounded-2xl p-6 md:p-7 border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500 cursor-default"
    >
      <span className="absolute top-5 right-6 font-display text-5xl text-white/[0.04] font-normal select-none">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-400/20 to-primary-600/10 border border-primary-400/20 flex items-center justify-center mb-5 group-hover:from-primary-400/30 group-hover:to-primary-600/20 transition-all duration-500">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-400">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        </svg>
      </div>

      <span className="block text-[11px] font-bold tracking-[0.12em] uppercase text-primary-400 mb-2">
        {award.year}
      </span>
      <h3 className="text-[15px] font-semibold text-white leading-snug mb-2 group-hover:text-primary-300 transition-colors">
        {award.title}
      </h3>
      <p className="text-[13px] text-white/40 leading-relaxed">
        {award.event}
      </p>
    </motion.div>
  );
}

export function AwardsShowcase() {
  const sectionRef = useReveal();

  return (
    <section className="relative bg-gradient-to-br from-ink via-primary-950 to-ink px-6 md:px-22 py-20 md:py-28 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      {/* Grid texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" aria-hidden="true" style={gridStyle} />

      <div ref={sectionRef} className="relative">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div className="flex flex-col gap-3 max-w-2xl">
            <span className="reveal text-[12px] font-bold tracking-[0.14em] uppercase text-primary-400">
              Awards &amp; Recognition
            </span>
            <h2 className="reveal reveal-delay-1 font-display text-[36px] md:text-[52px] font-bold text-white leading-[1.1]">
              Recognized nationally<br />
              <span className="text-primary-400 italic">and internationally.</span>
            </h2>
          </div>
          <div className="reveal reveal-delay-2 flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="font-display text-4xl text-white leading-none">12+</span>
              <span className="text-xs text-white/40 mt-1">Awards since 2019</span>
            </div>
          </div>
        </div>

        {/* Award cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredAwards.map((award, i) => (
            <AwardCard key={i} award={award} index={i} />
          ))}
        </div>

        <div className="reveal reveal-delay-3 mt-10 text-center">
          <p className="text-sm text-white/30">
            {doctor.awards.length} total awards across national and international physiotherapy conferences
          </p>
        </div>
      </div>
    </section>
  );
}
