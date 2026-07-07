import Link from "next/link";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | BuildRail Vault",
  description: "Simple, transparent pricing for premium residential construction firms. Concierge setup included.",
};

const plans = [
  {
    name: "Essentials",
    price: "$299",
    period: "/mo",
    tagline: "For firms managing 2–5 active projects.",
    modules: ["BidForge™ Proposals", "Comm Vault™ Client Portal", "ScopeLock™ Change Orders"],
    cta: "Provision Your Vault",
    highlight: false,
  },
  {
    name: "Professional",
    price: "$599",
    period: "/mo",
    tagline: "For firms ready to systematize every job.",
    modules: ["Everything in Essentials", "PayRail™ Milestone Payments", "CrewLens™ Field Documentation", "Priority support", "Monthly strategy call"],
    cta: "Provision Your Vault",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    tagline: "For multi-project firms doing $5M+.",
    modules: ["Everything in Professional", "Multi-team access", "Custom workflows", "Dedicated account manager", "Quarterly reviews", "White-label client portal"],
    cta: "Talk to us",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-void">
      <NavBar />
      <section className="pt-32 pb-14 text-center border-b border-rim">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <p className="text-xs font-mono text-fog uppercase tracking-widest mb-4">Pricing</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-chalk mb-4 leading-tight">
            Transparent pricing.<br />Concierge setup included.
          </h1>
          <p className="text-fog leading-relaxed">No long-term contract. Cancel anytime. Every plan includes personal onboarding.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {plans.map((plan) => (
              <div key={plan.name} className={`rounded-2xl border p-7 relative ${plan.highlight ? "border-gold ring-1 ring-gold ring-opacity-20 bg-panel" : "border-rim bg-carbon"}`}>
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-gold text-void text-xs font-bold px-3 py-1 rounded-full">Most popular</span>
                  </div>
                )}
                <div className={`text-xs font-mono mb-1 ${plan.highlight ? "text-gold" : "text-fog"}`}>{plan.name}</div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold text-chalk">{plan.price}</span>
                  {plan.period && <span className="text-fog text-sm">{plan.period}</span>}
                </div>
                <p className="text-xs text-fog mb-5 leading-relaxed">{plan.tagline}</p>
                <Link href="/provision" className={`block text-center text-sm font-bold py-3 rounded-xl mb-6 ${plan.highlight ? "bg-chalk text-void hover:bg-mist" : "border border-wire text-chalk hover:border-fog"}`}>
                  {plan.cta}
                </Link>
                <ul className="space-y-2">
                  {plan.modules.map((m) => (
                    <li key={m} className="flex items-start gap-2.5 text-xs">
                      <svg className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${plan.highlight ? "text-gold" : "text-jade"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-fog">{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-8 mt-10 text-sm text-fog">
            {["Concierge setup on every plan", "No long-term contract", "Cancel anytime", "Live in 48 hours"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-jade" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 border-t border-b border-rim bg-obsid">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <p className="text-fog">
            <strong className="text-chalk">Not sure which plan?</strong> Provision your Vault — we&apos;ll recommend the right tier on your setup call based on your project volume and team size.
          </p>
          <Link href="/provision" className="inline-flex items-center gap-2 bg-chalk hover:bg-mist text-void font-bold px-6 py-3 rounded-xl text-sm mt-5">
            Provision Your Vault →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
