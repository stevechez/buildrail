import { notFound } from "next/navigation";

import { resolvePortalToken } from "@/lib/portal-token";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { ChangeOrderApprovalCard } from "@/components/portal/ChangeOrderApprovalCard";
import { Badge } from "@/components/ui/badge";

export default async function ClientPortalPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const context = await resolvePortalToken(token);
  if (!context) notFound();

  const admin = createSupabaseAdminClient();
  const { data: project } = await admin
    .from("projects")
    .select("name, address, status")
    .eq("id", context.projectId)
    .single();

  const { data: changeOrders } = await admin
    .from("change_orders")
    .select("id, title, description, cost_delta_cents, status")
    .eq("project_id", context.projectId)
    .in("status", ["pending_approval", "approved", "rejected"])
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen gradient-hero">
      <div className="mx-auto max-w-lg px-6 py-16">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">{context.organizationName}</p>
        <h1 className="mt-2 font-[Space_Grotesk] text-2xl font-semibold text-white">{project?.name ?? context.projectName}</h1>
        {project?.address && <p className="mt-1 text-sm text-muted">{project.address}</p>}
        {project?.status && (
          <Badge variant="seafoam" className="mt-3">
            {project.status}
          </Badge>
        )}

        <div className="mt-10 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Change orders</h2>
          {!changeOrders || changeOrders.length === 0 ? (
            <p className="text-sm text-muted">Nothing needs your review right now.</p>
          ) : (
            changeOrders.map((co) => <ChangeOrderApprovalCard key={co.id} token={token} changeOrder={co} />)
          )}
        </div>
      </div>
    </div>
  );
}
