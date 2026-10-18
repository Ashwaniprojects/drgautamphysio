"use client";

import { useState } from "react";
import { deleteAppointment } from "../actions";

/**
 * Delete is admin-only and irreversible, so it asks for a second tap rather
 * than a confirm() dialog (which blocks the UI and looks like a crash).
 * Staff see cancel instead, which preserves the row for recall analytics.
 */
export function DeleteButton({ appointmentId }: { appointmentId: string }) {
  const [armed, setArmed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onDelete() {
    setBusy(true);
    setError(null);
    const result = await deleteAppointment(appointmentId);
    setBusy(false);
    if (!result.ok) {
      setError(result.error);
      setArmed(false);
    }
  }

  if (armed) {
    return (
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onDelete}
          disabled={busy}
          className="rounded-lg bg-red-600 px-2.5 py-1.5 text-[12px] font-semibold text-white hover:bg-red-700 disabled:opacity-50"
        >
          {busy ? "Deleting…" : "Confirm"}
        </button>
        <button
          type="button"
          onClick={() => setArmed(false)}
          disabled={busy}
          className="rounded-lg border border-border px-2 py-1.5 text-[12px] font-medium text-ink/50"
        >
          Cancel
        </button>
        {error && <span className="text-[11px] text-red-600">{error}</span>}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setArmed(true)}
      className="rounded-lg border border-border px-2.5 py-1.5 text-[12px] font-medium text-ink/40 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600"
      title="Delete this booking"
    >
      Delete
    </button>
  );
}
