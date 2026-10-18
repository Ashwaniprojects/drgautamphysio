import Link from "next/link";
import { fetchPatients } from "@/lib/admin-data";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { formatDate } from "@/lib/format";
import { Pagination } from "../appointments/pagination";
import { Alert, EmptyState, PageTitle } from "../ui";

/** Next 16 no longer exports a `SearchParams` type; the shape is this simple. */
type Params = Record<string, string | undefined>;

export default async function PatientsPage(props: {
  searchParams: Promise<Params>;
}) {
  const params = await props.searchParams;
  const search = params.q || undefined;
  const page = Math.max(0, parseInt(params.page ?? "0", 10) || 0);

  const result = await fetchPatients({ search, page, pageSize: 25 });

  return (
    <>
      <PageTitle
        title="Patients"
        subtitle="One record per phone number, with their full visit history."
      />

      <PatientSearch initial={search ?? ""} />

      <div className="mt-4">
        {!isSupabaseConfigured() ? (
          <Alert tone="info">
            The backend isn&apos;t connected yet. Patient records are created the first time
            someone books through the website, or when reception adds a booking by hand.
          </Alert>
        ) : !result.ok ? (
          <Alert tone="error">{result.error}</Alert>
        ) : result.data.count === 0 ? (
          <EmptyState
            title={search ? "No patients match that search" : "No patient records yet"}
            body={
              search
                ? "Try a shorter string, or a phone number."
                : "The first online booking creates the first record."
            }
          />
        ) : (
          <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-border-light">
            <div className="hidden md:grid md:grid-cols-[1fr_8rem_6rem_7rem_5rem] md:gap-3 md:border-b md:border-border-light md:bg-paper-warm/50 md:px-5 md:py-3 md:text-[11px] md:font-semibold md:uppercase md:tracking-wide md:text-ink/40">
              <span>Patient</span>
              <span>Phone</span>
              <span>Age</span>
              <span>First visit</span>
              <span>Tags</span>
            </div>

            {result.data.rows.map((p, i) => (
              <div
                key={p.id}
                className={`grid grid-cols-1 gap-x-3 gap-y-1 px-5 py-4 md:grid-cols-[1fr_8rem_6rem_7rem_5rem] md:items-center ${
                  i > 0 ? "border-t border-border-light" : ""
                }`}
              >
                <div>
                  <Link
                    href={`/admin/patients/${p.id}`}
                    className="text-sm font-semibold text-ink hover:text-primary hover:underline"
                  >
                    {p.name}
                  </Link>
                  {p.email && <p className="text-[12px] text-ink/45">{p.email}</p>}
                </div>
                <a
                  href={`tel:${p.phone.replace(/\s/g, "")}`}
                  className="text-[13px] font-medium text-primary hover:underline"
                >
                  {p.phone}
                </a>
                <span className="text-[13px] text-ink/65">{p.age ?? "—"}</span>
                <span className="text-[13px] text-ink/65">{formatDate(p.first_visit_date)}</span>
                <span className="flex items-center gap-1">
                  {p.condition_tags.length > 0 ? (
                    p.condition_tags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-paper-warm px-2 py-0.5 text-[10px] font-medium text-ink/55"
                      >
                        {t}
                      </span>
                    ))
                  ) : (
                    <span className="text-[12px] text-ink/30">—</span>
                  )}
                  {p.whatsapp_opt_in && (
                    <span
                      className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700"
                      title="Opted in to WhatsApp follow-ups"
                    >
                      WA
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {result.ok && (result.data.page > 0 || result.data.count > 25) && (
        <Pagination
          page={result.data.page}
          totalPages={Math.max(1, Math.ceil(result.data.count / 25))}
          params={params as Record<string, string | null>}
          basePath="/admin/patients"
        />
      )}
    </>
  );
}

function PatientSearch({ initial }: { initial: string }) {
  return (
    <form
      action="/admin/patients"
      method="get"
      className="rounded-2xl bg-white p-3 ring-1 ring-border-light"
    >
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <svg
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="search"
            name="q"
            defaultValue={initial}
            placeholder="Search by name or phone"
            className="w-full rounded-xl border border-border bg-white py-2.5 pl-10 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-primary focus:ring-2 focus:ring-primary/15"
          />
        </div>
        <button
          type="submit"
          className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          Search
        </button>
      </div>
    </form>
  );
}
