import 'server-only';
import { createClient } from '@supabase/supabase-js';
import { resolveSupabasePublicConfig, resolveSupabaseServiceRoleKey } from './env';

/**
 * Service-role Supabase client. Bypasses RLS entirely.
 *
 * Never import this into a Client Component and never leak
 * SUPABASE_SERVICE_ROLE_KEY to the browser bundle — the `server-only`
 * import above enforces this at build time.
 *
 * Legitimate uses (see apps/field/lib/supabase-admin.ts for the pattern
 * this was extracted from):
 *   - Inbound webhooks with no Supabase session (Twilio, Stripe, etc.)
 *   - Token-gated public flows (client portals) that never authenticate
 *   - Bootstrapping a brand-new user's first organization/profile, before
 *     any org-scoped RLS policy has anything to scope against
 */
export function createAdminSupabaseClient<Database = unknown>() {
	const { url } = resolveSupabasePublicConfig();
	const serviceKey = resolveSupabaseServiceRoleKey();

	return createClient<Database>(url, serviceKey, {
		auth: { autoRefreshToken: false, persistSession: false },
	});
}
