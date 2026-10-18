import type { AppointmentStatus, LocationTag, PatientType } from "@/lib/types";

const IST = "Asia/Kolkata";

/**
 * All display formatting pins to IST. The DB stores dates and times with no
 * timezone because the practice is single-city; if that ever changes, this is
 * the one place to change it.
 */
export function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: IST,
    }).format(new Date(`${iso}T00:00:00`));
  } catch {
    return iso;
  }
}

export function formatDateShort(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      timeZone: IST,
    }).format(new Date(`${iso}T00:00:00`));
  } catch {
    return iso;
  }
}

/** "10:30 AM" from a DB time like "10:30:00". */
export function formatTime(time: string): string {
  const [hh, mm] = time.split(":");
  let hour = parseInt(hh, 10);
  const period = hour >= 12 ? "PM" : "AM";
  if (hour === 0) hour = 12;
  if (hour > 12) hour -= 12;
  return `${hour}:${mm} ${period}`;
}

/** Today's date in IST as YYYY-MM-DD, matching how scheduled_date is stored. */
export function todayISO(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: IST,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export const STATUS_LABELS: Record<AppointmentStatus, string> = {
  scheduled: "Scheduled",
  completed: "Completed",
  no_show: "No-show",
  cancelled: "Cancelled",
};

export const STATUS_STYLES: Record<AppointmentStatus, string> = {
  scheduled: "bg-primary-50 text-primary-700 ring-primary-200",
  completed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  no_show: "bg-amber-50 text-amber-700 ring-amber-200",
  cancelled: "bg-slate-100 text-slate-500 ring-slate-200",
};

export const PATIENT_TYPE_LABELS: Record<PatientType, string> = {
  new: "New",
  returning: "Returning",
};

export function locationTagLabel(tag: LocationTag): string {
  return tag === "own_clinic" ? "Own clinic" : "Consults here";
}
