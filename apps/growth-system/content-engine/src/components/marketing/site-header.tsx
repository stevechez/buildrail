'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

import { AuthStatus } from '@/components/auth/auth-status';
import { Button } from '@/components/ui/button';

const navLinks = [
	{ href: '/dashboard', label: 'Home' },
	{ href: '/generate', label: 'Generate' },
	{ href: '/posts', label: 'My Library' },
	{ href: '/examples', label: 'Examples' },
	{ href: '/pricing', label: 'Pricing' },
];

export function SiteHeader() {
	const pathname = usePathname();
	const [mobileOpen, setMobileOpen] = useState(false);

	const isActive = (href: string) =>
		pathname === href || pathname.startsWith(`${href}/`);

	return (
		<header className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				{/* Logo */}
				<Link
					href="/"
					className="flex items-center gap-2 text-base font-bold tracking-tight"
				>
					LocalProof
				</Link>

				{/* Desktop nav */}
				<nav className="hidden items-center gap-1 md:flex">
					{navLinks.map(({ href, label }) => (
						<Link
							key={href}
							href={href}
							className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
								isActive(href)
									? 'bg-white/[0.08] text-foreground'
									: 'text-muted-foreground hover:bg-white/[0.04] hover:text-foreground'
							}`}
						>
							{label}
						</Link>
					))}
				</nav>

				{/* Right side */}
				<div className="flex items-center gap-3">
					<Button asChild size="sm" className="hidden rounded-lg sm:flex">
						<Link href="/generate">
							<Sparkles className="mr-1.5 size-3.5" />
							New Pack
						</Link>
					</Button>

					<AuthStatus />

					{/* Mobile menu toggle */}
					<button
						className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-muted-foreground transition hover:bg-white/[0.08] hover:text-foreground md:hidden"
						onClick={() => setMobileOpen(prev => !prev)}
						aria-label="Toggle menu"
					>
						{mobileOpen ? (
							<X className="size-4" />
						) : (
							<Menu className="size-4" />
						)}
					</button>
				</div>
			</div>

			{/* Mobile nav drawer */}
			{mobileOpen && (
				<div className="border-t border-white/10 bg-background/95 px-4 pb-6 pt-4 md:hidden">
					<nav className="flex flex-col gap-1">
						{navLinks.map(({ href, label }) => (
							<Link
								key={href}
								href={href}
								onClick={() => setMobileOpen(false)}
								className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
									isActive(href)
										? 'bg-white/[0.08] text-foreground'
										: 'text-muted-foreground hover:bg-white/[0.04] hover:text-foreground'
								}`}
							>
								{label}
							</Link>
						))}
					</nav>

					<Button asChild className="mt-4 w-full rounded-lg">
						<Link href="/generate" onClick={() => setMobileOpen(false)}>
							<Sparkles className="mr-2 size-4" />
							Generate New Pack
						</Link>
					</Button>
				</div>
			)}
		</header>
	);
}
