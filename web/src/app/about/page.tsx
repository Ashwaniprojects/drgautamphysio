import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { ScrollReveal } from "@/components/ScrollReveal";
import { doctor } from "@/lib/data/doctor";
import { siteConfig } from "@/lib/site-config";
import Image from "next/image";

export const metadata: Metadata = buildMetadata({
  title: "About Dr. S.K. Gautam | Best Physiotherapist in Lucknow",
  description:
    "Dr. Surendra Kumar Gautam (P.T.) — physiotherapist in Lucknow with 18+ years of practice, MPT in Neurology, Ph.D. Scholar and IAP State Treasurer. See the clinics he treats at.",
  path: "/about",
  keywords: [
    "Dr. S.K. Gautam physiotherapist",
    "best physiotherapist in Lucknow",
    "best chiropractor in Lucknow",
    "physiotherapist Yahiyaganj Lucknow",
    "osteopathy Lucknow",
    "IAP State Treasurer Lucknow",
  ],
});

const approach = [
  "Treatment starts with a full assessment, not a fixed protocol.",
  "Techniques are chosen per patient from a formally certified toolkit, not applied by default.",
  "Hospital experience across ICU, ward and outpatient care since 2008, so complex and post-surgical cases are familiar ground.",
];

export default function AboutPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <PageHeader eyebrow="About" title={`${doctor.fullName} ${doctor.suffix}`}>
          {doctor.title}. {doctor.positioning.join(" · ")}.
        </PageHeader>

        <div className="px-6 md:px-22 py-12 md:py-16 flex flex-col lg:flex-row gap-12 lg:gap-16">
          <aside className="lg:flex-1 max-w-[420px] flex flex-col gap-5">
            <ScrollReveal>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-ink/10 shadow-lg">
                <Image src="/images/award-photo-world-physio-2026.jpg" alt="Dr. S.K. Gautam receiving the Significant Contribution Award at the World Physiotherapy Asia Western Pacific Regional Conference, New Delhi 2026" fill className="object-cover" priority />
              </div>
              <p className="text-[11px] text-ink/45 mt-1.5 leading-relaxed">
                Dr. Gautam receiving the Significant Contribution Award — World Physiotherapy Asia Western Pacific Regional Conference, New Delhi, 2026.
              </p>
            </ScrollReveal>

            <ScrollReveal className="reveal-delay-1">
              <div className="bg-white rounded-2xl p-5 border border-ink/8 flex flex-col gap-3">
                <span className="text-sm font-semibold text-ink">Academics</span>
                <ul className="flex flex-col gap-1.5">
                  {doctor.academics.map((q) => (
                    <li key={q} className="text-sm text-ink/65 leading-relaxed">{q}</li>
                  ))}
                </ul>
                <span className="text-sm font-semibold text-ink mt-2">Fellowships &amp; certifications</span>
                <ul className="flex flex-col gap-1.5">
                  {doctor.fellowshipsAndCertifications.map((q) => (
                    <li key={q} className="text-sm text-ink/65 leading-relaxed">{q}</li>
                  ))}
                </ul>
                <span className="text-xs text-ink/45 pt-3 border-t border-ink/10 mt-1">
                  Also listed on clinic material: {doctor.alsoListedOnClinicMaterial.join(", ")}
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal className="reveal-delay-2">
              <div className="bg-white rounded-2xl p-5 border border-ink/8 flex flex-col gap-3">
                <span className="text-sm font-semibold text-ink">Registration &amp; memberships</span>
                <ul className="flex flex-col gap-1.5">
                  {doctor.affiliations.map((a) => (
                    <li key={a} className="text-sm text-ink/65 leading-relaxed">{a}</li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </aside>

          <div className="lg:flex-[1.4] flex flex-col gap-12">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-semibold text-ink">Background</h2>
              <p className="text-[15px] leading-relaxed text-ink/70">
                {doctor.fullName} is the founder and director of Dr. Gautam&apos;s Physio &amp; Rehab Centre
                and a {doctor.title.toLowerCase()} with {doctor.yearsExperience} years of clinical practice,
                working in Lucknow hospitals and clinics since {doctor.clinicalSince}. He treats
                musculoskeletal and neurological conditions, from acute back and joint pain to ICU and
                post-surgical rehabilitation, and builds each plan around the individual patient.
              </p>
              <p className="text-[15px] leading-relaxed text-ink/70">
                He is State Treasurer for Uttar Pradesh of the Indian Association of Physiotherapists, trains
                final-year BPT and DPT students at Neera Hospital, and regularly speaks and chairs sessions at
                national physiotherapy conferences.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="font-display text-2xl font-semibold text-ink">How he approaches treatment</h2>
              <div className="flex flex-col gap-3">
                {approach.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckIcon size={20} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-[15px] leading-relaxed text-ink">{point}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="font-display text-2xl font-semibold text-ink">Career</h2>
              <div className="flex flex-col gap-5 border-l-2 border-primary/25 pl-6">
                {doctor.career.map((c) => (
                  <div key={c.place} className="flex flex-col gap-1.5">
                    <span className="text-base font-semibold text-ink">{c.place}</span>
                    <span className="text-xs font-semibold uppercase tracking-wide text-primary">{c.period}</span>
                    <ul className="flex flex-col gap-1 mt-1">
                      {c.points.map((p) => (
                        <li key={p} className="text-sm text-ink/65 leading-relaxed">{p}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="font-display text-2xl font-semibold text-ink">Awards &amp; recognition</h2>

              {/* Abstract award visual */}
              <div className="relative bg-gradient-to-br from-primary-50 to-tint rounded-2xl p-8 border border-primary-200/40 flex items-center gap-6 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg shrink-0">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="6" />
                    <path d="M15.5 3l1.5 3 3 1.5-3 1.5-1.5 3-1.5-3-3-1.5 3-1.5z" />
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-lg font-semibold text-ink">IAP Excellence Awards 2026</span>
                  <span className="text-sm text-ink/60">Significant Contribution Award — World Physiotherapy Asia Western Pacific Regional Conference, New Delhi</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {doctor.awards.map((a) => (
                  <div key={`${a.title}-${a.year}`} className="bg-white rounded-xl p-4 border border-ink/8 hover:border-primary/20 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-bold tracking-[0.06em] uppercase bg-primary-50 text-primary px-2.5 py-1 rounded-full">{a.year}</span>
                    </div>
                    <span className="text-sm font-semibold text-ink leading-snug">{a.title}</span>
                    <span className="text-xs text-ink/55 mt-0.5">{a.event}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="font-display text-2xl font-semibold text-ink">Conferences &amp; academic work</h2>
              <div className="bg-gradient-to-br from-primary-50 to-tint rounded-2xl p-6 border border-primary-200/30 flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-ink">IAP Uttar Pradesh — State Treasurer</span>
                  <span className="text-xs text-ink/55">Indian Association of Physiotherapists, Lucknow chapter</span>
                </div>
              </div>
              <ul className="flex flex-col gap-2.5">
                {doctor.academicContributions.map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <CheckIcon size={18} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-[15px] leading-relaxed text-ink/75">{c}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            {/* Event photos gallery */}
            <ScrollReveal>
              <h2 className="font-display text-2xl font-semibold text-ink">Conferences &amp; events</h2>
              <p className="text-[13px] text-ink/50 mb-4 -mt-1">A selection from national and regional physiotherapy conferences.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {[
                  { src: "/images/iap-uttar-pradesh-event.jpg", alt: "IAP Uttar Pradesh chapter event" },
                  { src: "/images/conference-group-photo.jpg", alt: "Conference group photo" },
                  { src: "/images/physio-guide-3-conference.jpg", alt: "Physio Guide 3 conference" },
                  { src: "/images/event-photo-2.jpg", alt: "Physiotherapy conference" },
                  { src: "/images/event-photo-3.jpg", alt: "Professional conference" },
                  { src: "/images/event-photo-4.jpg", alt: "Conference session" },
                  { src: "/images/event-photo-5.jpg", alt: "Award ceremony" },
                  { src: "/images/event-photo-6.jpg", alt: "Physiotherapy event" },
                ].map((photo) => (
                  <div key={photo.src} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-ink/8 bg-ink/5">
                    <Image src={photo.src} alt={photo.alt} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <div className="flex flex-wrap gap-3">
              <Button href="/book">Book Appointment</Button>
              <Button href="/treatments" variant="secondary">
                See Techniques &amp; Approach
              </Button>
              <Button href="/clinics" variant="secondary">
                See Our Clinics
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileActionBar />
    </>
  );
}