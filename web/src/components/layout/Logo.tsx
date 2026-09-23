import Link from "next/link";

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="w-10 h-10 rounded-[10px] bg-primary flex items-center justify-center shrink-0">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FAF7F2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 14c2-6 4-9 8-9s6 3 8 9" />
          <path d="M4 14c0 3.5 3.5 6 8 6s8-2.5 8-6" />
        </svg>
      </span>
      <span className="flex flex-col leading-[1.15]">
        <span className={`font-display text-[19px] font-semibold ${inverse ? "text-paper" : "text-ink"}`}>
          Dr. Gautam&apos;s
        </span>
        <span className="text-[10.5px] font-semibold tracking-[0.12em] text-primary">
          PHYSIO &amp; REHAB CENTRE
        </span>
      </span>
    </Link>
  );
}
