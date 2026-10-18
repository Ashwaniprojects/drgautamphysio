import Link from "next/link";
import { fetchDashboardStats } from "@/lib/admin-data";
import { formatTime, locationTagLabel } from "@/lib/format";
import { Alert, EmptyState, PageTitle, StatCard, StatusPill } from "./ui";

export default async function AdminOverview() {
  const result = await fetchDashboardStats();

  return (
    <>
      <PageTitle
        title="Overview"
        subtitle="What's on today across all three clinics."
      >
        <Link
          href="/admin/appointments"
          className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-colors hover:bg-primary-dark"
        >
          Open appointments
        </Link>
      </PageTitle>

      {!result.ok ? (
        <Alert tone="info">{result.error}</Alert>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard
              label="Today scheduled"
              value={result.data.todayScheduled}
              tone="primary"
              hint="Still to attend"
            />
            <StatCard
              label="Completed today"
              value={result.data.todayCompleted}
              tone="success"
            />
            <StatCard
              label="No-shows today"
              value={result.data.todayNoShow}
              tone={result.data.todayNoShow > 0 ? "warning" : "default"}
            />
            <StatCard
              label="Open bookings ahead"
              value={result.data.openThisWeek}
              hint="Today onwards"
            />
          </div>

          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-ink">Today&apos;s appointments</h2>
              {result.data.today.length > 0 && (
                <Link href="/admin/appointments" className="text-sm font-medium text-primary hover:text-primary-dark">
                  Manage all →
                </Link>
              )}
            </div>

            {result.data.today.length === 0 ? (
              <EmptyState
                title="Nothing booked for today"
                body="New bookings from the site's form appear here, as does anything a receptionist adds by hand."
              />
            ) : (
              <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-border-light">
                {result.data.today.map((a, i) => (
                  <div
                    key={a.id}
                    className={`flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-4 ${i > 0 ? "border-t border-border-light" : ""}`}
                  >
                    <span className="w-20 font-display text-base font-bold text-primary">
                      {formatTime(a.scheduled_time)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink">{a.patient.name}</p>
                      <p className="text-[12px] text-ink/45">
                        {a.patient.phone}
                        {a.reason ? ` · ${a.reason}` : ""}
                      </p>
                    </div>
                    <span className="text-[12px] font-medium text-ink/55">
                      {a.location.name}
                    </span>
                    <StatusPill status={a.status} />
                  </div>
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 className="mb-3 font-display text-lg font-bold text-ink">Clinics</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {result.data.locations.map((loc) => (
                <div key={loc.id} className="rounded-2xl bg-white p-4 ring-1 ring-border-light">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-display text-[15px] font-bold text-ink">{loc.name}</p>
                    <span className="rounded-full bg-paper-warm px-2 py-0.5 text-[10px] font-semibold text-ink/50">
                      {locationTagLabel(loc.tag)}
                    </span>
                  </div>
                  <p className="mt-1 text-[12px] text-ink/45">{loc.area}</p>
                  <p className="mt-2 text-[12px] leading-snug text-ink/60">{loc.hours}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
