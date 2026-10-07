import Image from "next/image";
import Link from "next/link";
import { doctor } from "@/lib/data/doctor";

const stats = [
  { value: `${doctor.yearsExperience} years`, label: `Clinical practice, since ${doctor.clinicalSince}` },
  { value: "10+ awards", label: "At national and international physiotherapy conferences" },
  { value: "State Treasurer", label: "Indian Association of Physiotherapists, Uttar Pradesh" },
];

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.value} className="bg-white rounded-2xl p-5 flex flex-col gap-1">
            <span className="font-display text-2xl font-semibold text-primary">{s.value}</span>
            <span className="text-sm text-ink/60">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
        <figure className="flex-1 flex flex-col gap-3">
          <div className="rounded-2xl overflow-hidden bg-white">
            <Image
              src="/images/iap-excellence-award-2026.jpg"
              alt={`${doctor.fullName} receiving the Significant Contribution Award at the IAP Excellence Awards 2026`}
              width={1800}
              height={1200}
              sizes="(min-width: 1024px) 560px, 100vw"
              className="w-full h-auto"
            />
          </div>
          <figcaption className="text-sm text-ink/60 leading-relaxed">
            Receiving the Significant Contribution Award, IAP Excellence Awards 2026, World
            Physiotherapy Asia Western Pacific Regional Conference, New Delhi.
          </figcaption>
          <div className="flex flex-col gap-1 mt-1">
            <span className="text-lg font-semibold text-ink">
              {doctor.name} {doctor.suffix}
            </span>
            <span className="text-sm text-ink/60">{doctor.positioning.join(" · ")}</span>
            <span className="text-xs text-ink/45 mt-1">{doctor.registration}</span>
          </div>
        </figure>

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
            See full qualifications, career &amp; awards
          </Link>
        </div>
      </div>
    </section>
  );
}
