"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

/**
 * Bootstraps a brand-new user into their own organization: they become that
 * org's first (admin) member. Runs on the service-role client because a
 * user with no `profiles` row yet has no `current_org_id()`, so ordinary
 * RLS-scoped inserts on `organizations`/`profiles` would have nothing to
 * scope against — same trusted-server-code pattern as the Twilio webhook
 * and the client portal (see lib/supabase-admin.ts).
 *
 * Guards against double-submission by checking for an existing profile
 * first — the profiles.id primary key would also reject a second insert,
 * this just gives a friendlier outcome (redirect, not an error).
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

  const { data: existingProfile } = await admin.from("profiles").select("id").eq("id", user.id).maybeSingle();
  if (existingProfile) redirect("/dashboard");

  const { data: org, error: orgError } = await admin
    .from("organizations")
    .insert({ name: organizationName })
    .select("id")
    .single();
  if (orgError || !org) throw new Error(orgError?.message ?? "Failed to create organization.");

  const { error: profileError } = await admin.from("profiles").insert({
    id: user.id,
    organization_id: org.id,
    full_name: fullName || null,
    role: "admin",
  });
  if (profileError) throw new Error(profileError.message);

  redirect("/dashboard");
}

/**
 * Accepts a pending invite: creates the current user's profile in the
 * inviting org (not a new org of their own) and marks the invite used.
 * Re-checks the invite's email against the *current* session's email so a
 * signed-in user can't accept an invite meant for someone else by guessing
 * an invite id.
 */
export async function acceptInvite(inviteId: string) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !user.email) redirect("/login");

  const admin = createSupabaseAdminClient();

  const { data: invite } = await admin
    .from("invites")
    .select("id, organization_id, email, role, accepted_at")
    .eq("id", inviteId)
    .maybeSingle();

  if (!invite) throw new Error("Invite not found.");
  if (invite.accepted_at) throw new Error("This invite was already used.");
  if (invite.email !== user.email.trim().toLowerCase()) {
    throw new Error("This invite was sent to a different email address.");
  }

  const { data: existingProfile } = await admin.from("profiles").select("id").eq("id", user.id).maybeSingle();
  if (!existingProfile) {
    const { error: profileError } = await admin.from("profiles").insert({
      id: user.id,
      organization_id: invite.organization_id,
      role: invite.role,
    });
    if (profileError) throw new Error(profileError.message);
  }

  await admin.from("invites").update({ accepted_at: new Date().toISOString() }).eq("id", inviteId);

  redirect("/dashboard");
}

/**
 * Invites a teammate by email into the caller's organization. Admin-only —
 * enforced here (application layer), not via RLS, matching how this app
 * already treats profiles.role everywhere else.
 */
export async function createInvite(input: { email: string; role: "admin" | "staff" }) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated.");

  const { data: profile } = await supabase
    .from("profiles")
    .select("organization_id, role")
    .eq("id", user.id)
    .single();
  if (!profile) throw new Error("No profile for current user.");
  if (profile.role !== "admin") throw new Error("Only admins can invite teammates.");

  const email = input.email.trim().toLowerCase();
  if (!email) throw new Error("Email is required.");

  const { error } = await supabase.from("invites").upsert(
    {
      organization_id: profile.organization_id,
      email,
      role: input.role,
      invited_by: user.id,
      accepted_at: null,
    },
    { onConflict: "organization_id,email" }
  );
  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/team");
}

/** Revokes a pending invite. Admin-only, same enforcement as createInvite. */
export async function revokeInvite(inviteId: string) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated.");

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (!profile || profile.role !== "admin") throw new Error("Only admins can revoke invites.");

  const { error } = await supabase.from("invites").delete().eq("id", inviteId);
  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/team");
}
