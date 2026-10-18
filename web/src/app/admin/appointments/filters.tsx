"use client";

import { useState, useTransition } from "react";

export interface FilterValues {
  location: string;
  status: string;
  from: string;
  to: string;
  q: string;
}

const STATUS_OPTIONS = [
  { value: "all", label: "All statuses" },
  { value: "scheduled", label: "Scheduled" },
  { value: "completed", label: "Completed" },
  { value: "no_show", label: "No-show" },
  { value: "cancelled", label: "Cancelled" },
];

/**
 * Pushes filters straight to the URL as a GET form. No JS state machine —
 * the URL is the source of truth, so a receptionist can bookmark or share
 * "today's Subhash Marg bookings" as a link.
 */
export function AppointmentFilters({
  initial,
  today,
}: {
  initial: FilterValues;
  today: string;
}) {
  const [values, setValues] = useState<FilterValues>(initial);
  const [isPending, startTransition] = useTransition();

  // Note: no effect to re-sync `initial`. The page keys this component by the
  // filter values, so a URL change remounts it with fresh state rather than
  // mutating an existing instance.

  function set<K extends keyof FilterValues>(key: K, value: FilterValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(() => {
      const params = new URLSearchParams();
      if (values.location) params.set("loc", values.location);
      if (values.status !== "all") params.set("status", values.status);
      if (values.from) params.set("from", values.from);
      if (values.to) params.set("to", values.to);
      if (values.q.trim()) params.set("q", values.q.trim());
      window.location.search = params.toString();
    });
  }

  const inputClass =
    "rounded-xl border border-border bg-white px-3 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-primary focus:ring-2 focus:ring-primary/15";

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl bg-white p-4 ring-1 ring-border-light"
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-12">
        <div className="col-span-2 md:col-span-3">
          <label htmlFor="q" className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-ink/40">
            Search
          </label>
          <input
            id="q"
            value={values.q}
            onChange={(e) => set("q", e.target.value)}
            placeholder="Name or phone"
            className={`w-full ${inputClass}`}
          />
        </div>

        <div className="md:col-span-3">
          <label htmlFor="loc" className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-ink/40">
            Clinic
          </label>
          <select
            id="loc"
            value={values.location}
            onChange={(e) => set("location", e.target.value)}
            className={`w-full ${inputClass}`}
          >
            <option value="">All clinics</option>
            <option value="subhash-marg">Subhash Marg</option>
            <option value="neera-hospital">Neera Hospital</option>
            <option value="medox-hospital">Medox Hospital</option>
          </select>
        </div>

        <div className="md:col-span-3">
          <label htmlFor="status" className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-ink/40">
            Status
          </label>
          <select
            id="status"
            value={values.status}
            onChange={(e) => set("status", e.target.value)}
            className={`w-full ${inputClass}`}
          >
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-1 md:col-span-1.5">
          <label htmlFor="from" className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-ink/40">
            From
          </label>
          <input
            id="from"
            type="date"
            value={values.from}
            min={today}
            onChange={(e) => set("from", e.target.value)}
            className={`w-full ${inputClass}`}
          />
        </div>

        <div className="col-span-1 md:col-span-1.5">
          <label htmlFor="to" className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-ink/40">
            To
          </label>
          <input
            id="to"
            type="date"
            value={values.to}
            min={today}
            onChange={(e) => set("to", e.target.value)}
            className={`w-full ${inputClass}`}
          />
        </div>

        <div className="col-span-2 flex items-end gap-2 md:col-span-1">
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
          >
            {isPending ? "…" : "Filter"}
          </button>
        </div>
      </div>
    </form>
  );
}
