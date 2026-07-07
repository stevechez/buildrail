"use server";

import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { createOrganizationAndOwner, acceptInvitation } from "@buildrail/auth";

/**
 * Creates a brand-new organization for the current user and makes them its
 * owner (docs/platform/identity-foundation.md: "User Assigned Owner
 * Role"). Delegates to @buildrail/auth's createOrganizationAndOwner — the
 * same helper apps/field's onboarding uses — so the two can't drift into
 * different "create my first org" implementations.
 *
 * Runs on the service-role client: a user with no organization_members row
 * yet has no is_org_member()/is_org_admin() match, so an RLS-scoped insert
 * has nothing to scope against.
 */
export async function createOrganization(input: { organizationName: string; fullName: string }) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const admin = createSupabaseAdminClient();

  const { data: existingMembership } = await admin
    .from("organization_members")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();
  if (existingMembership) redirect("/dashboard");

  await createOrganizationAndOwner(admin, { name: input.organizationName, userId: user.id });

  const fullName = input.fullName.trim();
  if (fullName) {
    await admin.from("profiles").update({ full_name: fullName }).eq("id", user.id);
  }

  redirect("/dashboard");
}

/** Accepts a pending invitation, joining the inviting org instead of creating a new one. */
export async function acceptInvite(invitationId: string) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !user.email) redirect("/login");

  const admin = createSupabaseAdminClient();
  await acceptInvitation(admin, { invitationId, userId: user.id, userEmail: user.email });

  redirect("/dashboard");
}
