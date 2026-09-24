import type { Metadata } from "next";
import Link from "next/link";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { PageHeader } from "@/components/layout/PageHeader";
import { ConditionIcon } from "@/components/ConditionIcon";
import { ArrowRightIcon } from "@/components/icons";
import { conditions } from "@/lib/data/conditions";

export const metadata: Metadata = {
  title: "Conditions We Treat | Dr. Gautam's Physio & Rehab Centre",
  description:
    "Back pain, sciatica, neck and shoulder pain, sports injuries, post-surgery rehab, joint and arthritis pain, and women's and pediatric physiotherapy in Lucknow.",
};

export default function ConditionsIndexPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <PageHeader eyebrow="Conditions We Treat" title="Tell us where it hurts">
          Every condition page below covers who it helps, what a session actually involves, and a
          realistic recovery window, not a generic description copied across every page.
        </PageHeader>

        <div className="px-6 md:px-22 py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {conditions.map((c) => (
              <Link
                key={c.slug}
                href={`/conditions/${c.slug}`}
                className="bg-white border border-ink/10 rounded-2xl p-6 flex flex-col gap-4 hover:shadow-md hover:border-primary/30 transition-all"
              >
                <span className="w-13 h-13 rounded-[14px] bg-tint flex items-center justify-center text-primary">
                  <ConditionIcon icon={c.icon} size={26} />
                </span>
                <div className="flex flex-col gap-2">
                  <span className="text-lg font-semibold text-ink">{c.title}</span>
                  <span className="text-sm text-ink/60 leading-relaxed">{c.heroSubhead}</span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold mt-auto">
                  Read more <ArrowRightIcon size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <MobileActionBar />
    </>
  );
}
