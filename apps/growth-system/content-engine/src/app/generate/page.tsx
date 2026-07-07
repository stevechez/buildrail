import { JobContentGenerator } from '@/components/generate/job-content-generator';
import { SiteFooter } from '@/components/marketing/site-footer';
import { SiteHeader } from '@/components/marketing/site-header';

export default function GeneratePage() {
	return (
		<main className="min-h-screen bg-background text-foreground">
			<SiteHeader />

			<section className="border-b border-white/10 bg-white/[0.02] px-6 py-10">
				<div className="mx-auto max-w-7xl">
					<h1 className="text-3xl font-bold tracking-tight md:text-4xl">
						What job did you complete today?
					</h1>
					<p className="mt-2 text-base leading-7 text-muted-foreground">
						Describe the real work. LocalProof writes your Google post, Facebook
						update, Instagram caption, video script, and more.
					</p>
				</div>
			</section>

			<section className="px-6 py-10">
				<JobContentGenerator />
			</section>

			<SiteFooter />
		</main>
	);
}
