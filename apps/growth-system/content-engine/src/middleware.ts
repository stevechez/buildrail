import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const protectedRoutes = [
	'/onboarding',
	'/generate',
	'/posts',
	'/repurpose',
	'/context',
	'/dashboard',
];

const authRoutes = ['/login', '/signup'];

function isProtectedRoute(pathname: string) {
	return protectedRoutes.some(route => {
		return pathname === route || pathname.startsWith(`${route}/`);
	});
}

function isAuthRoute(pathname: string) {
	return authRoutes.includes(pathname);
}

export async function middleware(request: NextRequest) {
	let response = NextResponse.next({
		request,
	});

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value }) => {
						request.cookies.set(name, value);
					});

					response = NextResponse.next({
						request,
					});

					cookiesToSet.forEach(({ name, value, options }) => {
						response.cookies.set(name, value, options);
					});
				},
			},
		},
	);

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const pathname = request.nextUrl.pathname;

	if (isProtectedRoute(pathname) && !user) {
		const redirectUrl = request.nextUrl.clone();

		redirectUrl.pathname = '/signup';
		redirectUrl.searchParams.set(
			'next',
			`${pathname}${request.nextUrl.search}`,
		);

		return NextResponse.redirect(redirectUrl);
	}

	if (isAuthRoute(pathname) && user) {
		const redirectUrl = request.nextUrl.clone();

		redirectUrl.pathname = '/dashboard';
		redirectUrl.search = '';

		return NextResponse.redirect(redirectUrl);
	}

	return response;
}

export const config = {
	matcher: [
		'/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
	],
};
