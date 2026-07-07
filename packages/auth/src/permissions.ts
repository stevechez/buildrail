import type { Role } from '@buildrail/types';

/**
 * Permission registry, following the `resource.action` naming convention
 * from docs/platform/roles-permissions.md section 8-9. Add new permissions
 * here rather than hard-coding role checks in product code.
 */
export const permissions = {
	projects: {
		view: 'projects.view',
		create: 'projects.create',
		delete: 'projects.delete',
	},
	users: {
		invite: 'users.invite',
		manage: 'users.manage',
	},
	billing: {
		manage: 'billing.manage',
	},
	reports: {
		view: 'reports.view',
	},
	products: {
		configure: 'products.configure',
	},
} as const;

type PermissionValues<T> = T extends string ? T : { [K in keyof T]: PermissionValues<T[K]> }[keyof T];
export type Permission = PermissionValues<typeof permissions>;

/**
 * The default role matrix from docs/platform/roles-permissions.md section
 * 10. Products with product-specific permissions (sites.publish,
 * audits.share, estimates.approve, documents.upload, etc.) should extend
 * this with their own registry + matrix rather than editing this shared
 * one — see docs/platform/roles-permissions.md section 15.
 */
const ROLE_PERMISSIONS: Record<Role, ReadonlySet<Permission>> = {
	owner: new Set(Object.values(permissions).flatMap((group) => Object.values(group))) as ReadonlySet<Permission>,
	admin: new Set([
		permissions.projects.view,
		permissions.projects.create,
		permissions.projects.delete,
		permissions.users.invite,
		permissions.users.manage,
		permissions.reports.view,
		permissions.products.configure,
	]),
	manager: new Set([
		permissions.projects.view,
		permissions.projects.create,
		permissions.reports.view,
	]),
	member: new Set([permissions.projects.view, permissions.projects.create, permissions.reports.view]),
	viewer: new Set([permissions.projects.view, permissions.reports.view]),
};

/**
 * Backend authorization check. The server is the authority
 * (docs/platform/roles-permissions.md section 13) — frontend `can()` checks
 * are for UX only and must never be the sole gate on a mutation.
 */
export function can(role: Role, permission: Permission): boolean {
	return ROLE_PERMISSIONS[role]?.has(permission) ?? false;
}

/**
 * Throws-or-returns guard for server actions / route handlers, mirroring
 * docs/platform/roles-permissions.md section 13's `requirePermission`
 * example. Callers supply `onDenied` so this package doesn't dictate how a
 * denial is surfaced (redirect, 403 response, thrown error, etc.).
 */
export function requirePermission<T>(role: Role, permission: Permission, onDenied: () => T): true | T {
	if (!can(role, permission)) {
		return onDenied();
	}
	return true;
}
