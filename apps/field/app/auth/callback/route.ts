import { NextResponse } from "next/server";

import { getHubUrl } from "@/lib/hub";

/**
 * Dead route, kept only as a stub because this environment can't delete
 * files. Magic-link code exchange now always happens at the shared hub's
 * /auth/callback (apps/app) — see docs/platform/identity-foundation.md and
 * lib/hub.ts. Nothing in this app links here anymore; if something old
 * still does, forward it to the hub rather than 404ing or (worse) silently
 * mishandling a code param this app no longer expects.
 */
export async function GET() {
  return NextResponse.redirect(new URL("/auth/callback", getHubUrl()));
}
