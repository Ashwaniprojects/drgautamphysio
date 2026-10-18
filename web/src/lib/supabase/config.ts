/**
 * Central env access for Supabase.
 *
 * Both values are NEXT_PUBLIC_ by design: the anon key is safe in the browser
 * and is what the public booking RPC authenticates with. The service-role key
 * is deliberately never read anywhere in this project — privileged operations
 * go through the security-definer SQL functions in supabase/migrations, not
 * through elevated credentials held by the frontend host.
 */
export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

/** Throws with an actionable message. For internal helpers that can't degrade. */
export function requireSupabaseEnv() {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase is not configured. Copy .env.example to .env.local and set " +
        "NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  };
}
