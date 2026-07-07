"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase-server";

/**
 * Toggle a lead's contacted_at timestamp.
 * - If contacted is true  → set contacted_at = now()
 * - If contacted is false → set contacted_at = null
 */
export async function toggleContacted(leadId: string, contacted: boolean) {
  const supabase = await createSupabaseServerClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- @supabase/ssr's
  // generic inference collapses the update payload type for this table; cast the
  // client to bypass it rather than fight the generated types.
  const { error } = await (supabase as any)
    .from("leads")
    .update({
      contacted_at: contacted ? new Date().toISOString() : null,
    })
    .eq("id", leadId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/admin/leads/${leadId}`);
  revalidatePath("/admin");
  return { error: null };
}
