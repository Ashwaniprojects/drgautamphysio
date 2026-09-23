import { StarIcon, ArrowRightIcon } from "@/components/icons";

const placeholderReviews = [
  { condition: "Sciatica", source: "Google Review" },
  { condition: "Post-Surgery Rehab", source: "JustDial" },
  { condition: "Frozen Shoulder", source: "Google Review" },
];

export function PatientStories() {
  return (
    <section id="stories" className="bg-paper px-6 md:px-22 py-14 md:py-22">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-9">
        <div className="flex flex-col gap-2.5 max-w-2xl">
          <span className="text-[13px] font-bold tracking-[0.12em] uppercase text-primary">
            Patient stories
          </span>
          <h2 className="font-display text-[28px] md:text-[36px] font-semibold text-ink">
            In their own words
          </h2>
        </div>
        <a href="#" className="inline-flex items-center gap-1.5 text-primary text-[15px] font-semibold shrink-0">
          Read all reviews <ArrowRightIcon size={15} />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-5">
        {placeholderReviews.map((r) => (
          <div key={r.condition} className="bg-white rounded-2xl p-7 flex flex-col gap-3.5">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} size={14} className="text-accent" />
              ))}
            </div>
            <p className="text-[15.5px] leading-relaxed text-ink">
              &ldquo;[Patient quote pending consent — a specific recovery story in the patient&apos;s own words
              replaces this line.]&rdquo;
            </p>
            <div className="flex items-center gap-3 mt-1">
              <div className="w-10 h-10 rounded-full bg-tint shrink-0" />
              <div className="flex flex-col">
                <span className="text-sm font-semibold">[Patient name]</span>
                <span className="text-xs text-ink/55">
                  Treated for — {r.condition} &middot; {r.source}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <span className="text-[13px] text-ink/55">
        Shown as placeholders until named reviews and signed patient consent are confirmed — see
        requirements checklist §D.
      </span>
    </section>
  );
}
