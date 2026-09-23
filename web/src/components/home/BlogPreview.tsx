import { ArrowRightIcon } from "@/components/icons";

const posts = [
  { tag: "Sciatica", title: "Sciatica pain: what actually helps, and what to skip" },
  { tag: "Recovery", title: "How many physiotherapy sessions will I actually need?" },
  { tag: "Post-Surgery", title: "Getting back on your feet after joint replacement" },
];

export function BlogPreview() {
  return (
    <section id="blog" className="bg-paper px-6 md:px-22 py-14 md:py-22">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-9">
        <div className="flex flex-col gap-2.5 max-w-2xl">
          <span className="text-[13px] font-bold tracking-[0.12em] uppercase text-primary">
            From the blog
          </span>
          <h2 className="font-display text-[28px] md:text-[36px] font-semibold text-ink">
            Straight answers on recovery
          </h2>
        </div>
        <a href="#" className="inline-flex items-center gap-1.5 text-primary text-[15px] font-semibold shrink-0">
          Visit the blog <ArrowRightIcon size={15} />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6">
        {posts.map((p) => (
          <div key={p.title} className="flex flex-col gap-3.5">
            <div className="h-[160px] rounded-2xl bg-tint" />
            <span className="text-[12px] font-bold tracking-[0.08em] uppercase text-primary">{p.tag}</span>
            <span className="text-[17px] font-semibold leading-snug">{p.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
