import { NextResponse, type NextRequest } from "next/server";
import { createMiddlewareSupabaseClient } from "@buildrail/database";

import { getHubLoginUrl } from "@/lib/hub";

export async function middleware(request: NextRequest) {
  const { supabase, response } = createMiddlewareSupabaseClient(request, () =>
    NextResponse.next({ request })
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protect the staff lead dashboard — sign-in happens at the shared hub
  // (apps/app), not a bespoke local login page, per docs/platform/
  // identity-foundation.md's "one primary service, one login". Everything
  // else in apps/sites is public marketing/lead-capture.
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!user) {
      // Pass the full absolute URL, not just the pathname — the hub
      // redirects back to `returnTo` verbatim once signed in, and Sites
      // runs on a different origin/port than the hub, so a bare path
      // would land the user back on the hub's own origin instead.
      return NextResponse.redirect(getHubLoginUrl(request.nextUrl.href));
    }
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
