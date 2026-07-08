import { NextResponse } from "next/server";

import { getHubUrl } from "@/lib/hub";

/**
 * apps/sites has no local auth — magic-link code exchange always happens
 * at the shared hub's /auth/callback (apps/app), which then redirects back
 * to the returnTo URL (e.g. /admin) once the session is established. This
 * stub exists only so a stray link/bookmark to /auth/callback here doesn't
 * 404 or mishandle a code param this app doesn't process itself.
 */
export async function GET() {
  return NextResponse.redirect(new URL("/auth/callback", getHubUrl()));
}
