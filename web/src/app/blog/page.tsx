import type { Metadata } from "next";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { PageHeader } from "@/components/layout/PageHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowRightIcon } from "@/components/icons";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Physiotherapy Blog | Best Chiropractor in Lucknow",
  description:
    "Straight answers on recovery, physiotherapy and rehabilitation from Dr. S.K. Gautam — the best chiropractor in Lucknow. Evidence-based insights.",
  keywords: [
    "best chiropractor in Lucknow",
    "physiotherapy tips Lucknow",
    "back pain advice Lucknow",
    "rehabilitation blog Lucknow",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: "/blog" },
};

const posts = [
  { tag: "Sciatica", title: "Sciatica pain: what actually helps, and what to skip", readTime: "5 min read", icon: "🔬" },
  { tag: "Recovery", title: "How many physiotherapy sessions will I actually need?", readTime: "4 min read", icon: "📈" },
  { tag: "Post-Surgery", title: "Getting back on your feet after joint replacement", readTime: "6 min read", icon: "🦴" },
  { tag: "Neck Pain", title: "Why your neck hurts and what to do about it", readTime: "4 min read", icon: "💆" },
  { tag: "Sports Injuries", title: "Returning to sport after injury: a realistic timeline", readTime: "5 min read", icon: "⚽" },
  { tag: "Back Pain", title: "Slip disc: surgery isn't always the answer", readTime: "6 min read", icon: "🧠" },
];

export default function BlogIndexPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <PageHeader eyebrow="Blog" title="Straight answers on recovery">
          Category-tagged articles on conditions, treatment and what to actually expect from physiotherapy.
        </PageHeader>

        <div className="px-6 md:px-22 py-12 md:py-16">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {posts.map((p, i) => (
                <article
                  key={p.title}
                  className={`reveal reveal-delay-${Math.min(i + 1, 5)} card-hover group bg-white border border-ink/8 rounded-2xl overflow-hidden`}
                >
                  <div className="relative h-[140px] bg-gradient-to-br from-primary-100 to-primary-50 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-60 group-hover:scale-110 transition-transform duration-500">
                      {p.icon}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                    <span className="absolute top-3 left-3 text-[11px] font-bold tracking-[0.08em] uppercase bg-white/90 text-primary px-2.5 py-1 rounded-full">
                      {p.tag}
                    </span>
                  </div>
                  <div className="p-5 md:p-6 flex flex-col gap-3">
                    <h3 className="text-[16px] font-semibold leading-snug text-ink group-hover:text-primary transition-colors">
                      {p.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] text-ink/40">{p.readTime}</span>
                      <Link href="/blog" className="inline-flex items-center gap-1 text-primary text-[13px] font-semibold group-hover:gap-2 transition-all">
                        Read <ArrowRightIcon size={12} />
                      </Link>
                    </div>
                  </div>
                </article>
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