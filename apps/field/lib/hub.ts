/**
 * URL of the shared BuildRail hub (apps/app) — the one primary login every
 * product redirects to instead of maintaining its own sign-in page (see
 * docs/platform/identity-foundation.md: "one primary service, one login").
 * Defaults to the hub's local dev port; set NEXT_PUBLIC_HUB_URL in
 * production (e.g. https://app.buildrail.app).
 */
export function getHubUrl(): string {
  return process.env.NEXT_PUBLIC_HUB_URL ?? "http://localhost:3000";
}

/**
 * Builds a login URL that sends the user back to `returnPath` (a path or
 * full URL on *this* app) once they've signed in at the hub — see
 * apps/app/app/auth/callback/route.ts for the redirect-back side of this.
 */
export function getHubLoginUrl(returnPath: string): string {
  const url = new URL("/login", getHubUrl());
  url.searchParams.set("returnTo", returnPath);
  return url.toString();
}
