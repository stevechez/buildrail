import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { findPendingInvitation } from "@buildrail/auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AcceptInviteCard } from "@/components/AcceptInviteCard";
import { CreateOrgForm } from "@/components/CreateOrgForm";

/**
 * Landing spot for an authenticated user with no organization_members row
 * yet — middleware sends every such user here (see middleware.ts).
 *
 * Two ways out, checked in order:
 *   1. A pending invite for this email → join that org (lib/actions/onboarding.ts:acceptInvite).
 *   2. No invite → self-serve create a brand-new org, becoming its owner
 *      (lib/actions/onboarding.ts:createOrganization).
 */
export default async function OnboardingPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Edge case: they navigated here directly after already being linked.
  const { data: existingMembership } = await supabase
    .from("organization_members")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();
  if (existingMembership) redirect("/dashboard");

  // A user with no membership has no is_org_member()/is_org_admin() match,
  // so ordinary RLS-scoped queries can never see their invite — this
  // lookup has to go through the admin client.
  const admin = createSupabaseAdminClient();
  const email = user.email?.trim().toLowerCase() ?? "";
  const invite = await findPendingInvitation(admin, email);

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
          {invite ? (
            <AcceptInviteCard inviteId={invite.id} organizationName={invite.organization_name ?? "your team"} />
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
