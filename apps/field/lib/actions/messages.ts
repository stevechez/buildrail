"use server";

import { revalidatePath } from "next/cache";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import type { Database, FlagType } from "@/types/supabase";

type MessageFlagUpdate = Database["public"]["Tables"]["message_flags"]["Update"];

/** Marks a message flag acknowledged or resolved from the dashboard feed. */
export async function updateFlagStatus(flagId: string, status: "acknowledged" | "resolved") {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated.");

  const update: MessageFlagUpdate =
    status === "resolved"
      ? { status, resolved_at: new Date().toISOString(), resolved_by: user.id }
      : { status };

  const { error } = await supabase.from("message_flags").update(update).eq("id", flagId);
  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/messages");
  revalidatePath("/dashboard");
}

/**
 * Lets office staff flag a message by hand — the fallback path for when AI
 * structuring is unconfigured (no ANTHROPIC_API_KEY yet) or a message needs
 * a flag the AI missed. Same downstream shape as an AI-produced flag, so
 * every other feature (change orders from change_request flags, the
 * dashboard feed) works identically regardless of who created it.
 */
export async function createManualFlag(input: {
  messageId: string;
  projectId: string | null;
  flagType: FlagType;
  summary: string;
}) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated.");

  const { data: profile } = await supabase.from("profiles").select("organization_id").eq("id", user.id).single();
  if (!profile) throw new Error("No profile for current user.");

  if (!input.summary.trim()) throw new Error("Summary is required.");

  const { error } = await supabase.from("message_flags").insert({
    organization_id: profile.organization_id,
    message_id: input.messageId,
    project_id: input.projectId,
    flag_type: input.flagType,
    summary: input.summary.trim(),
    details: { source: "manual" },
  });
  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/messages");
  revalidatePath("/dashboard");
}
