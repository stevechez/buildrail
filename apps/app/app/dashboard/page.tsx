import { requireCurrentProfile } from "@/lib/current-profile";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { listMemberships, can, type Role } from "@buildrail/auth";
import { getProducts } from "@/lib/products";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InviteForm } from "@/components/dashboard/InviteForm";
import { RevokeInviteButton } from "@/components/dashboard/RevokeInviteButton";
import { OrgSwitcher } from "@/components/dashboard/OrgSwitcher";

/**
 * The BuildRail hub: "Acme Roofing LLC" -> Owner -> [SiteVerdict, Estimator,
 * Vault, Field] (docs/platform/identity-foundation.md's Product Vision
 * diagram). Every product link below shares this session via the same
 * Supabase project and (in production) cookie domain — no second login.
 */
export default async function DashboardPage() {
  const profile = await requireCurrentProfile();
  const supabase = await createSupabaseServerClient();
  const products = getProducts();

  const [{ data: members }, { data: pendingInvites }, memberships] = await Promise.all([
    supabase
      .from("organization_members")
      .select("id, role, created_at, profiles(id, full_name, email)")
      .eq("organization_id", profile.organizationId)
      .order("created_at", { ascending: true }),
    supabase
      .from("invitations")
      .select("id, email, role, created_at")
      .eq("organization_id", profile.organizationId)
      .is("accepted_at", null)
      .order("created_at", { ascending: false }),
    listMemberships(supabase, profile.id),
  ]);

  const canInvite = can(profile.role as Role, "users.invite");

  return (
    <div className="min-h-screen gradient-hero">
      <header className="page-container flex items-center justify-between py-6">
        <p className="font-[Space_Grotesk] text-lg font-semibold">
          Build<span className="text-seafoam">Rail</span>
        </p>
        <div className="flex items-center gap-3">
          <OrgSwitcher
            organizations={memberships.map((m) => ({
              organization_id: m.organization_id,
              organization_name: m.organization_name,
            }))}
            currentOrganizationId={profile.organizationId}
          />
          <form action="/auth/signout" method="post">
            <button type="submit" className="text-xs text-muted underline underline-offset-2 hover:text-white">
              Sign out
            </button>
          </form>
        </div>
      </header>

      <main className="page-container pb-16">
        <div className="mb-8">
          <h1 className="font-[Space_Grotesk] text-2xl font-semibold text-white">{profile.organizationName}</h1>
          <p className="mt-1 text-sm text-muted">
            Signed in as {profile.fullName || profile.email} <Badge variant="seafoam">{profile.role}</Badge>
          </p>
        </div>

        <section className="mb-10">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">Your products</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <a key={product.id} href={product.url} className="block">
                <Card className="h-full transition-transform hover:-translate-y-0.5">
                  <CardContent className="pt-6">
                    <p className="font-[Space_Grotesk] text-base font-semibold text-white">{product.name}</p>
                    <p className="mt-1 text-xs text-muted">{product.description}</p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">Team</h2>

          {canInvite && (
            <Card className="mb-6">
              <CardContent className="pt-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">Invite a teammate</p>
                <InviteForm />
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="divide-y divide-white/5 p-0">
              {members?.map((member) => {
                const memberProfile = Array.isArray(member.profiles) ? member.profiles[0] : member.profiles;
                return (
                  <div key={member.id} className="flex items-center justify-between p-4">
                    <p className="text-sm text-white">
                      {memberProfile?.full_name || memberProfile?.email || "Unnamed"}
                    </p>
                    <Badge variant={member.role === "owner" || member.role === "admin" ? "seafoam" : "muted"}>
                      {member.role}
                    </Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {pendingInvites && pendingInvites.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">Pending invites</h3>
              <Card>
                <CardContent className="divide-y divide-white/5 p-0">
                  {pendingInvites.map((invite) => (
                    <div key={invite.id} className="flex items-center justify-between p-4">
                      <div>
                        <p className="text-sm text-white">{invite.email}</p>
                        <p className="text-xs text-muted">Invited as {invite.role}</p>
                      </div>
                      {canInvite && <RevokeInviteButton inviteId={invite.id} />}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
