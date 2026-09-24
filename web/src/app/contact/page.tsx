import type { Metadata } from "next";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { PhoneIcon, PinIcon, ClockIcon } from "@/components/icons";
import { clinics } from "@/lib/data/clinics";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact | Dr. Gautam's Physio & Rehab Centre",
  description: "Addresses, hours and phone for all 3 Dr. Gautam's Physio & Rehab Centre locations in Lucknow.",
};

export default function ContactPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <PageHeader eyebrow="Contact" title="Get in touch">
          Calling or messaging on WhatsApp gets the fastest reply. The form below is a backup, not
          the main way to reach us.
        </PageHeader>

        <div className="px-6 md:px-22 py-12 md:py-16 flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div className="flex-1 flex flex-col gap-6">
            <div className="bg-tint rounded-2xl p-6 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <PhoneIcon size={18} className="text-primary" />
                <span className="text-[15px] font-semibold text-ink">{siteConfig.clinicPhoneDisplay}</span>
              </div>
              <a href={siteConfig.whatsappHref} className="text-[15px] font-semibold text-primary">
                WhatsApp Us
              </a>
            </div>

            {clinics.map((c) => (
              <div key={c.slug} className="bg-white border border-ink/10 rounded-2xl p-6 flex flex-col gap-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-base font-semibold text-ink">{c.name}</span>
                  <span className="text-[11px] font-bold uppercase tracking-wide text-primary bg-tint px-2.5 py-1 rounded-full">
                    {c.tag}
                  </span>
                </div>
                <div className="flex items-start gap-2 text-sm text-ink/60">
                  <PinIcon size={15} className="shrink-0 mt-0.5" />
                  {c.area || "Address pending, requirements checklist §B"}
                </div>
                <div className="flex items-center gap-2 text-sm text-ink/60">
                  <ClockIcon size={15} />
                  {c.hours}
                </div>
                <div className="h-[120px] bg-tint rounded-xl flex items-center justify-center">
                  <span className="text-xs text-primary/70">[Map embed pending exact address]</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <h2 className="font-display text-2xl font-semibold text-ink">Send a message</h2>
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
      <MobileActionBar />
    </>
  );
}
