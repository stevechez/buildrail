/**
 * URL of the shared BuildRail hub (apps/app) — the one primary login every
 * product redirects to instead of maintaining its own sign-in page (see
 * docs/platform/identity-foundation.md: "one primary service, one login").
 * apps/sites has no signup/organization flow of its own; /admin here is a
 * staff-only lead review tool, gated the same way apps/field gates its
 * dashboard. Defaults to the hub's local dev port; set NEXT_PUBLIC_HUB_URL
 * in production (e.g. https://app.buildrail.app).
 */
export function getHubUrl(): string {
  return process.env.NEXT_PUBLIC_HUB_URL ?? "http://localhost:3000";
}

/**
 * Builds a login URL that sends the user back to `returnUrl` once they've
 * signed in at the hub. Must be a full absolute URL (e.g.
 * `request.nextUrl.href`), not just a pathname — the hub redirects back to
 * this value verbatim after auth, and Sites runs on a different
 * origin/port than the hub, so a bare path would land the user back on the
 * hub's own origin instead of here.
 */
export function getHubLoginUrl(returnUrl: string): string {
  const url = new URL("/login", getHubUrl());
  url.searchParams.set("returnTo", returnUrl);
  return url.toString();
}
