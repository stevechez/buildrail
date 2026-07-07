import Link from "next/link";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Example Sites | BuildRail Sites",
  description: "See what a BuildRail Sites contractor website looks like — premium, conversion-focused, built in 48 hours.",
};

const examples = [
  { trade: "Roofing", co: "Summit Ridge Roofing", location: "Denver, CO", result: "+40% quote requests in first 30 days" },
  { trade: "Remodeling", co: "Apex Home Renovations", location: "Austin, TX", result: "Booked $180K job from website lead" },
  { trade: "HVAC", co: "Pacific Coast Comfort", location: "San Jose, CA", result: "Ranking #1 for 'HVAC San Jose'" },
  { trade: "Painting", co: "Prestige Finishes", location: "Nashville, TN", result: "Raised prices 25% after launch" },
];

export default function ExamplesPage() {
  return (
    <div className="min-h-screen bg-void">
      <NavBar />
      <section className="pt-32 pb-16 border-b border-rim text-center">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <h1 className="text-5xl sm:text-6xl font-black text-chalk mb-5 leading-tight">
            Sites That Win<br /><span className="text-orange">Higher-Paying Jobs</span>
          </h1>
          <p className="text-mist leading-relaxed max-w-xl mx-auto">
            Every site we build is custom to your trade and location. Here&apos;s what our contractors are saying.
          </p>
        </div>
      </section>

      <section className="py-16 border-b border-rim">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {examples.map((ex) => (
              <div key={ex.co} className="bg-card border border-rim rounded-2xl overflow-hidden orange-glow-border">
                {/* Fake website preview */}
                <div className="aspect-video bg-gradient-to-br from-panel to-rim flex items-center justify-center border-b border-rim">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-xl bg-orange bg-opacity-20 border border-orange border-opacity-30 flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                      </svg>
                    </div>
                    <p className="text-xs text-fog font-mono">{ex.co.toLowerCase().replace(/\s/g, "")}.com</p>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-orange border border-orange border-opacity-30 px-2 py-0.5 rounded">{ex.trade}</span>
                    <span className="text-xs text-fog">{ex.location}</span>
                  </div>
                  <h3 className="text-base font-bold text-chalk mb-2">{ex.co}</h3>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-jade" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                    </svg>
                    <span className="text-xs text-jade font-semibold">{ex.result}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="text-4xl font-black text-chalk mb-4">Your site could be next.</h2>
          <p className="text-mist mb-8">$2,499 one-time. Live in 48 hours. Yours forever.</p>
          <Link href="/start" className="inline-flex items-center gap-2 bg-orange hover:bg-oranglit text-void font-black px-8 py-4 rounded-xl text-base">
            Get My Site Built in 48 Hours →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
