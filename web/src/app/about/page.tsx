import type { Metadata } from "next";
import Image from "next/image";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/icons";
import { doctor } from "@/lib/data/doctor";

export const metadata: Metadata = {
  title: "About Dr. S.K. Gautam | Dr. Gautam's Physio & Rehab Centre",
  description:
    "Dr. Surendra Kumar Gautam (P.T.), Chief Consultant Physiotherapist with 18+ years of practice in Lucknow. Qualifications, career and awards.",
};

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
          <aside className="flex-1 max-w-[420px] flex flex-col gap-5">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-tint">
              <Image
                src="/images/dr-gautam-portrait.jpg"
                alt={`${doctor.fullName}, ${doctor.title}`}
                fill
                sizes="(min-width: 1024px) 420px, 100vw"
                className="object-cover object-top"
              />
            </div>

            <div className="bg-white border border-ink/10 rounded-2xl p-5 flex flex-col gap-3">
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

            <div className="bg-white border border-ink/10 rounded-2xl p-5 flex flex-col gap-3">
              <span className="text-sm font-semibold text-ink">Registration &amp; memberships</span>
              <ul className="flex flex-col gap-1.5">
                {doctor.affiliations.map((a) => (
                  <li key={a} className="text-sm text-ink/65 leading-relaxed">{a}</li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="flex-[1.4] flex flex-col gap-12">
            <section className="flex flex-col gap-3">
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
              <p className="text-xs text-ink/45">
                [The year the centre itself was founded is still pending, requirements checklist §A.]
              </p>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="font-display text-2xl font-semibold text-ink">How he approaches treatment</h2>
              <div className="flex flex-col gap-3">
                {approach.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckIcon size={20} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-[15px] leading-relaxed text-ink">{point}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="flex flex-col gap-5">
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
            </section>

            <section className="flex flex-col gap-5">
              <h2 className="font-display text-2xl font-semibold text-ink">Awards &amp; recognition</h2>
              <figure className="flex flex-col gap-2.5">
                <div className="rounded-2xl overflow-hidden bg-tint">
                  <Image
                    src="/images/iap-excellence-award-2026.jpg"
                    alt={`${doctor.fullName} receiving the Significant Contribution Award at the IAP Excellence Awards 2026`}
                    width={1800}
                    height={1200}
                    sizes="(min-width: 1024px) 800px, 100vw"
                    className="w-full h-auto"
                  />
                </div>
                <figcaption className="text-sm text-ink/60">
                  Significant Contribution Award, IAP Excellence Awards 2026, World Physiotherapy Asia Western
                  Pacific Regional Conference, New Delhi.
                </figcaption>
              </figure>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {doctor.awards.map((a) => (
                  <li key={`${a.title}-${a.year}`} className="bg-tint rounded-xl p-4 flex flex-col gap-0.5">
                    <span className="text-sm font-semibold text-ink leading-snug">{a.title}</span>
                    <span className="text-xs text-ink/60 leading-relaxed">
                      {a.event} &middot; {a.year}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="font-display text-2xl font-semibold text-ink">Conferences &amp; academic work</h2>
              <ul className="flex flex-col gap-2.5">
                {doctor.academicContributions.map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <CheckIcon size={18} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-[15px] leading-relaxed text-ink/75">{c}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="bg-tint rounded-2xl p-6 flex flex-col gap-2">
              <span className="text-sm font-semibold text-ink">Introduction video</span>
              <span className="text-sm text-ink/60 leading-relaxed">
                [A short intro video, even recorded on a phone, is a meaningful trust lift here. Pending,
                requirements checklist §A. It embeds from the existing YouTube channel,
                @drgautamphysiotherapy, once available.]
              </span>
            </div>

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
