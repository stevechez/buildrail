import type { Role } from './role';

/**
 * The user <-> organization relationship
 * (docs/platform/identity-foundation.md "Core Database Model" ->
 * organization_members; docs/platform/organizations.md section 7). This is
 * the canonical join table — ownership of the tenant relationship and role
 * lives here, not on `profiles`, so a user can hold different roles across
 * multiple organizations.
 */
export interface OrganizationMember {
	id: string;
	organization_id: string;
	user_id: string;
	role: Role;
	created_at: string;
}

/** @deprecated Use {@link OrganizationMember} — matches the canonical `organization_members` table name from docs/platform/identity-foundation.md. */
export type Membership = OrganizationMember;

/**
 * Resolved auth context for the current request: who the user is, which
 * organization they're acting as, and what role they hold there. This is
 * what @buildrail/auth's requireCurrentProfile()-style helpers return.
 *
 * `RoleType` defaults to the canonical `Role` union but stays generic so
 * products still on a legacy role column (e.g. apps/field's `'admin' |
 * 'staff'`, pre-dating this shared type) can pass their own union through
 * until they migrate onto the canonical roles.
 */
export interface OrganizationContext<RoleType = Role> {
	userId: string;
	organizationId: string;
	organizationName: string;
	role: RoleType;
}

/**
 * A pending invitation to join an organization
 * (docs/platform/identity-foundation.md "Invite Members").
 */
export interface Invitation {
	id: string;
	organization_id: string;
	email: string;
	role: string;
	invited_by?: string | null;
	created_at: string;
	accepted_at?: string | null;
}
