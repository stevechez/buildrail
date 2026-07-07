import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { resolveSupabasePublicConfig, resolveCookieDomain } from './env';

/**
 * Minimal shape of NextRequest/NextResponse that we depend on, so this
 * package doesn't import `next/server` directly (see server.ts for the
 * same rationale with `next/headers`).
 */
export interface MiddlewareRequestLike {
	cookies: {
		getAll(): { name: string; value: string }[];
		set(name: string, value: string): void;
	};
}

export interface MiddlewareResponseLike {
	cookies: {
		set(name: string, value: string, options?: CookieOptions): void;
	};
}

/**
 * Refreshes the Supabase session on every matched request. Every BuildRail
 * app's middleware.ts should call this before doing its own route
 * protection, e.g.:
 *
 *   const { supabase, response } = createMiddlewareSupabaseClient(request, () =>
 *     NextResponse.next({ request })
 *   );
 *   const { data: { user } } = await supabase.auth.getUser();
 *   if (pathname.startsWith('/dashboard') && !user) {
 *     return NextResponse.redirect(new URL('/login', request.url));
 *   }
 *   return response;
 */
export function createMiddlewareSupabaseClient<
	Request extends MiddlewareRequestLike,
	Response extends MiddlewareResponseLike,
>(request: Request, makeResponse: () => Response) {
	const { url, anonKey } = resolveSupabasePublicConfig();
	const domain = resolveCookieDomain();
	let response = makeResponse();

	const supabase = createServerClient(url, anonKey, {
		cookies: {
			getAll() {
				return request.cookies.getAll();
			},
			setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
				cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
				response = makeResponse();
				cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
			},
		},
		...(domain ? { cookieOptions: { domain } } : {}),
	});

	return {
		supabase,
		get response() {
			return response;
		},
	};
}
