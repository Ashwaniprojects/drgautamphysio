import type { Metadata } from "next";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Blog | Dr. Gautam's Physio & Rehab Centre",
  description: "Straight answers on recovery, physiotherapy and rehabilitation from Dr. S.K. Gautam.",
};

const posts = [
  {
    tag: "Sciatica",
    title: "Sciatica pain: what actually helps, and what to skip",
    note: "This migrates the existing sciatica article from the current site. Source content needed before publishing.",
  },
  {
    tag: "Recovery",
    title: "How many physiotherapy sessions will I actually need?",
    note: "Draft pending. Needs Dr. Gautam's input on typical session counts per condition, requirements checklist §C.",
  },
  {
    tag: "Post-Surgery",
    title: "Getting back on your feet after joint replacement",
    note: "Draft pending.",
  },
];

export default function BlogIndexPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <PageHeader eyebrow="Blog" title="Straight answers on recovery">
          Category-tagged articles on conditions, treatment and what to actually expect. Posts below
          are placeholders until real content is written.
        </PageHeader>

        <div className="px-6 md:px-22 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((p) => (
              <div key={p.title} className="flex flex-col gap-3.5">
                <div className="h-[160px] rounded-2xl bg-tint border-[1.5px] border-dashed border-primary/35 flex items-center justify-center p-4 text-center">
                  <span className="text-xs text-primary font-semibold">[Featured image pending]</span>
                </div>
                <span className="text-[12px] font-bold tracking-[0.08em] uppercase text-primary">{p.tag}</span>
                <span className="text-lg font-semibold leading-snug">{p.title}</span>
                <span className="text-xs text-ink/50 leading-relaxed">{p.note}</span>
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
