import { notFound } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChangeOrderDetailActions } from "@/components/dashboard/ChangeOrderDetailActions";

const STATUS_VARIANT = {
  draft: "muted",
  pending_approval: "warning",
  approved: "success",
  rejected: "danger",
} as const;

function fmtCents(cents: number) {
  return (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export default async function ChangeOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  const { data: co } = await supabase
    .from("change_orders")
    .select("id, title, description, status, cost_delta_cents, created_at, projects(name, client_phone)")
    .eq("id", id)
    .maybeSingle();

  if (!co) notFound();

  const { data: events } = await supabase
    .from("change_order_events")
    .select("id, event_type, actor, note, created_at")
    .eq("change_order_id", id)
    .order("created_at", { ascending: true });

  const project = Array.isArray(co.projects) ? co.projects[0] : co.projects;

  return (
    <div className="max-w-2xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Badge variant={STATUS_VARIANT[co.status]}>{co.status.replace("_", " ")}</Badge>
            {project && <span className="text-xs text-muted">{(project as { name: string }).name}</span>}
          </div>
          <h1 className="font-[Space_Grotesk] text-2xl font-semibold text-white">{co.title}</h1>
          <p className="mt-1 text-lg font-semibold text-seafoam">{fmtCents(co.cost_delta_cents)}</p>
        </div>
        <ChangeOrderDetailActions changeOrderId={co.id} status={co.status} />
      </div>

      {co.description && (
        <Card className="mt-6">
          <CardContent className="pt-6 text-sm text-[var(--white-dim)]">{co.description}</CardContent>
        </Card>
      )}

      {co.status === "draft" && !(project as { client_phone: string | null } | null)?.client_phone && (
        <p className="mt-3 text-xs text-[var(--warning)]">
          This project has no client phone number on file — add one before sending.
        </p>
      )}

      <div className="mt-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">Timeline</h2>
        <Card>
          <CardContent className="divide-y divide-white/5 p-0">
            {events?.map((e) => (
              <div key={e.id} className="flex items-start justify-between gap-4 p-4">
                <div>
                  <p className="text-sm text-white">
                    <span className="font-medium capitalize">{e.event_type}</span>{" "}
                    <span className="text-muted">by {e.actor}</span>
                  </p>
                  {e.note && <p className="mt-1 text-xs text-muted">{e.note}</p>}
                </div>
                <p className="shrink-0 text-xs text-muted">{new Date(e.created_at).toLocaleString()}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
