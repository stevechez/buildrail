import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { resolveSupabasePublicConfig, resolveCookieDomain } from './env';

/**
 * Minimal shape of Next's `cookies()` return value that we depend on. We
 * take this as a parameter rather than importing `next/headers` directly so
 * this package doesn't hard-depend on the App Router's server-only cookie
 * API at the module level (keeps `@buildrail/database` importable from
 * non-Next contexts, e.g. scripts, edge functions).
 */
export interface CookieStore {
	getAll(): { name: string; value: string }[];
	set(name: string, value: string, options?: CookieOptions): void;
}

/**
 * Cookie-aware Supabase client for Server Components, Server Actions, and
 * Route Handlers. Runs as the logged-in user, so RLS scopes every query to
 * their organization via the product's `current_org_id()`-style helper.
 *
 * Usage (App Router):
 *
 *   // apps/<app>/lib/supabase-server.ts
 *   import { cookies } from 'next/headers';
 *   import { createServerSupabaseClient } from '@buildrail/database';
 *   import type { Database } from '@/types/supabase';
 *
 *   export async function createSupabaseServerClient() {
 *     const cookieStore = await cookies();
 *     return createServerSupabaseClient<Database>(cookieStore);
 *   }
 */
export function createServerSupabaseClient<Database = unknown>(cookieStore: CookieStore) {
	const { url, anonKey } = resolveSupabasePublicConfig();
	const domain = resolveCookieDomain();

	return createServerClient<Database>(url, anonKey, {
		cookies: {
			getAll() {
				return cookieStore.getAll();
			},
			setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
				try {
					cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
				} catch {
					// Called from a Server Component — cookie writes are a no-op
					// here; the middleware client below handles session refresh.
				}
			},
		},
		...(domain ? { cookieOptions: { domain } } : {}),
	});
}
