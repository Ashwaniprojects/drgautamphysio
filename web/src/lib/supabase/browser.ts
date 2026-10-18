import { createBrowserClient } from "@supabase/ssr";
import { requireSupabaseEnv } from "./config";

/**
 * Browser client, for use only inside client components and event handlers.
 * Mostly needed for realtime subscriptions in the admin console (e.g. showing
 * a new booking appear without a refresh). Ordinary reads/writes should go
 * through server actions instead, so secrets and session logic stay server-side.
 */
export function getSupabaseBrowserClient() {
  const { url, anonKey } = requireSupabaseEnv();
  return createBrowserClient(url, anonKey);
}
