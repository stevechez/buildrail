"use server";

import { revalidatePath } from "next/cache";

import { createSupabaseServerClient } from "@/lib/supabase-server";

/**
 * Toggles an instant-estimate lead's contacted_at timestamp. Mirrors
 * apps/estimator's toggleContacted (same shared `leads` table) — kept as a
 * separate copy rather than a shared package function since it's a single
 * two-line query and not worth a cross-app dependency for.
 */
export async function toggleLeadContacted(leadId: string, contacted: boolean) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("leads")
    .update({ contacted_at: contacted ? new Date().toISOString() : null })
    .eq("id", leadId);

  if (error) return { error: error.message };

  revalidatePath("/admin");
  return { error: null };
}

/** Updates a /start business-intake submission's status. */
export async function updateSiteLeadStatus(
  siteLeadId: string,
  status: "new" | "contacted" | "won" | "lost"
) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("site_leads")
    .update({ status })
    .eq("id", siteLeadId);

  if (error) return { error: error.message };

  revalidatePath("/admin");
  return { error: null };
}
