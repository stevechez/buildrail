import { createBrowserClient } from '@supabase/ssr';
import { resolveSupabasePublicConfig, resolveCookieDomain } from './env';

/**
 * Browser/client-side Supabase client. Subject to RLS as the `anon` role.
 *
 * Deliberately @supabase/ssr's createBrowserClient, not
 * @supabase/supabase-js's plain createClient. The plain client stores the
 * session (and the PKCE code_verifier used during magic-link sign-in) in
 * localStorage; createServerSupabaseClient / createMiddlewareSupabaseClient
 * read the session from cookies instead. Mixing the two clients breaks the
 * magic-link exchange silently (see apps/field/lib/supabase.ts history and
 * /AI/12-DECISIONS.md).
 *
 * Honors NEXT_PUBLIC_COOKIE_DOMAIN if set (see resolveCookieDomain in
 * env.ts) for shared-session SSO across BuildRail subdomains.
 *
 * Call this once per app in a small local wrapper, e.g.:
 *
 *   // apps/<app>/lib/supabase.ts
 *   import { createBrowserSupabaseClient } from '@buildrail/database';
 *   import type { Database } from '@/types/supabase';
 *   export const supabase = createBrowserSupabaseClient<Database>();
 */
export function createBrowserSupabaseClient<Database = unknown>() {
	const { url, anonKey } = resolveSupabasePublicConfig();
	const domain = resolveCookieDomain();
	return createBrowserClient<Database>(url, anonKey, domain ? { cookieOptions: { domain } } : undefined);
}
