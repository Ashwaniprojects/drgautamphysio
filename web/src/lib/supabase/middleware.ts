import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isSupabaseConfigured } from "./config";

/**
 * Edge-middleware variant of the server client.
 *
 * Separate from server.ts because this one must be synchronous and must talk
 * to the request/response cookie headers directly — it runs in the edge
 * runtime, where `cookies()` and React's `cache()` don't exist.
 */
export async function updateSession(
  request: NextRequest
): Promise<{ response: NextResponse; isAuthenticated: boolean }> {
  if (!isSupabaseConfigured()) {
    // Not configured yet: don't crash edge middleware, just pass through.
    return { response: NextResponse.next(), isAuthenticated: false };
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  let response = NextResponse.next({ request });

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: Record<string, unknown>) {
        request.cookies.set({ name, value, ...options });
        response = NextResponse.next({ request });
        response.cookies.set({ name, value, ...options });
      },
      remove(name: string, options: Record<string, unknown>) {
        request.cookies.set({ name, value: "", ...options });
        response = NextResponse.next({ request });
        response.cookies.set({ name, value: "", ...options });
      },
    },
  });

  // Runs on every request hitting a protected route. Cheap (header check),
  // and required so an expired session cookie gets refreshed instead of
  // being served forever.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { response, isAuthenticated: user !== null };
}
