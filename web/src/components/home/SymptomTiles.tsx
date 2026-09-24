import Link from "next/link";
import { ConditionIcon } from "@/components/ConditionIcon";
import { ArrowRightIcon } from "@/components/icons";
import { conditions } from "@/lib/data/conditions";

export function SymptomTiles() {
  return (
    <section id="conditions" className="bg-paper px-6 md:px-22 py-14 md:py-22">
      <div className="flex flex-col gap-2.5 max-w-2xl mb-10">
        <span className="text-[13px] font-bold tracking-[0.12em] uppercase text-primary">
          What brings you here
        </span>
        <h2 className="font-display text-[28px] md:text-[36px] font-semibold text-ink">
          Tell us where it hurts. We&apos;ll show you the path back
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {conditions.map((c) => (
          <Link
            key={c.slug}
            href={`/conditions/${c.slug}`}
            className="bg-white border border-ink/10 rounded-2xl p-5 md:p-6 flex flex-col gap-3.5 hover:shadow-md hover:border-primary/30 transition-all"
          >
            <span className="w-12 h-12 md:w-13 md:h-13 rounded-[14px] bg-tint flex items-center justify-center text-primary">
              <ConditionIcon icon={c.icon} />
            </span>
            <span className="text-[15px] md:text-base font-semibold text-ink">{c.title}</span>
          </Link>
        ))}

        <Link href="/conditions" className="bg-primary rounded-2xl p-5 md:p-6 flex flex-col justify-center gap-2.5">
          <span className="text-[15px] md:text-base font-semibold text-paper">Not sure what&apos;s wrong?</span>
          <span className="inline-flex items-center gap-1.5 text-paper text-sm font-semibold">
            View all conditions <ArrowRightIcon size={14} />
          </span>
        </Link>
      </div>
    </section>
  );
}
