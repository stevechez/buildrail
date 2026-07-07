import { DashboardOverview } from '@/components/dashboard/dashboard-overview';
import { SiteFooter } from '@/components/marketing/site-footer';
import { SiteHeader } from '@/components/marketing/site-header';
import { Badge } from '@/components/ui/badge';

export default function DashboardPage() {
	return (
		<main className="min-h-screen bg-background text-foreground">
			<SiteHeader />

			<section className="border-b border-white/10 bg-white/[0.02] px-6 py-16">
				<div className="mx-auto max-w-5xl text-center">
					<Badge variant="secondary" className="mb-5 rounded-full px-4 py-1.5">
						LocalProof command center
					</Badge>

					<h1 className="text-5xl font-bold tracking-tight md:text-6xl">
						Your local content system.
					</h1>

					<p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
						Manage your business profile, generate content packs, review saved
						posts, and plan your week from one simple dashboard.
					</p>
				</div>
			</section>

			<section className="px-6 py-12">
				<DashboardOverview />
			</section>

			<SiteFooter />
		</main>
	);
}
