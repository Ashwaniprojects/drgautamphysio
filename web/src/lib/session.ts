import "server-only";
import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { Profile, StaffRole } from "@/lib/types";

export type StaffSession =
  | { ok: false; reason: "not-configured" | "anonymous" | "no-profile" }
  | { ok: true; profile: Profile; role: StaffRole };

/**
 * Resolves the signed-in staff member, or a typed failure.
 *
 * Returns a value instead of redirecting on its own so components can render
 * a specific message ("backend not connected yet") rather than a generic
 * 401 — until .env.local exists every admin visit must explain why it can't
 * work, not silently bounce.
 */
export async function getStaffSession(): Promise<StaffSession> {
  if (!isSupabaseConfigured()) {
    return { ok: false, reason: "not-configured" };
  }

  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false, reason: "anonymous" };
  }

  // An auth user without a profiles row has no role at all. Fail closed:
  // current_role() returns null, so every RLS policy denies them too.
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile || !profile.is_active) {
    return { ok: false, reason: "no-profile" };
  }

  return { ok: true, profile: profile as Profile, role: profile.role };
}

/** Server Action guard: throws a readable error, never silently proceeds. */
export function assertStaffSession(session: StaffSession): Profile {
  if (!session.ok) {
    if (session.reason === "not-configured") {
      throw new Error("The admin backend isn't connected yet. See .env.example.");
    }
    throw new Error("You must be signed in as staff to do that.");
  }
  return session.profile;
}

/** Server Component guard: bounces back to login. */
export function requireStaffSession(session: StaffSession): Profile {
  if (!session.ok) {
    redirect("/login");
  }
  return session.profile;
}
