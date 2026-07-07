"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import {
  createInvitation,
  revokeInvitation,
  acceptInvitation,
  createOrganizationAndOwner,
} from "@buildrail/auth";

/**
 * @deprecated Unused now that onboarding (create-org / accept-invite) lives
 * only at the shared hub's /onboarding (apps/app) — see
 * lib/current-profile.ts and docs/platform/identity-foundation.md ("one
 * primary service, one login"). Field's own /no-access page, which used to
 * call this, is now a redirect stub pointing at the hub instead. Kept here
 * (rather than deleted) only because this environment can't delete files;
 * safe to remove once tooling allows it.
 *
 * Bootstraps a brand-new user into their own organization: they become that
 * org's first (owner) member. Delegates to @buildrail/auth's
 * createOrganizationAndOwner — the same helper apps/app's onboarding flow
 * uses — so this and the shared hub can't drift into two different
 * "create my first org" implementations.
 *
 * Runs on the service-role client because a user with no
 * organization_members row yet has no is_org_member()/is_org_admin()
 * match, so ordinary RLS-scoped inserts would have nothing to scope
 * against — same trusted-server-code pattern as the Twilio webhook and the
 * client portal (see lib/supabase-admin.ts).
 *
 * Guards against double-submission by checking for an existing membership
 * first — the (organization_id, user_id) unique constraint on
 * organization_members would also reject a second insert, this just gives a
 * friendlier outcome (redirect, not an error).
 */
export async function createOrganizationAndProfile(input: { organizationName: string; fullName: string }) {
  const organizationName = input.organizationName.trim();
  const fullName = input.fullName.trim();
  if (!organizationName) throw new Error("Organization name is required.");

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

  await createOrganizationAndOwner(admin, { name: organizationName, userId: user.id });

  if (fullName) {
    await admin.from("profiles").update({ full_name: fullName }).eq("id", user.id);
  }

  redirect("/dashboard");
}

/**
 * @deprecated Same as createOrganizationAndProfile above — unused now that
 * invite acceptance happens at the shared hub's /onboarding. Kept as a
 * stub only because this environment can't delete files.
 *
 * Accepts a pending invite: creates the current user's organization_members
 * row in the inviting org (not a new org of their own) and marks the invite
 * used. See @buildrail/auth's acceptInvitation for the email re-check
 * against the current session (a signed-in user can't accept an invite
 * meant for someone else by guessing an invitation id).
 */
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

/**
 * Invites a teammate by email into the caller's organization. Admin/owner-
 * only — enforced here (application layer), matching how this app already
 * treats organization_members.role everywhere else (RLS's is_org_admin()
 * backstop applies too, since createInvitation runs on the caller's
 * RLS-scoped client, not the admin client).
 */
export async function createInvite(input: { email: string; role: "admin" | "member" }) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated.");

  const { data: membership } = await supabase
    .from("organization_members")
    .select("organization_id, role")
    .eq("user_id", user.id)
    .single();
  if (!membership) throw new Error("No organization membership for current user.");
  if (membership.role !== "owner" && membership.role !== "admin") {
    throw new Error("Only owners and admins can invite teammates.");
  }

  await createInvitation(supabase, {
    organizationId: membership.organization_id,
    email: input.email,
    role: input.role,
    invitedBy: user.id,
  });

  revalidatePath("/dashboard/team");
}

/** Revokes a pending invite. Admin/owner-only, same enforcement as createInvite. */
export async function revokeInvite(invitationId: string) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated.");

  const { data: membership } = await supabase
    .from("organization_members")
    .select("role")
    .eq("user_id", user.id)
    .single();
  if (!membership || (membership.role !== "owner" && membership.role !== "admin")) {
    throw new Error("Only owners and admins can revoke invites.");
  }

  await revokeInvitation(supabase, invitationId);

  revalidatePath("/dashboard/team");
}
