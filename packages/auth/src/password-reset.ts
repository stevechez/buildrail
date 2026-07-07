import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * Thin wrappers around Supabase Auth's native password-reset flow
 * (docs/platform/identity-foundation.md Completion Criteria ->
 * Authentication -> "Password reset"). Deliberately thin — Supabase Auth is
 * the source of truth here (CLAUDE.md: "Do not create custom authentication
 * systems"), this just gives every app the same call shape and a single
 * place to document the flow.
 *
 * Flow:
 *   1. requestPasswordReset(supabase, email, redirectTo) — sends the email.
 *   2. User clicks the link, lands on `redirectTo` with a recovery session.
 *   3. That page calls updatePassword(supabase, newPassword).
 */

export async function requestPasswordReset(supabase: SupabaseClient, email: string, redirectTo: string): Promise<void> {
	const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
		redirectTo,
	});
	if (error) throw new Error(error.message);
}

export async function updatePassword(supabase: SupabaseClient, newPassword: string): Promise<void> {
	const { error } = await supabase.auth.updateUser({ password: newPassword });
	if (error) throw new Error(error.message);
}
