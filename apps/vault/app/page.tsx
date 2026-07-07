import Link from "next/link";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const modules = [
  {
    tm: "BIDFORGE™",
    name: "Proposals",
    desc: "Create premium multi-tier proposals that reduce back-and-forth and help contractors close higher-value projects with confidence.",
    icon: (
      <svg className="w-5 h-5 text-fog" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    tm: "COMM VAULT™",
    name: "Client Portal",
    desc: "Centralize approvals, conversations, documents, and updates into one professional experience homeowners can trust.",
    icon: (
      <svg className="w-5 h-5 text-fog" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    tm: "SCOPELOCK™",
    name: "Change Orders",
    desc: "Capture field changes in real time and secure documented approval before additional work begins.",
    icon: (
      <svg className="w-5 h-5 text-fog" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    tm: "PAYRAIL™",
    name: "Payments",
    desc: "Trigger milestone payments immediately after approvals using modern billing workflows powered by Stripe.",
    icon: (
      <svg className="w-5 h-5 text-fog" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  {
    tm: "CREWLENS™",
    name: "Field Documentation",
    desc: "Maintain a visual timeline of the build with organized site uploads, progress tracking, and accountability records.",
    icon: (
      <svg className="w-5 h-5 text-fog" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const pillars = [
  {
    n: "01",
    icon: (
      <svg className="w-6 h-6 text-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    iconBg: "bg-violet bg-opacity-20",
    title: "Capture Every Dollar",
    desc: "Lock in change orders instantly and eliminate thousands in missed revenue on every job.",
    color: "text-violet",
  },
  {
    n: "02",
    icon: (
      <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    iconBg: "bg-gold bg-opacity-20",
    title: "Get Paid On-Site",
    desc: "Send milestone payment links via SMS and eliminate Net-30 delays forever.",
    color: "text-gold",
  },
  {
    n: "03",
    icon: (
      <svg className="w-6 h-6 text-jade" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    iconBg: "bg-jade bg-opacity-20",
    title: "Run Jobs on Autopilot",
    desc: "Track progress, reduce client friction, and scale your margins without adding overhead.",
    color: "text-jade",
  },
];

const stats = [
  { n: "+18%", label: "Average margin improvement" },
  { n: "3× Faster", label: "Payment collection cycles" },
  { n: "90% Less", label: "Client status check-ins" },
];

const trustItems = [
  { icon: "◎", label: "Operational clarity across every project", color: "text-jade" },
  { icon: "$", label: "Payments triggered automatically", color: "text-gold" },
  { icon: "✓", label: "Every approval documented", color: "text-violet" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-void">
      <NavBar />

      {/* ── HERO ── */}
      <section className="relative pt-28 pb-20 grid-bg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-void/0 via-void/40 to-void pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-void via-transparent to-void pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 border border-wire bg-panel rounded-full px-4 py-1.5 mb-7">
                <span className="w-2 h-2 bg-jade rounded-full"></span>
                <span className="text-xs text-fog tracking-widest uppercase font-mono">Built for premium residential contractors</span>
              </div>

              <h1 className="text-5xl sm:text-6xl font-bold text-chalk leading-[1.05] tracking-tight mb-4">
                Run Your<br />
                Construction<br />
                Company
              </h1>
              <h2 className="text-4xl sm:text-5xl font-bold text-fog leading-tight tracking-tight mb-6">
                Like a High-Performance Firm
              </h2>

              <p className="text-base text-fog leading-relaxed max-w-lg mb-8">
                BuildRail Vault centralizes client communication, approvals, payments, and field documentation into one operating system built for premium residential construction firms.
              </p>

              {/* Trust icons */}
              <div className="flex flex-col gap-2 mb-8">
                {trustItems.map((t) => (
                  <div key={t.label} className="flex items-center gap-2.5">
                    <span className={`text-xs font-bold w-4 text-center ${t.color}`}>{t.icon}</span>
                    <span className="text-sm text-fog">{t.label}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/provision"
                  className="inline-flex items-center justify-center gap-2 bg-chalk hover:bg-mist text-void font-bold px-6 py-3.5 rounded-xl text-sm"
                >
                  Provision Your Vault →
                </Link>
                <Link
                  href="/product"
                  className="inline-flex items-center justify-center gap-2 border border-wire hover:border-fog text-fog hover:text-chalk px-6 py-3.5 rounded-xl text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  See How It Works
                </Link>
              </div>
            </div>

            {/* Right — Dashboard mockup */}
            <div className="relative hidden lg:block">
              <div className="bg-carbon border border-rim rounded-2xl overflow-hidden shadow-2xl">
                {/* Fake app header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-rim bg-obsid">
                  <div className="flex items-center gap-3">
                    <div className="text-xs font-bold text-chalk">BUILD<span className="text-gold">RAIL</span></div>
                    <span className="text-xs text-fog border border-wire px-1.5 py-0.5 rounded font-mono">VAULT</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-jade"></div>
                    <span className="text-xs text-fog">Live</span>
                  </div>
                </div>
                {/* Fake sidebar + content */}
                <div className="flex" style={{ minHeight: "320px" }}>
                  <div className="w-40 border-r border-rim bg-obsid p-3 flex flex-col gap-1">
                    {["Overview", "Projects", "Clients", "Payments", "Field Docs", "Reports"].map((item, i) => (
                      <div key={item} className={`text-xs px-2 py-1.5 rounded ${i === 0 ? "bg-panel text-chalk" : "text-fog hover:text-chalk"}`}>
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="flex-1 p-4">
                    <div className="text-sm font-bold text-chalk mb-1">The Overlook Residence</div>
                    <div className="text-xs text-fog mb-4">Real-time construction operations for reading activity</div>
                    {/* Activity items */}
                    {[
                      { label: "Kitchen Revision Approved", color: "bg-jade", tag: "Digital signature" },
                      { label: "Payment Milestone Released: $45,000", color: "bg-gold", tag: "Moving day" },
                      { label: "Field Photos Uploaded", color: "bg-violet", tag: "" },
                      { label: "Client Viewed Update", color: "bg-wire", tag: "" },
                      { label: "Change Order Signed", color: "bg-ember", tag: "" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2.5 mb-2.5">
                        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.color}`}></div>
                        <span className="text-xs text-chalk flex-1">{item.label}</span>
                        {item.tag && (
                          <span className="text-xs text-fog border border-wire px-1.5 py-0.5 rounded">{item.tag}</span>
                        )}
                      </div>
                    ))}
                    {/* Progress bar */}
                    <div className="mt-4 border-t border-rim pt-3">
                      <div className="flex justify-between text-xs text-fog mb-1.5">
                        <span>Project completion</span>
                        <span>31%</span>
                      </div>
                      <div className="h-1.5 bg-rim rounded-full">
                        <div className="h-1.5 bg-jade rounded-full" style={{ width: "31%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Bottom mobile mockups indicator */}
                <div className="flex items-center gap-2 px-5 py-2 border-t border-rim bg-obsid">
                  <span className="text-xs text-fog opacity-50">+ Mobile client app · Payment confirmation · Change order alerts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-1 border-t border-rim">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <p className="text-xs text-fog text-center uppercase tracking-widest font-mono py-8 opacity-60">
            Trusted by premium residential construction firms
          </p>
          <div className="border border-rim rounded-2xl overflow-hidden bg-carbon">
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-rim">
              {stats.map((s) => (
                <div key={s.n} className="py-10 px-10">
                  <div className="text-4xl sm:text-5xl font-bold text-chalk mb-2">{s.n}</div>
                  <div className="text-sm text-fog">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className="py-16 text-center max-w-4xl mx-auto">
            <p className="text-2xl sm:text-3xl font-bold text-chalk leading-snug mb-6">
              &ldquo;BUILDRAIL gave our clients a far more professional experience while eliminating constant follow-ups, approval confusion, and payment delays across active projects.&rdquo;
            </p>
            <div>
              <p className="text-sm font-semibold text-chalk">Michael Reynolds</p>
              <p className="text-sm text-fog">Owner · Reynolds Design Build</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FROM CHAOS TO PROFIT ── */}
      <section className="py-20 border-t border-rim bg-obsid">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-bold text-chalk mb-4">
              From Chaos → Control → Profit
            </h2>
            <p className="text-fog max-w-xl mx-auto leading-relaxed">
              BuildRail Vault installs the systems that eliminate free work, accelerate cash flow, and make every job predictable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {pillars.map((p) => (
              <div key={p.n} className="module-card bg-carbon border border-rim rounded-2xl p-7 relative overflow-hidden">
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-12 h-12 rounded-xl ${p.iconBg} flex items-center justify-center`}>
                    {p.icon}
                  </div>
                  <span className="text-3xl font-bold text-rim">{p.n}</span>
                </div>
                <h3 className="text-xl font-bold text-chalk mb-2">{p.title}</h3>
                <p className="text-sm text-fog leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODULES ── */}
      <section className="py-20 border-t border-rim">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-rim rounded-2xl overflow-hidden">
            {modules.map((m, i) => (
              <div
                key={m.tm}
                className={`module-card p-7 border-b border-rim ${
                  i % 3 !== 2 ? "lg:border-r" : ""
                } ${i >= 3 ? "border-b-0" : ""} bg-carbon hover:bg-panel transition-colors`}
              >
                <div className="w-12 h-12 rounded-xl bg-rim flex items-center justify-center mb-5">
                  {m.icon}
                </div>
                <p className="text-xs font-mono text-fog tracking-widest uppercase mb-1">{m.tm}</p>
                <h3 className="text-xl font-bold text-chalk mb-3">{m.name}</h3>
                <p className="text-sm text-fog leading-relaxed">{m.desc}</p>
              </div>
            ))}
            {/* Replace operational chaos CTA */}
            <div className="p-7 bg-panel flex flex-col justify-between">
              <div>
                <p className="text-xs font-mono text-fog tracking-widest uppercase mb-4">Built for premium contractors</p>
                <h3 className="text-2xl font-bold text-chalk leading-tight mb-6">
                  Replace operational chaos with clarity.
                </h3>
              </div>
              <Link
                href="/provision"
                className="inline-flex items-center justify-center gap-2 bg-chalk hover:bg-mist text-void font-bold px-5 py-3.5 rounded-xl text-sm"
              >
                Provision Your Vault →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── UPGRADE PATH ── */}
      <section className="py-20 border-t border-rim bg-obsid">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs text-fog uppercase tracking-widest font-mono mb-4">The BuildRail Ecosystem</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-chalk mb-4 leading-tight">
              Most Vault customers started on the Growth System.
            </h2>
            <p className="text-fog leading-relaxed">
              BuildRail is a complete contractor operating platform. Start with lead capture and missed call recovery. Graduate to Vault when you&apos;re ready to run jobs at scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                step: "01",
                name: "Growth System",
                job: "Fill the pipeline",
                desc: "Missed call recovery, contractor website, AI lead capture.",
                href: "https://buildrail.com",
                current: false,
                label: "Get started →",
              },
              {
                step: "02",
                name: "Field Intelligence",
                job: "Win the estimate",
                desc: "Walkthrough → proposals, scope memory, crew briefings.",
                href: "https://fieldintel.buildrail.com",
                current: false,
                label: "Learn more →",
              },
              {
                step: "03",
                name: "Vault",
                job: "Run jobs at scale",
                desc: "Proposals, client portal, change orders, payments, field docs.",
                href: "/provision",
                current: true,
                label: "Provision Your Vault →",
              },
              {
                step: "04",
                name: "LocalProof",
                job: "Stay visible",
                desc: "Every completed job becomes a week of local content.",
                href: "https://localproof.buildrail.com",
                current: false,
                label: "Learn more →",
              },
            ].map((card) => (
              <div
                key={card.name}
                className={`rounded-2xl border p-6 relative ${
                  card.current
                    ? "border-gold bg-panel ring-1 ring-gold ring-opacity-30"
                    : "border-rim bg-carbon"
                }`}
              >
                {card.current && (
                  <div className="absolute -top-3 left-4">
                    <span className="bg-gold text-void text-xs font-bold px-2.5 py-0.5 rounded-full">You are here</span>
                  </div>
                )}
                <span className="text-xs font-mono text-fog mb-3 block">{card.step}</span>
                <h3 className={`text-base font-bold mb-0.5 ${card.current ? "text-gold" : "text-chalk"}`}>{card.name}</h3>
                <p className="text-xs text-fog mb-3">{card.job}</p>
                <p className="text-xs text-fog leading-relaxed mb-5">{card.desc}</p>
                <a href={card.href} className={`text-xs font-semibold ${card.current ? "text-gold hover:text-amber-300" : "text-fog hover:text-chalk"}`}>
                  {card.label}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 border-t border-rim">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-chalk mb-5 leading-tight">
            Ready to run your firm<br />like a high-performance operation?
          </h2>
          <p className="text-fog text-lg mb-8 leading-relaxed max-w-xl mx-auto">
            Vault is provisioned manually. We set it up for your business, your projects, and your team.
          </p>
          <Link
            href="/provision"
            className="inline-flex items-center gap-2 bg-chalk hover:bg-mist text-void font-bold px-9 py-4 rounded-xl text-base"
          >
            Provision Your Vault →
          </Link>
          <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-fog">
            {["Concierge setup", "No long-term contract", "For firms doing $1M+"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-jade" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
