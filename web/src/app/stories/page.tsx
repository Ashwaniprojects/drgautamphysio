import type { Metadata } from "next";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { PageHeader } from "@/components/layout/PageHeader";
import { StarIcon } from "@/components/icons";
import { conditions } from "@/lib/data/conditions";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Patient Stories | Dr. Gautam's Physio & Rehab Centre",
  description: "Reviews and recovery stories from patients treated by Dr. S.K. Gautam in Lucknow.",
};

const placeholderReviews = [
  { condition: "Sciatica", source: "Google Review" },
  { condition: "Post-Surgery Rehab", source: "JustDial" },
  { condition: "Frozen Shoulder", source: "Google Review" },
  { condition: "Back Pain & Slip Disc", source: "Google Review" },
  { condition: "Sports Injury Recovery", source: "JustDial" },
  { condition: "Joint & Arthritis Pain", source: "Google Review" },
];

export default function StoriesPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <PageHeader eyebrow="Patient Stories" title="In their own words">
          {siteConfig.googleRating} average across {siteConfig.googleReviewCount}+ Google reviews, plus{" "}
          {siteConfig.justdialRating} from {siteConfig.justdialReviewCount}+ ratings on JustDial. Named
          reviews below are pending signed patient consent, see requirements checklist §D.
        </PageHeader>

        <div className="px-6 md:px-22 py-12 md:py-16">
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="text-[13px] font-semibold px-4 py-2 rounded-full bg-primary text-paper">All conditions</span>
            {conditions.map((c) => (
              <span key={c.slug} className="text-[13px] font-semibold px-4 py-2 rounded-full bg-tint text-primary">
                {c.title}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {placeholderReviews.map((r, i) => (
              <div key={i} className="bg-white border border-ink/10 rounded-2xl p-7 flex flex-col gap-3.5">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <StarIcon key={j} size={14} className="text-accent" />
                  ))}
                </div>
                <p className="text-[15px] leading-relaxed text-ink">
                  &ldquo;[Patient quote pending consent. A specific recovery story in the patient&apos;s own
                  words replaces this line.]&rdquo;
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <div className="w-10 h-10 rounded-full bg-tint shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">[Patient name]</span>
                    <span className="text-xs text-ink/55">
                      Treated for {r.condition} &middot; {r.source}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <MobileActionBar />
    </>
  );
}
