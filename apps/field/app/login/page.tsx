import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { getHubLoginUrl } from "@/lib/hub";

/**
 * Field no longer has its own login form — every BuildRail product signs
 * in at the shared hub (apps/app), per docs/platform/identity-foundation.md
 * ("one primary service, one login"). This route exists only so old
 * bookmarks/links to /login still land somewhere useful instead of 404ing.
 * middleware.ts sends unauthenticated /dashboard visits straight to the
 * hub already; this page covers anyone who navigates to /login directly.
 */
export default async function LoginRedirectPage() {
  const headersList = await headers();
  const proto = headersList.get("x-forwarded-proto") ?? "http";
  const host = headersList.get("host") ?? "localhost:3001";
  redirect(getHubLoginUrl(`${proto}://${host}/dashboard`));
}
