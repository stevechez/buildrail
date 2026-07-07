// Deliberately does NOT re-export from './admin' here. admin.ts imports
// 'server-only', and bundlers (Next/Turbopack) resolve barrel exports
// eagerly — re-exporting it from this shared entry point would drag
// 'server-only' into any client bundle that imports anything from
// '@buildrail/database', even createBrowserSupabaseClient. Import the
// admin client from '@buildrail/database/admin' instead, from a
// server-only module.
export { createBrowserSupabaseClient } from './browser';
export { createServerSupabaseClient, type CookieStore } from './server';
export {
	createMiddlewareSupabaseClient,
	type MiddlewareRequestLike,
	type MiddlewareResponseLike,
} from './middleware';
export {
	resolveSupabasePublicConfig,
	resolveSupabaseServiceRoleKey,
	resolveCookieDomain,
	type SupabasePublicConfig,
} from './env';
