import type { Metadata } from "next";
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
  description: "Meet Dr. S.K. Gautam and how he approaches physiotherapy, chiropractic and osteopathic treatment in Lucknow.",
};

export default function AboutPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <PageHeader eyebrow="About" title={`${doctor.name} ${doctor.suffix}`}>
          {doctor.positioning.join(" · ")}, treating patients across 3 Lucknow clinics.
        </PageHeader>

        <div className="px-6 md:px-22 py-12 md:py-16 flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div className="flex-1 max-w-[400px] flex flex-col gap-5">
            <div className="aspect-[4/5] bg-tint rounded-2xl border-[1.5px] border-dashed border-primary/35 flex items-center justify-center text-center p-8">
              <span className="text-sm text-primary font-semibold">[PHOTO: {doctor.name} headshot]</span>
            </div>
            <div className="bg-white border border-ink/10 rounded-2xl p-5 flex flex-col gap-3">
              <span className="text-sm font-semibold text-ink">Qualifications &amp; credentials</span>
              <ul className="flex flex-col gap-1.5">
                {doctor.qualifications.map((q) => (
                  <li key={q} className="text-sm text-ink/65 leading-relaxed">{q}</li>
                ))}
              </ul>
              <span className="text-xs text-ink/45 pt-2 border-t border-ink/10 mt-1">{doctor.registration}</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h2 className="font-display text-2xl font-semibold text-ink">Background</h2>
              <p className="text-[15px] leading-relaxed text-ink/70">
                {doctor.name} {doctor.suffix} is a {doctor.positioning.join(", ").toLowerCase()} practitioner
                registered with the Indian Association of Physiotherapists ({doctor.registration}). His
                training spans a PhD scholarship, an M.P.T. in Neuro physiotherapy, an Osteopathy fellowship
                in Australia, and certifications across manual therapy, cupping, dry needling and craniosacral
                technique, among others listed alongside.
              </p>
              <p className="text-[15px] leading-relaxed text-ink/70">
                [A narrative bio in Dr. Gautam&apos;s own words, and the year the practice was founded, is
                pending, requirements checklist §A. The credentials above are already confirmed from his
                professional documents.]
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="font-display text-2xl font-semibold text-ink">How Dr. Gautam approaches treatment</h2>
              <div className="flex flex-col gap-3">
                {[
                  "A full hands-on assessment at the first visit, not a five-minute look and a prescription.",
                  "A specific treatment plan for your condition, explained in plain language.",
                  "Manual therapy delivered by Dr. Gautam himself, not handed off to a junior each visit.",
                  "Honest timelines. If something needs a specialist referral or won't respond to physiotherapy, he'll say so.",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckIcon size={20} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-[15px] leading-relaxed text-ink">{point}</span>
                  </div>
                ))}
              </div>
            </div>

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
