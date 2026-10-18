"use client";

import { useState } from "react";
import { updatePatient } from "../actions";
import type { Patient } from "@/lib/types";
import { formatDate } from "@/lib/format";

const inputClass =
  "w-full rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-primary focus:ring-2 focus:ring-primary/15";

/**
 * Edit a patient in place. Notes and contact details are the receptionist's
 * own record, so they're editable by both roles; the phone number is unique
 * and acts as the merge key, so changing it can fail if it's taken.
 */
export function PatientEditForm({ patient }: { patient: Patient }) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ tone: "error" | "success"; text: string } | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage(null);

    const fd = new FormData(event.currentTarget);
    const result = await updatePatient(patient.id, {
      name: String(fd.get("name") || ""),
      phone: String(fd.get("phone") || "").replace(/\s/g, ""),
      email: String(fd.get("email") || "") || null,
      age: fd.get("age") ? Number(fd.get("age")) : null,
      conditionTags: String(fd.get("tags") || ""),
      whatsappOptIn: fd.get("whatsapp") === "on",
      notes: String(fd.get("notes") || ""),
    });

    setBusy(false);
    setMessage(
      result.ok
        ? { tone: "success", text: "Patient saved." }
        : { tone: "error", text: result.error }
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl bg-white p-5 ring-1 ring-border-light">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="font-display text-lg font-bold text-ink">{patient.name}</h3>
          <p className="text-[12px] text-ink/45">
            First visit {formatDate(patient.first_visit_date)} · record created{" "}
            {formatDate(patient.created_at.slice(0, 10))}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="pe-name" className="mb-1.5 block text-[13px] font-semibold text-ink">
            Name
          </label>
          <input id="pe-name" name="name" required defaultValue={patient.name} className={inputClass} />
        </div>
        <div>
          <label htmlFor="pe-phone" className="mb-1.5 block text-[13px] font-semibold text-ink">
            Phone (unique)
          </label>
          <input
            id="pe-phone"
            name="phone"
            required
            inputMode="tel"
            defaultValue={patient.phone}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="pe-email" className="mb-1.5 block text-[13px] font-semibold text-ink">
            Email
          </label>
          <input
            id="pe-email"
            name="email"
            type="email"
            defaultValue={patient.email ?? ""}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="pe-age" className="mb-1.5 block text-[13px] font-semibold text-ink">
            Age
          </label>
          <input
            id="pe-age"
            name="age"
            type="number"
            min={0}
            max={120}
            defaultValue={patient.age ?? ""}
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="pe-tags" className="mb-1.5 block text-[13px] font-semibold text-ink">
            Condition tags
          </label>
          <input
            id="pe-tags"
            name="tags"
            defaultValue={patient.condition_tags.join(", ")}
            placeholder="sciatica, knee — comma separated"
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="pe-notes" className="mb-1.5 block text-[13px] font-semibold text-ink">
            Notes
          </label>
          <textarea
            id="pe-notes"
            name="notes"
            rows={3}
            defaultValue={patient.notes ?? ""}
            placeholder="Reception or treatment notes."
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-ink/70">
            <input
              type="checkbox"
              name="whatsapp"
              defaultChecked={patient.whatsapp_opt_in}
              className="h-4 w-4 rounded border-border accent-primary"
            />
            Patient opted in to WhatsApp follow-ups
          </label>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-border-light pt-4">
        <span className="text-[12px] text-ink/40">Changes save to the patient record directly.</span>
        <button
          type="submit"
          disabled={busy}
          className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-colors hover:bg-primary-dark disabled:opacity-60"
        >
          {busy ? "Saving…" : "Save patient"}
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
