import { createSupabaseServerClient } from "@/lib/supabase-server";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FlagBadge } from "@/components/dashboard/FlagBadge";
import { FlagActions } from "@/components/dashboard/FlagActions";
import { ManualFlagForm } from "@/components/dashboard/ManualFlagForm";

const AI_STATUS_LABEL: Record<string, string> = {
  pending: "AI structuring…",
  processed: "AI reviewed",
  skipped: "AI not configured",
  failed: "AI structuring failed",
};

export default async function MessagesPage() {
  const supabase = await createSupabaseServerClient();

  const { data: messages } = await supabase
    .from("messages")
    .select(
      "id, body, from_number, direction, ai_status, project_id, created_at, projects(name), message_flags(id, flag_type, summary, status)"
    )
    .eq("direction", "inbound")
    .order("created_at", { ascending: false })
    .limit(100);

  const aiUnavailable = messages?.some((m) => m.ai_status === "skipped");

  return (
    <div>
      <h1 className="font-[Space_Grotesk] text-2xl font-semibold text-white">Messages</h1>
      <p className="mt-1 text-sm text-muted">
        Every inbound field text, with whatever the AI pulled out of it. Nothing here ever depends on AI being
        configured — flag anything by hand if it missed something, or if it isn&apos;t set up yet.
      </p>
      {aiUnavailable && (
        <p className="mt-3 rounded-lg border border-[var(--warning)]/25 bg-[var(--warning)]/10 px-3 py-2 text-xs text-[var(--warning)]">
          AI structuring isn&apos;t configured (no <code>ANTHROPIC_API_KEY</code>) — messages are coming in fine,
          just flag anything actionable by hand below until it&apos;s connected.
        </p>
      )}

      <div className="mt-8 space-y-3">
        {!messages || messages.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-sm text-muted">
              Nothing here yet. Point your Twilio number&apos;s webhook at{" "}
              <code className="rounded bg-white/5 px-1.5 py-0.5 text-xs text-white">/api/sms/inbound</code> to start
              receiving field texts.
            </CardContent>
          </Card>
        ) : (
          messages.map((message) => {
            const project = Array.isArray(message.projects) ? message.projects[0] : message.projects;
            const flags = message.message_flags ?? [];

            return (
              <Card key={message.id}>
                <CardContent className="pt-6">
                  <div className="flex flex-wrap items-center gap-2">
                    {project && <span className="text-xs text-muted">{(project as { name: string }).name}</span>}
                    <span className="text-xs text-muted">{message.from_number}</span>
                    <Badge variant={message.ai_status === "processed" ? "seafoam" : "muted"}>
                      {AI_STATUS_LABEL[message.ai_status] ?? message.ai_status}
                    </Badge>
                  </div>

                  <p className="mt-2 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-sm text-white">
                    &ldquo;{message.body}&rdquo;
                  </p>

                  {flags.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {flags.map((flag) => (
                        <div
                          key={flag.id}
                          className="flex items-start justify-between gap-4 rounded-lg border border-white/5 bg-white/[0.015] p-3"
                        >
                          <div className="min-w-0">
                            <div className="mb-1.5 flex items-center gap-2">
                              <FlagBadge type={flag.flag_type} />
                              <Badge variant={flag.status === "open" ? "warning" : "muted"}>{flag.status}</Badge>
                            </div>
                            <p className="text-sm text-white">{flag.summary}</p>
                          </div>
                          <FlagActions
                            flagId={flag.id}
                            status={flag.status}
                            isChangeRequest={flag.flag_type === "change_request"}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-3">
                    <ManualFlagForm messageId={message.id} projectId={message.project_id} />
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
