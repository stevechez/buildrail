import Link from "next/link";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works | BuildRail Sites — 48-Hour Contractor Websites",
  description: "Submit your photos in 10 minutes. We build your complete contractor website in 48 hours. Mobile-first, SEO-ready, conversion-focused.",
};

export default function HowItWorksPage() {
  const steps = [
    { n: "01", time: "Today", title: "You apply", desc: "Fill out a short form with your trade, location, and goals. Takes 5 minutes.", detail: ["Your trade and service area", "Your target customer (homeowner type)", "3–5 competitors you want to outrank", "Your preferred tone (professional, friendly, authoritative)"] },
    { n: "02", time: "Within 1 hour", title: "We confirm and send your upload link", desc: "You get a secure upload link for your logo and photos. No account needed.", detail: ["Upload 10–20 photos of your best work", "Upload your logo (or we create a wordmark)", "Share any existing content you want to keep", "That's the last thing we need from you"] },
    { n: "03", time: "Hours 1–36", title: "We build everything", desc: "Our team structures your SEO, writes your copy, and builds all 5 pages.", detail: ["Local SEO keyword research for your city", "Copy written to attract high-ticket homeowners", "Home · About · Services · Gallery · Quote pages", "Mobile-first build with sub-2 second load time"] },
    { n: "04", time: "Hour 48", title: "You review and approve", desc: "We send you a preview link. You have 24 hours to request any changes.", detail: ["One round of revisions included", "Real-time preview before going live", "Domain connection handled by us", "Site goes live the moment you approve"] },
  ];

  return (
    <div className="min-h-screen bg-void">
      <NavBar />
      <section className="pt-32 pb-16 border-b border-rim text-center">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <h1 className="text-5xl sm:text-6xl font-black text-chalk mb-5 leading-tight tracking-tight">
            How We Build Your Site<br /><span className="text-orange">In 48 Hours</span>
          </h1>
          <p className="text-lg text-mist leading-relaxed mb-8">
            You do 10 minutes of work. We do everything else. Your premium contractor site is live before the week is out.
          </p>
          <Link href="/start" className="inline-flex items-center gap-2 bg-orange hover:bg-oranglit text-void font-black px-7 py-3.5 rounded-xl text-base">
            Get My Site Built →
          </Link>
        </div>
      </section>

      {steps.map((s, idx) => (
        <section key={s.n} className={`py-16 border-b border-rim ${idx % 2 === 1 ? "bg-carbon" : "bg-void"}`}>
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-5xl font-black text-rim">{s.n}</span>
                  <div>
                    <p className="text-xs font-bold text-orange uppercase tracking-widest">{s.time}</p>
                    <h2 className="text-2xl font-black text-chalk">{s.title}</h2>
                  </div>
                </div>
                <p className="text-mist leading-relaxed mb-6 text-lg">{s.desc}</p>
                <ul className="space-y-2">
                  {s.detail.map((d) => (
                    <li key={d} className="flex items-center gap-3 text-sm text-silver">
                      <svg className="w-4 h-4 text-orange flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                      </svg>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={idx % 2 === 1 ? "lg:order-1" : ""}>
                <div className="bg-card border border-rim rounded-2xl overflow-hidden">
                  <div className="px-5 py-3 border-b border-rim flex items-center gap-2">
                    <span className="text-xs font-bold text-orange uppercase tracking-widest font-mono">Step {s.n}</span>
                    <span className="text-xs text-fog">· {s.time}</span>
                  </div>
                  <div className="p-5 space-y-2">
                    {s.detail.map((d, i) => (
                      <div key={i} className="flex items-center gap-3 bg-void border border-rim rounded-lg px-4 py-3">
                        <span className="text-xs font-mono text-orange flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
                        <span className="text-xs text-silver">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="text-4xl font-black text-chalk mb-4">Ready to stop losing high-ticket jobs?</h2>
          <p className="text-mist mb-8 leading-relaxed">First come, first served. We take a limited number of builds each week.</p>
          <Link href="/start" className="inline-flex items-center gap-2 bg-orange hover:bg-oranglit text-void font-black px-8 py-4 rounded-xl text-base">
            Get My Site Built in 48 Hours →
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
