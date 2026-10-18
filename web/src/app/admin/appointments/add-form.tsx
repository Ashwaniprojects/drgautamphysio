"use client";

import { useRef, useState } from "react";
import { createAppointmentManual, checkPhone } from "../actions";
import { todayISO } from "@/lib/format";

const inputClass =
  "w-full rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-primary focus:ring-2 focus:ring-primary/15";
const labelClass = "mb-1.5 block text-[13px] font-semibold text-ink";
const hintClass = "mt-1 block text-[12px] text-ink/45";

type PhoneStatus = "idle" | "checking" | "known" | "unknown";

export function AddAppointmentForm() {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ tone: "error" | "success"; text: string } | null>(null);
  const [phoneStatus, setPhoneStatus] = useState<PhoneStatus>("idle");
  const [visitCount, setVisitCount] = useState(0);
  const [patientType, setPatientType] = useState<"new" | "returning">("new");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** Debounced lookup — a receptionist typing a phone number shouldn't hit the DB on every keystroke. */
  function onPhoneChange(value: string) {
    if (timer.current) clearTimeout(timer.current);
    setPhoneStatus("idle");

    // Indian mobile: 10 digits, or an international form.
    if (!/^[6-9]\d{9}$/.test(value.replace(/\s/g, ""))) {
      if (value.length < 10) setPhoneStatus("idle");
      return;
    }

    setPhoneStatus("checking");
    timer.current = setTimeout(async () => {
      const result = await checkPhone(value.replace(/\s/g, ""));
      setVisitCount(result.visits);
      if (result.known) {
        setPhoneStatus("known");
        setPatientType("returning");
      } else {
        setPhoneStatus("unknown");
        setPatientType("new");
      }
    }, 350);
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage(null);

    const fd = new FormData(event.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      phone: String(fd.get("phone") || "").replace(/\s/g, ""),
      locationId: String(fd.get("location") || ""),
      scheduledDate: String(fd.get("date") || ""),
      scheduledTime: `${String(fd.get("time") || "")}:00`,
      durationMinutes: Number(fd.get("duration") || 30),
      patientType,
      reason: String(fd.get("reason") || "") || null,
      notes: String(fd.get("notes") || "") || null,
      patientAge: fd.get("age") ? Number(fd.get("age")) : null,
      whatsappOptIn: fd.get("whatsapp") === "on",
      conditionTags: String(fd.get("tags") || ""),
    };

    const result = await createAppointmentManual(payload);
    setBusy(false);

    if (!result.ok) {
      setMessage({ tone: "error", text: result.error });
      return;
    }

    setMessage({
      tone: "success",
      text: `Booked${payload.name ? ` for ${payload.name}` : ""}. It's now in the appointment list.`,
    });
    event.currentTarget.reset();
    setPhoneStatus("idle");
    setPatientType("new");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl bg-white p-5 ring-1 ring-border-light"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label htmlFor="af-name" className={labelClass}>
            Patient name <span className="text-red-500">*</span>
          </label>
          <input
            id="af-name"
            name="name"
            required
            placeholder="Full name"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="af-phone" className={labelClass}>
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            id="af-phone"
            name="phone"
            required
            inputMode="tel"
            placeholder="10-digit mobile"
            pattern="[0-9\s]+"
            onChange={(e) => onPhoneChange(e.target.value)}
            className={inputClass}
          />
          {phoneStatus === "checking" && (
            <span className={hintClass}>Checking whether they&apos;ve booked before…</span>
          )}
          {phoneStatus === "known" && (
            <span className="mt-1 block rounded-lg bg-primary-50 px-2.5 py-1.5 text-[12px] font-medium text-primary-800">
              Existing patient — {visitCount} previous booking
              {visitCount === 1 ? "" : "s"}. Matched to their record.
            </span>
          )}
          {phoneStatus === "unknown" && (
            <span className={hintClass}>No prior booking found — will create a new patient.</span>
          )}
        </div>

        <div>
          <label htmlFor="af-location" className={labelClass}>
            Clinic <span className="text-red-500">*</span>
          </label>
          <select id="af-location" name="location" required className={inputClass} defaultValue="">
            <option value="" disabled>
              Choose clinic
            </option>
            <option value="subhash-marg">Subhash Marg</option>
            <option value="neera-hospital">Neera Hospital</option>
            <option value="medox-hospital">Medox Hospital</option>
          </select>
        </div>

        <div>
          <label htmlFor="af-duration" className={labelClass}>
            Duration
          </label>
          <select id="af-duration" name="duration" defaultValue="30" className={inputClass}>
            <option value="15">15 min</option>
            <option value="30">30 min</option>
            <option value="45">45 min</option>
            <option value="60">60 min</option>
            <option value="90">90 min</option>
          </select>
        </div>

        <div>
          <label htmlFor="af-date" className={labelClass}>
            Date <span className="text-red-500">*</span>
          </label>
          <input
            id="af-date"
            name="date"
            type="date"
            required
            min={todayISO()}
            defaultValue={todayISO()}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="af-time" className={labelClass}>
            Time <span className="text-red-500">*</span>
          </label>
          <input
            id="af-time"
            name="time"
            type="time"
            required
            step={300}
            defaultValue="10:00"
            className={inputClass}
          />
          <span className={hintClass}>30-minute slots, matching the public site.</span>
        </div>

        <div>
          <label htmlFor="af-age" className={labelClass}>
            Age
          </label>
          <input
            id="af-age"
            name="age"
            type="number"
            min={0}
            max={120}
            placeholder="Optional"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="af-reason" className={labelClass}>
            Reason / complaint
          </label>
          <input
            id="af-reason"
            name="reason"
            placeholder="e.g. lower back pain"
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-2 lg:col-span-2">
          <label htmlFor="af-tags" className={labelClass}>
            Condition tags
          </label>
          <input
            id="af-tags"
            name="tags"
            placeholder="sciatica, knee, post-surgical — comma separated"
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-2 lg:col-span-2">
          <label htmlFor="af-notes" className={labelClass}>
            Notes
          </label>
          <textarea
            id="af-notes"
            name="notes"
            rows={2}
            placeholder="Anything the receptionist or doctor should know."
            className={inputClass}
          />
        </div>

        <div className="flex items-center gap-6 sm:col-span-2 lg:col-span-2">
          <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-ink/70">
            <input
              type="checkbox"
              name="whatsapp"
              className="h-4 w-4 rounded border-border accent-primary"
            />
            Patient opted in to WhatsApp follow-ups
          </label>
          <span className="text-[12px] text-ink/40">Never tick without asking first.</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-border-light pt-4">
        <span className="text-[12px] text-ink/40">
          Booking as <strong>{patientType === "new" ? "new patient" : "returning patient"}</strong>
          — set automatically by the phone lookup.
        </span>
        <button
          type="submit"
          disabled={busy}
          className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-colors hover:bg-primary-dark disabled:opacity-60"
        >
          {busy ? "Booking…" : "Add booking"}
        </button>
      </div>

      {message && (
        <div
          className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
            message.tone === "error"
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-emerald-200 bg-emerald-50 text-emerald-700"
          }`}
        >
          {message.text}
        </div>
      )}
    </form>
  );
}
