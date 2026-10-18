import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata, absoluteUrl, brand } from "@/lib/metadata";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { ScrollReveal } from "@/components/ScrollReveal";
import { articles, getArticle } from "@/lib/data/blog";
import type { BlogArticle } from "@/lib/data/blog";
import { clinics } from "@/lib/data/clinics";
import { doctor } from "@/lib/data/doctor";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return buildMetadata({
    title: `${article.title} | Dr. Gautam's Physio Blog`,
    description: article.excerpt,
    path: `/blog/${slug}`,
    keywords: [
      `${article.category.toLowerCase()} physiotherapy`,
      "physiotherapy blog Lucknow",
      "Dr. Gautam physiotherapy",
      "physiotherapy Lucknow",
    ],
  });
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const published = new Date(article.publishedAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <div className="bg-gradient-to-br from-primary-900 to-primary-700 text-white">
          <div className="max-w-3xl mx-auto px-6 py-14 md:py-18">
            <div className="flex items-center gap-3 text-[12px] font-semibold tracking-[0.08em] uppercase mb-5">
              <Link href="/blog" className="text-white/60 hover:text-white transition-colors">
                Blog
              </Link>
              <span className="text-white/30">/</span>
              <span className="text-white/80">{article.category}</span>
            </div>
            <h1 className="text-[28px] md:text-[38px] font-bold leading-tight mb-4">
              {article.title}
            </h1>
            <p className="text-[15px] md:text-[16px] leading-relaxed text-white/75 max-w-2xl">
              {article.heroSubhead}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-7 text-[13px] text-white/60">
              <span>By {doctor.name}</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span>{published}</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
          <ScrollReveal>
            <div className="space-y-6">
              {article.blocks.map((block, i) => <ArticleBlockView key={i} block={block} />)}
            </div>
          </ScrollReveal>

          <div className="mt-14 p-7 md:p-8 bg-primary-50 border border-primary-100 rounded-2xl">
            <h2 className="text-[20px] font-bold text-ink mb-2">Still not sure it's a physio case?</h2>
            <p className="text-[14.5px] text-ink/60 mb-5 leading-relaxed">
              The articles here are general guidance, not your specific case. If you're unsure whether to
              go to physio, get it looked at properly rather than guessed at.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/book">Book an assessment</Button>
              <WhatsAppButton className="bg-white" />
            </div>
            <div className="mt-5 pt-5 border-t border-primary-100 text-[13px] text-ink/55 leading-relaxed">
              {clinics[0].name} — {clinics[0].address} · {clinics[0].phoneDisplay}
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-ink/10">
            <h3 className="text-[13px] font-bold tracking-[0.08em] uppercase text-ink/45 mb-4">
              More from the blog
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {articles
                .filter((a) => a.slug !== article.slug)
                .slice(0, 4)
                .map((a) => (
                  <Link
                    key={a.slug}
                    href={`/blog/${a.slug}`}
                    className="group p-4 rounded-xl border border-ink/8 hover:border-primary-300 hover:bg-primary-50/40 transition-colors"
                  >
                    <div className="text-[11px] font-semibold tracking-[0.08em] uppercase text-primary mb-1.5">
                      {a.category}
                    </div>
                    <div className="text-[14px] font-semibold text-ink group-hover:text-primary transition-colors leading-snug">
                      {a.title}
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileActionBar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema(article, published),
          ),
        }}
      />
    </>
  );
}

function articleSchema(article: BlogArticle, publishedDate: string) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: article.title,
    description: article.excerpt,
    url: absoluteUrl(`/blog/${article.slug}`),
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    inLanguage: "en-IN",
    author: {
      "@type": "Person",
      name: doctor.fullName,
      jobTitle: doctor.title,
    },
    publisher: {
      "@type": "MedicalBusiness",
      name: brand,
      url: absoluteUrl("/"),
    },
    articleSection: article.category,
    medicalSpecialty: "Physical Therapy",
  };
}

function ArticleBlockView({ block }: { block: BlogArticle["blocks"][number] }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="text-[22px] font-bold text-ink pt-2">{block.text}</h2>
      );
    case "p":
      return (
        <p className="text-[15.5px] leading-[1.8] text-ink/75">{block.text}</p>
      );
    case "ul":
      return (
        <ul className="space-y-2.5 pl-1">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-[15.5px] leading-[1.7] text-ink/75">
              <span className="mt-[10px] w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="space-y-2.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-[15.5px] leading-[1.7] text-ink/75">
              <span className="shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary text-[12px] font-bold flex items-center justify-center mt-[3px]">
                {i + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <div className="p-5 md:p-6 bg-amber-50 border border-amber-200 border-l-4 rounded-xl">
          <div className="text-[13px] font-bold tracking-[0.06em] uppercase text-amber-700 mb-2">
            ⚠ {block.title}
          </div>
          <p className="text-[14.5px] leading-[1.7] text-amber-900/85">{block.text}</p>
        </div>
      );
  }
}
