import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// Only the admin console is gated. The public site — including the booking
// form — must stay unauthenticated, and a broad matcher would add a DB round
// trip to every page view for no benefit.
const PUBLIC_PATHS = ["/login", "/"];

export async function middleware(request: NextRequest) {
  const { response, isAuthenticated } = await updateSession(request);
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return response;
  }

  if (!isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (pathname === "/login") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/login", "/admin/:path*"],
};
