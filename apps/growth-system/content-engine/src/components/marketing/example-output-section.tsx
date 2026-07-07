import { CheckCircle2, ClipboardList, Sparkles } from 'lucide-react';

import { contentTypes } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ExampleOutputSection() {
	return (
		<section id="example" className="border-b px-6 py-24">
			<div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
				<div>
					<Badge variant="secondary" className="mb-5 rounded-full">
						Example content pack
					</Badge>

					<h2 className="text-4xl font-bold tracking-tight md:text-5xl">
						One real job becomes a full week of local content.
					</h2>

					<p className="mt-5 text-lg leading-8 text-muted-foreground">
						The user does not start with a blank prompt. They describe what
						happened on a real job. LocalProof turns that into platform-specific
						content that sounds local, useful, and believable.
					</p>

					<div className="mt-8 grid gap-3">
						{contentTypes.map(type => (
							<div key={type} className="flex items-center gap-3 text-sm">
								<CheckCircle2 className="size-4" />
								<span>{type}</span>
							</div>
						))}
					</div>
				</div>

				<Card className="overflow-hidden shadow-sm">
					<CardHeader className="border-b bg-muted/40">
						<CardTitle className="flex items-center gap-2">
							<ClipboardList className="size-5" />
							Input
						</CardTitle>
					</CardHeader>

					<CardContent className="space-y-5 p-5">
						<div className="rounded-xl border p-4">
							<p className="text-sm font-semibold">Business</p>
							<p className="mt-1 text-sm text-muted-foreground">
								Garage door repair company
							</p>
						</div>

						<div className="rounded-xl border p-4">
							<p className="text-sm font-semibold">Service area</p>
							<p className="mt-1 text-sm text-muted-foreground">
								Aptos, Santa Cruz, Capitola
							</p>
						</div>

						<div className="rounded-xl border p-4">
							<p className="text-sm font-semibold">Job note</p>
							<p className="mt-1 text-sm leading-6 text-muted-foreground">
								Got a call from a homeowner in Aptos — garage door stuck halfway
								open. Broken spring. Went out, replaced it, balanced the door,
								tested the opener. Had it working before dinner.
							</p>
						</div>

						<div className="rounded-xl border bg-foreground p-5 text-background">
							<div className="mb-3 flex items-center gap-2 text-sm font-semibold">
								<Sparkles className="size-4" />
								Generated Google Business Profile Post
							</div>

							<p className="text-sm leading-7 text-background/80">
								Got a call today from a homeowner in Aptos whose garage door was
								stuck halfway open. Broken spring. We went out, replaced it,
								balanced the door, and tested the opener. Had everything working
								before dinner. She said she didn&apos;t realize how long
								she&apos;d been leaving for work with it like that.
							</p>

							<p className="mt-4 text-sm leading-7 text-background/80">
								If your door isn&apos;t moving right, don&apos;t leave it.
								We&apos;re local to Aptos and Santa Cruz County — one call and
								we come to you.
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
