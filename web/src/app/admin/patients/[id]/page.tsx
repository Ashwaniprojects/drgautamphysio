import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchPatientById, fetchPatientVisits } from "@/lib/admin-data";
import { formatDate, formatTime, STATUS_LABELS } from "@/lib/format";
import { PatientEditForm } from "../edit-form";
import { Alert, EmptyState, PageTitle } from "../../ui";

export default async function PatientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const patientResult = await fetchPatientById(id);
  if (!patientResult.ok) notFound();
  const patient = patientResult.data;

  const visits = await fetchPatientVisits(id);
  const withNotes = visits.ok ? visits.data.filter((v) => v.notes) : [];

  return (
    <>
      <Link
        href="/admin/patients"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark"
      >
        ← All patients
      </Link>

      <PageTitle
        title={patient.name}
        subtitle={`${patient.phone} · record opened ${formatDate(patient.created_at.slice(0, 10))}`}
      />

      <div className="space-y-6">
        <PatientEditForm patient={patient} />

        <section>
          <h2 className="mb-3 font-display text-lg font-bold text-ink">
            Visit history
            <span className="ml-2 text-sm font-normal text-ink/40">
              {visits.ok
                ? `${visits.data.length} booking${visits.data.length === 1 ? "" : "s"}`
                : ""}
            </span>
          </h2>

          {!visits.ok ? (
            <Alert tone="error">{visits.error}</Alert>
          ) : visits.data.length === 0 ? (
            <EmptyState
              title="No visits recorded"
              body="Bookings for this patient will appear here."
            />
          ) : (
            <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-border-light">
              {visits.data.map((v, i) => (
                <div
                  key={v.id}
                  className={`flex flex-wrap items-center gap-x-4 gap-y-1 px-5 py-4 ${
                    i > 0 ? "border-t border-border-light" : ""
                  }`}
                >
                  <span className="w-40 text-sm font-semibold text-ink">
                    {formatDate(v.scheduled_date)}
                    <span className="block text-[12px] font-normal text-ink/45">
                      {formatTime(v.scheduled_time)} · {v.duration_minutes} min
                    </span>
                  </span>
                  <span className="min-w-0 flex-1 text-[13px] text-ink/65">
                    {v.location.name}
                    {v.reason ? (
                      <span className="block text-ink/45">{v.reason}</span>
                    ) : null}
                  </span>
                  <span className="rounded-full bg-paper-warm px-2.5 py-1 text-[11px] font-semibold text-ink/55 ring-1 ring-border-light">
                    {STATUS_LABELS[v.status]}
                  </span>
                  <span className="rounded-full bg-primary-50 px-2.5 py-1 text-[11px] font-semibold text-primary-700 ring-1 ring-primary-100">
                    {v.patient_type === "new" ? "New patient" : "Returning"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {withNotes.length > 0 && (
          <section>
            <h2 className="mb-3 font-display text-lg font-bold text-ink">
              Treatment notes
            </h2>
            <div className="space-y-3">
              {withNotes.map((v) => (
                <div key={v.id} className="rounded-2xl bg-white p-4 ring-1 ring-border-light">
                  <p className="mb-1 text-[12px] font-semibold text-ink/45">
                    {formatDate(v.scheduled_date)} at {v.location.name}
                  </p>
                  <p className="text-sm leading-relaxed text-ink/80">{v.notes}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
