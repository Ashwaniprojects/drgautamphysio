import { ClockIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { clinics } from "@/lib/data/clinics";

export function ClinicsGrid() {
  return (
    <section id="clinics" className="bg-tint px-6 md:px-22 py-14 md:py-22">
      <div className="flex flex-col gap-2.5 max-w-2xl mb-10">
        <span className="text-[13px] font-bold tracking-[0.12em] uppercase text-primary">
          Our 3 clinics
        </span>
        <h2 className="font-display text-[28px] md:text-[36px] font-semibold text-ink">
          Come in wherever suits you
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {clinics.map((c) => (
          <div key={c.slug} className="bg-white rounded-2xl overflow-hidden flex flex-col">
            <div className="h-[150px] bg-paper flex items-center justify-center border-b border-ink/5 px-4 text-center">
              <span className="text-[12.5px] text-ink/55">[PHOTO: {c.photoPlaceholder}]</span>
            </div>
            <div className="p-5 flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[17px] font-semibold">{c.name}</span>
                <span className="text-[11px] font-bold uppercase tracking-[0.05em] text-primary bg-tint px-2.5 py-1 rounded-full">
                  {c.tag}
                </span>
              </div>
              <span className="text-[13.5px] text-ink/65">{c.area}</span>
              <div className="flex items-center gap-1.5 text-[13px] text-ink/55">
                <ClockIcon size={13} />
                {c.hours}
              </div>
              <Button href="/book" variant="solid-teal" className="mt-1.5 w-full !px-4 !py-2.75 text-sm">
                Book at {c.name}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
