import { ContentCalendarBoard } from '@/components/calendar/content-calendar-board';
import { SiteFooter } from '@/components/marketing/site-footer';
import { SiteHeader } from '@/components/marketing/site-header';
import { Badge } from '@/components/ui/badge';

export default function CalendarPage() {
	return (
		<main className="min-h-screen bg-background text-foreground">
			<SiteHeader />

			<section className="border-b border-white/10 bg-white/[0.02] px-6 py-16">
				<div className="mx-auto max-w-5xl text-center">
					<Badge variant="secondary" className="mb-5 rounded-full px-4 py-1.5">
						Weekly content board
					</Badge>

					<h1 className="text-5xl font-bold tracking-tight md:text-6xl">
						Turn saved packs into a posting plan.
					</h1>

					<p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
						Every saved content pack includes a 5-day plan. Use this board to
						see what to post, when to post it, and what angle each post should
						take.
					</p>
				</div>
			</section>

			<section className="px-6 py-12">
				<ContentCalendarBoard />
			</section>

			<SiteFooter />
		</main>
	);
}
