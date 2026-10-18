import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { PageHeader } from "@/components/layout/PageHeader";
import { ArrowRightIcon } from "@/components/icons";
import { ScrollReveal } from "@/components/ScrollReveal";
import { articles } from "@/lib/data/blog";

export const metadata: Metadata = buildMetadata({
  title: "Physiotherapy Blog | Dr. Gautam's Physio & Rehab Centre",
  description:
    "Physiotherapy articles by Dr. S.K. Gautam: what actually helps with sciatica, slip disc, neck pain and sports injuries, and how long recovery really takes.",
  path: "/blog",
  keywords: [
    "physiotherapy blog Lucknow",
    "physiotherapy tips Lucknow",
    "back pain advice Lucknow",
    "sciatica home care",
    "physiotherapy exercises Lucknow",
  ],
});

const categoryTone: Record<string, string> = {
  Sciatica: "bg-amber-50 text-amber-700",
  Recovery: "bg-emerald-50 text-emerald-700",
  "Post-Surgery": "bg-sky-50 text-sky-700",
  "Neck Pain": "bg-violet-50 text-violet-700",
  "Sports Injuries": "bg-rose-50 text-rose-700",
  "Back Pain": "bg-teal-50 text-teal-700",
};

const categoryIcon: Record<string, string> = {
  Sciatica: "⚡",
  Recovery: "📈",
  "Post-Surgery": "🦴",
  "Neck Pain": "💆",
  "Sports Injuries": "⚽",
  "Back Pain": "🧍",
};

export default function BlogIndexPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <PageHeader eyebrow="Blog" title="Straight answers on recovery">
          Category-tagged articles on conditions, treatment and what to actually expect from physiotherapy —
          written by Dr. Gautam, not adapted from somewhere else.
        </PageHeader>

        <div className="px-6 md:px-22 py-12 md:py-16">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {articles.map((a, i) => (
                <Link
                  key={a.slug}
                  href={`/blog/${a.slug}`}
                  className={`reveal reveal-delay-${Math.min(i + 1, 5)} card-hover group flex flex-col bg-white border border-ink/8 rounded-2xl overflow-hidden`}
                >
                  <div className="relative h-[120px] bg-gradient-to-br from-primary-100 to-primary-50 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-60 group-hover:scale-110 transition-transform duration-500">
                      {categoryIcon[a.category] ?? "🩺"}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                    <span
                      className={`absolute top-3 left-3 text-[11px] font-bold tracking-[0.08em] uppercase px-2.5 py-1 rounded-full ${categoryTone[a.category] ?? "bg-white/90 text-primary"}`}
                    >
                      {a.category}
                    </span>
                  </div>
                  <div className="p-5 md:p-6 flex flex-col gap-3 flex-1">
                    <h2 className="text-[17px] font-semibold leading-snug text-ink group-hover:text-primary transition-colors">
                      {a.title}
                    </h2>
                    <p className="text-[13.5px] leading-relaxed text-ink/60 line-clamp-2">{a.excerpt}</p>
                    <div className="mt-auto flex items-center justify-between pt-1">
                      <span className="text-[12px] text-ink/40">
                        {a.readTime} · {new Date(a.publishedAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                      </span>
                      <span className="inline-flex items-center gap-1 text-primary text-[13px] font-semibold group-hover:gap-2 transition-all">
                        Read <ArrowRightIcon size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
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
