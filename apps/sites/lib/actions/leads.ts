"use server";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import type { TablesInsert } from "@/types/supabase";

export interface StartFormInput {
  fullName: string;
  businessName: string;
  phone: string;
  email: string;
  serviceArea: string;
  existingWebsite: string;
  trade: string;
  targetClients: string;
}

export interface SubmitStartFormResult {
  ok: boolean;
  error?: string;
}

/**
 * Persists a /start business-intake submission into its own `site_leads`
 * table (see docs/engineering/stabilization-log.md's Sprint 3 entry).
 * Deliberately NOT the shared `leads` table — that table is Estimator's own
 * instant-estimate pipeline (shared with apps/sites' /estimate widget) and
 * assumes every row has a real numeric estimate; a business-intake
 * submission has no estimate at all. Previously this form just flipped a
 * client-side `submitted` flag with nothing saved anywhere — per
 * platform-stabilization.md's Phase 7 (Application Standards), a submission
 * needs a real success/error outcome, not a fake one.
 *
 * Runs on the anon-role RLS policy ("anyone can submit a site lead",
 * insert-only) — no service-role client needed, since visitors here have no
 * organization yet and aren't meant to read back other submissions.
 */
export async function submitStartForm(input: StartFormInput): Promise<SubmitStartFormResult> {
  const fullName = input.fullName.trim();
  const businessName = input.businessName.trim();
  const trade = input.trade.trim();

  if (!fullName || !businessName || !trade) {
    return { ok: false, error: "Name, business name, and trade are required." };
  }

  const supabase = await createSupabaseServerClient();

  const row: TablesInsert<"site_leads"> = {
    full_name: fullName,
    business_name: businessName,
    phone: input.phone.trim() || null,
    email: input.email.trim() || null,
    service_area: input.serviceArea.trim() || null,
    existing_website: input.existingWebsite.trim() || null,
    trade,
    target_clients: input.targetClients.trim() || null,
  };

  const { error } = await supabase.from("site_leads").insert(row);

  if (error) {
    console.error("[submitStartForm] insert failed:", error.message);
    return { ok: false, error: "Something went wrong submitting your info. Please try again." };
  }

  return { ok: true };
}
