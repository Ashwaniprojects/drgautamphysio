"use client";

import { useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-tint rounded-2xl p-6 flex flex-col gap-2">
        <span className="text-base font-semibold text-ink">This form isn&apos;t connected yet</span>
        <span className="text-sm text-ink/65 leading-relaxed">
          A sending email address needs to be set up first, requirements checklist §E. For now,
          please call or WhatsApp us using the details on this page, we reply fastest that way
          anyway.
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
            placeholder="e.g. Ramesh Kumar"
            className="h-12 rounded-[10px] border-[1.5px] border-ink/15 px-3.5 text-[15px] focus:outline-none focus:border-primary"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-[13px] font-semibold text-ink/65">Phone number</span>
          <input
            type="tel"
            required
            placeholder="e.g. 98765 43210"
            className="h-12 rounded-[10px] border-[1.5px] border-ink/15 px-3.5 text-[15px] focus:outline-none focus:border-primary"
          />
        </label>
      </div>
      <label className="flex flex-col gap-1.5">
        <span className="text-[13px] font-semibold text-ink/65">Message</span>
        <textarea
          required
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
