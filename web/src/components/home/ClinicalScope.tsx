import { treatmentAreas } from "@/lib/data/doctor";

export function ClinicalScope() {
  return (
    <section className="bg-tint px-6 md:px-22 py-14 md:py-20">
      <div className="flex flex-col gap-2.5 max-w-2xl mb-10">
        <span className="text-[13px] font-bold tracking-[0.12em] uppercase text-primary">
          Conditions we treat
        </span>
        <h2 className="font-display text-[26px] md:text-[34px] font-semibold text-ink">
          Care across every stage of recovery
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {treatmentAreas.map((a) => (
          <div key={a.name} className="bg-white rounded-2xl p-6 flex flex-col gap-1.5">
            <span className="text-base font-semibold text-ink">{a.name}</span>
            <span className="text-sm text-ink/60 leading-relaxed">{a.desc}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
