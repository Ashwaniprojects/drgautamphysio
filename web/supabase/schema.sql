-- Dr. Gautam's Physio — booking system schema
-- Run this once in the Supabase project's SQL editor after the project is created.
-- Matches the data model in ../../04-booking-and-automation-spec.md, scoped down for
-- the first build pass: a `slots` table (pre-generated bookable slots) is deferred until
-- real per-clinic days/hours are confirmed (requirements checklist §B) — see the README
-- in this folder for what that unlocks.

create extension if not exists pgcrypto;

create type appointment_status as enum ('scheduled', 'completed', 'no_show', 'cancelled');
create type patient_type as enum ('new', 'returning');

create table if not exists locations (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  tag text not null, -- 'own_clinic' | 'consults_here'
  address text,
  days_open text, -- free text until checklist §B is confirmed; replace with structured hours later
  hours text,
  created_at timestamptz not null default now()
);

create table if not exists patients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null unique,
  email text,
  age int,
  first_visit_date date not null default current_date,
  condition_tags text[] not null default '{}',
  whatsapp_opt_in boolean not null default false,
  created_at timestamptz not null default now()
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
  created_at timestamptz not null default now()
);

create index if not exists appointments_location_date_idx on appointments (location_id, scheduled_date);
create index if not exists appointments_patient_idx on appointments (patient_id);

insert into locations (slug, name, tag, address, days_open, hours)
values
  ('subhash-marg', 'Subhash Marg', 'own_clinic', null, 'Pending — checklist §B', 'Pending — checklist §B'),
  ('neera-hospital', 'Neera Hospital', 'consults_here', 'Mahanagar / Aliganj', 'Pending — checklist §B', 'Pending — checklist §B'),
  ('medox-hospital', 'Medox Hospital', 'consults_here', 'Jankipuram', 'Pending — checklist §B', 'Pending — checklist §B')
on conflict (slug) do nothing;

-- Row Level Security: the public booking form may create a patient + appointment,
-- but cannot read anyone's records back. This is healthcare-adjacent data (names,
-- phone numbers, conditions) — the reception/admin views must authenticate as staff
-- and use the service-role key server-side once that's built; don't loosen these
-- policies to make the admin UI "just work" against the anon key.
alter table locations enable row level security;
alter table patients enable row level security;
alter table appointments enable row level security;

create policy "Public can read clinic list" on locations for select using (true);
create policy "Public can create a patient record" on patients for insert with check (true);
create policy "Public can create an appointment" on appointments for insert with check (true);
