"use server";

import { revalidatePath } from "next/cache";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { getOrCreatePortalUrl } from "@/lib/portal-token";
import { sendSms } from "@/lib/sms/twilio";

interface CreateChangeOrderInput {
  projectId: string;
  title: string;
  description: string;
  costDeltaCents: number;
  sourceFlagId?: string;
}

/** Creates a draft change order from the dashboard, optionally seeded from a flag. */
export async function createChangeOrder(input: CreateChangeOrderInput) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated.");

  const { data: profile } = await supabase
    .from("profiles")
    .select("organization_id, full_name")
    .eq("id", user.id)
    .single();
  if (!profile) throw new Error("No profile for current user.");

  const { data: changeOrder, error } = await supabase
    .from("change_orders")
    .insert({
      organization_id: profile.organization_id,
      project_id: input.projectId,
      source_flag_id: input.sourceFlagId ?? null,
      created_by: user.id,
      title: input.title,
      description: input.description,
      cost_delta_cents: input.costDeltaCents,
      status: "draft",
    })
    .select("id")
    .single();

  if (error || !changeOrder) throw new Error(error?.message ?? "Failed to create change order.");

  await supabase.from("change_order_events").insert({
    change_order_id: changeOrder.id,
    organization_id: profile.organization_id,
    event_type: "created",
    actor: `office: ${profile.full_name ?? user.email ?? "staff"}`,
  });

  revalidatePath("/dashboard/change-orders");
  return changeOrder.id;
}

/**
 * Marks a change order pending_approval and texts the client their portal
 * link. This is what turns a drafted change order into something the client
 * can actually see and act on (Module 2 → Module 3 handoff).
 */
export async function sendChangeOrderForApproval(changeOrderId: string) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated.");

  const { data: profile } = await supabase
    .from("profiles")
    .select("organization_id, full_name")
    .eq("id", user.id)
    .single();
  if (!profile) throw new Error("No profile for current user.");

  const { data: changeOrder } = await supabase
    .from("change_orders")
    .select("id, project_id, title, cost_delta_cents")
    .eq("id", changeOrderId)
    .single();
  if (!changeOrder) throw new Error("Change order not found.");

  const { data: project } = await supabase
    .from("projects")
    .select("client_phone, client_name")
    .eq("id", changeOrder.project_id)
    .single();
  if (!project?.client_phone) {
    throw new Error("This project has no client phone number on file — add one before sending.");
  }

  const portalUrl = await getOrCreatePortalUrl({
    organizationId: profile.organization_id,
    projectId: changeOrder.project_id,
  });

  const delta = (changeOrder.cost_delta_cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  await sendSms({
    to: project.client_phone,
    body: `Hi${project.client_name ? " " + project.client_name.split(" ")[0] : ""}, you have a change order to review — "${changeOrder.title}" (${delta}). View and approve: ${portalUrl}`,
  });

  await supabase
    .from("change_orders")
    .update({ status: "pending_approval", sent_at: new Date().toISOString() })
    .eq("id", changeOrderId);

  await supabase.from("change_order_events").insert({
    change_order_id: changeOrderId,
    organization_id: profile.organization_id,
    event_type: "sent",
    actor: `office: ${profile.full_name ?? user.email ?? "staff"}`,
  });

  revalidatePath("/dashboard/change-orders");
}

/**
 * Office-side manual override (e.g. client approved verbally / in person).
 * Client-initiated approve/reject goes through app/portal/[token]/actions.ts
 * instead, using the admin client since there's no Supabase session there.
 */
export async function recordOfficeDecision(changeOrderId: string, decision: "approved" | "rejected", note?: string) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated.");

  const { data: profile } = await supabase
    .from("profiles")
    .select("organization_id, full_name")
    .eq("id", user.id)
    .single();
  if (!profile) throw new Error("No profile for current user.");

  const admin = createSupabaseAdminClient();
  await admin
    .from("change_orders")
    .update({ status: decision, decided_at: new Date().toISOString() })
    .eq("id", changeOrderId);

  await admin.from("change_order_events").insert({
    change_order_id: changeOrderId,
    organization_id: profile.organization_id,
    event_type: decision,
    actor: `office: ${profile.full_name ?? user.email ?? "staff"}`,
    note,
  });

  revalidatePath("/dashboard/change-orders");
}
