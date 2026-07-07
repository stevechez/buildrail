import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

/**
 * Service-role Supabase client. Bypasses RLS entirely — never import this
 * into a Client Component and never leak `SUPABASE_SERVICE_ROLE_KEY` to the
 * browser bundle (the `server-only` import above enforces this at build time).
 *
 * Used by three trusted server-side entry points:
 *   1. app/api/sms/inbound/route.ts — Twilio has no Supabase session to
 *      present, so inbound SMS writes must go around RLS.
 *   2. app/portal/[token]/* — the client portal is a magic-link flow with no
 *      Supabase auth session; access control is the token check in
 *      lib/portal-token.ts, not RLS.
 *   3. lib/actions/auth-setup.ts — a brand-new user has no `profiles` row
 *      yet, so `current_org_id()` is null and every ordinary RLS policy in
 *      this app has nothing to scope against. Creating their first
 *      organization/profile, or looking up a pending invite by email before
 *      they have an org, has to go around RLS the same way.
 */
export function createSupabaseAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Missing Supabase admin env vars. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local."
    );
  }

  return createClient<Database>(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
