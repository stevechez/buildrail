import Link from "next/link";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const BoltIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M13 2L4.09 12.97A1 1 0 005 14.5h6.5L10 22l9.91-10.97A1 1 0 0019 10h-6.5L13 2z"/>
  </svg>
);

const trades = ["Roofers", "Remodelers", "HVAC", "General Contractors", "Painters", "Landscapers", "Electricians", "Plumbers", "Concrete", "Handyman"];

const painPoints = [
  { icon: "🖥", label: "Your website looks outdated—or doesn't exist" },
  { icon: "🛡", label: "High-end clients don't trust your brand" },
  { icon: "➖", label: "Competitors look more expensive → so they win" },
  { icon: "💲", label: "You're stuck competing on price" },
];

const features = [
  {
    icon: <svg className="w-5 h-5 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>,
    title: "Mobile-First Design",
    desc: "Optimized for homeowners browsing your site on-the-go.",
  },
  {
    icon: <svg className="w-5 h-5 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/></svg>,
    title: "5-Page Structure",
    desc: "(Home, About, Services, Gallery, Quote)",
  },
  {
    icon: <svg className="w-5 h-5 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>,
    title: "Local SEO-Ready",
    desc: "Built so your business shows up in local Google search results.",
  },
  {
    icon: <svg className="w-5 h-5 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>,
    title: "Conversion-Focused",
    desc: "Native call, text, and quote capture forms on every page.",
  },
  {
    icon: <BoltIcon className="w-5 h-5 text-orange" />,
    title: "Guaranteed 48-Hr Launch",
    desc: "Your site is live and capturing leads in 48 hours, or you don't pay.",
  },
];

const sprint = [
  {
    n: "01",
    time: "10 MINUTES",
    title: "Submit Your Info",
    desc: "Upload photos, your logo, and basic business details.",
    icon: <svg className="w-6 h-6 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>,
  },
  {
    n: "02",
    time: "24–36 HOURS",
    title: "We Build Everything",
    desc: "We map out the local SEO, structure the copy, and build the site.",
    icon: <svg className="w-6 h-6 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>,
  },
  {
    n: "03",
    time: "HOUR 48",
    title: "Launch & Profit",
    desc: "Your premium site goes live and starts capturing high-end leads.",
    icon: <svg className="w-6 h-6 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>,
  },
];

const pricingFeatures = [
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
];

export default function Home() {
  return (
    <div className="min-h-screen bg-void">
      <NavBar />

      {/* ── HERO ── */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="orange-glow absolute inset-0 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 text-center">

          {/* Live badge */}
          <div className="inline-flex items-center gap-2 border border-rim bg-card rounded-full px-4 py-1.5 mb-8">
            <span className="live-dot w-2 h-2 bg-orange rounded-full"></span>
            <span className="text-xs text-silver tracking-wider">BuildRail Sites is now live</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-chalk leading-[1.0] tracking-tight mb-5">
            Stop Losing <span className="text-chalk">$10K+</span><br />
            Jobs to<br />
            <span className="text-orange">Contractors With<br />Better Websites</span>
          </h1>

          <p className="text-lg text-mist leading-relaxed max-w-2xl mx-auto mb-10">
            We build your entire contractor website in 48 hours — so you look premium, rank on Google, and win higher-paying clients.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Link
              href="/start"
              className="inline-flex items-center justify-center gap-2 bg-orange hover:bg-oranglit text-void font-black px-8 py-4 rounded-xl text-base"
            >
              Get My Site Built in 48 Hours →
            </Link>
            <Link
              href="/examples"
              className="inline-flex items-center justify-center gap-2 border border-wire hover:border-mist text-silver hover:text-chalk px-8 py-4 rounded-xl text-base font-semibold"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              View Example Sites
            </Link>
          </div>

          {/* Trade ticker */}
          <div className="text-xs text-fog uppercase tracking-widest mb-3">Built specifically for</div>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1">
            {trades.map((t, i) => (
              <span key={t} className="text-sm text-mist">
                {t}{i < trades.length - 1 && <span className="text-wire ml-5">·</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY YOU'RE LOSING JOBS ── */}
      <section className="py-20 border-t border-rim">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <h2 className="text-4xl sm:text-5xl font-black text-chalk text-center mb-3 leading-tight">
            Why You&apos;re Losing Jobs{" "}
            <span className="text-silver">Right Now</span>
          </h2>
          <div className="h-px w-24 bg-orange mx-auto mb-12"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto mb-8">
            {painPoints.map((p) => (
              <div key={p.label} className="bg-card border border-rim rounded-2xl px-5 py-5 flex items-center gap-4 orange-glow-border">
                <div className="w-10 h-10 rounded-xl bg-panel border border-rim flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                  </svg>
                </div>
                <span className="text-sm font-semibold text-silver leading-snug">{p.label}</span>
              </div>
            ))}
          </div>

          {/* The callout */}
          <div className="max-w-3xl mx-auto">
            <div className="border border-orange border-opacity-40 rounded-2xl px-6 py-5 text-center bg-orange bg-opacity-5">
              <p className="text-xl font-black text-orange">In construction, perception = price.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOOK LIKE YOU CHARGE MORE ── */}
      <section className="py-20 border-t border-rim bg-carbon">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <h2 className="text-4xl sm:text-5xl font-black text-chalk text-center mb-3 leading-tight">
            Look Like You Charge More—<span className="text-orange">So You Can</span>
          </h2>
          <p className="text-center text-mist mb-14 max-w-xl mx-auto leading-relaxed">
            We don&apos;t just change your design; we change how much a homeowner thinks your time is worth.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {/* Before */}
            <div className="bg-card border border-rim rounded-2xl overflow-hidden">
              <div className="px-5 py-3 border-b border-rim">
                <div className="inline-flex items-center gap-2 bg-red bg-opacity-10 border border-red border-opacity-30 rounded-full px-3 py-1">
                  <svg className="w-3 h-3 text-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                  <span className="text-xs font-bold text-red uppercase tracking-wider">Generic & Outdated</span>
                </div>
              </div>
              <div className="p-6">
                <div className="aspect-video bg-rim rounded-xl flex items-center justify-center mb-4 border border-wire" style={{ borderStyle: "dashed" }}>
                  <div className="text-center">
                    <svg className="w-8 h-8 text-wire mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <p className="text-xs text-wire uppercase tracking-widest">Typical &ldquo;DIY&rdquo; Template</p>
                  </div>
                </div>
                <p className="text-sm text-fog">Customer Perception:</p>
                <p className="text-sm text-silver italic mt-1">&ldquo;They&apos;re probably the cheapest option.&rdquo;</p>
              </div>
            </div>

            {/* After */}
            <div className="bg-card border-2 border-orange rounded-2xl overflow-hidden relative">
              <div className="px-5 py-3 border-b border-orange border-opacity-30">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 bg-jade bg-opacity-10 border border-jade border-opacity-30 rounded-full px-3 py-1">
                    <svg className="w-3 h-3 text-jade" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                    </svg>
                    <span className="text-xs font-bold text-jade uppercase tracking-wider">BuildRail Premium</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 bg-orange text-void rounded-full px-3 py-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                    </svg>
                    <span className="text-xs font-black uppercase tracking-wider">+40% Pricing Power</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="aspect-video bg-panel rounded-xl flex items-center justify-center mb-4 border border-orange border-opacity-20">
                  <div className="w-16 h-16 rounded-full border-2 border-orange flex items-center justify-center">
                    <svg className="w-8 h-8 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                    </svg>
                  </div>
                </div>
                <p className="text-sm text-orange font-semibold">Customer Perception:</p>
                <p className="text-sm text-chalk font-bold mt-1">&ldquo;This is the expert. Price is secondary.&rdquo;</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── YOU SEND PHOTOS ── */}
      <section className="py-20 border-t border-rim">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="text-5xl sm:text-6xl font-black leading-tight mb-2">
            <span className="text-silver">You Send Photos.</span>
          </h2>
          <h2 className="text-5xl sm:text-6xl font-black text-chalk leading-tight mb-8">
            We Build Everything.
          </h2>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["No meetings", "No tech headaches", "No drawn-out timelines"].map((t) => (
              <div key={t} className="flex items-center gap-2 bg-card border border-rim rounded-full px-4 py-2">
                <svg className="w-3.5 h-3.5 text-fog" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
                <span className="text-sm text-mist">{t}</span>
              </div>
            ))}
          </div>

          <div className="bg-card border border-rim rounded-2xl p-7 text-left">
            <div className="flex items-start gap-4 pb-6 border-b border-rim mb-6">
              <div className="w-11 h-11 rounded-xl bg-rim flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-silver" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"/>
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-silver uppercase tracking-widest mb-1">Your Part</p>
                <p className="text-lg font-bold text-chalk">You upload your logo and 10–20 photos.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-orange flex items-center justify-center flex-shrink-0">
                <BoltIcon className="w-5 h-5 text-void" />
              </div>
              <div>
                <p className="text-xs font-bold text-orange uppercase tracking-widest mb-1">Our Part</p>
                <p className="text-lg font-bold text-chalk">We turn it into a high-converting website in 48 hours.</p>
              </div>
            </div>
            <p className="text-xl font-black text-orange text-center mt-7">That&apos;s it.</p>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 border-t border-rim bg-carbon" id="features">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <h2 className="text-4xl sm:text-5xl font-black text-chalk text-center mb-3 leading-tight">
            Everything You Need to<br />
            <span className="text-silver">Win Higher-Paying Jobs</span>
          </h2>
          <p className="text-center text-mist mb-14 max-w-2xl mx-auto leading-relaxed">
            No fluff. No complex integrations. Just the essential features designed to build immediate credibility and capture leads from high-end clients.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div key={f.title} className="bg-card border border-rim rounded-2xl p-6 orange-glow-border">
                <div className="w-10 h-10 rounded-xl bg-orange bg-opacity-10 border border-orange border-opacity-20 flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="text-base font-bold text-chalk mb-2">{f.title}</h3>
                <p className="text-sm text-fog leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 48-HOUR SPRINT ── */}
      <section className="py-20 border-t border-rim">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <h2 className="text-4xl sm:text-5xl font-black text-chalk text-center mb-3 leading-tight">
            The 48-Hour <span className="text-orange">Sprint</span>
          </h2>
          <p className="text-center text-mist mb-16 max-w-xl mx-auto leading-relaxed">
            From the moment you submit your photos, the clock starts. Here is exactly how we go from start to live.
          </p>

          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Connector line */}
            <div className="hidden md:block absolute top-16 left-[16.666%] right-[16.666%] h-px bg-rim"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {sprint.map((s, i) => (
                <div key={s.n} className="text-center">
                  {/* Icon circle */}
                  <div className="relative mx-auto mb-4 w-[72px] h-[72px]">
                    <div className={`w-full h-full rounded-2xl border flex flex-col items-center justify-center gap-1 ${i === 1 ? "bg-card border-orange border-opacity-40" : "bg-card border-rim"}`}>
                      {s.icon}
                      <span className="text-xs text-fog font-mono">{s.n}</span>
                    </div>
                  </div>
                  {/* Time badge */}
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold mb-3 ${i === 1 ? "bg-orange text-void" : "bg-card border border-rim text-orange"}`}>
                    {s.time}
                  </div>
                  <h3 className="text-lg font-black text-chalk mb-2">{s.title}</h3>
                  <p className="text-sm text-fog leading-relaxed max-w-xs mx-auto">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-20 border-t border-rim bg-carbon" id="pricing">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-chalk mb-3 leading-tight">
            Simple, Transparent Pricing.
          </h2>
          <p className="text-mist mb-12 leading-relaxed max-w-xl mx-auto">
            Stop paying endless monthly retainers. Get a high-converting digital asset that you actually own, delivered in days.
          </p>

          {/* Single pricing card */}
          <div className="bg-gradient-to-b from-card to-panel border border-wire rounded-3xl overflow-hidden text-left">
            <div className="px-8 py-6 border-b border-rim text-center">
              <div className="inline-flex items-center bg-blue-600 bg-opacity-20 border border-blue-500 border-opacity-30 rounded-full px-4 py-1.5 mb-5">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">The Pro Package</span>
              </div>
              <div className="flex items-start justify-center gap-1 mb-2">
                <span className="text-2xl font-bold text-fog mt-3">$</span>
                <span className="text-8xl font-black text-chalk leading-none">2,499</span>
              </div>
              <p className="text-sm text-mist">
                One-time payment. <strong className="text-chalk">Zero subscriptions.</strong>
              </p>
            </div>
            <div className="px-8 py-7">
              <ul className="space-y-3 mb-8">
                {pricingFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span className="text-silver">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/start"
                className="block w-full text-center bg-orange hover:bg-oranglit text-void font-black py-4 rounded-xl text-base"
              >
                Start My Website →
              </Link>
              <p className="text-xs text-fog text-center mt-3">
                48-hour delivery guarantee · You own the site outright
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 bg-gradient-to-b from-indigo-900 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-blue-700 opacity-90"></div>
        <div className="relative max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-chalk mb-4 leading-tight">
            Ready to build a better online presence?
          </h2>
          <p className="text-lg text-blue-100 mb-8 leading-relaxed max-w-xl mx-auto">
            Stop losing high-ticket jobs to competitors with better websites. Let&apos;s launch your premium, conversion-optimized site in the next 48 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/start" className="inline-flex items-center justify-center gap-2 bg-chalk text-indigo-900 font-black px-8 py-4 rounded-xl text-base hover:bg-blue-50">
              Start My Website
            </Link>
            <Link href="/pricing" className="inline-flex items-center justify-center gap-2 border-2 border-white border-opacity-40 text-chalk font-bold px-8 py-4 rounded-xl text-base hover:border-opacity-70">
              Review Pricing
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
