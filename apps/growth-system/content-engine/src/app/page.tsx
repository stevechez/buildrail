import { DifferentiationSection } from '../components/marketing/differentiation-section';
import { ExampleOutputSection } from '../components/marketing/example-output-section';
import { FinalCtaSection } from '../components/marketing/final-cta-section';
import { HeroSection } from '../components/marketing/hero-section';
import { HowItWorksSection } from '../components/marketing/how-it-works-section';
import { PricingPreview } from '../components/marketing/pricing-preview';
import { ProblemSection } from '../components/marketing/problem-section';
import { SiteFooter } from '../components/marketing/site-footer';
import { SiteHeader } from '../components/marketing/site-header';

export default function HomePage() {
	return (
		<main className="min-h-screen bg-background text-foreground">
			<SiteHeader />
			<HeroSection />
			<ProblemSection />
			<DifferentiationSection />
			<ExampleOutputSection />
			<HowItWorksSection />
			<PricingPreview />
			<FinalCtaSection />
			<SiteFooter />
		</main>
	);
}
