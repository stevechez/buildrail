import { redirect } from "next/navigation";

import { getHubUrl } from "@/lib/hub";

/**
 * Dead route, kept only as a stub because this environment can't delete
 * files. Onboarding (create-org / accept-invite for a signed-in user with
 * no organization_members row) now lives only at the shared hub's
 * /onboarding (apps/app) — see lib/current-profile.ts and
 * docs/platform/identity-foundation.md. Nothing in this app links here
 * anymore.
 */
export default function NoAccessRedirectPage() {
  redirect(new URL("/onboarding", getHubUrl()).toString());
}
