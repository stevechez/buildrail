import Link from "next/link";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default async function ProjectsPage() {
  const supabase = await createSupabaseServerClient();

  const { data: projects } = await supabase
    .from("projects")
    .select("id, name, address, status, client_name, client_phone")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-[Space_Grotesk] text-2xl font-semibold text-white">Projects</h1>
          <p className="mt-1 text-sm text-muted">
            Add a project&apos;s crew and client phone numbers so inbound texts route automatically.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/projects/new">New project</Link>
        </Button>
      </div>

      <div className="mt-8 space-y-3">
        {!projects || projects.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-sm text-muted">No projects yet.</CardContent>
          </Card>
        ) : (
          projects.map((p) => (
            <Card key={p.id}>
              <CardContent className="flex items-center justify-between pt-6">
                <div>
                  <div className="mb-1.5 flex items-center gap-2">
                    <Badge variant={p.status === "active" ? "seafoam" : "muted"}>{p.status}</Badge>
                    {p.address && <span className="text-xs text-muted">{p.address}</span>}
                  </div>
                  <p className="text-sm font-medium text-white">{p.name}</p>
                  {p.client_name && (
                    <p className="mt-0.5 text-xs text-muted">
                      {p.client_name} {p.client_phone ? `· ${p.client_phone}` : ""}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
