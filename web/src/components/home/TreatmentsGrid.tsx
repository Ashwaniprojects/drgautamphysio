import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { treatments } from "@/lib/data/treatments";

export function TreatmentsGrid() {
  return (
    <section id="treatments" className="bg-tint px-6 md:px-22 py-14 md:py-22">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <div className="flex flex-col gap-2.5 max-w-2xl">
          <span className="text-[13px] font-bold tracking-[0.12em] uppercase text-primary">
            How we treat you
          </span>
          <h2 className="font-display text-[28px] md:text-[36px] font-semibold text-ink">
            Eight approaches, one hands-on standard of care
          </h2>
        </div>
        <Link href="/treatments" className="inline-flex items-center gap-1.5 text-primary text-[15px] font-semibold shrink-0">
          See all treatments <ArrowRightIcon size={15} />
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-8">
        {treatments.map((t) => (
          <div key={t.name} className="bg-white rounded-2xl p-5 flex flex-col gap-2">
            <span className="text-[15px] md:text-base font-semibold text-ink">{t.name}</span>
            <span className="text-[13px] text-ink/55 leading-relaxed">{t.description}</span>
          </div>
        ))}
      </div>

      <div className="bg-primary rounded-2xl px-6 md:px-8 py-6 md:py-7 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div className="flex items-center gap-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <path d="M3 10.5L12 4l9 6.5" />
            <path d="M5 9.5V20h14V9.5" />
          </svg>
          <div className="flex flex-col">
            <span className="text-[16px] md:text-[17px] font-semibold text-paper">
              Can&apos;t travel? Ask about Physio Home Visits.
            </span>
            <span className="text-sm text-paper/80">Available across Lucknow for select conditions.</span>
          </div>
        </div>
        <WhatsAppButton className="!border-paper !text-paper hover:!bg-white/10 shrink-0" />
      </div>
    </section>
  );
}
