import Link from 'next/link';
import { ArrowRight, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const rows = [
	{
		topic: 'Starting point',
		chatgpt: 'Blank prompt every time',
		localproof: 'Describe a real job — done',
	},
	{
		topic: 'Knows your business',
		chatgpt: 'You re-explain it every session',
		localproof: 'Remembers your name, area, services, voice',
	},
	{
		topic: 'Output',
		chatgpt: 'One block of generic text',
		localproof: '10 platform-specific assets from one note',
	},
	{
		topic: 'Local SEO',
		chatgpt: 'No idea where you work',
		localproof: 'Every post names your city and neighborhood',
	},
	{
		topic: 'Brand voice',
		chatgpt: 'Sounds like AI every time',
		localproof: 'Matches your tone, CTA, and words to avoid',
	},
	{
		topic: 'Consistency',
		chatgpt: 'Only if you remember to open it',
		localproof: '5-day posting plan built into every pack',
	},
	{
		topic: 'Content library',
		chatgpt: 'Lost in chat history',
		localproof: 'Saved, searchable, repurposable',
	},
];

export function DifferentiationSection() {
	return (
		<section className="border-b border-white/10 px-6 py-24">
			<div className="mx-auto max-w-7xl">
				{/* Headline */}
				<div className="mx-auto max-w-3xl text-center">
					<p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
						Why not just use ChatGPT?
					</p>
					<h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
						ChatGPT gives you content.
						<br />
						<span className="ember-gradient-text">
							LocalProof gives you a system.
						</span>
					</h2>
					<p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
						You can paste a job note into ChatGPT. But you&apos;ll do it
						differently every time, get different results, and lose everything
						when the chat closes. LocalProof is built around how local
						businesses actually work.
					</p>
				</div>

				{/* Comparison table */}
				<div className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-2xl border border-white/10">
					{/* Column headers */}
					<div className="grid grid-cols-[1fr_1fr_1fr] border-b border-white/10">
						<div className="px-5 py-4">
							<p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
								What you need
							</p>
						</div>
						<div className="border-x border-white/10 bg-white/[0.02] px-5 py-4">
							<p className="text-sm font-semibold text-muted-foreground">
								ChatGPT
							</p>
						</div>
						<div className="bg-[#5B74FF]/[0.08] px-5 py-4">
							<p className="text-sm font-semibold text-[#8FB9FF]">LocalProof</p>
						</div>
					</div>

					{/* Rows */}
					{rows.map(({ topic, chatgpt, localproof }, i) => (
						<div
							key={topic}
							className={`grid grid-cols-[1fr_1fr_1fr] border-b border-white/10 last:border-0 ${
								i % 2 === 0 ? '' : 'bg-white/[0.015]'
							}`}
						>
							<div className="px-5 py-4">
								<p className="text-sm font-medium">{topic}</p>
							</div>
							<div className="border-x border-white/10 px-5 py-4">
								<div className="flex items-start gap-2">
									<X className="mt-0.5 size-3.5 shrink-0 text-muted-foreground/50" />
									<p className="text-sm leading-5 text-muted-foreground">
										{chatgpt}
									</p>
								</div>
							</div>
							<div className="bg-[#5B74FF]/[0.04] px-5 py-4">
								<div className="flex items-start gap-2">
									<Check className="mt-0.5 size-3.5 shrink-0 text-[#5FB6FF]" />
									<p className="text-sm leading-5 text-foreground/90">
										{localproof}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Bottom callout */}
				<div className="mx-auto mt-10 max-w-xl text-center">
					<p className="text-sm leading-7 text-muted-foreground">
						ChatGPT is a tool. LocalProof is a habit.
						<br />
						One job note, every week, consistently — that&apos;s what builds
						local trust.
					</p>
					<Button asChild className="mt-6 h-12 rounded-xl px-7">
						<Link href="/signup">
							Start building your system
							<ArrowRight className="ml-2 size-4" />
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
