import { PhoneIcon } from "@/components/icons";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { ScrollReveal } from "@/components/ScrollReveal";
import { siteConfig } from "@/lib/site-config";
import { doctor } from "@/lib/data/doctor";
import Image from "next/image";

const achievements = [
  { year: "2026", title: "Significant Contribution Award", org: "IAP Excellence Awards", event: "World Physiotherapy Asia Western Pacific Regional Conference, New Delhi", highlight: true },
  { year: "2026", title: "Distinguished Clinical Service Award", org: "Physioconnect 6 International Conference", event: "Gurugram", highlight: true },
  { year: "2025", title: "Physio Ratan Award", org: "Physio Guide 3 National Conference", event: "Aligarh" },
  { year: "2025", title: "Dhanvantri Award, Clinician Senior", org: "Physioconnect 5 International Conference", event: "Greater Noida" },
  { year: "2025", title: "Session Chairperson", org: "Physioconnect 5 International Conference", event: "Greater Noida", isRole: true },
  { year: "2025", title: "Chairperson", org: "Physio Guide 3 National Conference", event: "Aligarh", isRole: true },
  { year: "2025", title: "Judge", org: "3rd National Conference of IPA Women Cell & Physio Manthan", event: "New Delhi", isRole: true },
  { year: "2023", title: "Outstanding Clinical Award", org: "Kanpur PHYSIOCON", event: "Kanpur" },
  { year: "2022", title: "Best Clinical Award", org: "Physio Guide 2 National Conference", event: "Aligarh" },
  { year: "2020", title: "Best Contribution in Society", org: "Prem Narayan Memorial Charitable Trust", event: "Award ceremony" },
  { year: "2019", title: "Best Physio Award", org: "Ayodhya Physio Symposium", event: "Ayodhya" },
  { year: "2019", title: "Excellent Contribution in Physiotherapy", org: "Bareilly Chapter", event: "Bareilly" },
  { year: "2019", title: "Outstanding Clinical Award", org: "National Physiotherapy Conference", event: "Mathura" },
  { year: "2019", title: "Significant Contribution Award", org: "1st National Osteo Conference", event: "Kanpur" },
  { year: "2019", title: "Star Physio Award", org: "World Physiotherapy Day, LPA", event: "Lucknow" },
];

const academicContributions = [
  "Invited lecture: Role of Fascial Distortion Model in Knee Joint Disorders, 3rd State Conference, MS Hospital & Research Centre, Lucknow",
  "Organized a CME on professional acceptance and ethics under NCAHP, IAP Lucknow District Branch",
  "Organized a hands-on Spine Alignment workshop with the Department of Plastic and Reconstructive Surgery, KGMU, Lucknow",
];

export default function AwardsPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <div className="bg-gradient-to-r from-primary-900 to-primary-800 h-10 flex items-center justify-between px-6 md:px-22 text-[13px] font-medium text-paper relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)", animation: "shimmer 4s ease infinite" }} />
        <div className="flex items-center gap-2 relative">
          <span className="relative flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <PhoneIcon size={14} />
            <a href={siteConfig.clinicPhoneHref} className="hover:underline font-medium">{siteConfig.clinicPhoneDisplay}</a>
          </span>
          <span className="hidden sm:inline text-white/40">&nbsp;&middot;&nbsp;3 clinics across Lucknow</span>
        </div>
        <a href={siteConfig.whatsappHref} className="font-semibold hover:underline relative">WhatsApp Us</a>
      </div>

      <div className="bg-tint px-6 md:px-22 py-10 md:py-14 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-primary-200/20 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="relative">
          <ScrollReveal>
            <span className="text-[13px] font-bold tracking-[0.12em] uppercase text-primary block mb-3">Recognition & Achievement</span>
            <h1 className="font-display text-[28px] md:text-[42px] font-semibold text-ink leading-[1.12]">
              Awards & Recognition
            </h1>
            <p className="text-[15px] md:text-base text-ink/60 max-w-2xl mt-3 leading-relaxed">
              {doctor.fullName} {doctor.suffix} — {doctor.title} — recognized for clinical excellence and academic contributions at national and international physiotherapy conferences.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <main className="bg-paper px-6 md:px-22 py-14 md:py-20">
        {/* Highlight awards */}
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-16">
            {achievements.filter(a => a.highlight).map((a, i) => (
              <div
                key={a.title}
                className="relative bg-gradient-to-br from-primary-50 to-white rounded-2xl p-6 md:p-7 border border-primary-200/60 overflow-hidden card-hover"
              >
                <div className="absolute top-4 right-4 text-3xl" aria-hidden="true">🏆</div>
                <div className="relative">
                  <span className="inline-block text-[11px] font-bold tracking-[0.08em] uppercase bg-primary text-paper px-3 py-1 rounded-full mb-3">
                    {a.year}
                  </span>
                  <h3 className="text-[18px] font-semibold text-ink leading-snug">{a.title}</h3>
                  <p className="text-sm text-ink/55 mt-1.5">{a.org}</p>
                  <p className="text-[13px] text-ink/40 mt-1">{a.event}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Timeline of all awards */}
        <div className="max-w-3xl mx-auto mb-16">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-semibold text-ink mb-8">All Awards & Appointments</h2>
          </ScrollReveal>

          <div className="relative">
            <div className="absolute left-[28px] md:left-[34px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-primary-300 via-primary-200 to-primary-100" aria-hidden="true" />

            <div className="flex flex-col gap-5">
              {achievements.map((a, i) => (
                <ScrollReveal key={`${a.title}-${a.year}`} className={`reveal-delay-${Math.min(i + 1, 5)}`}>
                  <div className="flex gap-5 md:gap-6">
                    <div className="shrink-0 w-[56px] md:w-[68px] flex flex-col items-center">
                      <div className={`w-[56px] md:w-[68px] h-[56px] md:h-[68px] rounded-full flex items-center justify-center shrink-0 ${a.highlight ? "bg-gradient-to-br from-primary to-primary-dark shadow-[0_4px_16px_rgba(13,148,136,0.25)]" : "bg-primary-50 border border-primary-200/60"}`}>
                        <span className={`font-display text-[13px] md:text-sm font-bold ${a.highlight ? "text-paper" : "text-primary"}`}>{a.year}</span>
                      </div>
                    </div>
                    <div className="flex-1 pb-5 border-b border-ink/5 last:border-0">
                      <h3 className="text-[15px] md:text-base font-semibold text-ink">{a.title}</h3>
                      <p className="text-[13.5px] text-ink/55 mt-0.5">{a.org}</p>
                      <p className="text-[12.5px] text-ink/40 mt-0.5">{a.event}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        {/* Certificate & award photos */}
        <ScrollReveal>
          <h2 className="font-display text-2xl font-semibold text-ink mb-2">Award certificates</h2>
          <p className="text-[13px] text-ink/50 mb-5 -mt-1">Scans of award certificates and event photos from conferences.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { src: "/images/award-photo-world-physio-2026.jpg", alt: "Significant Contribution Award — World Physiotherapy Asia Western Pacific Regional Conference, New Delhi 2026" },
              { src: "/images/iap-award-certificate-2026.jpg", alt: "IAP Excellence Awards 2026 certificate" },
              { src: "/images/iap-excellence-award-2026.jpg", alt: "IAP Excellence Award" },
              { src: "/images/physio-guide-3-award.jpg", alt: "Physio Guide 3 National Conference award" },
              { src: "/images/physio-guide-3-conference.jpg", alt: "Physio Guide 3 conference" },
            ].map((photo) => (
              <div key={photo.src} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-ink/8 bg-ink/5 hover:shadow-lg transition-shadow duration-300">
                <Image src={photo.src} alt={photo.alt} fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Academic contributions */}
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-semibold text-ink mb-6">Academic Contributions</h2>
          </ScrollReveal>
          <ScrollReveal className="reveal-delay-1">
            <div className="flex flex-col gap-3">
              {academicContributions.map((item) => (
                <div key={item} className="flex gap-3 items-start bg-white rounded-xl p-4 md:p-5 border border-ink/8 card-hover">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-primary shrink-0 mt-0.5">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                  <span className="text-[14px] leading-relaxed text-ink/70">{item}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
      <MobileActionBar />
    </>
  );
}
