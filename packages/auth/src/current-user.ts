import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * Authentication identity only (docs/platform/authentication.md section 4,
 * "Authentication Identity" / Supabase's `auth.users`). Does not know about
 * organizations or roles — see current-profile.ts for that.
 */
export async function getCurrentUser(supabase: SupabaseClient) {
	const {
		data: { user },
	} = await supabase.auth.getUser();
	return user;
}

/**
 * Framework-agnostic "require a session" guard. Callers supply their own
 * `onUnauthenticated` (typically `() => redirect('/login')` from
 * `next/navigation`) so this package doesn't hard-depend on Next.
 *
 *   const user = await requireUser(supabase, () => redirect('/login'));
 */
export async function requireUser<T>(supabase: SupabaseClient, onUnauthenticated: () => T) {
	const user = await getCurrentUser(supabase);
	if (!user) {
		return onUnauthenticated();
	}
	return user;
}
