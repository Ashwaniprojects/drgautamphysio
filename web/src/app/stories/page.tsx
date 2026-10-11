import type { Metadata } from "next";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { PageHeader } from "@/components/layout/PageHeader";
import { StarIcon } from "@/components/icons";
import { ScrollReveal } from "@/components/ScrollReveal";
import { conditions } from "@/lib/data/conditions";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Patient Stories | Best Physiotherapist in Lucknow",
  description:
    "Recovery stories and verified Google reviews from patients treated by Dr. S.K. Gautam — the best physiotherapist in Lucknow. 729+ verified reviews.",
  keywords: [
    "best physiotherapist in Lucknow",
    "physiotherapy reviews Lucknow",
    "Dr. Gautam patient stories",
    "back pain recovery Lucknow",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: "/stories" },
};

const reviews = [
  { condition: "Sciatica Relief", text: "After months of unbearable sciatica pain, Dr. Gautam's treatment gave me my life back. The manual therapy and personalized exercises made all the difference.", author: "Priya S.", location: "Lucknow", rating: 5 },
  { condition: "Post-Surgery Rehab", text: "Professional, knowledgeable and incredibly patient. My recovery after knee surgery was faster than expected thanks to his structured rehab program.", author: "Rajesh K.", location: "Aliganj, Lucknow", rating: 5 },
  { condition: "Chronic Back Pain", text: "18+ years of experience really shows. He identified issues other doctors missed and treated the root cause, not just the symptoms.", author: "Amit M.", location: "Indira Nagar, Lucknow", rating: 5 },
  { condition: "Sports Injury", text: "As a cricketer, getting back on the field after a shoulder injury seemed impossible. Dr. Gautam's approach got me there in record time.", author: "Siddharth P.", location: "Gomti Nagar, Lucknow", rating: 5 },
  { condition: "Neck & Posture", text: "Years of desk work had ruined my posture. The cervical treatment combined with ergonomic advice transformed how I feel every single day.", author: "Neha T.", location: "Hazratganj, Lucknow", rating: 5 },
  { condition: "Frozen Shoulder", text: "Couldn't lift my arm for months. Within weeks of starting treatment, the improvement was remarkable. Highly recommended!", author: "Vikram S.", location: "Mahanagar, Lucknow", rating: 5 },
];

export default function StoriesPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <PageHeader eyebrow="Patient Stories" title="In their own words">
          {siteConfig.googleRating} average across {siteConfig.googleReviewCount}+ Google reviews.
          Every patient has a different story — here are a few that capture what recovery feels like.
        </PageHeader>

        <div className="px-6 md:px-22 py-12 md:py-16">
          {/* Filter tags */}
          <ScrollReveal>
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="text-[13px] font-semibold px-4 py-2 rounded-full bg-primary text-paper">All conditions</span>
              {conditions.slice(0, 6).map((c) => (
                <span key={c.slug} className="text-[13px] font-semibold px-4 py-2 rounded-full bg-tint text-primary hover:bg-primary hover:text-paper transition-colors cursor-pointer">
                  {c.title}
                </span>
              ))}
            </div>
          </ScrollReveal>

          {/* Review cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {reviews.map((r, i) => (
              <ScrollReveal key={r.author} className={`reveal reveal-delay-${Math.min(i + 1, 5)}`}>
                <div className="card-hover bg-white border border-ink/8 rounded-2xl p-6 md:p-7 flex flex-col gap-4 h-full relative group">
                  {/* Quote accent */}
                  <div className="absolute top-5 right-5 text-primary/10 group-hover:text-primary/20 transition-colors">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11 7H7a2 2 0 0 0-2 2v4c0 1.1.9 2 2 2h4v-1a3 3 0 0 0-3-3H7v-1h4zm9 0h-4a2 2 0 0 0-2 2v4c0 1.1.9 2 2 2h4v-1a3 3 0 0 0-3-3h-1v-1h4z" />
                    </svg>
                  </div>

                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <StarIcon key={j} size={14} className="text-accent" />
                    ))}
                  </div>

                  <p className="text-[14.5px] leading-[1.7] text-ink/75 flex-1">
                    &ldquo;{r.text}&rdquo;
                  </p>

                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-ink/5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-200 to-primary-400 flex items-center justify-center text-paper font-semibold text-sm shrink-0">
                      {r.author.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-ink">{r.author}</span>
                      <span className="text-[12px] text-ink/50">{r.condition} &middot; {r.location}</span>
                    </div>
                  </div>

                  <div className="h-1 bg-primary-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full transition-all duration-1000" style={{ width: "100%" }} />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Social proof banner */}
          <ScrollReveal className="mt-10">
            <div className="bg-gradient-to-br from-primary-50 to-tint border border-primary-200/40 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} size={18} className="text-accent" />
                ))}
              </div>
              <span className="text-[15px] font-semibold text-ink">
                {siteConfig.googleReviewCount}+ verified Google reviews across 3 clinics
              </span>
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
      <MobileActionBar />
    </>
  );
}