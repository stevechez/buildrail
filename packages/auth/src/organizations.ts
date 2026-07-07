import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * Bootstraps a brand-new organization: creates the org row and makes the
 * given user its first member with role 'owner' (docs/platform/
 * identity-foundation.md's signup flow: "User Assigned Owner Role").
 * Generalized from apps/field/lib/actions/auth-setup.ts so every product
 * that offers self-serve org creation (the shared hub in apps/app, and any
 * product that still allows creating an org directly) shares one
 * implementation instead of re-deriving it.
 *
 * Must run on an admin/service-role client: a brand-new user has no
 * organization_members row yet, so an RLS-scoped insert on
 * organizations/organization_members would have nothing to scope against
 * (is_org_member()/is_org_admin() can't match a membership that doesn't
 * exist yet).
 *
 * Does not touch `profiles` — that row already exists, created
 * automatically by the `handle_new_user` trigger at signup.
 */
export interface CreateOrganizationInput {
	name: string;
	userId: string;
}

export async function createOrganizationAndOwner(
	adminSupabase: SupabaseClient,
	input: CreateOrganizationInput
): Promise<{ organizationId: string }> {
	const name = input.name.trim();
	if (!name) throw new Error('Organization name is required.');

	const { data: org, error: orgError } = await adminSupabase
		.from('organizations')
		.insert({ name })
		.select('id')
		.single();
	if (orgError || !org) throw new Error(orgError?.message ?? 'Failed to create organization.');

	const { error: membershipError } = await adminSupabase.from('organization_members').insert({
		organization_id: org.id,
		user_id: input.userId,
		role: 'owner',
	});
	if (membershipError) throw new Error(membershipError.message);

	return { organizationId: org.id };
}
