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

  const { pathname } = request.nextUrl;

  // Protect the office dashboard — everything under /dashboard requires a
  // logged-in profile. Sign-in happens at the shared hub (apps/app), not
  // here — see docs/platform/identity-foundation.md and lib/hub.ts.
  // /portal/[token] and /api/sms/inbound stay public; they're gated by the
  // token check / Twilio signature instead.
  if (pathname.startsWith("/dashboard")) {
    if (!user) {
      return NextResponse.redirect(getHubLoginUrl(request.nextUrl.pathname));
    }
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
