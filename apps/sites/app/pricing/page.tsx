import Link from "next/link";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | BuildRail Sites — $2,499 One-Time. Zero Subscriptions.",
  description: "Stop paying monthly retainers. Get a premium contractor website you actually own, delivered in 48 hours for a one-time $2,499 investment.",
};

const features = [
  "Premium, Custom-Tailored Design",
  "Mobile-First & Fully Responsive",
  "On-Page SEO Optimization",
  "High-Converting Lead Capture Form",
  "Fast 48-Hour Delivery",
  "5-Page Website (Home, About, Services, Gallery, Quote)",
  "Google Business Profile Integration",
  "Click-to-Call & Click-to-Text on Every Page",
  "1 Year of Hosting Included",
  "30-Day Post-Launch Support",
  "You Own the Site Outright — No Lock-In",
  "One Round of Revisions Included",
];

const faqs = [
  { q: "Do I own the website after it's built?", a: "Yes. 100%. The domain, the hosting account, and the code are all yours. We build it, you own it. No recurring fees to us." },
  { q: "What if I need changes after the site is live?", a: "You get one round of revisions included in the 48-hour window. After launch, we offer a support retainer for ongoing updates, or you can make changes yourself." },
  { q: "What if you don't finish in 48 hours?", a: "You don't pay. It's that simple. We guarantee 48-hour delivery or your money back." },
  { q: "Do I need to have a domain name already?", a: "We recommend it, but we can help you get one during onboarding. We handle the connection and DNS setup — you don't need to know how any of that works." },
  { q: "What photos do I need to send?", a: "10–20 photos of your best completed work. If you don't have photos, we can work with what you have and use tasteful stock imagery as fill." },
  { q: "How is this different from a website builder like Wix or Squarespace?", a: "Those tools give you a blank template and you figure it out. We give you a custom-built, conversion-optimized site done for you — with SEO set up correctly from day one. Most DIY sites are never properly optimized and never rank." },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-void">
      <NavBar />

      <section className="pt-32 pb-16 text-center border-b border-rim">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <h1 className="text-5xl sm:text-6xl font-black text-chalk mb-4 leading-tight">
            Simple, Transparent Pricing.
          </h1>
          <p className="text-mist text-lg leading-relaxed max-w-xl mx-auto">
            Stop paying endless monthly retainers. Get a high-converting digital asset that you actually own, delivered in days.
          </p>
        </div>
      </section>

      <section className="py-16 border-b border-rim">
        <div className="max-w-2xl mx-auto px-5 sm:px-8">
          <div className="bg-gradient-to-b from-card to-panel border border-wire rounded-3xl overflow-hidden">
            <div className="px-8 py-8 border-b border-rim text-center">
              <div className="inline-flex items-center bg-blue-600 bg-opacity-20 border border-blue-500 border-opacity-30 rounded-full px-4 py-1.5 mb-6">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">The Pro Package</span>
              </div>
              <div className="flex items-start justify-center gap-1 mb-2">
                <span className="text-3xl font-bold text-fog mt-4">$</span>
                <span className="text-9xl font-black text-chalk leading-none">2,499</span>
              </div>
              <p className="text-mist">
                One-time payment. <strong className="text-chalk">Zero subscriptions.</strong>
              </p>
            </div>
            <div className="px-8 py-7">
              <ul className="space-y-3 mb-8">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span className="text-silver">{f}</span>
                  </li>
                ))}
              </ul>
              <Link href="/start" className="block w-full text-center bg-orange hover:bg-oranglit text-void font-black py-4 rounded-xl text-base">
                Start My Website →
              </Link>
              <div className="flex flex-wrap justify-center gap-5 mt-4">
                {["48-hr delivery guarantee", "You own the site", "No monthly fees"].map((t) => (
                  <span key={t} className="text-xs text-fog flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-jade" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                    </svg>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-b border-rim bg-carbon">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <h2 className="text-3xl font-black text-chalk text-center mb-10">Questions we get asked.</h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <div key={f.q} className="bg-card border border-rim rounded-xl p-6">
                <p className="font-bold text-chalk mb-2">{f.q}</p>
                <p className="text-sm text-fog leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="text-4xl font-black text-chalk mb-4">Stop competing on price. Start winning on presence.</h2>
          <p className="text-mist mb-8">$2,499 one-time. Live in 48 hours. Yours forever.</p>
          <Link href="/start" className="inline-flex items-center gap-2 bg-orange hover:bg-oranglit text-void font-black px-8 py-4 rounded-xl text-base">
            Start My Website →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
