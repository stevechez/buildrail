import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

import { AuthCard } from '@/components/auth/auth-card';
import { SiteHeader } from '@/components/marketing/site-header';

const steps = [
	'Create your free account',
	'Generate your first content pack',
	'Save, remix, and repurpose it later',
];

export default function SignupPage() {
	return (
		<main className="min-h-screen bg-[#050816] text-[#F5F7FB]">
			<SiteHeader />

			<section className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-14">
				<div className="max-w-xl">
					<div className="inline-flex items-center gap-2 rounded-full border border-[#5B74FF]/30 bg-[#5B74FF]/10 px-4 py-2 text-sm font-medium text-[#C7D2FE]">
						<Sparkles className="size-4" />
						Start your LocalProof workspace
					</div>

					<h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
						Turn real work into content that wins trust.
					</h1>

					<p className="mt-5 text-lg leading-8 text-[#A9B4D0]">
						Create a free LocalProof account and turn jobs, reviews, FAQs,
						service notes, and customer stories into content your local business
						can actually use.
					</p>

					<div className="mt-8 space-y-4 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
						<p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#5FB6FF]">
							What happens next
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

					<div className="mt-8 flex items-center gap-3 text-sm text-[#A9B4D0]">
						<span>No credit card needed.</span>
						<ArrowRight className="size-4" />
						<span>Start with demo content or your own job notes.</span>
					</div>
				</div>

				<div className="mx-auto w-full max-w-xl lg:ml-auto">
					<AuthCard mode="signup" />
				</div>
			</section>
		</main>
	);
}
