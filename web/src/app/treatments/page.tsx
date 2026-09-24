import type { Metadata } from "next";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { treatments } from "@/lib/data/treatments";

export const metadata: Metadata = {
  title: "How We Treat You | Dr. Gautam's Physio & Rehab Centre",
  description:
    "Physiotherapy, chiropractic, osteopathy, manual therapy, dry needling, cupping, cranio-sacral therapy, and visceral manipulation from Dr. S.K. Gautam in Lucknow.",
};

export default function TreatmentsPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <PageHeader eyebrow="How We Treat You" title="Eight hands-on approaches, one standard of care">
          Dr. Gautam chooses the approach based on your assessment, not the other way around. These
          are the techniques he draws from.
        </PageHeader>

        <div className="px-6 md:px-22 py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {treatments.map((t) => (
              <div key={t.name} className="bg-tint rounded-2xl p-6 flex flex-col gap-2.5">
                <span className="text-base font-semibold text-ink">{t.name}</span>
                <span className="text-sm text-ink/60 leading-relaxed">{t.description}</span>
              </div>
            ))}
          </div>

          <div className="bg-primary rounded-2xl px-7 md:px-9 py-8 mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex flex-col gap-1.5">
              <span className="text-lg font-semibold text-paper">Can&apos;t travel? Ask about Physio Home Visits.</span>
              <span className="text-sm text-paper/80">Available across Lucknow for select conditions.</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="/book" variant="secondary-inverse">
                Book Appointment
              </Button>
              <WhatsAppButton className="!border-paper !text-paper hover:!bg-white/10" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileActionBar />
    </>
  );
}
