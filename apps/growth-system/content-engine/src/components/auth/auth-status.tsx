'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, UserCircle2 } from 'lucide-react';
import { toast } from 'sonner';

import { createSupabaseBrowserClient } from '@/lib/supabase/browser';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type AuthStatusState = {
	email: string | null;
	isLoading: boolean;
};

export function AuthStatus() {
	const router = useRouter();

	const supabase = useMemo(() => {
		return createSupabaseBrowserClient();
	}, []);

	const [authStatus, setAuthStatus] = useState<AuthStatusState>({
		email: null,
		isLoading: true,
	});

	useEffect(() => {
		let isMounted = true;

		async function loadUser() {
			const {
				data: { session },
			} = await supabase.auth.getSession();

			if (!isMounted) {
				return;
			}

			setAuthStatus({
				email: session?.user?.email ?? null,
				isLoading: false,
			});
		}

		loadUser();

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setAuthStatus({
				email: session?.user?.email ?? null,
				isLoading: false,
			});

			router.refresh();
		});

		return () => {
			isMounted = false;
			subscription.unsubscribe();
		};
	}, [router, supabase]);

	async function handleLogout() {
		const { error } = await supabase.auth.signOut();

		if (error) {
			toast.error('Logout failed', {
				description: error.message,
			});
			return;
		}

		setAuthStatus({
			email: null,
			isLoading: false,
		});

		toast.success('Logged out');
		router.refresh();
		router.push('/');
	}

	if (authStatus.isLoading) {
		return null;
	}

	if (!authStatus.email) {
		return (
			<div className="flex items-center gap-3">
				<Button variant="ghost" asChild>
					<Link href="/login">Login</Link>
				</Button>

				<Button asChild>
					<Link href="/signup">Start Free</Link>
				</Button>
			</div>
		);
	}

	return (
		<div className="flex items-center gap-3">
			<Badge
				variant="secondary"
				className="hidden max-w-[220px] gap-2 truncate px-3 py-2 md:flex"
			>
				<UserCircle2 className="size-4 shrink-0" />
				<span className="truncate">{authStatus.email}</span>
			</Badge>

			<Button variant="ghost" asChild>
				<Link href="/generate">App</Link>
			</Button>

			<Button variant="outline" onClick={handleLogout}>
				<LogOut className="mr-2 size-4" />
				Logout
			</Button>
		</div>
	);
}
