import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { getStaffSession, requireStaffSession } from "@/lib/session";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { signOut } from "@/app/login/actions";
import { roleBadge } from "./ui";

export const metadata: Metadata = {
  robots: { index: false, follow: false, noarchive: true, nosnippet: true },
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  // Handle "not connected" before auth: bouncing an admin to /login with no
  // backend behind it is a dead end, so explain the fix instead.
  if (!isSupabaseConfigured()) {
    return <SetupRequired />;
  }

  const session = await getStaffSession();
  const profile = requireStaffSession(session);

  const nav = [
    { href: "/admin", label: "Overview" },
    { href: "/admin/appointments", label: "Appointments" },
    { href: "/admin/patients", label: "Patients" },
    ...(profile.role === "admin" ? [{ href: "/admin/staff", label: "Staff accounts" }] : []),
  ];

  return (
    <div className="min-h-screen bg-paper-warm text-ink">
      <header className="sticky top-0 z-30 border-b border-border-light bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <Link href="/admin" className="flex shrink-0 items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-md shadow-primary/20">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </span>
            <span className="hidden sm:block">
              <span className="block font-display text-[15px] font-bold leading-tight">
                Dr. Gautam&apos;s Physio
              </span>
              <span className="block text-[11px] text-ink/40 leading-tight">Staff console</span>
            </span>
          </Link>

          <nav className="ml-1 flex items-center gap-1 overflow-x-auto">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-ink/60 transition-colors hover:bg-primary-50 hover:text-primary-700"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-3">
            <span className="hidden text-right md:block">
              <span className="block text-[13px] font-semibold leading-tight">
                {profile.full_name ?? profile.email}
              </span>
              <span className="block text-[11px] text-ink/40 leading-tight">
                {roleBadge(profile.role)}
              </span>
            </span>
            <form action={signOut}>
              <button
                type="submit"
                className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-ink/60 transition-colors hover:bg-paper-warm hover:text-ink"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}

/** Shown until .env.local exists and the migration has been applied. */
function SetupRequired() {
  const steps = [
    {
      cmd: "npx supabase login",
      note: "Opens a browser. Run this in your own terminal.",
    },
    {
      cmd: "npx supabase link --project-ref acccenalqbscvgacvzdy",
      note: "From the project root, not web/.",
    },
    {
      cmd: "supabase db push",
      note: "Applies supabase/migrations/ — creates the tables, roles and booking function.",
    },
  ];

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 via-paper-warm to-tint px-4 py-12">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-xl shadow-ink/[0.06] ring-1 ring-border-light">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
            <svg className="h-5 w-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          </span>
          <div>
            <h1 className="font-display text-xl font-bold text-ink">
              The admin backend isn&apos;t connected yet
            </h1>
            <p className="text-sm text-ink/50">
              The console is built and waiting. It needs a live Supabase project to talk to.
            </p>
          </div>
        </div>

        <ol className="space-y-3">
          {steps.map((s, i) => (
            <li key={i} className="rounded-xl bg-paper-warm p-4">
              <code className="block break-all font-mono text-[13px] font-semibold text-primary-800">
                {s.cmd}
              </code>
              <span className="mt-1 block text-[13px] text-ink/55">{s.note}</span>
            </li>
          ))}
        </ol>

        <div className="mt-5 rounded-xl border border-border-light bg-paper-warm/60 p-4">
          <p className="text-[13px] leading-relaxed text-ink/65">
            Then copy<code className="mx-1 rounded bg-white px-1.5 py-0.5 font-mono text-[12px]">.env.example</code>
            to<code className="mx-1 rounded bg-white px-1.5 py-0.5 font-mono text-[12px]">.env.local</code>
            and paste in your project URL and anon key. After that, create the first staff
            account in the Supabase dashboard under Auth → Users, then add its email to the
            <code className="mx-1 rounded bg-white px-1.5 py-0.5 font-mono text-[12px]">profiles</code>
            table with a role of<code className="mx-1 rounded bg-white px-1.5 py-0.5 font-mono text-[12px]">admin</code>
            for Dr. Gautam or<code className="mx-1 rounded bg-white px-1.5 py-0.5 font-mono text-[12px]">staff</code>
            for reception.
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <Link href="/" className="text-sm font-medium text-primary hover:text-primary-dark">
            ← Back to the website
          </Link>
          <span className="text-[12px] text-ink/40">Public site is unaffected and still working.</span>
        </div>
      </div>
    </main>
  );
}
