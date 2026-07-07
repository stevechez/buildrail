import Link from 'next/link';
import { ArrowRight, CheckCircle2, LogIn, Sparkles } from 'lucide-react';

import { AuthCard } from '@/components/auth/auth-card';
import { SiteHeader } from '@/components/marketing/site-header';
import { Button } from '@/components/ui/button';

const steps = [
	'Log back into your workspace',
	'Open your saved content packs',
	'Generate, remix, or repurpose your next post',
];

export default function LoginPage() {
	return (
		<main className="min-h-screen bg-[#050816] text-[#F5F7FB]">
			<SiteHeader />

			<section className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-14">
				<div className="max-w-xl">
					<div className="inline-flex items-center gap-2 rounded-full border border-[#5B74FF]/30 bg-[#5B74FF]/10 px-4 py-2 text-sm font-medium text-[#C7D2FE]">
						<LogIn className="size-4" />
						Welcome back
					</div>

					<h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
						Pick up where your local content system left off.
					</h1>

					<p className="mt-5 text-lg leading-8 text-[#A9B4D0]">
						Log in to access your saved packs, reuse past work, improve your
						content score, and turn real jobs into new posts.
					</p>

					<div className="mt-8 space-y-4 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
						<p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#5FB6FF]">
							After login
						</p>

						<div className="space-y-3">
							{steps.map(step => (
								<div key={step} className="flex items-center gap-3">
									<div className="flex size-7 items-center justify-center rounded-full bg-[#5B74FF]/15 text-[#8FB9FF]">
										<CheckCircle2 className="size-4" />
									</div>
									<p className="text-sm text-[#D7DDF0]">{step}</p>
								</div>
							))}
						</div>
					</div>

					<div className="mt-8 flex flex-wrap items-center gap-3">
						<Button variant="outline" asChild>
							<Link href="/examples">
								<Sparkles className="mr-2 size-4" />
								See Examples
							</Link>
						</Button>

						<div className="flex items-center gap-3 text-sm text-[#A9B4D0]">
							<span>New here?</span>
							<ArrowRight className="size-4" />
							<Link
								href="/signup"
								className="font-medium text-[#8FB9FF] hover:text-white"
							>
								Create a free account
							</Link>
						</div>
					</div>
				</div>

				<div className="mx-auto w-full max-w-xl lg:ml-auto">
					<AuthCard mode="login" />
				</div>
			</section>
		</main>
	);
}
