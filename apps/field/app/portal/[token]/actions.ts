"use server";

import { revalidatePath } from "next/cache";

import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { resolvePortalToken } from "@/lib/portal-token";

/**
 * Client-initiated approve/reject from the public portal. There's no
 * Supabase auth session here — the token itself, freshly re-validated, is
 * the entire access control check. Uses the service-role client since the
 * `anon` role has zero table grants (see 004_portal_tokens.sql).
 */
export async function decideChangeOrder(
  token: string,
  changeOrderId: string,
  decision: "approved" | "rejected"
) {
  const context = await resolvePortalToken(token);
  if (!context) throw new Error("This link has expired. Ask your contractor to resend it.");

  const admin = createSupabaseAdminClient();

  // Re-verify the change order actually belongs to this token's project —
  // never trust the changeOrderId alone.
  const { data: co } = await admin
    .from("change_orders")
    .select("id, project_id, status")
    .eq("id", changeOrderId)
    .eq("project_id", context.projectId)
    .maybeSingle();

  if (!co) throw new Error("Change order not found.");
  if (co.status !== "pending_approval") throw new Error("This change order is no longer awaiting approval.");

  await admin
    .from("change_orders")
    .update({ status: decision, decided_at: new Date().toISOString() })
    .eq("id", changeOrderId);

  await admin.from("change_order_events").insert({
    change_order_id: changeOrderId,
    organization_id: context.organizationId,
    event_type: decision,
    actor: `client: ${context.projectName}`,
  });

  revalidatePath(`/portal/${token}`);
}
