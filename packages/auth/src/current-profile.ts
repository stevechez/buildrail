import type { SupabaseClient } from '@supabase/supabase-js';
import type { OrganizationContext, Role } from '@buildrail/types';
import { getCurrentUser } from './current-user';

export interface RequireCurrentProfileOptions<T> {
	/** Called when there is no authenticated session at all. */
	onUnauthenticated: () => T;
	/**
	 * Called when the session is valid but the user has no
	 * `organization_members` row yet (e.g. mid-signup, before they've
	 * created/joined an organization) — or, when `organizationId` is passed
	 * explicitly, when they aren't a member of *that* organization.
	 * Deliberately distinct from onUnauthenticated — see
	 * apps/field/lib/current-profile.ts for why conflating the two causes
	 * a dashboard <-> no-access redirect loop.
	 */
	onNoMembership: () => T;
	/**
	 * Which organization to resolve context for. Omit for single-org users
	 * (falls back to their oldest membership — correct today for every
	 * BuildRail app, which are all still single-org-per-user in practice).
	 * Pass explicitly once an app builds an organization switcher, e.g. from
	 * a `?org=` param or a "last active org" cookie — see listMemberships()
	 * in memberships.ts for populating that switcher.
	 */
	organizationId?: string;
}

/**
 * Resolves the logged-in user's organization context: who they are, which
 * organization they're acting as, their role there, and the organization's
 * display name.
 *
 * Assumes the canonical BuildRail shape
 * (docs/platform/identity-foundation.md "Core Database Model"): a
 * `profiles` table keyed by `auth.users.id` holding identity only, an
 * `organization_members` table holding the `(user_id, organization_id,
 * role)` join, and an `organizations` table with `name`. Profiles do NOT
 * carry `organization_id`/`role` directly — see @buildrail/types' Profile
 * vs OrganizationMember for why.
 *
 * `RoleType` defaults to the canonical 5-role union but is generic so
 * products still on a legacy role column (e.g. apps/field's `'admin' |
 * 'staff'`) can pass their own role type through without this helper
 * rejecting a valid, just non-canonical, role value.
 *
 * Deliberately separate queries rather than one embedded join — a failed
 * embedded select can't distinguish "no membership" from "the join query
 * itself broke" (e.g. PostgREST's schema cache lagging a fresh migration),
 * and the organization name is presentation-only, so its query is allowed
 * to fail without affecting the access decision.
 */
export async function requireCurrentProfile<T, RoleType = Role>(
	supabase: SupabaseClient,
	options: RequireCurrentProfileOptions<T>
): Promise<OrganizationContext<RoleType> | T> {
	const user = await getCurrentUser(supabase);
	if (!user) {
		return options.onUnauthenticated();
	}

	let membershipQuery = supabase
		.from('organization_members')
		.select('organization_id, role')
		.eq('user_id', user.id);

	membershipQuery = options.organizationId
		? membershipQuery.eq('organization_id', options.organizationId)
		: membershipQuery.order('created_at', { ascending: true });

	const { data: membership, error: membershipError } = await membershipQuery.limit(1).maybeSingle();

	if (membershipError) {
		console.error('requireCurrentProfile: membership lookup failed', membershipError);
	}
	if (!membership) {
		return options.onNoMembership();
	}

	let organizationName = 'Your organization';
	const { data: org, error: orgError } = await supabase
		.from('organizations')
		.select('name')
		.eq('id', membership.organization_id)
		.maybeSingle();

	if (orgError) {
		console.error('requireCurrentProfile: organization lookup failed', orgError);
	} else if (org?.name) {
		organizationName = org.name;
	}

	return {
		userId: user.id,
		organizationId: membership.organization_id,
		organizationName,
		role: membership.role,
	};
}
