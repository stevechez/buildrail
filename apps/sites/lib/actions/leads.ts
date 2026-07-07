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
 * Persists a /start business-intake submission into the shared `leads`
 * table (see docs/engineering/stabilization-log.md's Sprint 3 entry and the
 * `leads` table comment in Supabase). Previously this form just flipped a
 * client-side `submitted` flag with nothing saved anywhere — per
 * platform-stabilization.md's Phase 7 (Application Standards), a submission
 * needs a real success/error outcome, not a fake one.
 *
 * Runs on the anon-role RLS policy ("anyone can submit a sites lead",
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

  const row: TablesInsert<"leads"> = {
    name: fullName,
    business_name: businessName,
    phone: input.phone.trim() || null,
    email: input.email.trim() || null,
    service_area: input.serviceArea.trim() || null,
    existing_website: input.existingWebsite.trim() || null,
    trade,
    target_clients: input.targetClients.trim() || null,
    source: "buildrail-sites-start-form",
  };

  const { error } = await supabase.from("leads").insert(row);

  if (error) {
    console.error("[submitStartForm] insert failed:", error.message);
    return { ok: false, error: "Something went wrong submitting your info. Please try again." };
  }

  return { ok: true };
}
