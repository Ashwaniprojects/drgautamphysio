"use client";

import { useState, useTransition } from "react";
import { CheckIcon, PinIcon } from "@/components/icons";
import { clinics } from "@/lib/data/clinics";
import { createBooking } from "@/app/book/actions";

const TIME_SLOTS = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM",
];

const STEP_LABELS = ["Clinic", "Date & Time", "Your Details", "Confirm"];

type DateOption = { iso: string; weekday: string; day: number };

function generateDates(count: number): DateOption[] {
  const out: DateOption[] = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    out.push({
      iso: d.toISOString().slice(0, 10),
      weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
      day: d.getDate(),
    });
  }
  return out;
}

export function BookingWizard() {
  const [dates] = useState(() => generateDates(10));
  const [step, setStep] = useState(1);
  const [locationSlug, setLocationSlug] = useState<string | null>(null);
  const [dateISO, setDateISO] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [reason, setReason] = useState("");
  const [patientType, setPatientType] = useState<"new" | "returning">("new");
  const [whatsappOptIn, setWhatsappOptIn] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [booked, setBooked] = useState<{ appointmentId: string } | null>(null);

  const selectedLocation = clinics.find((c) => c.slug === locationSlug);
  const selectedDate = dates.find((d) => d.iso === dateISO);

  function canContinue() {
    if (step === 1) return Boolean(locationSlug);
    if (step === 2) return Boolean(dateISO && time);
    if (step === 3) return name.trim().length > 0 && phone.trim().length > 0;
    return true;
  }

  function goNext() {
    if (!canContinue()) return;
    setStep((s) => Math.min(s + 1, 4));
  }
  function goBack() {
    setStep((s) => Math.max(s - 1, 1));
  }

  function submitBooking() {
    if (!locationSlug || !dateISO || !time) return;
    setSubmitError(null);
    startTransition(async () => {
      const result = await createBooking({
        locationSlug,
        dateISO,
        time12h: time,
        name,
        phone,
        age: age || undefined,
        reason: reason || undefined,
        patientType,
        whatsappOptIn,
      });
      if (result.ok) {
        setBooked({ appointmentId: result.appointmentId });
        setStep(5);
      } else {
        setSubmitError(result.error);
      }
    });
  }

  function restart() {
    setStep(1);
    setLocationSlug(null);
    setDateISO(null);
    setTime(null);
    setName("");
    setPhone("");
    setAge("");
    setReason("");
    setPatientType("new");
    setWhatsappOptIn(false);
    setSubmitError(null);
    setBooked(null);
  }

  const submitLabel = pending ? "Booking…" : "Confirm booking";

  return (
    <div className="w-full max-w-[880px] bg-white rounded-[24px] shadow-[0_24px_60px_rgba(27,27,24,0.10)] p-6 md:p-12 flex flex-col gap-8 mx-auto">
      {step <= 4 && (
        <div className="flex items-center">
          {STEP_LABELS.map((label, i) => {
            const n = i + 1;
            const active = step === n;
            const done = step > n;
            return (
              <div key={label} className={`flex items-center ${i < STEP_LABELS.length - 1 ? "flex-1" : ""}`}>
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                      active || done ? "bg-primary border-primary text-paper" : "bg-white border-ink/20 text-ink/40"
                    }`}
                  >
                    {done ? <CheckIcon size={15} /> : n}
                  </div>
                  <span className={`text-xs font-semibold whitespace-nowrap ${active ? "text-ink" : "text-ink/40"}`}>
                    {label}
                  </span>
                </div>
                {i < STEP_LABELS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 mb-5.5 ${step > n ? "bg-primary" : "bg-ink/15"}`} />
                )}
              </div>
            );
          })}
        </div>
      )}

      {step <= 4 && (
        <div className="min-h-[420px] md:min-h-[500px]">
          {step === 1 && (
            <div className="flex flex-col gap-5">
              <h2 className="font-display text-xl md:text-2xl font-semibold">Choose a clinic</h2>
              {clinics.map((c) => {
                const selected = locationSlug === c.slug;
                return (
                  <button
                    key={c.slug}
                    type="button"
                    onClick={() => setLocationSlug(c.slug)}
                    className={`w-full text-left rounded-2xl p-5 flex items-center justify-between gap-4 border-2 transition-colors ${
                      selected ? "border-primary bg-tint" : "border-ink/10 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <PinIcon className="text-primary shrink-0" size={22} />
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="font-semibold">{c.name}</span>
                          <span className="text-[10.5px] font-bold uppercase tracking-wide text-primary bg-tint px-2.5 py-0.5 rounded-full">
                            {c.tag}
                          </span>
                        </div>
                        <span className="text-[13px] text-ink/55">
                          {c.area} &middot; {c.hours}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`w-5.5 h-5.5 rounded-full border-2 shrink-0 ${
                        selected ? "border-primary bg-primary" : "border-ink/25 bg-white"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-7">
              <div className="flex flex-col gap-4">
                <h2 className="font-display text-xl md:text-2xl font-semibold">Choose a date</h2>
                <p className="text-[13px] text-ink/55 -mt-2">
                  Showing general availability — exact per-clinic hours will filter this
                  automatically once confirmed (checklist §B).
                </p>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {dates.map((d) => {
                    const selected = dateISO === d.iso;
                    return (
                      <button
                        key={d.iso}
                        type="button"
                        onClick={() => setDateISO(d.iso)}
                        className={`shrink-0 w-16 rounded-xl py-3 flex flex-col items-center gap-1 border-[1.5px] ${
                          selected ? "bg-primary border-primary text-paper" : "bg-white border-ink/15 text-ink"
                        }`}
                      >
                        <span className="text-[11px] font-semibold">{d.weekday}</span>
                        <span className="font-display text-lg font-semibold">{d.day}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="font-display text-xl md:text-2xl font-semibold">Choose a time</h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                  {TIME_SLOTS.map((t) => {
                    const selected = time === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTime(t)}
                        className={`rounded-xl py-3 text-[13.5px] font-semibold border-[1.5px] text-center ${
                          selected ? "bg-primary border-primary text-paper" : "bg-white border-ink/15 text-ink"
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-5">
              <h2 className="font-display text-xl md:text-2xl font-semibold">Your details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col gap-1.5">
                  <span className="text-[13px] font-semibold text-ink/65">Full name *</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="h-12 rounded-[10px] border-[1.5px] border-ink/15 px-3.5 text-[15px] focus:outline-none focus:border-primary"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-[13px] font-semibold text-ink/65">Phone number *</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 98765 43210"
                    className="h-12 rounded-[10px] border-[1.5px] border-ink/15 px-3.5 text-[15px] focus:outline-none focus:border-primary"
                  />
                </label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col gap-1.5">
                  <span className="text-[13px] font-semibold text-ink/65">Age (optional)</span>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="e.g. 42"
                    className="h-12 rounded-[10px] border-[1.5px] border-ink/15 px-3.5 text-[15px] focus:outline-none focus:border-primary"
                  />
                </label>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[13px] font-semibold text-ink/65">You are a</span>
                  <div className="flex gap-2 h-12">
                    {(["new", "returning"] as const).map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setPatientType(v)}
                        className={`flex-1 rounded-[10px] border-[1.5px] text-sm font-semibold ${
                          patientType === v ? "bg-primary border-primary text-paper" : "bg-white border-ink/15 text-ink"
                        }`}
                      >
                        {v === "new" ? "New patient" : "Returning"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <label className="flex flex-col gap-1.5">
                <span className="text-[13px] font-semibold text-ink/65">Reason for visit (optional)</span>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g. Lower back pain for 2 weeks"
                  className="h-20 rounded-[10px] border-[1.5px] border-ink/15 px-3.5 py-2.5 text-[15px] resize-none focus:outline-none focus:border-primary"
                />
              </label>
            </div>
          )}

          {step === 4 && (
            <div className="flex flex-col gap-6">
              <h2 className="font-display text-xl md:text-2xl font-semibold">Review &amp; confirm</h2>
              <div className="bg-tint rounded-2xl p-6 flex flex-col gap-4">
                <SummaryRow label="Clinic" value={selectedLocation?.name ?? "—"} onChange={() => setStep(1)} />
                <div className="h-px bg-ink/10" />
                <SummaryRow
                  label="Date & time"
                  value={selectedDate ? `${selectedDate.weekday} ${selectedDate.day} · ${time}` : "—"}
                  onChange={() => setStep(2)}
                />
                <div className="h-px bg-ink/10" />
                <SummaryRow label="Patient" value={`${name} · ${phone}`} onChange={() => setStep(3)} />
              </div>
              <button
                type="button"
                onClick={() => setWhatsappOptIn((v) => !v)}
                className="flex items-start gap-3 text-left"
              >
                <span
                  className={`w-5 h-5 rounded-[5px] border-[1.5px] border-primary shrink-0 mt-0.5 flex items-center justify-center ${
                    whatsappOptIn ? "bg-primary" : "bg-white"
                  }`}
                >
                  {whatsappOptIn && <CheckIcon size={13} className="text-paper" />}
                </span>
                <span className="text-[13.5px] leading-relaxed text-ink/65">
                  Also send me appointment reminders and occasional recovery tips on WhatsApp
                  (optional — separate from your booking confirmation, which we always send).
                </span>
              </button>
              {submitError && (
                <p className="text-sm text-red-700 bg-red-50 rounded-xl px-4 py-3">{submitError}</p>
              )}
              <button
                type="button"
                onClick={submitBooking}
                disabled={pending}
                className="w-full h-14 rounded-full font-bold text-white bg-accent hover:bg-primary-hover disabled:opacity-70"
              >
                {submitLabel}
              </button>
            </div>
          )}
        </div>
      )}

      {step === 5 && booked && (
        <div className="flex flex-col items-center text-center gap-5 py-6">
          <div className="w-18 h-18 rounded-full bg-primary flex items-center justify-center">
            <CheckIcon size={34} className="text-paper" />
          </div>
          <h2 className="font-display text-2xl md:text-[28px] font-semibold">You&apos;re booked!</h2>
          <p className="text-[15.5px] leading-relaxed text-ink/65 max-w-md">
            Booking reference <strong>{booked.appointmentId.slice(0, 8)}</strong>. We&apos;ll confirm
            on WhatsApp once that number is connected (checklist §E) — for now, keep this reference
            if you need to call the clinic.
          </p>
          <div className="bg-tint rounded-2xl px-7 py-5 flex gap-7 flex-wrap justify-center">
            <SummaryStat label="Clinic" value={selectedLocation?.name ?? "—"} />
            <SummaryStat label="Date" value={selectedDate ? `${selectedDate.weekday} ${selectedDate.day}` : "—"} />
            <SummaryStat label="Time" value={time ?? "—"} />
          </div>
          <button
            type="button"
            onClick={restart}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-accent text-white font-semibold px-7 py-4"
          >
            Book Another Appointment
          </button>
        </div>
      )}

      {step <= 4 && (
        <div className="flex items-center justify-between">
          {step > 1 ? (
            <button type="button" onClick={goBack} className="text-[14.5px] font-semibold text-ink/65">
              ← Back
            </button>
          ) : (
            <span />
          )}
          {step < 4 && (
            <button
              type="button"
              onClick={goNext}
              disabled={!canContinue()}
              className="inline-flex items-center gap-2 rounded-full text-white font-semibold px-7 py-3.5 bg-accent disabled:bg-accent/40 disabled:cursor-not-allowed"
            >
              Continue →
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function SummaryRow({ label, value, onChange }: { label: string; value: string; onChange: () => void }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-col gap-0.5">
        <span className="text-xs text-ink/55">{label}</span>
        <span className="text-[15px] font-semibold">{value}</span>
      </div>
      <button type="button" onClick={onChange} className="text-[13px] font-semibold text-primary shrink-0">
        Change
      </button>
    </div>
  );
}

function SummaryStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 text-left">
      <span className="text-[11.5px] text-ink/55">{label}</span>
      <span className="text-[14.5px] font-semibold">{value}</span>
    </div>
  );
}
