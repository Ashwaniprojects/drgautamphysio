import { cookies } from "next/headers";
import { cache } from "react";
import { createServerClient } from "@supabase/ssr";
import { requireSupabaseEnv } from "./config";

/**
 * Server-side client for Server Components and Server Actions.
 *
 * Uses the anon key, never the service-role key. Privileged work goes through
 * the security-definer functions in supabase/migrations, which enforce the
 * role check in SQL — so nothing in the frontend host ever holds credentials
 * that could read a patient's phone number across an account boundary.
 *
 * `cache()` dedupes per render pass, so a layout and its children don't each
 * re-establish a session.
 */
export const getSupabaseServerClient = cache(async () => {
  const { url, anonKey } = requireSupabaseEnv();
  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, cookieOptions: Record<string, unknown>) {
        try {
          cookieStore.set(name, value, cookieOptions);
        } catch {
          // Thrown outside a Server Action (reads only). Safe to ignore —
          // the session simply isn't refreshed in this render.
        }
      },
      remove(name: string, cookieOptions: Record<string, unknown>) {
        try {
          cookieStore.set(name, "", cookieOptions);
        } catch {
          // Same as above.
        }
      },
    },
  });
});
