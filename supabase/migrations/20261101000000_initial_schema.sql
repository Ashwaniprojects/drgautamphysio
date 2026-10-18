-- Dr. Gautam's Physio — booking + staff management schema (v2)
--
-- Supersedes web/supabase/schema.sql, which granted `anon` direct insert on
-- patients and appointments. This replaces that with a security-definer RPC
-- (create_booking) so the public site writes through one audited entry point
-- and never touches those tables directly. See that file's header for context.
--
-- Assumes Asia/Kolkata (IST) throughout: appointments are stored as date + time
-- with no timezone, which is correct for a single-city practice but must not be
-- silently carried to a multi-city deployment.

create extension if not exists pgcrypto;

-- =========================================================================
-- Enums
-- =========================================================================

create type appointment_status as enum ('scheduled', 'completed', 'no_show', 'cancelled');
create type patient_type as enum ('new', 'returning');

-- admin  = Dr. Gautam: full access, including managing staff accounts.
-- staff  = Sunita Mam / reception: manage appointments and patients, no
--          staff administration, no deletes.
create type staff_role as enum ('admin', 'staff');

-- =========================================================================
-- Tables
-- =========================================================================

create table if not exists locations (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  tag text not null,                      -- 'own_clinic' | 'consults_here'
  area text,
  address text,
  phone_display text,
  phone_href text,
  days_open text,                         -- free text until checklist §B is confirmed
  hours text,
  rating numeric(2, 1),
  review_count int,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists patients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null unique,
  email text,
  age int,
  date_of_birth date,                     -- optional; feeds occasion-based recall (spec §2)
  first_visit_date date not null default current_date,
  condition_tags text[] not null default '{}',
  whatsapp_opt_in boolean not null default false,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references patients (id) on delete cascade,
  location_id uuid not null references locations (id),
  scheduled_date date not null,
  scheduled_time time not null,
  duration_minutes int not null default 30,
  status appointment_status not null default 'scheduled',
  patient_type patient_type not null default 'new',
  reason text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Staff accounts. Provisioned deliberately in the Supabase dashboard (Auth >
-- Users) or via SQL, then given a role here -- public self-signup must be
-- turned OFF in the project's Auth settings, otherwise an unverified role
-- default becomes an account takeover path.
create table if not exists profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  full_name text,
  phone text,
  role staff_role not null default 'staff',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =========================================================================
-- Indexes
-- =========================================================================

-- Dashboard list/filter hot path: location + date, newest first.
create index if not exists appointments_location_date_idx
  on appointments (location_id, scheduled_date desc, scheduled_time);
create index if not exists appointments_patient_idx on appointments (patient_id);
create index if not exists appointments_status_idx on appointments (status);
create index if not exists profiles_role_idx on profiles (role);

-- Two live appointments can never occupy the same room at the same moment.
-- Partial, so a cancelled booking frees its slot immediately.
create unique index if not exists appointments_no_overlap_idx
  on appointments (location_id, scheduled_date, scheduled_time)
  where status not in ('cancelled');

-- =========================================================================
-- Triggers
-- =========================================================================

create or replace function set_updated_at()
returns trigger
language plpgsql
security definer
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists patients_set_updated_at on patients;
create trigger patients_set_updated_at
  before update on patients
  for each row execute function set_updated_at();

drop trigger if exists appointments_set_updated_at on appointments;
create trigger appointments_set_updated_at
  before update on appointments
  for each row execute function set_updated_at();

drop trigger if exists profiles_set_updated_at on profiles;
create trigger profiles_set_updated_at
  before update on profiles
  for each row execute function set_updated_at();

-- =========================================================================
-- Role helpers (admin-only, security definer)
-- =========================================================================

-- The authenticated caller's role. Returns null when unauthenticated or when
-- the account is deactivated, so every policy below can fail closed on it.
create or replace function current_role()
returns staff_role
language sql
security definer
stable
as $$
  select p.role
  from profiles p
  where p.id = auth.uid()
    and p.is_active
    and auth.uid() is not null;
$$;

-- Grant/revoke a role. Only an active admin may call it, and only against
-- another active account. Raises a readable error rather than silently
-- no-oping, so a mis-keyed call is visible.
create or replace function set_user_role(
  p_user_id uuid,
  p_role staff_role,
  p_full_name text default null,
  p_phone text default null
)
returns void
language plpgsql
security definer
as $$
begin
  if current_role() is distinct from 'admin' then
    raise exception using message = 'Only an admin can change roles.',
                          errcode = '42501';
  end if;

  if p_user_id is distinct from auth.uid() and not exists (
    select 1 from profiles where id = p_user_id and is_active
  ) then
    raise exception using message = 'Target account is inactive.',
                          errcode = '42501';
  end if;

  update profiles
     set role = p_role,
         full_name = coalesce(p_full_name, full_name),
         phone = coalesce(p_phone, phone)
   where id = p_user_id;
end;
$$;

-- Deactivate instead of delete: deletes a row from profiles would orphan the
-- appointments that staff entered, and history must survive.
create or replace function set_user_active(p_user_id uuid, p_active boolean)
returns void
language plpgsql
security definer
as $$
begin
  if current_role() is distinct from 'admin' then
    raise exception using message = 'Only an admin can change account status.',
                          errcode = '42501';
  end if;
  if p_active and p_user_id is not distinct from auth.uid() then
    -- Guard against an admin being unable to un-deactivate themselves.
    null;
  end if;
  if not p_active and p_user_id is not distinct from auth.uid() then
    raise exception using message = 'You cannot deactivate your own account.',
                          errcode = '23514';
  end if;

  update profiles set is_active = p_active where id = p_user_id;
end;
$$;

-- =========================================================================
-- Public booking entry point
-- =========================================================================

-- The only path the unauthenticated public site may use. It runs as the table
-- owner, so the patient upsert-by-phone that RLS previously broke works here
-- without ever granting anon write access to those tables.
--
-- All inputs arrive as bound parameters (supabase-js .rpc), never interpolated
-- into SQL text, so there is no injection surface here.
create or replace function create_booking(
  p_location_slug text,
  p_scheduled_date date,
  p_scheduled_time time,
  p_name text,
  p_phone text,
  p_age int default null,
  p_reason text default null,
  p_patient_type patient_type default 'new',
  p_whatsapp_opt_in boolean default false
)
returns table (appointment_id uuid, patient_id uuid, location_name text)
language plpgsql
security definer
as $$
declare
  v_location_id uuid;
  v_location_name text;
  v_patient_id uuid;
  v_name text := trim(coalesce(p_name, ''));
  v_phone text := trim(coalesce(p_phone, ''));
begin
  if v_name = '' or v_phone = '' then
    raise exception using message = 'Name and phone are required.', errcode = '23514';
  end if;

  if not regexp_matches(v_phone, '^[0-9+\\-() ]{7,20}$') then
    raise exception using message = 'That phone number looks invalid.', errcode = '23514';
  end if;

  select id, name into v_location_id, v_location_name
  from locations
  where slug = p_location_slug and is_active;

  if v_location_id is null then
    raise exception using message = 'That clinic could not be found.', errcode = '23514';
  end if;

  if p_scheduled_date is null or p_scheduled_date < current_date then
    raise exception using message = 'Please choose a date from today onwards.', errcode = '23514';
  end if;

  if p_scheduled_time is null then
    raise exception using message = 'Please choose a time.', errcode = '23514';
  end if;

  -- Returning patients reuse their record by phone; the booking's patient_type
  -- stays authoritative for "new vs returning", so we don't rewrite it here.
  insert into patients (name, phone, age, whatsapp_opt_in)
  values (v_name, v_phone, p_age, p_whatsapp_opt_in)
  on conflict (phone) do update
    set name = excluded.name,
        age = coalesce(excluded.age, patients.age),
        whatsapp_opt_in = excluded.whatsapp_opt_in
  returning id into v_patient_id;

  return query
    insert into appointments (patient_id, location_id, scheduled_date, scheduled_time,
                              status, patient_type, reason)
    values (v_patient_id, v_location_id, p_scheduled_date, p_scheduled_time,
            'scheduled', p_patient_type, nullif(trim(coalesce(p_reason, '')), ''))
    returning id, patient_id, v_location_name as location_name;
end;
$$;

-- Only anon (public site) and authenticated staff may call it.
revoke all on function create_booking(text, date, time, text, text, int, text, patient_type, boolean) from anon;
grant execute on function create_booking(text, date, time, text, text, int, text, patient_type, boolean) to anon, authenticated;

-- =========================================================================
-- Row Level Security
-- =========================================================================

alter table locations enable row level security;
alter table patients enable row level security;
alter table appointments enable row level security;
alter table profiles enable row level security;

-- Locations: clinic directory, public. Writes are staff-only.
create policy "Public can read clinics"
  on locations for select
  using (is_active);

create policy "Staff can update clinics"
  on locations for all
  using (current_role() is not null)
  with check (current_role() is not null);

-- Patients: staff read/write, admin everything. No deletes by anyone at the
-- policy level -- deactivate patients by marking them, keep the history.
create policy "Staff can read patients"
  on patients for select
  using (current_role() is not null);

create policy "Staff can insert patients"
  on patients for insert
  with check (current_role() is not null);

create policy "Staff can update patients"
  on patients for update
  using (current_role() is not null)
  with check (current_role() is not null);

create policy "Admin can delete patients"
  on patients for delete
  using (current_role() = 'admin');

-- Appointments: same shape. Status transitions (scheduled -> completed,
-- no_show, cancelled) are plain updates, so staff get them for free.
create policy "Staff can read appointments"
  on appointments for select
  using (current_role() is not null);

create policy "Staff can insert appointments"
  on appointments for insert
  with check (current_role() is not null);

create policy "Staff can update appointments"
  on appointments for update
  using (current_role() is not null)
  with check (current_role() is not null);

create policy "Admin can delete appointments"
  on appointments for delete
  using (current_role() = 'admin');

-- Profiles: read your own row, or read everything if admin. Never write your
-- own role or active flag through table policies -- those go through
-- set_user_role() / set_user_active(), which enforce the admin check in SQL.
create policy "Read own profile"
  on profiles for select
  using (id = auth.uid() or current_role() = 'admin');

create policy "Update own profile details"
  on profiles for update
  using (id = auth.uid())
  with check (id = auth.uid() and role = (select role from profiles where id = auth.uid()));

create policy "Admin can read all profiles"
  on profiles for select
  using (current_role() = 'admin');

create policy "Admin can insert profiles"
  on profiles for insert
  with check (current_role() = 'admin');

create policy "Admin can delete profiles"
  on profiles for delete
  using (current_role() = 'admin');

-- =========================================================================
-- Seed data -- addresses/phones from web/src/lib/data/clinics.ts,
-- which are confirmed against each clinic's own Google Business Profile.
-- days_open/hours stay pending checklist §B rather than being guessed.
-- =========================================================================

insert into locations (slug, name, tag, area, address, phone_display, phone_href, hours, rating, review_count)
values
  ('subhash-marg', 'Subhash Marg', 'own_clinic', 'Yahiyaganj',
   '98-89, Subhash Marg, Jawahar Nagar, Yahiyaganj, Lucknow, Uttar Pradesh 226003',
   '+91 94152 06444', 'tel:+919415206444',
   'Mon-Sat 9 AM to 9 PM · Sun 9 AM to 2 PM (JustDial; Google showed 8 PM close — checklist §B)',
   4.9, 190),
  ('neera-hospital', 'Neera Hospital', 'consults_here', 'Mahanagar / Aliganj',
   'Neera Hospital, B-2, Maha Nagar, Crossing B2, near New Hanuman Mandir, Aliganj, Lucknow, Uttar Pradesh 226021',
   '+91 87872 82889', 'tel:+918787282889',
   'Call to confirm consulting days — checklist §B',
   4.9, 466),
  ('medox-hospital', 'Medox Hospital', 'consults_here', 'Jankipuram',
   'Medox Hospital, CP-2, Tedhi Pulia Ring Road, near Bhavna Complex, Sector F, Jankipuram, Lucknow, Uttar Pradesh 226021',
   '+91 87872 82889', 'tel:+918787282889',
   'Call to confirm consulting days — checklist §B',
   5.0, 73)
on conflict (slug) do nothing;
