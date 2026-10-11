"use client";

import { useReveal } from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { PhoneIcon, ArrowRightIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";

export function FinalCTA() {
  const sectionRef = useReveal();

  return (
    <section className="relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700"
        style={{ backgroundSize: "200% 200%", animation: "gradientShift 8s ease infinite" }}
      />

      {/* Decorative shapes */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-10 left-10 w-[200px] h-[200px] rounded-full bg-white/5 blur-2xl" />
        <div className="absolute bottom-10 right-10 w-[300px] h-[300px] rounded-full bg-primary-300/5 blur-3xl" />
      </div>

      <div ref={sectionRef} className="relative px-6 md:px-22 py-16 md:py-20">
        <div className="flex flex-col items-center text-center gap-6 max-w-2xl mx-auto">
          <div className="reveal w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center mb-2">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 14c2-6 4-9 8-9s6 3 8 9" />
              <path d="M4 14c0 3.5 3.5 6 8 6s8-2.5 8-6" />
            </svg>
          </div>

          <h2 className="reveal reveal-delay-1 font-display text-[28px] md:text-[38px] font-semibold text-paper leading-[1.15]">
            Not sure where to start?
          </h2>

          <p className="reveal reveal-delay-2 text-[16px] md:text-[17px] text-white/75 leading-relaxed max-w-lg">
            Tell us what you&apos;re experiencing. We&apos;ll help you understand the next step and connect you with the right care.
          </p>

          <div className="reveal reveal-delay-3 flex flex-wrap items-center justify-center gap-3.5 mt-2">
            <Button href="/book" className="btn-glow !bg-white !text-primary-900 hover:!bg-white/90 !px-8 !py-4.5 !text-base font-semibold">
              Book Appointment <ArrowRightIcon size={16} />
            </Button>
            <WhatsAppButton className="!border-white/30 !text-paper hover:!bg-white/10" />
          </div>

          <div className="reveal reveal-delay-4 flex items-center gap-2.5 text-white/60 text-sm mt-2">
            <PhoneIcon size={15} />
            <a href={siteConfig.clinicPhoneHref} className="hover:text-white transition-colors">
              Call {siteConfig.clinicPhoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
