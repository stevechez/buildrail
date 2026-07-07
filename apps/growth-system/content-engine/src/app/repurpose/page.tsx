import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { RepurposePackTool } from '@/components/repurpose/repurpose-pack-tool';
import { SiteHeader } from '@/components/marketing/site-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function RepurposePage() {
	return (
		<div className="min-h-screen">
			<SiteHeader />

			<main className="px-4 py-10 sm:px-6 lg:px-8">
				<section className="mx-auto mb-10 max-w-7xl">
					<div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-sm backdrop-blur md:p-8">
						<div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
							<div>
								<Badge variant="secondary" className="mb-4">
									Repurpose Content
								</Badge>

								<h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-5xl">
									Get more from every job you&apos;ve already documented.
								</h1>

								<p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
									Choose an existing saved pack, pick a new angle, and create a
									scored repurposed pack without inventing a new customer story.
								</p>
							</div>

							<div className="flex flex-wrap gap-3">
								<Button asChild>
									<Link href="/posts">
										My Library
										<ArrowRight className="ml-2 size-4" />
									</Link>
								</Button>
							</div>
						</div>

						<div className="mt-6 grid gap-3 md:grid-cols-3">
							<div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
								<p className="text-sm font-semibold">1. Select a saved pack</p>
								<p className="mt-2 text-sm leading-6 text-muted-foreground">
									Start from real work you already captured.
								</p>
							</div>

							<div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
								<p className="text-sm font-semibold">2. Choose a new angle</p>
								<p className="mt-2 text-sm leading-6 text-muted-foreground">
									Facebook, Google, carousel, video, email, or tip content.
								</p>
							</div>

							<div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
								<p className="text-sm font-semibold">3. Save and schedule</p>
								<p className="mt-2 text-sm leading-6 text-muted-foreground">
									Send the repurposed pack into your publishing workflow.
								</p>
							</div>
						</div>
					</div>
				</section>

				<RepurposePackTool />
			</main>
		</div>
	);
}
