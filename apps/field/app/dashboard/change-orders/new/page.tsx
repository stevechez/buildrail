import { createSupabaseServerClient } from "@/lib/supabase-server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NewChangeOrderForm } from "@/components/dashboard/NewChangeOrderForm";

export default async function NewChangeOrderPage({
  searchParams,
}: {
  searchParams: Promise<{ flagId?: string; projectId?: string }>;
}) {
  const { flagId, projectId } = await searchParams;
  const supabase = await createSupabaseServerClient();

  const { data: projects } = await supabase.from("projects").select("id, name").order("name");

  let defaultTitle: string | undefined;
  let resolvedProjectId = projectId;

  if (flagId) {
    const { data: flag } = await supabase
      .from("message_flags")
      .select("summary, project_id")
      .eq("id", flagId)
      .maybeSingle();
    if (flag) {
      defaultTitle = flag.summary;
      resolvedProjectId = flag.project_id ?? resolvedProjectId;
    }
  }

  return (
    <div className="max-w-lg">
      <h1 className="font-[Space_Grotesk] text-2xl font-semibold text-white">New change order</h1>
      <p className="mt-1 text-sm text-muted">Starts as a draft — nothing is sent to the client until you send it.</p>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-sm text-muted">Details</CardTitle>
        </CardHeader>
        <CardContent>
          <NewChangeOrderForm
            projects={projects ?? []}
            defaultProjectId={resolvedProjectId}
            defaultTitle={defaultTitle}
            sourceFlagId={flagId}
          />
        </CardContent>
      </Card>
    </div>
  );
}
