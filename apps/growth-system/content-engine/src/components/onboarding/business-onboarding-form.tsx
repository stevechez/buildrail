'use client';

import { useState } from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

type BusinessProfile = {
	businessName: string;
	industry: string;
	serviceArea: string;
	mainServices: string;
	targetCustomer: string;
	brandTone: string;
	preferredCta: string;
	website: string;
	wordsToAvoid: string;
};

const initialProfile: BusinessProfile = {
	businessName: '',
	industry: '',
	serviceArea: '',
	mainServices: '',
	targetCustomer: '',
	brandTone: '',
	preferredCta: '',
	website: '',
	wordsToAvoid: '',
};

const industries = [
	'Garage Door Repair',
	'Bathroom Remodeling',
	'General Contractor',
	'Painting Contractor',
	'Roofing',
	'Plumbing',
	'Electrical',
	'HVAC',
	'Landscaping',
	'Real Estate',
	'Other Local Service Business',
];

const tones = [
	'Professional and trustworthy',
	'Friendly and local',
	'Premium and polished',
	'Clear and educational',
	'Direct and no-nonsense',
	'Warm and personal',
];

export function BusinessOnboardingForm() {
	const router = useRouter();
	const [profile, setProfile] = useState<BusinessProfile>(initialProfile);
	const [saved, setSaved] = useState(false);

	function updateField(field: keyof BusinessProfile, value: string) {
		setProfile(current => ({
			...current,
			[field]: value,
		}));

		setSaved(false);
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		window.localStorage.setItem(
			'localproof-business-profile',
			JSON.stringify(profile),
		);

		setSaved(true);

		window.setTimeout(() => {
			router.push('/generate');
		}, 500);
	}

	return (
		<div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.8fr]">
			<Card className="shadow-sm">
				<CardHeader>
					<CardTitle>Business Profile</CardTitle>
					<p className="text-sm leading-6 text-muted-foreground">
						Fill this out like you are briefing a content strategist. The better
						the profile, the better the future AI output.
					</p>
				</CardHeader>

				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="grid gap-5 md:grid-cols-2">
							<div className="space-y-2">
								<Label htmlFor="businessName">Business name</Label>
								<Input
									id="businessName"
									placeholder="Example: Coastline Garage Doors"
									value={profile.businessName}
									onChange={event =>
										updateField('businessName', event.target.value)
									}
								/>
							</div>

							<div className="space-y-2">
								<Label>Industry</Label>
								<Select
									value={profile.industry}
									onValueChange={value => updateField('industry', value)}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select an industry" />
									</SelectTrigger>

									<SelectContent>
										{industries.map(industry => (
											<SelectItem key={industry} value={industry}>
												{industry}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>

						<div className="grid gap-5 md:grid-cols-2">
							<div className="space-y-2">
								<Label htmlFor="serviceArea">Service area</Label>
								<Input
									id="serviceArea"
									placeholder="Example: Aptos, Santa Cruz, Capitola"
									value={profile.serviceArea}
									onChange={event =>
										updateField('serviceArea', event.target.value)
									}
								/>
							</div>

							<div className="space-y-2">
								<Label>Brand tone</Label>
								<Select
									value={profile.brandTone}
									onValueChange={value => updateField('brandTone', value)}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select a tone" />
									</SelectTrigger>

									<SelectContent>
										{tones.map(tone => (
											<SelectItem key={tone} value={tone}>
												{tone}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="mainServices">Main services</Label>
							<Textarea
								id="mainServices"
								placeholder="Example: Broken spring replacement, opener repair, garage door installation, noisy door repair, emergency service..."
								className="min-h-28"
								value={profile.mainServices}
								onChange={event =>
									updateField('mainServices', event.target.value)
								}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="targetCustomer">Target customer</Label>
							<Textarea
								id="targetCustomer"
								placeholder="Example: Homeowners in Santa Cruz County who need fast, trustworthy repair without feeling pressured or oversold."
								className="min-h-24"
								value={profile.targetCustomer}
								onChange={event =>
									updateField('targetCustomer', event.target.value)
								}
							/>
						</div>

						<div className="grid gap-5 md:grid-cols-2">
							<div className="space-y-2">
								<Label htmlFor="preferredCta">Preferred call to action</Label>
								<Input
									id="preferredCta"
									placeholder="Example: Call today for local service"
									value={profile.preferredCta}
									onChange={event =>
										updateField('preferredCta', event.target.value)
									}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="website">Website</Label>
								<Input
									id="website"
									placeholder="Example: https://example.com"
									value={profile.website}
									onChange={event => updateField('website', event.target.value)}
								/>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="wordsToAvoid">Words or phrases to avoid</Label>
							<Textarea
								id="wordsToAvoid"
								placeholder="Example: cheap, guru, viral, hustle, unbeatable, guaranteed..."
								className="min-h-20"
								value={profile.wordsToAvoid}
								onChange={event =>
									updateField('wordsToAvoid', event.target.value)
								}
							/>
						</div>

						<div className="flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
							<Button type="submit" size="lg">
								<Sparkles className="mr-2 size-4" />
								Save Business Profile
							</Button>

							{saved ? (
								<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
									<div className="flex items-center gap-2 text-sm font-medium">
										<CheckCircle2 className="size-4" />
										Profile saved locally. Sending you to the generator...
									</div>

									<Button variant="outline" asChild>
										<Link href="/generate">Go to Generator</Link>
									</Button>
								</div>
							) : null}
						</div>
					</form>
				</CardContent>
			</Card>

			<BusinessProfilePreview profile={profile} />
		</div>
	);
}

function BusinessProfilePreview({ profile }: { profile: BusinessProfile }) {
	const hasProfile =
		profile.businessName ||
		profile.industry ||
		profile.serviceArea ||
		profile.mainServices ||
		profile.targetCustomer ||
		profile.brandTone ||
		profile.preferredCta;

	return (
		<div className="lg:sticky lg:top-28 lg:self-start">
			<Card className="overflow-hidden shadow-sm">
				<CardHeader className="border-b bg-foreground text-background">
					<div className="flex items-center justify-between gap-4">
						<CardTitle>Business Profile Preview</CardTitle>
						<Badge variant="secondary">Draft</Badge>
					</div>

					<p className="text-sm leading-6 text-background/70">
						This is the business context LocalProof will use when generating
						your content.
					</p>
				</CardHeader>

				<CardContent className="space-y-5 p-7">
					{!hasProfile ? (
						<div className="rounded-2xl border bg-muted/30 p-5">
							<p className="text-sm leading-7 text-muted-foreground">
								Start filling out your business profile. The preview will update
								as you go.
							</p>
						</div>
					) : (
						<>
							<PreviewItem
								label="Business"
								value={profile.businessName || 'Not set yet'}
							/>

							<PreviewItem
								label="Industry"
								value={profile.industry || 'Not set yet'}
							/>

							<PreviewItem
								label="Service area"
								value={profile.serviceArea || 'Not set yet'}
							/>

							<Separator />

							<PreviewItem
								label="Services"
								value={profile.mainServices || 'Not set yet'}
							/>

							<PreviewItem
								label="Target customer"
								value={profile.targetCustomer || 'Not set yet'}
							/>

							<Separator />

							<PreviewItem
								label="Tone"
								value={profile.brandTone || 'Not set yet'}
							/>

							<PreviewItem
								label="CTA"
								value={profile.preferredCta || 'Not set yet'}
							/>

							<PreviewItem
								label="Avoid"
								value={profile.wordsToAvoid || 'No restrictions yet'}
							/>
						</>
					)}
				</CardContent>
			</Card>
		</div>
	);
}

function PreviewItem({ label, value }: { label: string; value: string }) {
	return (
		<div>
			<p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
				{label}
			</p>
			<p className="text-sm leading-7">{value}</p>
		</div>
	);
}
