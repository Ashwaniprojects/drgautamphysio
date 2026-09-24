import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { clinics } from "@/lib/data/clinics";
import { siteConfig } from "@/lib/site-config";
import { doctor } from "@/lib/data/doctor";

export function Footer() {
  return (
    <footer className="bg-primary-dark text-paper pt-16 md:pt-18 pb-24 lg:pb-10 px-6 md:px-22">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] gap-10">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-[9px] bg-paper flex items-center justify-center shrink-0">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#1CA898" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 14c2-6 4-9 8-9s6 3 8 9" />
                <path d="M4 14c0 3.5 3.5 6 8 6s8-2.5 8-6" />
              </svg>
            </span>
            <span className="font-display text-[17px] font-semibold">Dr. Gautam&apos;s Physio</span>
          </div>
          <p className="text-sm leading-relaxed text-paper/70 max-w-xs">
            {doctor.positioning.join(" · ")}. Hands-on care across 3 Lucknow locations.
          </p>
          <div className="flex gap-3 mt-1">
            {["f", "in", "Yt"].map((label) => (
              <span
                key={label}
                className="w-8.5 h-8.5 rounded-full bg-paper/10 flex items-center justify-center text-[13px] font-bold"
              >
                {label}
              </span>
            ))}
          </div>
          <span className="text-xs text-paper/55">{siteConfig.youtubeHandle} on YouTube</span>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[13px] font-bold tracking-[0.08em] uppercase text-paper/60">Our Clinics</span>
          {clinics.map((c) => (
            <Link key={c.slug} href="/clinics" className="text-sm text-paper/85">
              {c.name}
              {c.area && c.tag !== "Own clinic" ? `, ${c.area}` : ""}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[13px] font-bold tracking-[0.08em] uppercase text-paper/60">Explore</span>
          <Link href="/conditions" className="text-sm text-paper/85">Conditions We Treat</Link>
          <Link href="/treatments" className="text-sm text-paper/85">How We Treat You</Link>
          <Link href="/about" className="text-sm text-paper/85">About</Link>
          <Link href="/stories" className="text-sm text-paper/85">Patient Stories</Link>
          <Link href="/blog" className="text-sm text-paper/85">Blog</Link>
          <Link href="/contact" className="text-sm text-paper/85">Contact</Link>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[13px] font-bold tracking-[0.08em] uppercase text-paper/60">Get in Touch</span>
          <a href={siteConfig.clinicPhoneHref} className="text-sm text-paper/85">{siteConfig.clinicPhoneDisplay}</a>
          <a href={`mailto:${siteConfig.clinicEmail}`} className="text-sm text-paper/85">{siteConfig.clinicEmail}</a>
          <a href={siteConfig.whatsappHref} className="text-sm text-paper/85">WhatsApp Us</a>
          <Button href="/book" className="mt-1 w-fit !px-5 !py-2.5 text-sm">
            Book Appointment
          </Button>
        </div>
      </div>

      <div className="border-t border-paper/15 mt-11 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <span className="text-[13px] text-paper/50">
          &copy; {new Date().getFullYear()} Dr. Gautam&apos;s Physio &amp; Rehab Centre. All rights reserved.
        </span>
        <span className="text-[13px] text-paper/50">Design &amp; build by Clicknify</span>
      </div>
    </footer>
  );
}
