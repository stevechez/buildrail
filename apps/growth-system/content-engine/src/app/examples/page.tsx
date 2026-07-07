import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

import { ExamplePackCard } from '@/components/marketing/example-pack-card';
import { SiteFooter } from '@/components/marketing/site-footer';
import { SiteHeader } from '@/components/marketing/site-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { examplePacks } from '@/lib/example-packs';

export default function ExamplesPage() {
	return (
		<main className="min-h-screen bg-background text-foreground">
			<SiteHeader />

			<section className="border-b bg-muted/30 px-6 py-20">
				<div className="mx-auto max-w-5xl text-center">
					<Badge variant="secondary" className="mb-5 rounded-full px-4 py-1.5">
						Real work becomes real content
					</Badge>

					<h1 className="text-5xl font-bold tracking-tight md:text-7xl">
						See what one job can become.
					</h1>

					<p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl">
						LocalProof turns everyday business activity into complete content
						packs: Google posts, Facebook posts, Instagram captions, Reel
						scripts, FAQs, headlines, and more.
					</p>

					<div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
						<Button size="lg" className="h-12 px-6" asChild>
							<Link href="/signup">
								Generate My First Pack
								<Sparkles className="ml-2 size-4" />
							</Link>
						</Button>

						<Button size="lg" variant="outline" className="h-12 px-6" asChild>
							<Link href="/generate">
								Try with your own job
								<ArrowRight className="ml-2 size-4" />
							</Link>
						</Button>
					</div>
				</div>
			</section>

			<section className="px-6 py-16">
				<div className="mx-auto grid max-w-7xl gap-8">
					{examplePacks.map(pack => (
						<ExamplePackCard
							key={`${pack.industry}-${pack.jobType}`}
							pack={pack}
						/>
					))}
				</div>
			</section>

			<section className="border-t bg-foreground px-6 py-20 text-background">
				<div className="mx-auto max-w-5xl text-center">
					<h2 className="text-4xl font-bold tracking-tight md:text-5xl">
						This is the standard: specific, local, useful, believable.
					</h2>

					<p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-background/70">
						No vague “contact us today” filler. Every content pack should sound
						like it came from a real business doing real work in a real
						community.
					</p>

					<Button size="lg" variant="secondary" className="mt-8 h-12 px-6">
						Build My Content System
						<ArrowRight className="ml-2 size-4" />
					</Button>
				</div>
			</section>

			<SiteFooter />
		</main>
	);
}
