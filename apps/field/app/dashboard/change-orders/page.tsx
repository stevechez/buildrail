import Link from "next/link";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const STATUS_VARIANT = {
  draft: "muted",
  pending_approval: "warning",
  approved: "success",
  rejected: "danger",
} as const;

function fmtCents(cents: number) {
  return (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export default async function ChangeOrdersPage() {
  const supabase = await createSupabaseServerClient();

  const { data: changeOrders } = await supabase
    .from("change_orders")
    .select("id, title, status, cost_delta_cents, created_at, projects(name)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-[Space_Grotesk] text-2xl font-semibold text-white">Change orders</h1>
          <p className="mt-1 text-sm text-muted">Draft, send for client approval, and track decisions.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/change-orders/new">New change order</Link>
        </Button>
      </div>

      <div className="mt-8 space-y-3">
        {!changeOrders || changeOrders.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-sm text-muted">
              No change orders yet. Create one manually, or turn a &ldquo;change request&rdquo; flag from the
              Messages tab into one.
            </CardContent>
          </Card>
        ) : (
          changeOrders.map((co) => {
            const project = Array.isArray(co.projects) ? co.projects[0] : co.projects;
            return (
              <Link key={co.id} href={`/dashboard/change-orders/${co.id}`}>
                <Card className="transition-all duration-150 ease-in-out hover:border-white/10 hover:bg-white/[0.03]">
                  <CardContent className="flex items-center justify-between pt-6">
                    <div>
                      <div className="mb-1.5 flex items-center gap-2">
                        <Badge variant={STATUS_VARIANT[co.status]}>{co.status.replace("_", " ")}</Badge>
                        {project && <span className="text-xs text-muted">{(project as { name: string }).name}</span>}
                      </div>
                      <p className="text-sm font-medium text-white">{co.title}</p>
                    </div>
                    <p className="text-sm font-semibold text-white">{fmtCents(co.cost_delta_cents)}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
