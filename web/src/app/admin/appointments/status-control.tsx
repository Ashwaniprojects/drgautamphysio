"use client";

import { useState } from "react";
import { setAppointmentStatus } from "../actions";
import type { AppointmentStatus } from "@/lib/types";
import { STATUS_LABELS } from "@/lib/format";

const NEXT_ACTION: Partial<
  Record<AppointmentStatus, { status: AppointmentStatus; label: string; tone: string }>
> = {
  scheduled: {
    status: "completed",
    label: "Mark completed",
    tone: "bg-emerald-600 hover:bg-emerald-700 text-white",
  },
  completed: { status: "cancelled", label: "Undo", tone: "border-border hover:bg-paper-warm text-ink/60" },
  cancelled: { status: "scheduled", label: "Reschedule", tone: "bg-primary hover:bg-primary-dark text-white" },
  no_show: { status: "scheduled", label: "Reschedule", tone: "bg-primary hover:bg-primary-dark text-white" },
};

/**
 * The status feed spec §2 says the recall automation reads. These buttons are
 * the whole workflow: scheduled → completed, or → no_show. Everything else
 * collapses to a small menu so the primary action stays one tap.
 */
export function StatusControl({
  appointmentId,
  current,
}: {
  appointmentId: string;
  current: AppointmentStatus;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const next = NEXT_ACTION[current];

  async function change(status: AppointmentStatus) {
    setBusy(true);
    setError(null);
    const form = new FormData();
    form.set("id", appointmentId);
    form.set("status", status);
    const result = await setAppointmentStatus(null, form);
    setBusy(false);
    if (!result.ok) setError(result.error);
  }

  return (
    <div className="flex items-center gap-1.5">
      {next ? (
        <button
          type="button"
          onClick={() => change(next.status)}
          disabled={busy}
          className={`rounded-lg px-2.5 py-1.5 text-[12px] font-semibold transition-colors disabled:opacity-50 ${next.tone}`}
        >
          {busy ? "Saving…" : next.label}
        </button>
      ) : null}

      {current === "scheduled" && (
        <button
          type="button"
          onClick={() => change("no_show")}
          disabled={busy}
          className="rounded-lg border border-border px-2.5 py-1.5 text-[12px] font-medium text-amber-700 transition-colors hover:border-amber-300 hover:bg-amber-50 disabled:opacity-50"
        >
          No-show
        </button>
      )}

      {current === "no_show" ? null : (
        <div className="relative">
          <details className="relative">
            <summary className="list-none cursor-pointer rounded-lg border border-border px-2 py-1.5 text-[12px] font-medium text-ink/45 hover:bg-paper-warm">
              ⋯
            </summary>
            <div className="absolute right-0 z-20 mt-1 w-36 overflow-hidden rounded-xl border border-border-light bg-white py-1 shadow-lg">
              {(Object.entries(STATUS_LABELS) as [AppointmentStatus, string][]).map(
                ([value, label]) =>
                  value !== current && (
                    <button
                      key={value}
                      type="button"
                      onClick={() => change(value)}
                      disabled={busy}
                      className="block w-full px-3 py-1.5 text-left text-[12px] font-medium text-ink/65 hover:bg-primary-50 hover:text-primary-700 disabled:opacity-50"
                    >
                      Mark {label.toLowerCase()}
                    </button>
                  )
              )}
            </div>
          </details>
        </div>
      )}

      {error && <span className="text-[11px] text-red-600">{error}</span>}
    </div>
  );
}
