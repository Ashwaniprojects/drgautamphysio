import type { Metadata } from "next";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { PhoneIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Book Appointment | Best Chiropractor in Lucknow",
  description:
    "Book a physiotherapy appointment with Dr. S.K. Gautam — the best chiropractor in Lucknow. Choose your clinic, pick a time, confirm on WhatsApp.",
  keywords: [
    "best chiropractor in Lucknow",
    "book physiotherapy appointment Lucknow",
    "physiotherapy booking Lucknow",
    "chiropractic booking Lucknow",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <div className="bg-tint px-6 md:px-22 py-10 flex flex-col gap-2">
          <span className="text-[13px] font-bold tracking-[0.12em] uppercase text-primary">
            Book Appointment
          </span>
          <h1 className="font-display text-[26px] md:text-[34px] font-semibold text-ink">
            Book your appointment in under a minute
          </h1>
          <p className="text-[15px] md:text-base text-ink/65">
            Choose a clinic, pick a time that works, and we&apos;ll confirm on WhatsApp.
          </p>
        </div>

        <div className="px-6 md:px-22 py-10 md:py-14">
          <BookingWizard />
        </div>

        <div className="px-6 md:px-22 pb-12 flex items-center justify-center gap-2.5 text-center">
          <PhoneIcon size={16} className="text-ink/45 shrink-0" />
          <span className="text-[13.5px] text-ink/55">
            Prefer to book by phone or WhatsApp? Call {siteConfig.clinicPhoneDisplay} for same-day
            confirmation either way.
          </span>
        </div>
      </main>
      <Footer />
      <MobileActionBar />
    </>
  );
}
