import type { Metadata } from 'next';
import { SitesEstimator } from '@/components/estimator/SitesEstimator';
import Link from 'next/dist/client/link';

export const metadata: Metadata = {
	title: 'Free Project Estimate — BuildRail Sites',
	description:
		'Answer a few quick questions to get a realistic cost range for your construction project. No commitment required.',
};

export default function EstimatePage() {
	return (
		<main className="min-h-screen bg-void text-chalk">
			{/* Header */}
			<header className="border-b border-white/[0.06] bg-carbon">
				<div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
					<Link
						href="/"
						className="text-sm font-bold text-chalk hover:text-orange transition-colors"
					>
						BuildRail Sites
					</Link>
					<Link
						href="/"
						className="text-sm font-medium text-fog hover:text-chalk transition-colors"
					>
						← Back to home
					</Link>
				</div>
			</header>

			{/* Hero */}
			<section className="py-14 text-center">
				<div className="mx-auto max-w-2xl px-4">
					<span className="inline-block rounded-full border border-orange/30 bg-orange/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange">
						Instant Estimate
					</span>
					<h1 className="mt-4 text-4xl font-extrabold tracking-tight text-chalk sm:text-5xl">
						What will your project cost?
					</h1>
					<p className="mt-4 text-lg text-mist">
						Answer 3–4 questions and get a realistic cost range in under a
						minute — no sign-up, no spam.
					</p>
				</div>
			</section>

			{/* Estimator widget — dark class on <html> activates dark: variants */}
			<section className="pb-20">
				<div className="mx-auto flex max-w-xl justify-center px-4">
					<SitesEstimator />
				</div>
			</section>

			{/* Trust strip */}
			<section className="border-t border-white/[0.06] bg-carbon py-10 text-center">
				<p className="text-sm text-fog">
					Estimates are preliminary and for planning purposes only. Actual costs
					vary by site conditions, materials, and local labor rates.
				</p>
			</section>
		</main>
	);
}
