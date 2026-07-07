import Link from "next/link";

import { requireCurrentProfile } from "@/lib/current-profile";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { Card, CardContent } from "@/components/ui/card";
import { FlagBadge } from "@/components/dashboard/FlagBadge";
import { Badge } from "@/components/ui/badge";

export default async function DashboardOverviewPage() {
  const profile = await requireCurrentProfile();
  const supabase = await createSupabaseServerClient();

  const [openFlags, pendingChangeOrders, activeProjects, recentFlags] = await Promise.all([
    supabase.from("message_flags").select("id", { count: "exact", head: true }).eq("status", "open"),
    supabase
      .from("change_orders")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending_approval"),
    supabase.from("projects").select("id", { count: "exact", head: true }).eq("status", "active"),
    supabase
      .from("message_flags")
      .select("id, flag_type, summary, status, created_at, projects(name)")
      .order("created_at", { ascending: false })
      .limit(8),
  ]);

  const stats = [
    { label: "Open flags", value: openFlags.count ?? 0 },
    { label: "Change orders pending", value: pendingChangeOrders.count ?? 0 },
    { label: "Active projects", value: activeProjects.count ?? 0 },
  ];

  return (
    <div>
      <h1 className="font-[Space_Grotesk] text-2xl font-semibold text-white">
        Welcome back{profile.fullName ? `, ${profile.fullName.split(" ")[0]}` : ""}
      </h1>
      <p className="mt-1 text-sm text-muted">Here&apos;s what came in from the field.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="pt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">{s.label}</p>
              <p className="mt-2 text-3xl font-semibold text-white">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Recent flags</h2>
          <Link href="/dashboard/messages" className="text-xs text-seafoam hover:underline">
            View all
          </Link>
        </div>

        <Card>
          <CardContent className="divide-y divide-white/5 p-0">
            {!recentFlags.data || recentFlags.data.length === 0 ? (
              <p className="p-6 text-sm text-muted">
                Nothing flagged yet. Once crews start texting your BuildRail Field number, structured items will show up here.
              </p>
            ) : (
              recentFlags.data.map((flag) => {
                const project = Array.isArray(flag.projects) ? flag.projects[0] : flag.projects;
                return (
                  <div key={flag.id} className="flex items-center justify-between gap-4 p-5">
                    <div className="min-w-0">
                      <div className="mb-1.5 flex items-center gap-2">
                        <FlagBadge type={flag.flag_type} />
                        {project && <span className="text-xs text-muted">{(project as { name: string }).name}</span>}
                      </div>
                      <p className="truncate text-sm text-white">{flag.summary}</p>
                    </div>
                    <Badge variant={flag.status === "open" ? "warning" : "muted"} className="shrink-0">
                      {flag.status}
                    </Badge>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
