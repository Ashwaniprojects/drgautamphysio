"use client";

import { useReveal } from "@/hooks/useScrollReveal";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";

const posts = [
  {
    tag: "Sciatica",
    title: "Sciatica pain: what actually helps, and what to skip",
    readTime: "5 min read",
    icon: "🔬",
  },
  {
    tag: "Recovery",
    title: "How many physiotherapy sessions will I actually need?",
    readTime: "4 min read",
    icon: "📈",
  },
  {
    tag: "Post-Surgery",
    title: "Getting back on your feet after joint replacement",
    readTime: "6 min read",
    icon: "🦴",
  },
];

export function BlogPreview() {
  const sectionRef = useReveal();

  return (
    <section id="blog" className="bg-paper px-6 md:px-22 py-14 md:py-22">
      <div ref={sectionRef}>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div className="flex flex-col gap-3 max-w-2xl">
            <span className="reveal text-[13px] font-bold tracking-[0.12em] uppercase text-primary">
              From the blog
            </span>
            <h2 className="reveal reveal-delay-1 font-display text-[28px] md:text-[38px] font-semibold text-ink leading-[1.15]">
              Straight answers on<br />
              <span className="text-primary">recovery &amp; treatment.</span>
            </h2>
            <p className="reveal reveal-delay-2 text-[15px] text-ink/55">
              Evidence-based insights from Dr. Gautam&apos;s 18+ years of clinical practice.
            </p>
          </div>
          <Link href="/blog" className="reveal reveal-delay-2 inline-flex items-center gap-1.5 text-primary text-[15px] font-semibold shrink-0 hover:gap-2.5 transition-all">
            Visit the blog <ArrowRightIcon size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {posts.map((p, i) => (
            <Link
              key={p.title}
              href="/blog"
              className={`reveal reveal-delay-${i + 1} card-hover group bg-white rounded-2xl overflow-hidden border border-ink/8`}
            >
              {/* Visual header */}
              <div className="relative h-[140px] bg-gradient-to-br from-primary-100 to-primary-50 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-60 group-hover:scale-110 transition-transform duration-500">
                  {p.icon}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
              </div>

              <div className="p-5 md:p-6 flex flex-col gap-3">
                <span className="text-[11px] font-bold tracking-[0.08em] uppercase text-primary">
                  {p.tag}
                </span>
                <span className="text-[16px] font-semibold leading-snug text-ink group-hover:text-primary transition-colors">
                  {p.title}
                </span>
                <span className="text-[12px] text-ink/40">{p.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
