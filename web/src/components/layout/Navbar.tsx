"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { label: "Conditions", href: "/conditions" },
  { label: "Treatments", href: "/treatments" },
  { label: "About", href: "/about" },
  { label: "Clinics", href: "/clinics" },
  { label: "Stories", href: "/stories" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white border-b border-ink/10 relative">
      <div className="h-[84px] flex items-center justify-between px-6 md:px-22">
        <Logo />

        <nav className="hidden xl:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="text-[14.5px] font-medium text-ink hover:text-primary whitespace-nowrap">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <Button href="/book">Book Appointment</Button>
          </div>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="xl:hidden flex flex-col gap-1.5 p-2"
          >
            <span className="w-5 h-0.5 bg-ink" />
            <span className="w-5 h-0.5 bg-ink" />
            <span className="w-5 h-0.5 bg-ink" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="xl:hidden border-t border-ink/10 bg-white px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-[15px] font-medium text-ink py-2.5"
            >
              {link.label}
            </Link>
          ))}
          <div className="sm:hidden mt-2">
            <Button href="/book" className="w-full">
              Book Appointment
            </Button>
          </div>
        </nav>
      )}
    </div>
  );
}
