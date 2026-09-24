import type { IconKey } from "@/lib/data/conditions";

const paths: Record<IconKey, React.ReactNode> = {
  spine: (
    <g stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <path d="M12 3v3" />
      <path d="M12 8v3" />
      <path d="M12 13v3" />
      <path d="M12 18v3" />
    </g>
  ),
  bolt: <path d="M13 2L5 14h5l-1 8 9-13h-6z" fill="currentColor" />,
  neck: <path d="M4 19c1.5-7 5-12 8-12s6.5 5 8 12" fill="none" stroke="currentColor" strokeWidth={1.8} />,
  sports: (
    <g stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" fill="none">
      <circle cx="15" cy="4.5" r="2" fill="currentColor" stroke="none" />
      <path d="M13.5 7.5L11 12l3 2-1 7" />
      <path d="M10.5 11.5L6 13.5m7.5-2l3.5 2.5 3-1" />
    </g>
  ),
  surgery: (
    <g stroke="currentColor" strokeWidth={1.8} fill="none">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v8M8 12h8" />
    </g>
  ),
  joint: (
    <g stroke="currentColor" strokeWidth={1.8} fill="none">
      <circle cx="9" cy="12" r="6" />
      <circle cx="15" cy="12" r="6" />
    </g>
  ),
  heart: <path d="M12 20s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 5c-2.5 4.5-9.5 9-9.5 9z" fill="currentColor" />,
  migraine: (
    <g stroke="currentColor" strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="11" r="7.5" />
      <path d="M9.5 8l1.5 3-2 1.2 3 3.3" />
    </g>
  ),
  pelvic: (
    <g stroke="currentColor" strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 5h14" />
      <path d="M5 5v3c0 5 2.5 9 7 11 4.5-2 7-6 7-11V5" />
    </g>
  ),
};

export function ConditionIcon({ icon, size = 24, className }: { icon: IconKey; size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      {paths[icon]}
    </svg>
  );
}
