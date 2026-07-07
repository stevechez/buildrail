import "server-only";
import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase-server";

/**
 * Fetches the logged-in user's profile + org. Redirects to /login if there's
 * no session (middleware already guards /dashboard, this is the belt to its
 * suspenders for Server Components that need the org id directly).
 *
 * IMPORTANT: a missing `profiles` row is NOT the same as "not logged in" —
 * it redirects to /no-access, never to /login. /no-access is intentionally
 * outside middleware's matcher (see middleware.ts), so it can't be redirected
 * anywhere else. Redirecting a valid-session-but-no-profile user to /login
 * would infinite-loop: middleware bounces any authenticated session straight
 * from /login back to /dashboard, and this function would bounce it right
 * back here. Learned that one the hard way — see /AI/12-DECISIONS.md.
 *
 * Deliberately two separate queries, not one `profiles.select("*,
 * organizations(name)")` embed. An embedded join can fail independently of
 * whether the profile row exists — e.g. PostgREST's schema cache hasn't
 * picked up the FK relationship yet after a fresh migration — and the old
 * single-query version treated *any* failure (including that one) as "no
 * profile," which caused a real /dashboard ↔ /no-access infinite redirect
 * loop the moment the org-name join failed for an unrelated reason. The org
 * name is presentation-only, so its query is allowed to fail without
 * affecting the access decision. See /AI/12-DECISIONS.md.
 */
export async function requireCurrentProfile() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, organization_id, full_name, role")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    console.error("requireCurrentProfile: profile lookup failed", profileError);
  }
  if (!profile) redirect("/no-access");

  let organizationName = "Your organization";
  const { data: org, error: orgError } = await supabase
    .from("organizations")
    .select("name")
    .eq("id", profile.organization_id)
    .maybeSingle();
  if (orgError) {
    console.error("requireCurrentProfile: organization lookup failed", orgError);
  } else if (org?.name) {
    organizationName = org.name;
  }

  return {
    id: profile.id,
    organizationId: profile.organization_id,
    fullName: profile.full_name,
    role: profile.role,
    organizationName,
    email: user.email,
  };
}
