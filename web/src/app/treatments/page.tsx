import type { Metadata } from "next";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { ScrollReveal } from "@/components/ScrollReveal";
import { treatments } from "@/lib/data/treatments";

export const metadata: Metadata = {
  title: "Treatment Techniques | Best Chiropractor in Lucknow",
  description:
    "Chiropractic, osteopathy, manual therapy, dry needling, cupping, craniosacral therapy and FDM from Dr. S.K. Gautam — the best chiropractor in Lucknow.",
  keywords: [
    "chiropractor Lucknow",
    "best chiropractor in Lucknow",
    "osteopathy Lucknow",
    "manual therapy Lucknow",
    "dry needling Lucknow",
    "FDM therapy Lucknow",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: "/treatments" },
};

export default function TreatmentsPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <PageHeader eyebrow="How We Treat You" title="Eleven advanced techniques, chosen at assessment">
          Dr. Gautam chooses the approach based on your assessment, not the other way around. These
          are the techniques he draws from.
        </PageHeader>

        <div className="px-6 md:px-22 py-12 md:py-16">
          <ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {treatments.map((t, i) => (
                <div
                  key={t.name}
                  className="bg-white border border-ink/8 rounded-2xl p-6 flex flex-col gap-2.5 card-hover group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 group-hover:bg-primary group-hover:text-white flex items-center justify-center text-lg transition-all duration-300 shrink-0">
                      🏥
                    </div>
                    <span className="text-[11px] font-bold tracking-[0.06em] uppercase text-primary/60 group-hover:text-primary/80 transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <span className="text-base font-semibold text-ink group-hover:text-primary transition-colors leading-snug">{t.name}</span>
                  <span className="text-sm text-ink/55 leading-relaxed">{t.description}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal className="mt-8">
            <div className="relative bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 rounded-2xl px-7 md:px-9 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[150px] h-[150px] bg-primary-300/10 rounded-full blur-xl translate-y-1/2 -translate-x-1/2" />
              </div>

              <div className="flex items-center gap-4 relative">
                <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 10.5L12 4l9 6.5" />
                    <path d="M5 9.5V20h14V9.5" />
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-lg font-semibold text-paper">Can&apos;t travel? Ask about Physio Home Visits.</span>
                  <span className="text-sm text-paper/70">Available across Lucknow for select conditions.</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 relative">
                <Button href="/book" variant="secondary-inverse">Book Appointment</Button>
                <WhatsAppButton className="!border-paper !text-paper hover:!bg-white/10" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
      <MobileActionBar />
    </>
  );
}
