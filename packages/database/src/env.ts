/**
 * Resolves the two client-safe Supabase env vars every BuildRail app needs.
 * Centralized here so the "copy .env.local.example -> fill in your project
 * URL and anon key" error message (previously duplicated in 6 apps' local
 * lib/supabase.ts files) only needs to be maintained in one place.
 */
export interface SupabasePublicConfig {
	url: string;
	anonKey: string;
}

export function resolveSupabasePublicConfig(): SupabasePublicConfig {
	const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (!url || !anonKey) {
		throw new Error(
			'Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local (see docs/platform/authentication.md section 17).'
		);
	}

	return { url, anonKey };
}

/**
 * Optional shared-cookie domain for single-sign-on across BuildRail
 * subdomains (docs/platform/identity-foundation.md: "one primary service,
 * one login"). Set to a leading-dot root domain in production, e.g.
 * `.buildrail.app`, on every product app AND apps/app (the shared hub) —
 * the Supabase session cookie then gets written scoped to the whole
 * domain, so a session started at app.buildrail.app is already valid at
 * field.buildrail.app, estimator.buildrail.app, etc. Leave unset in local
 * dev: browsers reject cross-subdomain cookies for bare `localhost`, and a
 * host-only cookie (the default) works fine for single-app local testing.
 */
export function resolveCookieDomain(): string | undefined {
	return process.env.NEXT_PUBLIC_COOKIE_DOMAIN || undefined;
}

export function resolveSupabaseServiceRoleKey(): string {
	const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

	if (!serviceKey) {
		throw new Error(
			'Missing SUPABASE_SERVICE_ROLE_KEY. This must never be exposed client-side (see docs/platform/authentication.md section 17).'
		);
	}

	return serviceKey;
}
