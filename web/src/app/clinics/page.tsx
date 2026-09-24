import type { Metadata } from "next";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { ClockIcon, PinIcon } from "@/components/icons";
import { clinics } from "@/lib/data/clinics";

export const metadata: Metadata = {
  title: "Our Clinics | Dr. Gautam's Physio & Rehab Centre",
  description: "Subhash Marg, Neera Hospital and Medox Hospital, the 3 Lucknow locations where Dr. S.K. Gautam treats patients.",
};

export default function ClinicsPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <PageHeader eyebrow="Our Clinics" title="Come in wherever suits you">
          One clinic Dr. Gautam owns and runs directly, plus two hospitals where he also consults on
          select days.
        </PageHeader>

        <div className="px-6 md:px-22 py-12 md:py-16 flex flex-col gap-10">
          {clinics.map((c, i) => (
            <div
              key={c.slug}
              className={`flex flex-col ${i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 lg:gap-12 items-center`}
            >
              <div className="flex-1 w-full h-[240px] md:h-[300px] bg-tint rounded-2xl border-[1.5px] border-dashed border-primary/35 flex items-center justify-center text-center p-8">
                <span className="text-sm text-primary font-semibold">[PHOTO: {c.photoPlaceholder}]</span>
              </div>
              <div className="flex-1 flex flex-col gap-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-display text-2xl font-semibold text-ink">{c.name}</span>
                  <span className="text-[11px] font-bold uppercase tracking-wide text-primary bg-tint px-2.5 py-1 rounded-full">
                    {c.tag}
                  </span>
                </div>
                <p className="text-[15px] leading-relaxed text-ink/65">{c.blurb}</p>
                <div className="flex flex-col gap-2 text-sm text-ink/60">
                  <div className="flex items-center gap-2">
                    <PinIcon size={15} />
                    {c.area || "Address pending, requirements checklist §B"}
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon size={15} />
                    {c.hours}
                  </div>
                </div>
                <div className="h-[160px] bg-white border border-ink/10 rounded-xl flex items-center justify-center">
                  <span className="text-xs text-ink/40">[Map embed pending exact address confirmation]</span>
                </div>
                <Button href="/book" variant="solid-teal" className="w-fit">
                  Book at {c.name}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
      <MobileActionBar />
    </>
  );
}
