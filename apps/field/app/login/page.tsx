import { redirect } from "next/navigation";

import { getHubLoginUrl } from "@/lib/hub";

/**
 * Field no longer has its own login form — every BuildRail product signs
 * in at the shared hub (apps/app), per docs/platform/identity-foundation.md
 * ("one primary service, one login"). This route exists only so old
 * bookmarks/links to /login still land somewhere useful instead of 404ing.
 * middleware.ts sends unauthenticated /dashboard visits straight to the
 * hub already; this page covers anyone who navigates to /login directly.
 */
export default function LoginRedirectPage() {
  redirect(getHubLoginUrl("/dashboard"));
}
