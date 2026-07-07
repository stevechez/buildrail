/**
 * Canonical BuildRail organization role hierarchy.
 *
 * Source of truth: docs/platform/roles-permissions.md and
 * docs/platform/organizations.md. Every product's `profiles`/`memberships`
 * table should store one of these values in its `role` column — do not
 * invent product-specific role names (see docs/platform/organizations.md
 * "Common Mistakes").
 *
 * Legacy note: apps/field's original schema used a two-value
 * `'admin' | 'staff'` role column that predates this shared type. When
 * migrating a product onto @buildrail/auth, map its legacy roles onto this
 * set (e.g. `staff` -> `member`) rather than widening this union.
 */
export const ROLES = ['owner', 'admin', 'manager', 'member', 'viewer'] as const;

export type Role = (typeof ROLES)[number];

/**
 * Ordered from most to least privileged. Used for simple "at least this
 * role" checks; fine-grained capability checks should go through
 * @buildrail/auth's `can()` helper instead of comparing rank directly.
 */
export const ROLE_RANK: Record<Role, number> = {
	owner: 0,
	admin: 1,
	manager: 2,
	member: 3,
	viewer: 4,
};

export function isRole(value: unknown): value is Role {
	return typeof value === 'string' && (ROLES as readonly string[]).includes(value);
}

/** True when `role` has at least the privilege of `minimum` (lower rank = more privileged). */
export function roleAtLeast(role: Role, minimum: Role): boolean {
	return ROLE_RANK[role] <= ROLE_RANK[minimum];
}
