import { getStaffSession, requireStaffSession } from "@/lib/session";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { fetchAppointments } from "@/lib/admin-data";
import { todayISO } from "@/lib/format";
import { AppointmentFilters } from "./filters";
import { AppointmentsTable } from "./table";
import { AddAppointmentForm } from "./add-form";
import { Pagination } from "./pagination";
import { Alert, EmptyState, PageTitle } from "../ui";

const STATUSES = ["all", "scheduled", "completed", "no_show", "cancelled"] as const;
type StatusValue = (typeof STATUSES)[number];

/** Next 16 no longer exports a `SearchParams` type; the shape is this simple. */
type Params = Record<string, string | undefined>;

export default async function AppointmentsPage(props: {
  searchParams: Promise<Params>;
}) {
  const params = await props.searchParams;
  const profile = requireStaffSession(await getStaffSession());

  const rawStatus = params.status ?? "all";
  const status = STATUSES.includes(rawStatus as StatusValue) ? (rawStatus as StatusValue) : "all";

  const page = Math.max(0, parseInt(params.page ?? "0", 10) || 0);
  const ascending = params.dir === "asc";

  const result = await fetchAppointments({
    locationId: params.loc || undefined,
    status,
    dateFrom: params.from || undefined,
    dateTo: params.to || undefined,
    search: params.q || undefined,
    page,
    pageSize: 25,
    ascending,
  });

  const totalPages = Math.max(1, Math.ceil(result.ok ? result.data.count / 25 : 0));
  const showPagination = result.ok && (result.data.page > 0 || result.data.count > 25);

  return (
    <>
      <PageTitle
        title="Appointments"
        subtitle="Every booking, from the website and from reception."
      />

      <AppointmentFilters
        key={`${params.loc || ""}|${status}|${params.from || ""}|${params.to || ""}|${params.q || ""}`}
        initial={{
          location: params.loc || "",
          status,
          from: params.from || "",
          to: params.to || "",
          q: params.q || "",
        }}
        today={todayISO()}
      />

      <div className="mt-4">
        {!isSupabaseConfigured() ? (
          <Alert tone="info">
            The backend isn&apos;t connected yet, so there&apos;s nothing to list. Once the
            migration runs and .env.local exists, bookings from the website form appear here
            automatically.
          </Alert>
        ) : !result.ok ? (
          <Alert tone="error">{result.error}</Alert>
        ) : result.data.count === 0 ? (
          <EmptyState
            title="No appointments match these filters"
            body="Clear a filter above, or add one by hand from the form below."
          />
        ) : (
          <AppointmentsTable
            rows={result.data.rows}
            role={profile.role}
            directionLink={buildDirectionHref(params, page, ascending)}
          />
        )}
      </div>

      {showPagination && result.ok && (
        <Pagination
          page={result.data.page}
          totalPages={totalPages}
          params={params as Record<string, string | null>}
        />
      )}

      <div className="mt-10">
        <h2 className="mb-3 font-display text-lg font-bold text-ink">Add booking by hand</h2>
        <p className="mb-4 text-sm text-ink/50">
          For phone bookings and walk-ins. A patient whose phone number already exists is
          matched to their existing record rather than duplicated.
        </p>
        <AddAppointmentForm />
      </div>
    </>
  );
}

function buildDirectionHref(params: Params, page: number, ascending: boolean) {
  const next = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (key !== "page" && key !== "dir" && typeof value === "string") {
      next.set(key, value);
    }
  }
  next.set("page", String(page));
  next.set("dir", ascending ? "desc" : "asc");
  return `/admin/appointments?${next.toString()}`;
}
