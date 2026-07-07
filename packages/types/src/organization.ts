/**
 * Shared organization contract. Mirrors docs/platform/organizations.md
 * section 6 and docs/platform/identity-foundation.md "Core Database Model".
 * Every product-specific `organizations` table should be a superset of
 * these columns, not a divergent shape.
 */
export interface Organization {
	id: string;
	name: string;
	slug?: string | null;
	logo?: string | null;
	industry?: string | null;
	created_at: string;
	updated_at?: string;
}

/**
 * Shared application-identity contract (docs/platform/identity-foundation.md
 * "Core Database Model" -> profiles). Distinct from Supabase's `auth.users`
 * — this is the BuildRail-managed profile row.
 *
 * Deliberately organization-agnostic: a profile does not carry
 * `organization_id` or `role`. Those live on `organization_members` (see
 * membership.ts) so a single user can belong to more than one organization
 * (docs/platform/organizations.md section 14, "Multi-Organization
 * Support"). Products whose schema still bakes `organization_id`/`role`
 * directly onto `profiles` (a single-org-per-user shortcut) should migrate
 * onto `organization_members` rather than extending this type.
 */
export interface Profile {
	id: string;
	email?: string | null;
	full_name?: string | null;
	avatar_url?: string | null;
	created_at: string;
}
