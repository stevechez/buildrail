import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import PainPoints from '../components/PainPoints';
import SolutionReveal from '../components/SolutionReveal';
import FeaturesToBenefits from '../components/FeaturesToBenefits';
import SocialProof from '../components/SocialProof';
import Pricing from '../components/Pricing';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

export default function Home() {
	return (
		<main className="min-h-screen">
			<Navbar />
			<Hero />
			<PainPoints />
			<SolutionReveal />
			<FeaturesToBenefits />
			<SocialProof />
			<Pricing />
			<CTASection />
			<Footer />
		</main>
	);
}
