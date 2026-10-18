/**
 * Hand-written mirrors of the SQL schema in supabase/migrations.
 *
 * These are maintained by hand rather than generated (`supabase gen types
 * typescript`) because the project isn't linked to a live database yet;
 * regenerate them once it is and they should be byte-identical to these.
 */

export type AppointmentStatus = "scheduled" | "completed" | "no_show" | "cancelled";
export type PatientType = "new" | "returning";
export type StaffRole = "admin" | "staff";
export type LocationTag = "own_clinic" | "consults_here";

export interface Location {
  id: string;
  slug: string;
  name: string;
  tag: LocationTag;
  area: string | null;
  address: string | null;
  phone_display: string | null;
  phone_href: string | null;
  days_open: string | null;
  hours: string | null;
  rating: number | null;
  review_count: number | null;
  is_active: boolean;
  created_at: string;
}

export interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  age: number | null;
  date_of_birth: string | null;
  first_visit_date: string;
  condition_tags: string[];
  whatsapp_opt_in: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  patient_id: string;
  location_id: string;
  scheduled_date: string;
  scheduled_time: string;
  duration_minutes: number;
  status: AppointmentStatus;
  patient_type: PatientType;
  reason: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  role: StaffRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/** Location + clinic meta as returned by create_booking(). */
export interface BookingReceipt {
  appointment_id: string;
  patient_id: string;
  location_name: string;
}
