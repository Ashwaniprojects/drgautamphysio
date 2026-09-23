"use server";

import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase/server";

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
        "The booking backend isn't connected yet — no Supabase project has been created. " +
        "See .env.example. Nothing was saved.",
    };
  }

  if (!input.name.trim() || !input.phone.trim()) {
    return { ok: false, error: "Name and phone are required." };
  }
  const time24 = to24Hour(input.time12h);
  if (!time24) {
    return { ok: false, error: "Could not parse the selected time." };
  }

  const supabase = getSupabaseServerClient();

  const { data: location, error: locationError } = await supabase
    .from("locations")
    .select("id")
    .eq("slug", input.locationSlug)
    .single();

  if (locationError || !location) {
    return { ok: false, error: "That clinic could not be found." };
  }

  const { data: patient, error: patientError } = await supabase
    .from("patients")
    .upsert(
      {
        name: input.name.trim(),
        phone: input.phone.trim(),
        age: input.age ? Number(input.age) : null,
        whatsapp_opt_in: input.whatsappOptIn,
      },
      { onConflict: "phone" }
    )
    .select("id")
    .single();

  if (patientError || !patient) {
    return { ok: false, error: "Could not save patient details." };
  }

  const { data: appointment, error: appointmentError } = await supabase
    .from("appointments")
    .insert({
      patient_id: patient.id,
      location_id: location.id,
      scheduled_date: input.dateISO,
      scheduled_time: time24,
      patient_type: input.patientType,
      reason: input.reason || null,
      status: "scheduled",
    })
    .select("id")
    .single();

  if (appointmentError || !appointment) {
    return { ok: false, error: "Could not create the appointment." };
  }

  return { ok: true, appointmentId: appointment.id as string };
}
