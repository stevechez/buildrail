import "server-only";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { requireCurrentProfile as requireCurrentProfileShared } from "@buildrail/auth";

import { createSupabaseServerClient } from "@/lib/supabase-server";

/** Cookie holding the user's currently-selected organization (see ACTIVE_ORG_COOKIE
 * usage in lib/actions/switch-organization.ts). Ephemeral session/UI state,
 * not tenancy data — deliberately not a column on `profiles`, which stays
 * identity-only per docs/platform/identity-foundation.md. */
export const ACTIVE_ORG_COOKIE = "buildrail_active_org";

/**
 * Resolves the logged-in user's organization context + profile. Redirects
 * to /login if there's no session, and to /onboarding if they have no
 * organization_members row yet (brand-new signup, or an invite they
 * haven't accepted).
 *
 * If the user has switched organizations (see
 * lib/actions/switch-organization.ts), honors that selection — falls back
 * to their oldest membership otherwise. requireCurrentProfileShared
 * validates the cookie's org id is an actual membership of theirs, so a
 * stale/tampered cookie can't grant access to an org they've left.
 */
export async function requireCurrentProfile() {
  const supabase = await createSupabaseServerClient();
  const cookieStore = await cookies();
  const activeOrgId = cookieStore.get(ACTIVE_ORG_COOKIE)?.value;

  const context = await requireCurrentProfileShared(supabase, {
    onUnauthenticated: () => redirect("/login"),
    onNoMembership: () => redirect("/onboarding"),
    organizationId: activeOrgId,
  });

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("full_name, email, avatar_url")
    .eq("id", context.userId)
    .maybeSingle();
  if (profileError) {
    console.error("requireCurrentProfile: profile lookup failed", profileError);
  }

  return {
    id: context.userId,
    organizationId: context.organizationId,
    organizationName: context.organizationName,
    role: context.role,
    fullName: profile?.full_name ?? null,
    avatarUrl: profile?.avatar_url ?? null,
    email: profile?.email,
  };
}
