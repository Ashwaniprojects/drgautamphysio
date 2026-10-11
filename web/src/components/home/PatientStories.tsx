"use client";

import { useReveal } from "@/hooks/useScrollReveal";
import Link from "next/link";
import { StarIcon, ArrowRightIcon, QuoteIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";

const reviews = [
  { condition: "Sciatica Relief", text: "After months of unbearable sciatica pain, Dr. Gautam's treatment gave me my life back. The manual therapy and personalized exercises made all the difference.", author: "Priya S.", location: "Lucknow", rating: 5 },
  { condition: "Post-Surgery Rehab", text: "Professional, knowledgeable and incredibly patient. My recovery after knee surgery was faster than expected thanks to his structured rehab program.", author: "Rajesh K.", location: "Aliganj, Lucknow", rating: 5 },
  { condition: "Chronic Back Pain", text: "18+ years of experience really shows. He identified issues other doctors missed and treated the root cause, not just the symptoms.", author: "Amit M.", location: "Indira Nagar, Lucknow", rating: 5 },
  { condition: "Sports Injury", text: "As a cricketer, getting back on the field after a shoulder injury seemed impossible. Dr. Gautam's approach got me there in record time.", author: "Siddharth P.", location: "Gomti Nagar, Lucknow", rating: 5 },
  { condition: "Neck & Posture", text: "Years of desk work had ruined my posture. The cervical treatment combined with ergonomic advice transformed how I feel every single day.", author: "Neha T.", location: "Hazratganj, Lucknow", rating: 5 },
  { condition: "Frozen Shoulder", text: "Couldn't lift my arm for months. Within weeks of starting treatment, the improvement was remarkable. Highly recommended!", author: "Vikram S.", location: "Mahanagar, Lucknow", rating: 5 },
];

export function PatientStories() {
  const sectionRef = useReveal();

  return (
    <section id="stories" className="relative bg-paper px-6 md:px-22 py-14 md:py-22 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" aria-hidden="true"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, var(--color-primary) 1px, transparent 0)", backgroundSize: "40px 40px" }}
      />

      <div ref={sectionRef} className="relative">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div className="flex flex-col gap-3 max-w-2xl">
            <span className="reveal text-[13px] font-bold tracking-[0.12em] uppercase text-primary">
              Patient stories
            </span>
            <h2 className="reveal reveal-delay-1 font-display text-[28px] md:text-[38px] font-semibold text-ink leading-[1.15]">
              In their own words.
            </h2>
            <p className="reveal reveal-delay-2 text-[15px] text-ink/55">
              Real stories from patients who trusted Dr. Gautam with their recovery.
            </p>
          </div>
          <Link href="/stories" className="reveal reveal-delay-2 inline-flex items-center gap-1.5 text-primary text-[15px] font-semibold shrink-0 hover:gap-2.5 transition-all">
            All reviews <ArrowRightIcon size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {reviews.map((r, i) => (
            <div
              key={r.author}
              className={`reveal reveal-delay-${Math.min(i + 1, 5)} card-hover bg-white rounded-2xl p-6 md:p-7 border border-ink/8 flex flex-col gap-4 relative`}
            >
              {/* Quote icon */}
              <div className="absolute top-5 right-6 text-primary/10" aria-hidden="true">
                <QuoteIcon size={32} />
              </div>

              <div>
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: r.rating }).map((_, idx) => (
                    <StarIcon key={idx} size={14} className="text-accent" />
                  ))}
                </div>
                <p className="text-[14.5px] leading-[1.7] text-ink/75">
                  &ldquo;{r.text}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-ink/5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-200 to-primary-400 flex items-center justify-center text-paper font-semibold text-sm shrink-0">
                  {r.author.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-ink">{r.author}</span>
                  <span className="text-[12px] text-ink/50">{r.condition} &middot; {r.location}</span>
                </div>
              </div>

              {/* Rating bar */}
              <div className="h-1 bg-primary-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full" style={{ width: `${r.rating * 20}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="reveal text-center mt-8">
          <div className="inline-flex items-center gap-3 bg-primary-50 rounded-full px-6 py-3 border border-primary-200/50">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} size={16} className="text-accent" />
              ))}
            </div>
            <span className="text-sm font-semibold text-ink">
              {siteConfig.googleReviewCount}+ verified reviews on Google
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
