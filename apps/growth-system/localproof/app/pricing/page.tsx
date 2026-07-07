'use client';
import Link from 'next/link';
import { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const plans = [
	{
		name: 'Starter',
		price: { monthly: 0, annual: 0 },
		tagline: 'Try LocalProof on a real job — no credit card.',
		features: [
			{ text: '3 content packs per month', inc: true },
			{ text: 'Google Business + Facebook + Instagram', inc: true },
			{ text: 'Business profile (name, area, voice)', inc: true },
			{ text: 'Copy-ready output', inc: true },
			{ text: 'Video scripts', inc: false },
			{ text: 'Saved library', inc: false },
			{ text: '5-day posting schedule', inc: false },
			{ text: 'Unlimited packs', inc: false },
		],
		cta: 'Start free',
		href: '/start',
		highlight: false,
	},
	{
		name: 'Pro',
		price: { monthly: 29, annual: 24 },
		tagline: 'For businesses posting consistently every week.',
		features: [
			{ text: 'Unlimited content packs', inc: true },
			{ text: 'All 8 platforms + video scripts', inc: true },
			{ text: 'Full business profile + tone settings', inc: true },
			{ text: '5-day posting schedule per pack', inc: true },
			{ text: 'Saved content library', inc: true },
			{ text: 'Review request templates', inc: true },
			{ text: 'Email blurbs', inc: true },
			{ text: 'Priority support', inc: false },
		],
		cta: 'Start free trial',
		href: '/start',
		highlight: true,
	},
	{
		name: 'Agency',
		price: { monthly: 79, annual: 67 },
		tagline: 'Manage content for multiple locations or clients.',
		features: [
			{ text: 'Everything in Pro', inc: true },
			{ text: 'Up to 10 business profiles', inc: true },
			{ text: 'Separate voice settings per profile', inc: true },
			{ text: 'Shared team library', inc: true },
			{ text: 'Bulk generation', inc: true },
			{ text: 'White-label export', inc: true },
			{ text: 'Priority support', inc: true },
			{ text: 'Onboarding call', inc: true },
		],
		cta: 'Talk to us',
		href: '/start',
		highlight: false,
	},
];

export default function PricingPage() {
	const [annual, setAnnual] = useState(false);

	return (
		<div className="min-h-screen bg-ink">
			<NavBar />

			<section className="pt-32 pb-14 text-center border-b border-rim">
				<div className="max-w-3xl mx-auto px-5 sm:px-8">
					<p className="text-xs text-mist uppercase tracking-widest mb-4 font-mono">
						Pricing
					</p>
					<h1 className="text-4xl sm:text-5xl font-bold text-chalk mb-4">
						Start free. Post consistently.
					</h1>
					<p className="text-mist mb-8 leading-relaxed">
						No blank pages. No agency voice. Content that sounds like you — from
						every job you complete.
					</p>
					<div className="inline-flex items-center gap-1 bg-panel border border-rim p-1 rounded-xl">
						<button
							onClick={() => setAnnual(false)}
							className={`px-4 py-2 rounded-lg text-sm font-medium ${!annual ? 'bg-sky text-ink' : 'text-mist hover:text-chalk'}`}
						>
							Monthly
						</button>
						<button
							onClick={() => setAnnual(true)}
							className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${annual ? 'bg-sky text-ink' : 'text-mist hover:text-chalk'}`}
						>
							Annual
							<span
								className={`text-xs px-1.5 py-0.5 rounded font-semibold ${annual ? 'bg-ink text-sky' : 'bg-green-900 text-green-400'}`}
							>
								Save 17%
							</span>
						</button>
					</div>
				</div>
			</section>

			<section className="py-16">
				<div className="max-w-6xl mx-auto px-5 sm:px-8">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
						{plans.map(plan => (
							<div
								key={plan.name}
								className={`rounded-2xl border p-7 relative ${plan.highlight ? 'border-sky ring-1 ring-sky' : 'border-rim bg-panel'}`}
							>
								{plan.highlight && (
									<div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
										<span className="bg-sky text-ink text-xs font-bold px-3 py-1 rounded-full">
											Most popular
										</span>
									</div>
								)}
								<div className="text-xs text-sky font-mono mb-1">
									{plan.name}
								</div>
								<div className="flex items-baseline gap-1 mb-1">
									<span className="text-4xl font-bold text-chalk">
										{plan.price.monthly === 0
											? 'Free'
											: `$${annual ? plan.price.annual : plan.price.monthly}`}
									</span>
									{plan.price.monthly > 0 && (
										<span className="text-mist text-sm">/mo</span>
									)}
								</div>
								{annual && plan.price.monthly > 0 && (
									<p className="text-xs text-green-400 mb-1">
										Billed annually — save $
										{(plan.price.monthly - plan.price.annual) * 12}/yr
									</p>
								)}
								<p className="text-xs text-mist mb-5 leading-relaxed">
									{plan.tagline}
								</p>
								<Link
									href={plan.href}
									className={`block text-center text-sm font-semibold py-3 rounded-xl mb-6 ${plan.highlight ? 'bg-sky hover:bg-skylit text-ink' : 'border border-wire text-chalk hover:border-mist'}`}
								>
									{plan.cta}
								</Link>
								<ul className="space-y-2">
									{plan.features.map(f => (
										<li
											key={f.text}
											className="flex items-center gap-2.5 text-xs"
										>
											<svg
												className={`w-3.5 h-3.5 flex-shrink-0 ${f.inc ? 'text-sky' : 'text-rim'}`}
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												{f.inc ? (
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2.5}
														d="M5 13l4 4L19 7"
													/>
												) : (
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M6 18L18 6M6 6l12 12"
													/>
												)}
											</svg>
											<span className={f.inc ? 'text-chalk' : 'text-wire'}>
												{f.text}
											</span>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>

					<div className="flex flex-wrap justify-center gap-8 mt-10 text-sm text-mist">
						{[
							'Cancel anytime',
							'No long-term contract',
							'First pack always free',
							'Works on any device',
						].map(t => (
							<span key={t} className="flex items-center gap-1.5">
								<svg
									className="w-4 h-4 text-sky"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2.5}
										d="M5 13l4 4L19 7"
									/>
								</svg>
								{t}
							</span>
						))}
					</div>
				</div>
			</section>

			<section className="py-12 border-t border-b border-rim bg-panel">
				<div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
					<p className="text-mist leading-relaxed">
						<strong className="text-chalk">Not sure which plan?</strong> Start
						free — no credit card. Your first content pack is on us. Upgrade
						only when you&apos;re ready to post more.
					</p>
					<Link
						href="/start"
						className="inline-flex items-center gap-2 bg-sky hover:bg-skylit text-ink font-bold px-6 py-3 rounded-xl text-sm mt-5"
					>
						Create your first free pack →
					</Link>
				</div>
			</section>

			<section className="py-20">
				<div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
					<h2 className="text-3xl font-bold text-chalk mb-4">
						Your last job is your next post.
					</h2>
					<p className="text-mist mb-8">
						Describe one job. Get a full content pack in 90 seconds.
					</p>
					<Link
						href="/start"
						className="inline-flex items-center gap-2 bg-sky hover:bg-skylit text-ink font-bold px-8 py-4 rounded-xl text-base"
					>
						Start free — no credit card →
					</Link>
				</div>
			</section>

			<Footer />
		</div>
	);
}
