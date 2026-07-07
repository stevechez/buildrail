import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { SiteHeader } from '@/components/marketing/site-header';
import { SiteFooter } from '@/components/marketing/site-footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const plans = [
	{
		name: 'Free',
		badge: 'Start here',
		price: '$0',
		period: '',
		description: 'Try it with a real job. No card required.',
		features: [
			'Generate content packs',
			'Google, Facebook, Instagram, video',
			'Headline and hashtag suggestions',
			'5-day posting plan',
			'Save up to 3 packs',
		],
		cta: 'Get started free',
		href: '/signup',
		highlighted: false,
	},
	{
		name: 'Founder',
		badge: 'Early access',
		price: '$29',
		period: '/mo',
		description: 'For local businesses building a consistent content habit.',
		features: [
			'Everything in Free',
			'Unlimited saved packs',
			'Context Vault (brand rules, offers, FAQs)',
			'Remix and repurpose packs',
			'LocalProof Score + improve',
			'5-day weekly posting plans',
		],
		cta: 'Join as a Founder',
		href: '/signup',
		highlighted: true,
	},
	{
		name: 'Agency',
		badge: 'Waitlist',
		price: 'Coming soon',
		period: '',
		description: 'For agencies managing content for multiple local clients.',
		features: [
			'Multiple client workspaces',
			'Shared content libraries',
			'White-label output',
			'Priority generation',
		],
		cta: 'Join the waitlist',
		href: '/signup',
		highlighted: false,
	},
];

export default function PricingPage() {
	return (
		<main className="min-h-screen bg-background text-foreground">
			<SiteHeader />

			<section className="border-b border-white/10 bg-white/[0.02] px-6 py-20">
				<div className="mx-auto max-w-3xl text-center">
					<h1 className="text-4xl font-bold tracking-tight md:text-5xl">
						Simple, honest pricing.
					</h1>
					<p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
						Start free. Upgrade when it&apos;s working. No contracts, no hidden
						fees.
					</p>
				</div>
			</section>

			<section className="px-6 py-16">
				<div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
					{plans.map(plan => (
						<div
							key={plan.name}
							className={`relative flex flex-col rounded-2xl border p-6 ${
								plan.highlighted
									? 'border-[#5B74FF]/40 bg-[#5B74FF]/[0.06]'
									: 'border-white/10 bg-white/[0.03]'
							}`}
						>
							{plan.highlighted && (
								<div className="absolute inset-x-0 top-0 h-px rounded-full bg-gradient-to-r from-transparent via-[#5B74FF]/60 to-transparent" />
							)}

							<div className="mb-5">
								<div className="mb-3 flex items-center gap-2">
									<span className="text-base font-bold">{plan.name}</span>
									<Badge
										variant={plan.highlighted ? 'default' : 'secondary'}
										className="text-xs"
									>
										{plan.badge}
									</Badge>
								</div>

								<div className="flex items-baseline gap-1">
									<span className="text-3xl font-bold">{plan.price}</span>
									{plan.period && (
										<span className="text-sm text-muted-foreground">
											{plan.period}
										</span>
									)}
								</div>

								<p className="mt-2 text-sm text-muted-foreground">
									{plan.description}
								</p>
							</div>

							<ul className="mb-6 flex-1 space-y-2.5">
								{plan.features.map(f => (
									<li key={f} className="flex items-start gap-2.5 text-sm">
										<Check className="mt-0.5 size-4 shrink-0 text-[#5FB6FF]" />
										{f}
									</li>
								))}
							</ul>

							<Button
								asChild
								variant={plan.highlighted ? 'default' : 'outline'}
								className="w-full"
							>
								<Link href={plan.href}>
									{plan.cta}
									<ArrowRight className="ml-2 size-4" />
								</Link>
							</Button>
						</div>
					))}
				</div>

				<p className="mt-10 text-center text-sm text-muted-foreground">
					Founder pricing is locked in for the life of your account. Early
					supporters get the lowest rate we&apos;ll ever offer.
				</p>
			</section>

			<SiteFooter />
		</main>
	);
}
