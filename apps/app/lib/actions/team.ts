"use server";

import { revalidatePath } from "next/cache";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { createInvitation, revokeInvitation, can, type Role } from "@buildrail/auth";

/**
 * Invites a teammate into the caller's active organization. Owner/admin-
 * only, enforced with the shared `can()` permission check
 * (docs/platform/roles-permissions.md) rather than a hard-coded role
 * string — RLS's is_org_admin() backstops this too, since createInvitation
 * runs on the caller's RLS-scoped client, not the admin client.
 */
export async function createInvite(input: { email: string; role: string }) {
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
  if (!can(membership.role as Role, "users.invite")) {
    throw new Error("You don't have permission to invite teammates.");
  }

  await createInvitation(supabase, {
    organizationId: membership.organization_id,
    email: input.email,
    role: input.role,
    invitedBy: user.id,
  });

  revalidatePath("/dashboard");
}

/** Revokes a pending invite. Same permission check as createInvite. */
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
  if (!membership || !can(membership.role as Role, "users.invite")) {
    throw new Error("You don't have permission to revoke invites.");
  }

  await revokeInvitation(supabase, invitationId);

  revalidatePath("/dashboard");
}
