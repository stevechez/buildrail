import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type PricingPreviewPlan = {
	name: string;
	price: string;
	priceNote?: string;
	description: string;
	cta: string;
	featured?: boolean;
	buttonVariant?: 'default' | 'outline';
	features: string[];
};

const pricingPreviewPlans: PricingPreviewPlan[] = [
	{
		name: 'Free Early Access',
		price: '$0',
		priceNote: 'while in beta',
		description:
			'For testing the workflow and creating your first local content packs.',
		cta: 'Start Free',
		features: [
			'Create sample content packs',
			'Generate from jobs, reviews, FAQs, and service notes',
			'Try LocalProof Score',
			'Save and review your early content packs',
		],
	},
	{
		name: 'Founder',
		price: '$19/mo',
		priceNote: 'planned founder price',
		description:
			'For one local business that wants a simple weekly content system.',
		cta: 'Join Founder Access',
		featured: true,
		features: [
			'Turn real work into weekly content',
			'Save, remix, and repurpose content packs',
			'Use Context Vault and Content Skills',
			'Build a reusable local proof library',
		],
	},
	{
		name: 'Agency',
		price: 'Waitlist',
		description:
			'For freelancers and agencies creating local content for clients.',
		cta: 'Join Agency Waitlist',
		buttonVariant: 'outline',
		features: [
			'Client-ready content packs',
			'Reusable local content workflows',
			'Repurpose old packs into new angles',
			'Faster production for local client content',
		],
	},
];

export function PricingPreview() {
	return (
		<section id="pricing" className="border-b border-white/10 px-6 py-24">
			<div className="mx-auto max-w-7xl">
				<div className="mx-auto mb-12 max-w-3xl text-center">
					<Badge variant="secondary" className="mb-5 rounded-full">
						Early access pricing
					</Badge>

					<h2 className="text-4xl font-bold tracking-tight md:text-5xl">
						Start free. Join founder pricing when billing opens.
					</h2>

					<p className="mt-5 text-lg leading-8 text-muted-foreground">
						LocalProof is still in early access. Test the workflow now, create
						your first content packs, and help shape the product before public
						billing goes live.
					</p>
				</div>

				<div className="grid gap-6 lg:grid-cols-3">
					{pricingPreviewPlans.map(plan => (
						<Card
							key={plan.name}
							className={
								plan.featured
									? 'relative w-full overflow-hidden border-[#5B74FF]/70 bg-[linear-gradient(135deg,#081225_0%,#102347_28%,#2148A6_62%,#1A2F73_100%)] shadow-[0_0_40px_rgba(91,116,255,0.18)]'
									: 'relative w-full border-white/15 bg-white/[0.03]'
							}
						>
							{plan.featured ? (
								<div className="absolute right-5 top-5">
									<Badge>Best starting point</Badge>
								</div>
							) : null}

							<CardHeader>
								<CardTitle>{plan.name}</CardTitle>

								<div className="mt-4">
									<div className="text-5xl font-bold tracking-tight">
										{plan.price}
									</div>

									{plan.priceNote ? (
										<p className="mt-2 text-xs text-muted-foreground">
											{plan.priceNote}
										</p>
									) : null}
								</div>

								<p className="min-h-12 text-sm leading-6 text-muted-foreground">
									{plan.description}
								</p>
							</CardHeader>

							<CardContent>
								<Button
									asChild
									className="w-full"
									variant={plan.buttonVariant ?? 'default'}
								>
									<Link href="/signup">{plan.cta}</Link>
								</Button>

								<ul className="mt-6 space-y-3">
									{plan.features.map(feature => (
										<li key={feature} className="flex gap-3 text-sm">
											<CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#5FB6FF]" />
											<span>{feature}</span>
										</li>
									))}
								</ul>
							</CardContent>
						</Card>
					))}
				</div>

				<div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-center">
					<p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#5FB6FF]">
						Billing is not live yet
					</p>

					<p className="mt-3 text-sm leading-6 text-muted-foreground">
						Create a free account, test LocalProof, and join founder access
						before public pricing opens.
					</p>
				</div>
			</div>
		</section>
	);
}
