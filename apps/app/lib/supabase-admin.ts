import "server-only";
import { createAdminSupabaseClient } from "@buildrail/database/admin";
import type { Database } from "@/types/supabase";

/**
 * Service-role Supabase client. Bypasses RLS entirely — never import this
 * into a Client Component and never leak `SUPABASE_SERVICE_ROLE_KEY` to the
 * browser bundle.
 *
 * Used for the two trusted server-side entry points that run before a user
 * has an organization_members row: onboarding (creating their first
 * organization) and invite lookup/acceptance.
 */
export function createSupabaseAdminClient() {
  return createAdminSupabaseClient<Database>();
}
