import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AcceptInviteCard } from "@/components/AcceptInviteCard";
import { CreateOrgForm } from "@/components/CreateOrgForm";

/**
 * Landing spot for an authenticated Supabase user with no matching `profiles`
 * row. Deliberately outside middleware's matcher (see middleware.ts) so it
 * can never be part of a redirect loop — this page is a dead end by design
 * (see /AI/12-DECISIONS.md).
 *
 * Two ways out, checked in order:
 *   1. A pending invite for this email → join that org (lib/actions/auth-setup.ts:acceptInvite).
 *   2. No invite → self-serve create a brand-new org, becoming its admin
 *      (lib/actions/auth-setup.ts:createOrganizationAndProfile).
 */
export default async function NoAccessPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Edge case: they navigated here directly after already being linked
  // (e.g. a stale bookmark, or they just ran the invite/signup flow twice
  // in two tabs).
  const { data: existingProfile } = await supabase.from("profiles").select("id").eq("id", user.id).maybeSingle();
  if (existingProfile) redirect("/dashboard");

  // A user with no profile has no current_org_id(), so ordinary RLS-scoped
  // queries can never see their invite — this lookup has to go through the
  // admin client. See lib/supabase-admin.ts.
  const admin = createSupabaseAdminClient();
  const email = user.email?.trim().toLowerCase() ?? "";
  const { data: invite } = await admin
    .from("invites")
    .select("id, organizations(name)")
    .eq("email", email)
    .is("accepted_at", null)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const invitedOrg = invite ? (Array.isArray(invite.organizations) ? invite.organizations[0] : invite.organizations) : null;

  return (
    <div className="flex min-h-screen items-center justify-center gradient-hero px-4 py-16">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="font-[Space_Grotesk] text-xl">
            {invite ? "You're invited" : "Set up your workspace"}
          </CardTitle>
          <CardDescription>
            Signed in as <span className="text-seafoam">{user.email}</span>
            {!invite && " — no organization exists for this account yet."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          {invite && invitedOrg ? (
            <AcceptInviteCard inviteId={invite.id} organizationName={(invitedOrg as { name: string }).name} />
          ) : (
            <CreateOrgForm />
          )}

          <form action="/auth/signout" method="post">
            <button type="submit" className="text-xs text-muted underline underline-offset-2 hover:text-white">
              Sign out and try a different account
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
