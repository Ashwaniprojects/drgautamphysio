"use client";

import { doctor } from "@/lib/data/doctor";

const credentials = [
  ...doctor.fellowshipsAndCertifications,
  "Ph.D. Scholar, Noida International University",
  "State Treasurer, IAP Uttar Pradesh",
  "Session Chairperson, Physioconnect 5",
  "Judge, IPA Women Cell & Physio Manthan",
];

function CredentialItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4 shrink-0 px-8 py-4">
      <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
      <span className="text-[14px] font-medium text-ink/60 whitespace-nowrap">{text}</span>
    </div>
  );
}

export function CredentialsStrip() {
  const doubled = [...credentials, ...credentials];

  return (
    <section className="bg-paper py-6 border-y border-ink/5 overflow-hidden">
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-paper to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-paper to-transparent pointer-events-none z-10" />

        <div className="flex w-max" style={{ animation: "scrollLeft 40s linear infinite" }}>
          {doubled.map((text, i) => (
            <CredentialItem key={i} text={text} />
          ))}
        </div>
      </div>
    </section>
  );
}
