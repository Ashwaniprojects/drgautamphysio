"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { label: "Conditions", href: "/conditions" },
  { label: "Treatments", href: "/treatments" },
  { label: "Awards", href: "/awards" },
  { label: "About", href: "/about" },
  { label: "Clinics", href: "/clinics" },
  { label: "Stories", href: "/stories" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-ink/8 shadow-[0_1px_20px_rgba(13,148,136,0.06)]"
          : "bg-white/60 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="h-[76px] flex items-center justify-between px-6 md:px-22">
        <Logo />

        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link text-[13.5px] font-medium text-ink/75 hover:text-ink px-2.5 py-1.5 whitespace-nowrap transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <Button href="/book" className="btn-glow">
              Book Appointment
            </Button>
          </div>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="xl:hidden flex flex-col gap-[5px] p-2 -mr-2"
          >
            <span
              className={`block w-5 h-0.5 bg-ink rounded-full transition-all duration-300 ${
                open ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-ink rounded-full transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-ink rounded-full transition-all duration-300 ${
                open ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {open && (
        <nav className="xl:hidden border-t border-ink/8 bg-white/95 backdrop-blur-xl px-6 py-5 flex flex-col gap-1 mobile-menu-enter">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-[15px] font-medium text-ink/80 py-3 border-b border-ink/5 last:border-0 hover:text-primary transition-colors"
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              {link.label}
            </Link>
          ))}
          <div className="sm:hidden mt-4">
            <Button href="/book" className="w-full btn-glow">
              Book Appointment
            </Button>
          </div>
        </nav>
      )}
    </div>
  );
}
