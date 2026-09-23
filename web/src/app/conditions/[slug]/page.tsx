import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { Button } from "@/components/ui/Button";
import { CheckIcon, PinIcon } from "@/components/icons";
import { conditions, getCondition } from "@/lib/data/conditions";
import { clinics } from "@/lib/data/clinics";

export function generateStaticParams() {
  return conditions.filter((c) => c.published).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const condition = getCondition(slug);
  if (!condition) return {};
  return {
    title: `${condition.title} Treatment in Lucknow — Dr. Gautam's Physio`,
    description: condition.heroSubhead,
  };
}

export default async function ConditionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const condition = getCondition(slug);
  if (!condition) notFound();

  return (
    <>
      <TopBar />
      <Navbar />
      <main className="flex-1">
        {/* Page header */}
        <div className="bg-tint px-6 md:px-22 py-10 md:py-14">
          <div className="flex items-center gap-2 text-[13px] text-ink/55 mb-6">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span>Conditions We Treat</span>
            <span>/</span>
            <span className="text-primary font-semibold">{condition.title}</span>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
            <div className="flex-1 flex flex-col gap-4 max-w-xl">
              <h1 className="font-display text-[30px] md:text-[44px] font-semibold leading-[1.14] text-ink">
                {condition.title} Treatment in Lucknow
              </h1>
              <p className="text-[16px] md:text-[17px] leading-relaxed text-ink/70 max-w-[560px]">
                {condition.heroSubhead}
              </p>
              <div className="flex flex-wrap gap-3.5 mt-2">
                <Button href="/book">Book an Assessment</Button>
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-full text-[15.5px] font-semibold border-[1.5px] border-primary text-primary px-6.5 py-3.5 hover:bg-white"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
            <div className="flex-1 w-full h-[220px] bg-white rounded-[20px] border-[1.5px] border-dashed border-primary/35 flex items-center justify-center text-center p-6">
              <span className="text-[13.5px] text-primary font-semibold">
                [PHOTO: Dr. Gautam assessing a patient&apos;s condition]
              </span>
            </div>
          </div>
        </div>

        {/* Who this helps */}
        <div className="px-6 md:px-22 py-12 md:py-16 flex flex-col lg:flex-row gap-10 lg:gap-16">
          <div className="flex-1 flex flex-col gap-4">
            <span className="text-[13px] font-bold tracking-[0.12em] uppercase text-primary">
              Who this helps
            </span>
            <h2 className="font-display text-[24px] md:text-[30px] font-semibold text-ink">
              You&apos;re in the right place if…
            </h2>
            <p className="text-[15.5px] md:text-base leading-relaxed text-ink/70">{condition.whoHelpsIntro}</p>
          </div>
          <div className="flex-1 flex flex-col gap-3.5">
            {condition.whoHelpsBullets?.map((b) => (
              <div key={b} className="flex items-start gap-3">
                <CheckIcon size={20} className="text-primary shrink-0 mt-0.5" />
                <span className="text-[15px] md:text-[15.5px] leading-relaxed text-ink">{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* What a session involves */}
        <div className="bg-tint px-6 md:px-22 py-12 md:py-16">
          <div className="flex flex-col gap-2.5 max-w-2xl mb-9">
            <span className="text-[13px] font-bold tracking-[0.12em] uppercase text-primary">
              What a session involves
            </span>
            <h2 className="font-display text-[24px] md:text-[30px] font-semibold text-ink">Four parts, every visit</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {condition.sessionSteps?.map((s, i) => (
              <div key={s.title} className="bg-white rounded-2xl p-5.5 flex flex-col gap-2.5">
                <span className="font-display text-[22px] font-semibold text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[15.5px] font-semibold text-ink">{s.title}</span>
                <span className="text-[13.5px] text-ink/55 leading-relaxed">{s.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recovery window */}
        {condition.recovery && (
          <div className="px-6 md:px-22 py-12 md:py-16">
            <div className="flex flex-col gap-2.5 max-w-2xl mb-8">
              <span className="text-[13px] font-bold tracking-[0.12em] uppercase text-primary">
                Realistic recovery window
              </span>
              <h2 className="font-display text-[24px] md:text-[30px] font-semibold text-ink">
                What to actually expect
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
              <div className="bg-tint rounded-2xl p-6 flex flex-col gap-1.5">
                <span className="font-display text-2xl font-semibold text-primary">{condition.recovery.sessions}</span>
                <span className="text-sm text-ink/65">Typical program length — confirmed with Dr. Gautam at assessment</span>
              </div>
              <div className="bg-tint rounded-2xl p-6 flex flex-col gap-1.5">
                <span className="font-display text-2xl font-semibold text-primary">{condition.recovery.firstChange}</span>
                <span className="text-sm text-ink/65">When most patients notice a first change — not a guaranteed outcome</span>
              </div>
              <div className="bg-tint rounded-2xl p-6 flex flex-col gap-1.5">
                <span className="font-display text-2xl font-semibold text-primary">{condition.recovery.frequency}</span>
                <span className="text-sm text-ink/65">Typical visit frequency during active treatment</span>
              </div>
            </div>
            <p className="text-[13.5px] text-ink/55 leading-relaxed max-w-3xl">
              Every case is different — these ranges are placeholders pending Dr. Gautam&apos;s confirmed figures
              (requirements checklist §C). The real timeline for your case is set at the first assessment, not before.
            </p>
          </div>
        )}

        {/* FAQ */}
        <div className="bg-tint px-6 md:px-22 py-12 md:py-16">
          <div className="flex flex-col gap-2.5 max-w-2xl mb-8">
            <span className="text-[13px] font-bold tracking-[0.12em] uppercase text-primary">
              Common questions
            </span>
            <h2 className="font-display text-[24px] md:text-[30px] font-semibold text-ink">Before you book</h2>
          </div>
          <div className="flex flex-col gap-3.5">
            {condition.faqs?.map((f) => (
              <details key={f.q} className="bg-white rounded-2xl px-6 py-5 group">
                <summary className="text-[15.5px] md:text-base font-semibold text-ink cursor-pointer list-none flex items-center justify-between gap-4">
                  {f.q}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 text-ink/50 group-open:rotate-180 transition-transform"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </summary>
                <p className="text-[14.5px] leading-relaxed text-ink/65 mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Location + booking */}
        <div className="px-6 md:px-22 py-12 md:py-16">
          <div className="flex flex-col gap-2.5 max-w-2xl mb-7">
            <span className="text-[13px] font-bold tracking-[0.12em] uppercase text-primary">
              Where to come in
            </span>
            <h2 className="font-display text-[24px] md:text-[30px] font-semibold text-ink">
              Book your assessment at any of our 3 clinics
            </h2>
          </div>
          <div className="bg-primary rounded-[20px] px-7 md:px-10 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex flex-wrap gap-6 md:gap-8">
              {clinics.map((c) => (
                <div key={c.slug} className="flex items-center gap-2 text-paper text-[14.5px] font-semibold">
                  <PinIcon size={16} />
                  {c.name}
                </div>
              ))}
            </div>
            <Button href="/book">Book an Assessment</Button>
          </div>
        </div>
      </main>
      <Footer />
      <MobileActionBar />
    </>
  );
}
