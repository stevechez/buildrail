import { PublishingQueue } from '@/components/queue/publishing-queue';
import { SiteHeader } from '@/components/marketing/site-header';

export default function QueuePage() {
	return (
		<main className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
			<SiteHeader />
			<PublishingQueue />
		</main>
	);
}
