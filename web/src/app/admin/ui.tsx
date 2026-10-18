import type { ReactNode } from "react";
import type { AppointmentStatus, StaffRole } from "@/lib/types";
import { STATUS_LABELS, STATUS_STYLES, formatDate, formatTime, todayISO } from "@/lib/format";

/** Plain, readable role name — used in the header and the staff table. */
export function roleBadge(role: StaffRole): string {
  return role === "admin" ? "Admin · Dr. Gautam" : "Staff";
}

export function PageTitle({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink md:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-ink/50">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  tone?: "default" | "primary" | "success" | "warning";
}) {
  const tones = {
    default: "bg-white text-ink ring-border-light",
    primary: "bg-primary-50 text-primary-800 ring-primary-100",
    success: "bg-emerald-50 text-emerald-800 ring-emerald-100",
    warning: "bg-amber-50 text-amber-800 ring-amber-100",
  };
  return (
    <div className={`rounded-2xl p-5 ring-1 ${tones[tone]}`}>
      <p className="text-[12px] font-semibold uppercase tracking-wide opacity-60">{label}</p>
      <p className="mt-2 font-display text-3xl font-bold leading-none">{value}</p>
      {hint && <p className="mt-2 text-[12px] opacity-55">{hint}</p>}
    </div>
  );
}

export function StatusPill({ status }: { status: AppointmentStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

export function EmptyState({
  title,
  body,
  children,
}: {
  title: string;
  body?: string;
  children?: ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-dashed border-border bg-white/60 px-6 py-14 text-center">
      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50">
        <svg className="h-5 w-5 text-primary/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
        </svg>
      </div>
      <h2 className="font-display text-lg font-bold text-ink">{title}</h2>
      {body && <p className="mx-auto mt-2 max-w-md text-sm text-ink/50">{body}</p>}
      {children && <div className="mt-5 flex justify-center">{children}</div>}
    </div>
  );
}

export function Alert({ tone, children }: { tone: "error" | "success" | "info"; children: ReactNode }) {
  const tones = {
    error: "border-red-200 bg-red-50 text-red-700",
    success: "border-emerald-200 bg-emerald-50 text-emerald-700",
    info: "border-primary-200 bg-primary-50 text-primary-800",
  };
  return <div className={`rounded-xl border px-4 py-3 text-sm ${tones[tone]}`}>{children}</div>;
}

/** Small helper shared by the date-range filters. */
export function formatDateChip(iso: string): string {
  return iso === todayISO() ? "Today" : formatDate(iso);
}

export { formatTime };
