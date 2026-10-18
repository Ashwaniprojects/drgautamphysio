"use server";

import { getSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export type BookingInput = {
  locationSlug: string;
  dateISO: string; // YYYY-MM-DD
  time12h: string; // e.g. "10:30 AM"
  name: string;
  phone: string;
  age?: string;
  reason?: string;
  patientType: "new" | "returning";
  whatsappOptIn: boolean;
};

export type BookingResult =
  | { ok: true; appointmentId: string }
  | { ok: false; error: string };

/**
 * The wizard collects times as 12-hour labels ("10:30 AM"); Postgres stores
 * `time` without a timezone, so we just need a clean HH:MM:SS.
 */
function to24Hour(time12h: string): string | null {
  const match = /^(\d{1,2}):(\d{2})\s?(AM|PM)$/i.exec(time12h.trim());
  if (!match) return null;
  const [, hh, mm, period] = match;
  let hours = parseInt(hh, 10);
  if (period.toUpperCase() === "PM" && hours !== 12) hours += 12;
  if (period.toUpperCase() === "AM" && hours === 12) hours = 0;
  return `${String(hours).padStart(2, "0")}:${mm}:00`;
}

export async function createBooking(input: BookingInput): Promise<BookingResult> {
  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      error:
        "The booking backend isn't connected yet. No Supabase project has been created. " +
        "See .env.example. Nothing was saved.",
    };
  }

  if (!input.name.trim() || !input.phone.trim()) {
    return { ok: false, error: "Name and phone are required." };
  }
  const time24 = to24Hour(input.time12h);
  if (!time24) return { ok: false, error: "Could not parse the selected time." };

  // One RPC does the location lookup, the patient upsert-by-phone and the
  // appointment insert in a single transaction, so a partial write is
  // impossible. It also re-checks the same rules (name/phone present, phone
  // shape, clinic exists, date not in the past) at the database.
  const supabase = await getSupabaseServerClient();

  const { data, error } = await supabase.rpc("create_booking", {
    p_location_slug: input.locationSlug,
    p_scheduled_date: input.dateISO,
    p_scheduled_time: time24,
    p_name: input.name.trim(),
    p_phone: input.phone.trim(),
    p_age: input.age ? Number(input.age) : null,
    p_reason: input.reason?.trim() || null,
    p_patient_type: input.patientType,
    p_whatsapp_opt_in: input.whatsappOptIn,
  });

  if (error) return { ok: false, error: error.message };

  const row = Array.isArray(data) ? data[0] : null;
  if (!row || !row.appointment_id) {
    return {
      ok: false,
      error: "The clinic could not be found, or that slot is no longer available.",
    };
  }

  return { ok: true, appointmentId: String(row.appointment_id) };
}
