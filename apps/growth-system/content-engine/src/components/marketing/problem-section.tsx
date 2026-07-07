import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const pains = [
	{
		who: 'The contractor',
		quote: 'We do great work. Nobody knows about it.',
		detail:
			'Every finished job is proof that disappears. No time to write posts after a 10-hour day on the tools.',
	},
	{
		who: 'The plumber',
		quote: 'I tried posting but it sounds fake when I write it.',
		detail:
			"Generic AI content doesn't mention your town, your customer, or the actual problem you solved. It sounds like nobody.",
	},
	{
		who: 'The roofer',
		quote: 'I started posting, then just… stopped.',
		detail:
			'Consistency breaks under daily pressure. Calls, crews, invoices, estimates. Content always loses.',
	},
	{
		who: 'The HVAC tech',
		quote: "I know I should be doing this. I just don't know how.",
		detail:
			"Nobody teaches local trades how to turn a service call into a Google post. There's no system.",
	},
];

export function ProblemSection() {
	return (
		<section className="border-b border-white/10 px-6 py-24">
			<div className="mx-auto max-w-7xl">
				{/* — Section label — */}
				<p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
					Sound familiar?
				</p>

				{/* — Headline — */}
				<h2 className="mx-auto mt-4 max-w-3xl text-center text-4xl font-bold tracking-tight md:text-5xl">
					Local businesses do great work.{' '}
					<span className="text-muted-foreground">Nobody sees it.</span>
				</h2>

				<p className="mx-auto mt-5 max-w-2xl text-center text-lg leading-8 text-muted-foreground">
					The best content is already inside your business — inside every job
					completed, problem solved, and customer helped. It just never makes it
					online.
				</p>

				{/* — Pain cards — */}
				<div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{pains.map(({ who, quote, detail }) => (
						<div
							key={who}
							className="group rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition-colors hover:bg-white/[0.04] hover:border-white/20"
						>
							<p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#5FB6FF]/70">
								{who}
							</p>

							<blockquote className="mb-4 border-l-2 border-[#5B74FF]/40 pl-3 text-base font-semibold leading-snug text-foreground">
								{quote}
							</blockquote>

							<p className="text-sm leading-6 text-muted-foreground">
								{detail}
							</p>
						</div>
					))}
				</div>

				{/* — Pivot — */}
				<div className="mx-auto mt-16 max-w-3xl">
					<div className="relative rounded-3xl border border-[#5B74FF]/25 bg-[#5B74FF]/[0.07] px-8 py-10 text-center">
						{/* Subtle top glow line */}
						<div className="absolute inset-x-0 top-0 h-px rounded-full bg-gradient-to-r from-transparent via-[#5B74FF]/50 to-transparent" />

						<p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8FB9FF]/70">
							The fix
						</p>

						<h3 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
							You don&apos;t need a marketing strategy.
							<br />
							You need a system that starts with the job.
						</h3>

						<p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted-foreground">
							Type what happened on a job today. LocalProof turns it into a
							Google post, Facebook update, Instagram caption, video script, and
							more — specific to your business, your location, and your voice.
						</p>

						<div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
							<Button asChild size="lg" className="h-12 rounded-xl px-7">
								<Link href="/signup">
									Try it free — no card needed
									<ArrowRight className="ml-2 size-4" />
								</Link>
							</Button>
							<Button
								asChild
								size="lg"
								variant="outline"
								className="h-12 rounded-xl border-white/15 px-7"
							>
								<Link href="/examples">See real examples</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
