import Link from 'next/link';
import { headers } from 'next/headers';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getHubLoginUrl } from '@/lib/hub';

const FEATURES = [
	{
		title: 'AI Message Routing',
		body: 'Crews text the way they already do. BuildRail instantly scans for material shortages, project delays, and change requests—flagging them on your dashboard automatically.',
	},
	{
		title: 'Two-Click Change Orders',
		body: 'Turn a flagged field text into a structured change order instantly. Clients approve via a simple SMS link, and your dashboard updates in real time.',
	},
	{
		title: 'Zero-App Client Portal',
		body: 'No app downloads, no password resets. Clients access project tracking, daily photo logs, and pending sign-offs through a single, secure texted link.',
	},
];

export default async function Home() {
	const headersList = await headers();
	const proto = headersList.get('x-forwarded-proto') ?? 'http';
	const host = headersList.get('host') ?? 'localhost:3001';
	const getStartedUrl = getHubLoginUrl(`${proto}://${host}/dashboard`);

	return (
		<div className="min-h-screen gradient-hero">
			<div className="page-container flex min-h-screen flex-col items-center justify-center py-24 text-center">
				<span className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-[var(--seafoam)]/28 bg-[var(--seafoam)]/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-seafoam">
					Part of the BuildRail ecosystem
				</span>
				<h1 className="font-[Space_Grotesk] text-4xl font-semibold tracking-tight text-white sm:text-5xl">
					Field texts, structured on autopilot.
				</h1>
				<p className="mt-5 max-w-xl text-base text-[var(--white-dim)]">
					Keep your crews on standard SMS. BuildRail automatically transforms
					messy daily texts into flagged dashboard alerts, instant change
					orders, and an elegant, client-facing portal.
				</p>
				<div className="mt-8 flex gap-3">
					<Button asChild size="lg">
						<Link href={getStartedUrl}>Get Started Free</Link>
					</Button>
				</div>

				<div className="mt-20 grid gap-5 sm:grid-cols-3">
					{FEATURES.map(f => (
						<Card key={f.title} className="text-left">
							<CardContent className="pt-6">
								<h3 className="mb-2 text-sm font-semibold text-white">
									{f.title}
								</h3>
								<p className="text-sm text-muted">{f.body}</p>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
