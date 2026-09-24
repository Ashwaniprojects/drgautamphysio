"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

export function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = `Website enquiry from ${name}`;
    const body = `Name: ${name}\nPhone: ${phone}\n\n${message}`;
    const mailto = `mailto:${siteConfig.clinicEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="bg-tint rounded-2xl p-6 flex flex-col gap-2">
        <span className="text-base font-semibold text-ink">Opening your email app</span>
        <span className="text-sm text-ink/65 leading-relaxed">
          Your message is drafted and addressed to {siteConfig.clinicEmail}. Send it from there, or
          call or WhatsApp us instead if that&apos;s easier.
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-[13px] font-semibold text-ink/65">Full name</span>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Ramesh Kumar"
            className="h-12 rounded-[10px] border-[1.5px] border-ink/15 px-3.5 text-[15px] focus:outline-none focus:border-primary"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-[13px] font-semibold text-ink/65">Phone number</span>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. 98765 43210"
            className="h-12 rounded-[10px] border-[1.5px] border-ink/15 px-3.5 text-[15px] focus:outline-none focus:border-primary"
          />
        </label>
      </div>
      <label className="flex flex-col gap-1.5">
        <span className="text-[13px] font-semibold text-ink/65">Message</span>
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What can we help with?"
          className="h-28 rounded-[10px] border-[1.5px] border-ink/15 px-3.5 py-2.5 text-[15px] resize-none focus:outline-none focus:border-primary"
        />
      </label>
      <button
        type="submit"
        className="w-fit inline-flex items-center justify-center rounded-full bg-accent text-white font-semibold px-7 py-3.5 hover:bg-primary-hover"
      >
        Send Message
      </button>
    </form>
  );
}
