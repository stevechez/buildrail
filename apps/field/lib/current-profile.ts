import "server-only";
import { redirect } from "next/navigation";
import { requireCurrentProfile as requireCurrentProfileShared } from "@buildrail/auth";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { getHubUrl } from "@/lib/hub";

/**
 * Fetches the logged-in user's organization context + profile. Redirects to
 * the shared hub's /login if there's no session (middleware already guards
 * /dashboard, this is the belt to its suspenders for Server Components that
 * need the org id directly).
 *
 * IMPORTANT: no organization_members row is NOT the same as "not logged
 * in" — it redirects to the hub's /onboarding (create-org / accept-invite
 * flow), not back into a local page. Onboarding lives only in apps/app now
 * (docs/platform/identity-foundation.md: "one primary service, one
 * login") — this used to redirect to a local /no-access page with its own
 * create-org form; that duplicated the hub's onboarding and has been
 * retired in favor of it. See /AI/12-DECISIONS.md for the original
 * no-access-vs-login redirect-loop bug this pattern avoids.
 *
 * Thin wrapper around @buildrail/auth's requireCurrentProfile — see that
 * package for the shared organization_members query logic this used to
 * duplicate, and docs/platform/identity-foundation.md for why profiles and
 * organization membership are separate tables.
 */
export async function requireCurrentProfile() {
  const supabase = await createSupabaseServerClient();

  const context = await requireCurrentProfileShared(supabase, {
    onUnauthenticated: () => redirect(new URL("/login", getHubUrl()).toString()),
    onNoMembership: () => redirect(new URL("/onboarding", getHubUrl()).toString()),
  });

  // full_name/email are identity data on `profiles`, which
  // requireCurrentProfileShared() intentionally doesn't fetch (not every
  // product needs it) — one extra lightweight lookup here, same
  // fails-open-on-error treatment as the organization name lookup inside
  // the shared helper.
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("full_name, email")
    .eq("id", context.userId)
    .maybeSingle();
  if (profileError) {
    console.error("requireCurrentProfile: profile lookup failed", profileError);
  }

  return {
    id: context.userId,
    organizationId: context.organizationId,
    fullName: profile?.full_name ?? null,
    role: context.role,
    organizationName: context.organizationName,
    email: profile?.email,
  };
}
