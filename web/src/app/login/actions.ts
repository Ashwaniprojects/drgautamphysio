"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { isSupabaseConfigured, requireSupabaseEnv } from "@/lib/supabase/config";

export type AuthResult = { ok: true } | { ok: false; error: string };

/**
 * Email + password sign-in only. Magic link and OAuth are intentionally not
 * wired up: this is a two-or-three-person practice staff console, not a
 * patient-facing login, and password sign-in is the only flow with an obvious
 * recovery path.
 *
 * Also disables "Email Confirmation" in Auth settings for staff accounts,
 * otherwise the first sign-in attempt fails with "Email not confirmed".
 */
export async function signIn(
  formData: FormData
): Promise<{ ok: true; redirect: string } | { ok: false; error: string }> {
  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      error:
        "The admin backend isn't connected yet. Create .env.local from .env.example " +
        "with your Supabase project URL and anon key, then redeploy.",
    };
  }

  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { ok: false, error: "Email and password are both required." };
  }

  const { url, anonKey } = requireSupabaseEnv();
  // cookies() is async but @supabase/ssr's `getAll` must be synchronous, so
  // resolve the store once up front and read it synchronously from there.
  const cookieStore = await cookies();
  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value, options } of cookiesToSet) {
          cookieStore.set(name, value, options);
        }
      },
    },
  });

  // redirect() throws, so the cookie writes from signInWithPassword happen
  // first and the auth session is live when /admin loads.
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    // "Email not confirmed" is the usual symptom of a staff account created
    // before Email Confirmation was turned off in Auth settings — say so.
    if (/not confirmed/i.test(error.message)) {
      return {
        ok: false,
        error:
          "That account's email isn't confirmed. In the Supabase dashboard, " +
          "sign the user in once via Auth > Users > Sign in, or disable " +
          "Email Confirmation in Auth > Providers.",
      };
    }
    if (/invalid login credentials/i.test(error.message)) {
      return { ok: false, error: "Incorrect email or password." };
    }
    return { ok: false, error: `Sign-in failed: ${error.message}` };
  }

  redirect("/admin");
}

export async function signOut(): Promise<void> {
  if (!isSupabaseConfigured()) {
    redirect("/");
    return;
  }

  const { url, anonKey } = requireSupabaseEnv();
  // cookies() is async but @supabase/ssr's `getAll` must be synchronous, so
  // resolve the store once up front and read it synchronously from there.
  const cookieStore = await cookies();
  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value, options } of cookiesToSet) {
          cookieStore.set(name, value, options);
        }
      },
    },
  });

  await supabase.auth.signOut();
  redirect("/login");
}
