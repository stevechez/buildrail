import { SavedContentPacksList } from '@/components/generate/saved-content-packs-list';
import { SiteFooter } from '@/components/marketing/site-footer';
import { SiteHeader } from '@/components/marketing/site-header';

export default function PostsPage() {
	return (
		<main className="min-h-screen bg-background text-foreground">
			<SiteHeader />

			<section className="border-b border-white/10 bg-white/[0.02] px-6 py-10">
				<div className="mx-auto max-w-7xl">
					<h1 className="text-3xl font-bold tracking-tight md:text-4xl">
						My Library
					</h1>
					<p className="mt-2 text-base leading-7 text-muted-foreground">
						Every saved content pack — real jobs turned into local proof. Copy,
						remix, repurpose, or schedule from here.
					</p>
				</div>
			</section>

			<section className="px-6 py-10">
				<SavedContentPacksList />
			</section>

			<SiteFooter />
		</main>
	);
}
