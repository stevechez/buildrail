import type { SupabaseClient } from '@supabase/supabase-js';
import type { OrganizationMember } from '@buildrail/types';

/**
 * Lists every organization the given user belongs to, for building an
 * organization switcher (docs/platform/identity-foundation.md Completion
 * Criteria -> Organizations -> "Switch organization"). Joins in the
 * organization's name for display.
 */
export async function listMemberships(
	supabase: SupabaseClient,
	userId: string
): Promise<(OrganizationMember & { organization_name: string })[]> {
	const { data, error } = await supabase
		.from('organization_members')
		.select('id, organization_id, user_id, role, created_at, organizations(name)')
		.eq('user_id', userId)
		.order('created_at', { ascending: true });

	if (error) {
		console.error('listMemberships: query failed', error);
		return [];
	}

	return (data ?? []).map((row) => {
		const org = Array.isArray(row.organizations) ? row.organizations[0] : row.organizations;
		return {
			id: row.id,
			organization_id: row.organization_id,
			user_id: row.user_id,
			role: row.role,
			created_at: row.created_at,
			organization_name: (org as { name?: string } | null)?.name ?? 'Unknown organization',
		};
	});
}

/**
 * Validates that a user actually belongs to the organization they're
 * switching to before anything trusts that selection — never let an app
 * set "current organization" from client input without this check.
 *
 * Usage (organization switcher server action):
 *
 *   const membership = await requireMembership(supabase, userId, targetOrgId, () => {
 *     throw new Error("You don't have access to that organization.");
 *   });
 */
export async function requireMembership<T>(
	supabase: SupabaseClient,
	userId: string,
	organizationId: string,
	onDenied: () => T
): Promise<OrganizationMember | T> {
	const { data, error } = await supabase
		.from('organization_members')
		.select('id, organization_id, user_id, role, created_at')
		.eq('user_id', userId)
		.eq('organization_id', organizationId)
		.maybeSingle();

	if (error) {
		console.error('requireMembership: query failed', error);
	}
	if (!data) {
		return onDenied();
	}
	return data;
}
