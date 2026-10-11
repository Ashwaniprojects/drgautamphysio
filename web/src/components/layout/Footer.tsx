import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { clinics } from "@/lib/data/clinics";
import { siteConfig } from "@/lib/site-config";
import { doctor } from "@/lib/data/doctor";
import { ArrowRightIcon } from "@/components/icons";

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800" />

      <div className="relative px-6 md:px-22 pt-16 md:pt-20 pb-24 lg:pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 lg:gap-12">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-[10px] bg-white/10 backdrop-blur-sm flex items-center justify-center shrink-0 border border-white/10">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 14c2-6 4-9 8-9s6 3 8 9" />
                  <path d="M4 14c0 3.5 3.5 6 8 6s8-2.5 8-6" />
                </svg>
              </span>
              <span className="font-display text-[19px] font-semibold text-white">
                Dr. Gautam&apos;s Physio
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/60 max-w-xs">
              {doctor.positioning.join(" · ")}. Hands-on care across 3 Lucknow locations.
            </p>
            <div className="flex gap-3 mt-1">
              {["f", "in", "Yt"].map((label) => (
                <span
                  key={label}
                  className="w-9 h-9 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-[12px] font-bold text-white/70 hover:bg-white/15 hover:text-white hover:border-white/25 transition-all duration-300 cursor-pointer"
                >
                  {label}
                </span>
              ))}
            </div>
            <span className="text-xs text-white/40">{siteConfig.youtubeHandle} on YouTube</span>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-[12px] font-bold tracking-[0.12em] uppercase text-white/40">Our Clinics</span>
            {clinics.map((c) => (
              <Link key={c.slug} href="/clinics" className="text-sm text-white/70 hover:text-white transition-colors duration-300">
                {c.name}, {c.area}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-[12px] font-bold tracking-[0.12em] uppercase text-white/40">Explore</span>
            <Link href="/conditions" className="text-sm text-white/70 hover:text-white transition-colors duration-300">Conditions We Treat</Link>
            <Link href="/treatments" className="text-sm text-white/70 hover:text-white transition-colors duration-300">How We Treat You</Link>
            <Link href="/awards" className="text-sm text-white/70 hover:text-white transition-colors duration-300">Awards & Recognition</Link>
            <Link href="/about" className="text-sm text-white/70 hover:text-white transition-colors duration-300">About</Link>
            <Link href="/stories" className="text-sm text-white/70 hover:text-white transition-colors duration-300">Patient Stories</Link>
            <Link href="/blog" className="text-sm text-white/70 hover:text-white transition-colors duration-300">Blog</Link>
            <Link href="/contact" className="text-sm text-white/70 hover:text-white transition-colors duration-300">Contact</Link>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-[12px] font-bold tracking-[0.12em] uppercase text-white/40">Get in Touch</span>
            <a href={siteConfig.clinicPhoneHref} className="text-sm text-white/70 hover:text-white transition-colors duration-300">{siteConfig.clinicPhoneDisplay}</a>
            <a href={`mailto:${siteConfig.clinicEmail}`} className="text-sm text-white/70 hover:text-white transition-colors duration-300">{siteConfig.clinicEmail}</a>
            <a href={siteConfig.whatsappHref} className="text-sm text-white/70 hover:text-white transition-colors duration-300">WhatsApp Us</a>
            <Button href="/book" className="mt-2 w-fit !bg-white !text-primary-900 hover:!bg-white/90 !px-5 !py-2.5 text-sm font-semibold">
              Book Appointment <ArrowRightIcon size={14} />
            </Button>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="text-[13px] text-white/40">
            &copy; {new Date().getFullYear()} Dr. Gautam&apos;s Physio &amp; Rehab Centre. All rights reserved.
          </span>
          <span className="text-[13px] text-white/30">Design &amp; build by Clicknify</span>
        </div>
      </div>
    </footer>
  );
}
