import { redirect } from "next/navigation";
import { getStaffSession, requireStaffSession } from "@/lib/session";
import { fetchStaff } from "@/lib/admin-data";
import { formatDate } from "@/lib/format";
import { Alert, EmptyState, PageTitle, roleBadge } from "../ui";

export default async function StaffPage() {
  const session = await getStaffSession();
  const profile = requireStaffSession(session);

  // Only Dr. Gautam manages staff accounts. Reception doesn't even see the link.
  if (profile.role !== "admin") redirect("/admin");

  const result = await fetchStaff();

  return (
    <>
      <PageTitle
        title="Staff accounts"
        subtitle="Who can sign in to this console, and what they can do."
      />

      <Alert tone="info">
        Create the login itself in the Supabase dashboard under{" "}
        <strong>Auth &rarr; Users &rarr; Add user</strong> (email + password). Then add that
        same email to the <code className="rounded bg-primary-100 px-1.5 py-0.5 font-mono text-[12px]">profiles</code>{" "}
        table below so the console knows which role to grant.
      </Alert>

      <div className="mt-4">
        {!result.ok ? (
          <Alert tone="error">{result.error}</Alert>
        ) : result.data.length === 0 ? (
          <EmptyState
            title="No staff accounts yet"
            body="Add a user in the Supabase dashboard, then insert a matching row into the profiles table:"
          >
            <code className="block max-w-full overflow-x-auto rounded-xl bg-slate-900 px-4 py-3 text-left font-mono text-[12px] text-slate-100">
              {`INSERT INTO profiles (email, full_name, role)
              VALUES ('gautam@dr-gautams-physio.in', 'Dr. Gautam Pal', 'admin');`}
            </code>
          </EmptyState>
        ) : (
          <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-border-light">
            <div className="hidden sm:grid sm:grid-cols-[1fr_6rem_5rem_8rem] sm:gap-3 sm:border-b sm:border-border-light sm:bg-paper-warm/50 sm:px-5 sm:py-3 sm:text-[11px] sm:font-semibold sm:uppercase sm:tracking-wide sm:text-ink/40">
              <span>Person</span>
              <span>Role</span>
              <span>Status</span>
              <span>Added</span>
            </div>

            {result.data.map((p, i) => (
              <div
                key={p.id}
                className={`grid grid-cols-1 gap-x-3 gap-y-1 px-5 py-4 sm:grid-cols-[1fr_6rem_5rem_8rem] sm:items-center ${
                  i > 0 ? "border-t border-border-light" : ""
                }`}
              >
                <div>
                  <p className="text-sm font-semibold text-ink">
                    {p.full_name ?? p.email}
                  </p>
                  <p className="text-[12px] text-ink/45">{p.email}</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${
                    p.role === "admin"
                      ? "bg-primary-50 text-primary-700 ring-primary-100"
                      : "bg-paper-warm text-ink/60 ring-border-light"
                  }`}
                >
                  {roleBadge(p.role)}
                </span>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${
                    p.is_active
                      ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
                      : "bg-slate-100 text-slate-500 ring-slate-200"
                  }`}
                >
                  {p.is_active ? "Active" : "Disabled"}
                </span>
                <span className="text-[13px] text-ink/55">
                  {formatDate(p.created_at.slice(0, 10))}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <section className="mt-8 rounded-2xl bg-white p-5 ring-1 ring-border-light">
        <h2 className="mb-2 font-display text-lg font-bold text-ink">Adding a receptionist</h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-ink/70">
          <li>
            Supabase dashboard → <strong>Auth → Users → Add user</strong>. Choose email
            and password, and turn off email confirmation for this account, or the first
            sign-in will fail.
          </li>
          <li>
            Open <strong>Table Editor → profiles</strong> and insert one row with that
            exact email and a role of <code className="rounded bg-paper-warm px-1.5 py-0.5 font-mono text-[12px]">staff</code>.
          </li>
          <li>
            <strong>Table Editor → patient_profiles</strong> — insert the same email,
            or leave it empty. Receptionist notes are optional.
          </li>
          <li>
            That person can now log in at <code className="rounded bg-paper-warm px-1.5 py-0.5 font-mono text-[12px]">/login</code>.
            They can view and edit all appointments and patients, but cannot delete
            bookings or manage staff accounts.
          </li>
        </ol>
      </section>
    </>
  );
}
