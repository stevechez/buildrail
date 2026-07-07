'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, CheckCircle2, ChevronLeft, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

const STORAGE_KEY = 'localproof-business-profile';

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

const emptyProfile: BusinessProfile = {
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

const steps = [
	{ number: 1, label: 'Your business' },
	{ number: 2, label: 'Voice & customers' },
	{ number: 3, label: 'Done' },
];

export function BusinessOnboardingForm() {
	const router = useRouter();
	const [step, setStep] = useState(1);
	const [profile, setProfile] = useState<BusinessProfile>(() => {
		try {
			const raw =
				typeof window !== 'undefined'
					? window.localStorage.getItem(STORAGE_KEY)
					: null;
			if (raw)
				return {
					...emptyProfile,
					...(JSON.parse(raw) as Partial<BusinessProfile>),
				};
		} catch {
			/* ignore */
		}
		return emptyProfile;
	});
	const [saving, setSaving] = useState(false);
	const [saved, setSaved] = useState(false);

	function update(field: keyof BusinessProfile, value: string) {
		setProfile(prev => ({ ...prev, [field]: value }));
	}

	function save() {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
		window.dispatchEvent(new Event('localproof-business-profile-updated'));
	}

	function handleNext() {
		save();
		setStep(prev => prev + 1);
	}

	function handleBack() {
		setStep(prev => prev - 1);
	}

	async function handleFinish() {
		setSaving(true);
		save();
		setSaved(true);
		await new Promise(r => setTimeout(r, 600));
		router.push('/generate');
	}

	const step1Ready = Boolean(
		profile.businessName.trim() &&
		profile.industry &&
		profile.serviceArea.trim(),
	);

	const step2Ready = Boolean(profile.mainServices.trim() && profile.brandTone);

	return (
		<div className="mx-auto max-w-2xl">
			{/* Progress indicator */}
			<div className="mb-10 flex items-center gap-0">
				{steps.map((s, i) => (
					<div
						key={s.number}
						className="flex items-center flex-1 last:flex-none"
					>
						<div className="flex flex-col items-center">
							<div
								className={`flex size-8 items-center justify-center rounded-full border-2 transition-colors ${
									step > s.number
										? 'border-[#5B74FF] bg-[#5B74FF] text-white'
										: step === s.number
											? 'border-[#5B74FF] bg-transparent text-[#5B74FF]'
											: 'border-white/20 bg-transparent text-muted-foreground'
								}`}
							>
								{step > s.number ? (
									<CheckCircle2 className="size-4" />
								) : (
									<span className="text-xs font-semibold">{s.number}</span>
								)}
							</div>
							<span
								className={`mt-1.5 text-xs font-medium ${step === s.number ? 'text-foreground' : 'text-muted-foreground'}`}
							>
								{s.label}
							</span>
						</div>
						{i < steps.length - 1 && (
							<div
								className={`mx-3 h-px flex-1 mb-5 transition-colors ${step > s.number ? 'bg-[#5B74FF]/40' : 'bg-white/10'}`}
							/>
						)}
					</div>
				))}
			</div>

			{/* Step 1 — Your business */}
			{step === 1 && (
				<div className="space-y-6">
					<div>
						<h2 className="text-2xl font-bold tracking-tight">
							Tell us about your business
						</h2>
						<p className="mt-2 text-sm text-muted-foreground">
							This shapes every content pack LocalProof generates for you.
						</p>
					</div>

					<div className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
						<div className="space-y-2">
							<Label htmlFor="businessName">Business name</Label>
							<Input
								id="businessName"
								placeholder="e.g. Coastline Garage Doors"
								value={profile.businessName}
								onChange={e => update('businessName', e.target.value)}
								autoFocus
							/>
						</div>

						<div className="space-y-2">
							<Label>Industry</Label>
							<Select
								value={profile.industry}
								onValueChange={v => update('industry', v)}
							>
								<SelectTrigger>
									<SelectValue placeholder="What kind of business?" />
								</SelectTrigger>
								<SelectContent>
									{industries.map(i => (
										<SelectItem key={i} value={i}>
											{i}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label htmlFor="serviceArea">Where do you work?</Label>
							<Input
								id="serviceArea"
								placeholder="e.g. Aptos, Santa Cruz, Capitola"
								value={profile.serviceArea}
								onChange={e => update('serviceArea', e.target.value)}
							/>
							<p className="text-xs text-muted-foreground">
								City or region — this makes every post feel local.
							</p>
						</div>

						<div className="space-y-2">
							<Label htmlFor="website">
								Website{' '}
								<span className="text-muted-foreground">(optional)</span>
							</Label>
							<Input
								id="website"
								placeholder="e.g. https://coastlinegarage.com"
								value={profile.website}
								onChange={e => update('website', e.target.value)}
							/>
						</div>
					</div>

					<Button
						size="lg"
						className="w-full"
						onClick={handleNext}
						disabled={!step1Ready}
					>
						Continue
						<ArrowRight className="ml-2 size-4" />
					</Button>

					{!step1Ready && (
						<p className="text-center text-xs text-muted-foreground">
							Fill in business name, industry, and location to continue
						</p>
					)}
				</div>
			)}

			{/* Step 2 — Voice & customers */}
			{step === 2 && (
				<div className="space-y-6">
					<div>
						<h2 className="text-2xl font-bold tracking-tight">
							How do you talk to customers?
						</h2>
						<p className="mt-2 text-sm text-muted-foreground">
							This shapes your brand voice across every post LocalProof writes.
						</p>
					</div>

					<div className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
						<div className="space-y-2">
							<Label htmlFor="mainServices">What services do you offer?</Label>
							<Textarea
								id="mainServices"
								placeholder="e.g. Broken spring replacement, opener repair, new door installation, emergency service, noisy door fix"
								className="min-h-24 resize-none"
								value={profile.mainServices}
								onChange={e => update('mainServices', e.target.value)}
								autoFocus
							/>
						</div>

						<div className="space-y-2">
							<Label>Brand tone</Label>
							<Select
								value={profile.brandTone}
								onValueChange={v => update('brandTone', v)}
							>
								<SelectTrigger>
									<SelectValue placeholder="How do you sound?" />
								</SelectTrigger>
								<SelectContent>
									{tones.map(t => (
										<SelectItem key={t} value={t}>
											{t}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label htmlFor="targetCustomer">
								Who is your ideal customer?{' '}
								<span className="text-muted-foreground">(optional)</span>
							</Label>
							<Textarea
								id="targetCustomer"
								placeholder="e.g. Homeowners in Santa Cruz County who need fast, trustworthy repair without feeling pressured"
								className="min-h-20 resize-none"
								value={profile.targetCustomer}
								onChange={e => update('targetCustomer', e.target.value)}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="preferredCta">
								How do you want customers to reach you?{' '}
								<span className="text-muted-foreground">(optional)</span>
							</Label>
							<Input
								id="preferredCta"
								placeholder="e.g. Call us today, Book online, Text us for a free quote"
								value={profile.preferredCta}
								onChange={e => update('preferredCta', e.target.value)}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="wordsToAvoid">
								Words to avoid{' '}
								<span className="text-muted-foreground">(optional)</span>
							</Label>
							<Input
								id="wordsToAvoid"
								placeholder="e.g. cheap, guru, viral, guaranteed, hustle"
								value={profile.wordsToAvoid}
								onChange={e => update('wordsToAvoid', e.target.value)}
							/>
						</div>
					</div>

					<div className="flex gap-3">
						<Button variant="outline" size="lg" onClick={handleBack}>
							<ChevronLeft className="mr-1.5 size-4" />
							Back
						</Button>
						<Button
							size="lg"
							className="flex-1"
							onClick={handleNext}
							disabled={!step2Ready}
						>
							Continue
							<ArrowRight className="ml-2 size-4" />
						</Button>
					</div>

					{!step2Ready && (
						<p className="text-center text-xs text-muted-foreground">
							Add your services and pick a tone to continue
						</p>
					)}
				</div>
			)}

			{/* Step 3 — Done */}
			{step === 3 && (
				<div className="space-y-6 text-center">
					<div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-[#5B74FF]/15">
						<CheckCircle2 className="size-8 text-[#5B74FF]" />
					</div>

					<div>
						<h2 className="text-2xl font-bold tracking-tight">
							{profile.businessName || 'Your business'} is set up.
						</h2>
						<p className="mt-2 text-sm text-muted-foreground">
							LocalProof now knows how to write in your voice, for your area,
							for your customers.
						</p>
					</div>

					{/* Profile summary */}
					<div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left space-y-3">
						<SummaryRow label="Business" value={profile.businessName} />
						<SummaryRow label="Industry" value={profile.industry} />
						<SummaryRow label="Area" value={profile.serviceArea} />
						<SummaryRow label="Tone" value={profile.brandTone} />
						{profile.preferredCta && (
							<SummaryRow label="CTA" value={profile.preferredCta} />
						)}
					</div>

					<div className="space-y-3">
						<Button
							size="lg"
							className="w-full"
							onClick={handleFinish}
							disabled={saving}
						>
							{saved ? (
								<>
									<CheckCircle2 className="mr-2 size-4" />
									Saved — taking you to Generate...
								</>
							) : saving ? (
								<>Saving...</>
							) : (
								<>
									<Sparkles className="mr-2 size-4" />
									Generate my first content pack
								</>
							)}
						</Button>

						<button
							onClick={handleBack}
							className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
						>
							← Go back and edit
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

function SummaryRow({ label, value }: { label: string; value: string }) {
	if (!value) return null;
	return (
		<div className="flex items-start gap-3">
			<span className="min-w-[72px] text-xs font-semibold uppercase tracking-widest text-muted-foreground pt-0.5">
				{label}
			</span>
			<span className="text-sm leading-6">{value}</span>
		</div>
	);
}
