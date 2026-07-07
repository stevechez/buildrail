import { requireCurrentProfile } from "@/lib/current-profile";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InviteForm } from "@/components/dashboard/InviteForm";
import { RevokeInviteButton } from "@/components/dashboard/RevokeInviteButton";

export default async function TeamPage() {
  const profile = await requireCurrentProfile();
  const supabase = await createSupabaseServerClient();

  const [{ data: members }, { data: pendingInvites }] = await Promise.all([
    supabase.from("profiles").select("id, full_name, role").order("created_at", { ascending: true }),
    supabase
      .from("invites")
      .select("id, email, role, created_at")
      .is("accepted_at", null)
      .order("created_at", { ascending: false }),
  ]);

  const isAdmin = profile.role === "admin";

  return (
    <div>
      <h1 className="font-[Space_Grotesk] text-2xl font-semibold text-white">Team</h1>
      <p className="mt-1 text-sm text-muted">
        {isAdmin
          ? `Everyone with access to ${profile.organizationName}.`
          : `Everyone with access to ${profile.organizationName}. Ask an admin to invite teammates.`}
      </p>

      {isAdmin && (
        <div className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">Invite a teammate</p>
              <InviteForm />
            </CardContent>
          </Card>
        </div>
      )}

      <div className="mt-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">Members</h2>
        <Card>
          <CardContent className="divide-y divide-white/5 p-0">
            {members?.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4">
                <p className="text-sm text-white">{member.full_name || "Unnamed"}</p>
                <Badge variant={member.role === "admin" ? "seafoam" : "muted"}>{member.role}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {pendingInvites && pendingInvites.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">Pending invites</h2>
          <Card>
            <CardContent className="divide-y divide-white/5 p-0">
              {pendingInvites.map((invite) => (
                <div key={invite.id} className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-sm text-white">{invite.email}</p>
                    <p className="text-xs text-muted">Invited as {invite.role}</p>
                  </div>
                  {isAdmin && <RevokeInviteButton inviteId={invite.id} />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
