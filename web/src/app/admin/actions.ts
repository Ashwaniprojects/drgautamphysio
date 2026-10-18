"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getStaffSession, assertStaffSession } from "@/lib/session";
import { fetchAppointmentsByPhone } from "@/lib/admin-data";
import type { AppointmentStatus, PatientType } from "@/lib/types";

export type MutationResult = { ok: true } | { ok: false; error: string };

function configured(): MutationResult {
  return isSupabaseConfigured()
    ? { ok: true }
    : { ok: false, error: "The backend isn't connected yet." };
}

/**
 * Reception-side "is this patient already known to us?" check, polled while the
 * phone field is edited. Read-only, so it doesn't revalidate anything.
 */
export async function checkPhone(phone: string): Promise<{ known: boolean; visits: number }> {
  if (!isSupabaseConfigured()) return { known: false, visits: 0 };
  const result = await fetchAppointmentsByPhone(phone.trim());
  if (!result.ok || result.data.length === 0) return { known: false, visits: 0 };
  return { known: true, visits: result.data.length };
}

function revalidateAdmin() {
  revalidatePath("/admin");
  revalidatePath("/admin/appointments");
  revalidatePath("/admin/patients");
}

const STATUS_VALUES: AppointmentStatus[] = [
  "scheduled",
  "completed",
  "no_show",
  "cancelled",
];

function parseStatus(value: string): AppointmentStatus | null {
  return STATUS_VALUES.find((s) => s === value) ?? null;
}

/** Move an appointment to a new status. Powers the one-click status buttons. */
export async function setAppointmentStatus(
  _prev: unknown,
  formData: FormData
): Promise<MutationResult> {
  const gate = configured();
  if (!gate.ok) return gate;

  const session = await getStaffSession();
  let profile: ReturnType<typeof assertStaffSession>;
  try {
    profile = assertStaffSession(session);
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
  void profile;

  const id = String(formData.get("id") || "");
  const status = parseStatus(String(formData.get("status") || ""));
  if (!id || !status) return { ok: false, error: "Missing appointment or status." };

  const { error } = await (await getSupabaseServerClient()).from("appointments")
    .update({ status })
    .eq("id", id);

  if (error) return { ok: false, error: error.message };
  revalidateAdmin();
  return { ok: true };
}

export interface AppointmentPatch {
  locationId?: string;
  scheduledDate?: string;
  scheduledTime?: string;
  durationMinutes?: number;
  status?: AppointmentStatus;
  patientType?: PatientType;
  reason?: string | null;
  notes?: string | null;
  patientName?: string;
  patientPhone?: string;
  patientAge?: number | null;
  whatsappOptIn?: boolean;
  conditionTags?: string;
}

export async function updateAppointment(
  id: string,
  patch: AppointmentPatch
): Promise<MutationResult> {
  const gate = configured();
  if (!gate.ok) return gate;

  const session = await getStaffSession();
  try {
    assertStaffSession(session);
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }

  const supabase = await getSupabaseServerClient();

  if (patch.patientPhone || patch.patientName !== undefined) {
    const { error } = await supabase.from("patients").update({
      ...(patch.patientName ? { name: patch.patientName } : {}),
      ...(patch.patientPhone ? { phone: patch.patientPhone } : {}),
      ...(patch.patientAge !== undefined
        ? { age: patch.patientAge ?? null }
        : {}),
      ...(patch.whatsappOptIn !== undefined
        ? { whatsapp_opt_in: patch.whatsappOptIn }
        : {}),
      ...(patch.conditionTags !== undefined
        ? {
            condition_tags: patch.conditionTags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean),
          }
        : {}),
    });
    if (error) return { ok: false, error: error.message };
  }

  const appointmentFields: Record<string, unknown> = {};
  if (patch.locationId) appointmentFields.location_id = patch.locationId;
  if (patch.scheduledDate) appointmentFields.scheduled_date = patch.scheduledDate;
  if (patch.scheduledTime) appointmentFields.scheduled_time = patch.scheduledTime;
  if (patch.durationMinutes) appointmentFields.duration_minutes = patch.durationMinutes;
  if (patch.status) appointmentFields.status = patch.status;
  if (patch.patientType) appointmentFields.patient_type = patch.patientType;
  if (patch.reason !== undefined) appointmentFields.reason = patch.reason;
  if (patch.notes !== undefined) appointmentFields.notes = patch.notes;

  if (Object.keys(appointmentFields).length > 0) {
    const { error } = await supabase
      .from("appointments")
      .update(appointmentFields)
      .eq("id", id);
    if (error) return { ok: false, error: error.message };
  }

  revalidateAdmin();
  return { ok: true };
}

/**
 * Add an appointment by hand. Used at reception when a phone call comes in and
 * no online booking exists.
 *
 * The patient record is created or merged here. If the phone already exists we
 * keep the existing row and only fill in missing fields — merging instead of
 * upserting avoids clobbering a receptionist's notes with an empty form.
 */
export async function createAppointmentManual(
  payload: AppointmentPatch & { name: string; phone: string }
): Promise<MutationResult & { appointmentId?: string }> {
  const gate = configured();
  if (!gate.ok) return gate;

  const session = await getStaffSession();
  try {
    assertStaffSession(session);
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }

  const name = payload.name.trim();
  const phone = payload.phone.trim();
  if (!name || !phone) return { ok: false, error: "Patient name and phone are required." };
  if (!payload.locationId || !payload.scheduledDate || !payload.scheduledTime) {
    return { ok: false, error: "Location, date and time are required." };
  }

  const supabase = await getSupabaseServerClient();

  const { data: existing } = await supabase
    .from("patients")
    .select("id")
    .eq("phone", phone)
    .maybeSingle();

  let patientId = existing?.id as string | undefined;

  if (!patientId) {
    const { data: created, error } = await supabase
      .from("patients")
      .insert({
        name,
        phone,
        age: payload.patientAge ?? null,
        whatsapp_opt_in: payload.whatsappOptIn ?? false,
        condition_tags: (payload.conditionTags || "")
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      })
      .select("id")
      .single();
    if (error) return { ok: false, error: error.message };
    patientId = created.id as string;
  } else {
    const updates: Record<string, unknown> = {};
    if (payload.patientAge !== undefined) updates.age = payload.patientAge ?? null;
    if (payload.whatsappOptIn !== undefined) updates.whatsapp_opt_in = payload.whatsappOptIn;
    if (payload.conditionTags) {
      updates.condition_tags = payload.conditionTags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    }
    if (Object.keys(updates).length > 0) {
      const { error } = await supabase.from("patients").update(updates).eq("id", patientId);
      if (error) return { ok: false, error: error.message };
    }
  }

  const { data: appointment, error } = await supabase
    .from("appointments")
    .insert({
      patient_id: patientId,
      location_id: payload.locationId,
      scheduled_date: payload.scheduledDate,
      scheduled_time: payload.scheduledTime,
      duration_minutes: payload.durationMinutes ?? 30,
      status: payload.status ?? "scheduled",
      patient_type: payload.patientType ?? "new",
      reason: payload.reason ?? null,
      notes: payload.notes ?? null,
    })
    .select("id")
    .single();

  if (error) {
    // The unique slot index rejects a double-booking — say so plainly.
    if (/duplicate key|no_overlap/.test(error.message)) {
      return { ok: false, error: "That slot is already booked." };
    }
    return { ok: false, error: error.message };
  }

  revalidateAdmin();
  return { ok: true, appointmentId: appointment.id as string };
}

export async function deleteAppointment(id: string): Promise<MutationResult> {
  const gate = configured();
  if (!gate.ok) return gate;

  const session = await getStaffSession();
  try {
    assertStaffSession(session);
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }

  const { error } = await (await getSupabaseServerClient())
    .from("appointments")
    .delete()
    .eq("id", id);

  if (error) {
    // Only admin passes the RLS delete policy.
    return {
      ok: false,
      error: /row-level security|permission denied/i.test(error.message)
        ? "Only an admin can delete bookings. Mark it cancelled instead."
        : error.message,
    };
  }
  revalidateAdmin();
  return { ok: true };
}

export async function updatePatient(
  id: string,
  patch: {
    name?: string;
    phone?: string;
    email?: string | null;
    age?: number | null;
    conditionTags?: string;
    whatsappOptIn?: boolean;
    notes?: string | null;
  }
): Promise<MutationResult> {
  const gate = configured();
  if (!gate.ok) return gate;

  const session = await getStaffSession();
  try {
    assertStaffSession(session);
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }

  const fields: Record<string, unknown> = {};
  if (patch.name !== undefined) fields.name = patch.name.trim();
  if (patch.phone !== undefined) fields.phone = patch.phone.trim();
  if (patch.email !== undefined) fields.email = patch.email?.trim() || null;
  if (patch.age !== undefined) fields.age = patch.age ?? null;
  if (patch.whatsappOptIn !== undefined) fields.whatsapp_opt_in = patch.whatsappOptIn;
  if (patch.notes !== undefined) fields.notes = patch.notes;
  if (patch.conditionTags !== undefined) {
    fields.condition_tags = patch.conditionTags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }

  const { error } = await (await getSupabaseServerClient())
    .from("patients")
    .update(fields)
    .eq("id", id);

  if (error) {
    if (/duplicate key/i.test(error.message)) {
      return { ok: false, error: "That phone number is already on another patient." };
    }
    return { ok: false, error: error.message };
  }
  revalidateAdmin();
  return { ok: true };
}
