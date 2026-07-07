'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, CheckCircle2, Copy, Check, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const JOB_NOTE =
	'Got a call this morning from a homeowner in Aptos — garage door stuck halfway open. Broken spring. Went out, replaced it, balanced the door, tested the opener. Had it working before lunch. Customer was relieved, said she had been leaving for work with it open all week.';

const OUTPUTS = [
	{
		platform: 'Google Business',
		color: '#4285F4',
		body: `Got a call from a homeowner in Aptos whose garage door was stuck halfway open. Broken spring. She'd been leaving for work with it open all week — not great for security. We went out, replaced the spring, balanced the door, tested the opener, and had everything working before lunch. If your door isn't moving right, don't leave it. We're local and we come to you. — Coastline Garage Doors`,
	},
	{
		platform: 'Facebook',
		color: '#1877F2',
		body: `Had a job in Aptos this morning. Homeowner's garage door was stuck halfway open — broken spring. She didn't realize how much of a security risk that was. Went out, got it fixed same day, door's been working fine since. That's the job. If yours is acting up, give us a call.`,
	},
	{
		platform: 'Instagram',
		color: '#E1306C',
		body: `Broken spring → stuck door → fixed before lunch. Aptos, CA 🔧 She'd been leaving for work with it wide open all week. One call, one visit, done. We're local — we come to you. #GarageDoorRepair #Aptos #SantaCruzCounty #SameDay`,
	},
	{
		platform: 'Short video script',
		color: '#FF0050',
		body: 'HOOK: "This door was stuck open — and she was leaving for work every morning like this." SCENE: Show door halfway stuck. VOICEOVER: "Broken spring. Aptos. She called us this morning." SCENE: Show the repair, close-up of new spring. RESULT: "Working before lunch." CTA: "We\'re local. One call."',
	},
];

export function HeroSection() {
	const [activeOutput, setActiveOutput] = useState(0);
	const [copied, setCopied] = useState(false);

	function handleCopy() {
		navigator.clipboard.writeText(OUTPUTS[activeOutput].body).catch(() => {});
		setCopied(true);
		setTimeout(() => setCopied(false), 1800);
	}

	return (
		<section className="relative overflow-hidden border-b border-white/10 ember-grid">
			{/* Ambient glows */}
			<div className="pointer-events-none absolute inset-0 -z-10">
				<div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-[#5B74FF]/20 blur-[120px]" />
				<div className="absolute -bottom-20 right-1/4 h-80 w-80 rounded-full bg-[#5FB6FF]/12 blur-[100px]" />
			</div>

			<div className="mx-auto max-w-7xl px-6 pt-24 pb-20 lg:pt-32 lg:pb-28">
				{/* — Top badge — */}
				<div className="flex justify-center">
					<Badge
						variant="secondary"
						className="mb-10 gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-medium tracking-wide backdrop-blur"
					>
						<span className="size-1.5 rounded-full bg-[#5FB6FF] inline-block" />
						AI content engine for local service businesses
					</Badge>
				</div>

				{/* — Headline — */}
				<h1 className="mx-auto max-w-4xl text-center text-5xl font-bold tracking-tight leading-[1.08] md:text-7xl">
					One job note. <br className="hidden sm:block" />
					<span className="ember-gradient-text">A week of content.</span>
				</h1>

				<p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-muted-foreground md:text-xl">
					Describe what you fixed today. LocalProof writes your Google post,
					Facebook update, Instagram caption, video script, and more — in your
					voice, for your area, ready to copy.
				</p>

				{/* — CTA row — */}
				<div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
					<Button
						asChild
						size="lg"
						className="h-13 w-full rounded-xl px-8 text-base font-semibold sm:w-auto"
					>
						<Link href="/examples">
							See real examples
							<ArrowRight className="ml-2 size-4" />
						</Link>
					</Button>
					<Button
						asChild
						size="lg"
						variant="outline"
						className="h-13 w-full rounded-xl border-white/15 px-8 text-base sm:w-auto"
					>
						<Link href="/signup">Create free pack</Link>
					</Button>
				</div>

				{/* — Trust line — */}
				<div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
					{[
						'No blank page',
						'No agency voice',
						'Specific to your job + location',
					].map(t => (
						<span
							key={t}
							className="flex items-center gap-1.5 text-sm text-muted-foreground"
						>
							<CheckCircle2 className="size-3.5 text-[#5FB6FF]" />
							{t}
						</span>
					))}
				</div>

				{/* — Live demo — */}
				<div className="mt-20 grid gap-6 lg:grid-cols-[1fr_1.15fr] lg:items-start">
					{/* Left: job note input */}
					<div className="flex flex-col gap-4">
						<div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur">
							<div className="mb-3 flex items-center gap-2">
								<div className="flex size-6 items-center justify-center rounded-lg bg-[#5B74FF]/20">
									<Sparkles className="size-3.5 text-[#8FB9FF]" />
								</div>
								<span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
									Job note
								</span>
							</div>

							<p className="text-sm leading-7 text-foreground/90">{JOB_NOTE}</p>

							<div className="mt-4 flex flex-wrap gap-2">
								{[
									'Garage Doors',
									'Aptos, CA',
									'Same-day',
									'Security issue',
								].map(tag => (
									<span
										key={tag}
										className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-muted-foreground"
									>
										{tag}
									</span>
								))}
							</div>
						</div>

						{/* Arrow + label */}
						<div className="flex items-center gap-3 px-1">
							<div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
							<div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5">
								<Sparkles className="size-3.5 text-[#5FB6FF]" />
								<span className="text-xs font-medium text-[#8FB9FF]">
									LocalProof generates
								</span>
							</div>
							<div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
						</div>

						{/* What you get */}
						<div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur">
							<p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
								From one job note you get
							</p>
							<div className="grid grid-cols-2 gap-y-2.5">
								{[
									'Google Business post',
									'Facebook post',
									'Instagram caption',
									'Short video script',
									'LinkedIn update',
									'Email blurb',
									'FAQ answer',
									'5-day posting plan',
									'Headline options',
									'Local hashtags',
								].map(item => (
									<div
										key={item}
										className="flex items-center gap-2 text-sm text-muted-foreground"
									>
										<CheckCircle2 className="size-3.5 shrink-0 text-[#5FB6FF]" />
										{item}
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Right: live output switcher */}
					<div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur overflow-hidden">
						{/* Platform tabs */}
						<div className="flex overflow-x-auto border-b border-white/10 scrollbar-none">
							{OUTPUTS.map((output, i) => (
								<button
									key={output.platform}
									onClick={() => setActiveOutput(i)}
									className={`shrink-0 px-4 py-3.5 text-xs font-medium transition-colors ${
										activeOutput === i
											? 'border-b-2 border-[#5B74FF] bg-white/[0.04] text-foreground'
											: 'text-muted-foreground hover:text-foreground'
									}`}
									style={
										activeOutput === i
											? { borderBottomColor: output.color }
											: {}
									}
								>
									{output.platform}
								</button>
							))}
						</div>

						{/* Output body */}
						<div className="p-6">
							<div className="mb-4 flex items-center justify-between">
								<div className="flex items-center gap-2">
									<div
										className="size-2 rounded-full"
										style={{ background: OUTPUTS[activeOutput].color }}
									/>
									<span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
										{OUTPUTS[activeOutput].platform}
									</span>
								</div>
								<button
									onClick={handleCopy}
									className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-white/[0.08] hover:text-foreground"
								>
									{copied ? (
										<>
											<Check className="size-3 text-[#5FB6FF]" />
											Copied
										</>
									) : (
										<>
											<Copy className="size-3" />
											Copy
										</>
									)}
								</button>
							</div>

							<p className="min-h-[140px] text-sm leading-7 text-foreground/90">
								{OUTPUTS[activeOutput].body}
							</p>

							<div className="mt-5 flex items-center justify-between border-t border-white/8 pt-4">
								<span className="text-xs text-muted-foreground">
									Ready to post · No editing needed
								</span>
								<Badge
									variant="secondary"
									className="rounded-full border border-white/10 bg-white/[0.05] text-xs"
								>
									{activeOutput + 1} of {OUTPUTS.length}
								</Badge>
							</div>
						</div>

						{/* Bottom CTA */}
						<div className="border-t border-white/10 bg-white/[0.02] px-6 py-4">
							<div className="flex items-center justify-between gap-4">
								<p className="text-sm text-muted-foreground">
									<span className="font-semibold text-foreground">
										10 pieces of content
									</span>{' '}
									from one job note.
								</p>
								<Button asChild size="sm" className="shrink-0 rounded-lg">
									<Link href="/signup">
										Try it free
										<ArrowRight className="ml-1.5 size-3.5" />
									</Link>
								</Button>
							</div>
						</div>
					</div>
				</div>

				{/* — What you get bar — */}
				<div className="mt-16 flex flex-wrap items-center justify-center gap-3">
					{[
						'Google Business Post',
						'Facebook Post',
						'Instagram Caption',
						'Video Script',
						'5-Day Posting Plan',
						'Local Hashtags',
					].map(item => (
						<span
							key={item}
							className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-muted-foreground"
						>
							<CheckCircle2 className="size-3 text-[#5FB6FF]" />
							{item}
						</span>
					))}
				</div>
			</div>
		</section>
	);
}
