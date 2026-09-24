import Link from "next/link";
import { doctor } from "@/lib/data/doctor";

export function DoctorAuthority() {
  return (
    <section className="bg-tint px-6 md:px-22 py-14 md:py-20">
      <div className="flex flex-col gap-2.5 max-w-2xl mb-10">
        <span className="text-[13px] font-bold tracking-[0.12em] uppercase text-primary">
          Expertise
        </span>
        <h2 className="font-display text-[26px] md:text-[34px] font-semibold text-ink">
          Expertise built through advanced training
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
        <div className="flex-1 max-w-[340px] flex flex-col gap-4">
          <div className="aspect-[4/5] bg-white rounded-2xl border-[1.5px] border-dashed border-primary/35 flex items-center justify-center text-center p-8">
            <span className="text-sm text-primary font-semibold">[PHOTO: {doctor.name} professional portrait]</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-lg font-semibold text-ink">
              {doctor.name} {doctor.suffix}
            </span>
            <span className="text-sm text-ink/60">{doctor.positioning.join(" · ")}</span>
            <span className="text-xs text-ink/45 mt-1">{doctor.registration}</span>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
          {doctor.headlineCredentials.map((c) => (
            <div key={c.label} className="bg-white rounded-2xl p-5 flex flex-col gap-1">
              <span className="text-[15px] font-semibold text-ink leading-snug">{c.label}</span>
              {c.detail && <span className="text-sm text-ink/55">{c.detail}</span>}
            </div>
          ))}
          <Link
            href="/about"
            className="sm:col-span-2 text-center text-primary text-sm font-semibold rounded-2xl bg-white p-5 hover:bg-white/70"
          >
            See full qualifications &amp; approach
          </Link>
        </div>
      </div>
    </section>
  );
}
