import type { AppointmentRow } from "@/lib/admin-data";
import type { StaffRole } from "@/lib/types";
import { formatDate, formatTime, locationTagLabel } from "@/lib/format";
import { StatusControl } from "./status-control";
import { DeleteButton } from "./delete-button";

/**
 * One row of appointments, sorted by date then time. Mobile-first: it collapses
 * to a card list rather than a horizontal scroller, because reception on this
 * site is likely a phone.
 */
export function AppointmentsTable({
  rows,
  role,
  directionLink,
}: {
  rows: AppointmentRow[];
  role: StaffRole;
  directionLink: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-border-light">
      <div className="hidden md:grid md:grid-cols-[5.5rem_1fr_7.5rem_8.5rem_1fr_auto] md:gap-3 md:border-b md:border-border-light md:bg-paper-warm/50 md:px-5 md:py-3 md:text-[11px] md:font-semibold md:uppercase md:tracking-wide md:text-ink/40">
        <a href={directionLink} className="hover:text-primary" title="Toggle date order">
          Time ⇅
        </a>
        <span>Patient</span>
        <span>Clinic</span>
        <span>Date</span>
        <span>Status</span>
        <span />
      </div>

      {rows.map((a, i) => (
        <div
          key={a.id}
          className={`grid grid-cols-1 gap-x-3 gap-y-2 px-5 py-4 md:grid-cols-[5.5rem_1fr_7.5rem_8.5rem_1fr_auto] md:items-center ${
            i > 0 ? "border-t border-border-light" : ""
          }`}
        >
          <span className="order-1 font-display text-base font-bold text-primary">
            {formatTime(a.scheduled_time)}
          </span>

          <div className="order-2 min-w-0">
            <p className="truncate text-sm font-semibold text-ink">{a.patient.name}</p>
            <p className="text-[12px] text-ink/45">
              {a.patient.phone}
              {a.patient.whatsapp_opt_in && (
                <span className="ml-1.5 rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                  WA opted in
                </span>
              )}
            </p>
            {a.reason && (
              <p className="mt-0.5 truncate text-[12px] text-ink/55">{a.reason}</p>
            )}
            {(a.patient.condition_tags?.length ?? 0) > 0 && (
              <div className="mt-1 flex flex-wrap gap-1">
                {a.patient.condition_tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-paper-warm px-2 py-0.5 text-[10px] font-medium text-ink/55"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          <span className="order-3 text-[12px] font-medium text-ink/55">
            {a.location.name}
            <span className="block text-[10px] text-ink/35">
              {locationTagLabel(a.location.tag)}
            </span>
          </span>

          <span className="order-4 text-[13px] font-medium text-ink/70">
            {formatDate(a.scheduled_date)}
          </span>

          <div className="order-5">
            <StatusControl appointmentId={a.id} current={a.status} />
          </div>

          <div className="order-6 flex items-center justify-end gap-2">
            <a
              href={`tel:${a.patient.phone.replace(/\s/g, "")}`}
              className="rounded-lg border border-border px-2.5 py-1.5 text-[12px] font-medium text-ink/55 transition-colors hover:border-primary hover:text-primary"
            >
              Call
            </a>
            {role === "admin" && <DeleteButton appointmentId={a.id} />}
          </div>
        </div>
      ))}
    </div>
  );
}
