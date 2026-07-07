import { BusinessOnboardingForm } from '@/components/onboarding/business-onboarding-form';
import { SiteFooter } from '@/components/marketing/site-footer';
import { SiteHeader } from '@/components/marketing/site-header';

export default function OnboardingPage() {
	return (
		<main className="min-h-screen bg-background text-foreground">
			<SiteHeader />
			<section className="px-6 py-16">
				<BusinessOnboardingForm />
			</section>
			<SiteFooter />
		</main>
	);
}
