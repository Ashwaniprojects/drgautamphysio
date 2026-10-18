import "server-only";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type {
  Appointment,
  AppointmentStatus,
  Location,
  Patient,
  Profile,
} from "@/lib/types";
import { todayISO } from "./format";

export interface AppointmentRow extends Appointment {
  patient: Pick<
    Patient,
    "id" | "name" | "phone" | "condition_tags" | "whatsapp_opt_in"
  >;
  location: Pick<Location, "id" | "name" | "slug" | "tag">;
}

export type Result<T> = { ok: true; data: T } | { ok: false; error: string };

export interface AppointmentFilters {
  locationId?: string;
  status?: AppointmentStatus | "all";
  /** YYYY-MM-DD inclusive. */
  dateFrom?: string;
  dateTo?: string;
  /** Patient name or phone substring. */
  search?: string;
  /** 0-based. */
  page?: number;
  pageSize?: number;
  ascending?: boolean;
}

const APPOINTMENT_SELECT = `
  *,
  patient:patients ( id, name, phone, condition_tags, whatsapp_opt_in ),
  location:locations ( id, name, slug, tag )
`;

/** Strip PostgREST filter metacharacters so a search string can't break the grammar. */
function safeFilterTerm(input: string): string {
  return input.replace(/[,()!"*]/g, " ").trim();
}

export async function fetchAppointments(
  filters: AppointmentFilters = {}
): Promise<Result<{ rows: AppointmentRow[]; count: number; page: number; pageSize: number }>> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: "The backend isn't connected yet." };
  }

  const supabase = await getSupabaseServerClient();
  const pageSize = filters.pageSize ?? 25;
  const page = filters.page ?? 0;

  // Filter by patient name/phone by resolving ids on the patients table first,
  // rather than filtering across a nested join — PostgREST can't traverse a
  // plain `or()` filter into an embedding.
  let patientIds: string[] | null = null;
  if (filters.search) {
    const term = safeFilterTerm(filters.search);
    if (term) {
      const { data: matches, error: matchError } = await supabase
        .from("patients")
        .select("id")
        .or(`name.ilike.*${term}*,phone.ilike.*${term}*`)
        .limit(500);
      if (matchError) return { ok: false, error: matchError.message };
      patientIds = (matches ?? []).map((m) => m.id as string);
      if (patientIds.length === 0) {
        return { ok: true, data: { rows: [], count: 0, page, pageSize } };
      }
    }
  }

  let query = supabase
    .from("appointments")
    .select(APPOINTMENT_SELECT, { count: "exact" })
    .order("scheduled_date", { ascending: filters.ascending ?? false })
    .order("scheduled_time", { ascending: filters.ascending ?? false })
    .range(page * pageSize, page * pageSize + pageSize - 1);

  if (filters.locationId) query = query.eq("location_id", filters.locationId);
  if (filters.status && filters.status !== "all") query = query.eq("status", filters.status);
  if (filters.dateFrom) query = query.gte("scheduled_date", filters.dateFrom);
  if (filters.dateTo) query = query.lte("scheduled_date", filters.dateTo);
  if (patientIds) query = query.in("patient_id", patientIds);

  const { data, error, count } = await query;
  if (error) return { ok: false, error: error.message };
  return {
    ok: true,
    data: { rows: (data ?? []) as AppointmentRow[], count: count ?? 0, page, pageSize },
  };
}

export interface DashboardStats {
  today: AppointmentRow[];
  todayScheduled: number;
  todayCompleted: number;
  todayNoShow: number;
  openThisWeek: number;
  locations: Location[];
}

export async function fetchDashboardStats(): Promise<Result<DashboardStats>> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: "The backend isn't connected yet." };
  }

  const supabase = await getSupabaseServerClient();
  const today = todayISO();

  const locationsRes = await supabase
    .from("locations")
    .select("*")
    .eq("is_active", true)
    .order("name");
  if (locationsRes.error) return { ok: false, error: locationsRes.error.message };

  const todayRes = await fetchAppointments({ dateFrom: today, dateTo: today, pageSize: 200 });
  if (!todayRes.ok) return { ok: false, error: todayRes.error };

  // Open bookings still to attend, from today forward — the number a
  // receptionist actually acts on each morning. Counted via count: "exact",
  // so no rows need to be fetched.
  const weekRes = await fetchAppointments({
    dateFrom: today,
    status: "scheduled",
    pageSize: 1,
    page: 0,
  });
  if (!weekRes.ok) return { ok: false, error: weekRes.error };

  const todayRows = todayRes.data.rows;
  return {
    ok: true,
    data: {
      today: todayRows,
      todayScheduled: todayRows.filter((a) => a.status === "scheduled").length,
      todayCompleted: todayRows.filter((a) => a.status === "completed").length,
      todayNoShow: todayRows.filter((a) => a.status === "no_show").length,
      openThisWeek: weekRes.ok ? weekRes.data.count : 0,
      locations: (locationsRes.data ?? []) as Location[],
    },
  };
}

export async function fetchPatients(params: {
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<Result<{ rows: Patient[]; count: number; page: number; pageSize: number }>> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: "The backend isn't connected yet." };
  }

  const pageSize = params.pageSize ?? 25;
  const page = params.page ?? 0;

  let query = (await getSupabaseServerClient())
    .from("patients")
    .select("*", { count: "exact" })
    .order("first_visit_date", { ascending: false })
    .order("name", { ascending: true })
    .range(page * pageSize, page * pageSize + pageSize - 1);

  if (params.search) {
    const term = safeFilterTerm(params.search);
    if (term) {
      query = query.or(`name.ilike.*${term}*,phone.ilike.*${term}*`);
    }
  }

  const { data, error, count } = await query;
  if (error) return { ok: false, error: error.message };
  return {
    ok: true,
    data: { rows: (data ?? []) as Patient[], count: count ?? 0, page, pageSize },
  };
}

export async function fetchPatientById(id: string): Promise<Result<Patient>> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: "The backend isn't connected yet." };
  }
  const { data, error } = await (await getSupabaseServerClient())
    .from("patients")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) return { ok: false, error: error.message };
  return data ? { ok: true, data: data as Patient } : { ok: false, error: "not-found" };
}

/** Visit history for one patient, newest first. */
export async function fetchPatientVisits(patientId: string): Promise<Result<AppointmentRow[]>> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: "The backend isn't connected yet." };
  }
  const { data, error } = await (await getSupabaseServerClient())
    .from("appointments")
    .select(APPOINTMENT_SELECT)
    .eq("patient_id", patientId)
    .order("scheduled_date", { ascending: false });
  if (error) return { ok: false, error: error.message };
  return { ok: true, data: (data ?? []) as AppointmentRow[] };
}

/**
 * Appointment history for one phone number, used by the "is this patient
 * already known to us?" check on the add-appointment form. Resolves the
 * patient first — appointments doesn't carry phone.
 */
export async function fetchAppointmentsByPhone(
  phone: string
): Promise<Result<AppointmentRow[]>> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: "The backend isn't connected yet." };
  }
  const supabase = await getSupabaseServerClient();

  const { data: patient, error: patientError } = await supabase
    .from("patients")
    .select("id")
    .eq("phone", phone.trim())
    .single();

  if (patientError) return { ok: true, data: [] };
  if (!patient) return { ok: true, data: [] };

  const { data, error } = await supabase
    .from("appointments")
    .select(APPOINTMENT_SELECT)
    .eq("patient_id", patient.id)
    .order("scheduled_date", { ascending: false });
  if (error) return { ok: false, error: error.message };
  return { ok: true, data: (data ?? []) as AppointmentRow[] };
}

export async function fetchStaff(): Promise<Result<Profile[]>> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: "The backend isn't connected yet." };
  }
  const { data, error } = await (await getSupabaseServerClient())
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) return { ok: false, error: error.message };
  return { ok: true, data: (data ?? []) as Profile[] };
}
