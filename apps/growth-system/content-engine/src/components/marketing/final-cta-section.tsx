import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function FinalCtaSection() {
	return (
		<section className="px-6 py-24">
			<div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-16 text-center shadow-[0_0_60px_rgba(91,116,255,0.12)] backdrop-blur md:px-12">
				<div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-[#5B74FF]/30 bg-[#5B74FF]/10 px-4 py-2 text-sm font-medium text-[#C7D2FE]">
					<Sparkles className="size-4" />
					Try it with one real job
				</div>

				<h2 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
					Your next job can become your next week of content.
				</h2>

				<p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
					Start with a completed job, review, FAQ, or service note. LocalProof
					turns it into content that helps customers understand what you do and
					why they can trust you.
				</p>

				<div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
					<Button
						size="lg"
						className="h-14 w-full rounded-2xl px-8 text-base font-semibold sm:w-auto"
						asChild
					>
						<Link href="/signup">
							Create Your First Pack
							<ArrowRight className="ml-2 size-4" />
						</Link>
					</Button>

					<Button
						size="lg"
						variant="outline"
						className="h-14 w-full rounded-2xl px-8 text-base font-semibold sm:w-auto"
						asChild
					>
						<Link href="/examples">View Example</Link>
					</Button>
				</div>

				<p className="mt-5 text-sm text-muted-foreground">
					No billing yet. Start free during early access.
				</p>
			</div>
		</section>
	);
}
