"use client";

import { useState, useTransition } from "react";
import type { FormEvent } from "react";
import { signIn } from "./actions";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function attemptSignIn(formData: FormData) {
    const result = await signIn(formData);
    // On success signIn() redirects server-side, so this only runs on failure.
    if (!result.ok) setError(result.error);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    startTransition(() => attemptSignIn(new FormData(event.currentTarget)));
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 via-paper-warm to-tint px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20">
            <svg
              className="h-6 w-6 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1 className="font-display text-2xl font-bold text-ink">Staff sign in</h1>
          <p className="mt-2 text-sm text-ink/50">Dr. Gautam&apos;s Physio &amp; Rehab Centre</p>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-3xl bg-white p-7 shadow-xl shadow-ink/[0.06] ring-1 ring-border-light"
        >
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="username"
                required
                placeholder="you@clinic.com"
                className="w-full rounded-xl border border-border bg-paper-warm px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/15"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-ink">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Your password"
                className="w-full rounded-xl border border-border bg-paper-warm px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/15"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="mt-1 w-full rounded-xl bg-primary py-3.5 font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Signing in…" : "Sign in"}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-ink/35">
          Staff accounts only. There is no patient login.
        </p>
      </div>
    </main>
  );
}
