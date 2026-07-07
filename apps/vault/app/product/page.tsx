import Link from "next/link";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product | BuildRail Vault — Five modules. One operating system.",
  description: "BidForge proposals, Comm Vault client portal, ScopeLock change orders, PayRail payments, CrewLens field documentation. Built for premium residential construction firms.",
};

const modules = [
  {
    tm: "BIDFORGE™",
    name: "Proposals",
    color: "text-violet",
    border: "border-violet",
    bg: "bg-violet bg-opacity-10",
    headline: "Close higher-value projects with confidence.",
    desc: "Create premium multi-tier proposals that reduce back-and-forth and help contractors present options that make the value of their work undeniable. Clients choose between tiers — you capture more margin either way.",
    bullets: [
      "Multi-tier proposal templates (Good / Better / Best)",
      "Digital signature built in — no DocuSign needed",
      "Proposal viewed notifications",
      "Auto-converts approved proposals to active projects",
    ],
  },
  {
    tm: "COMM VAULT™",
    name: "Client Portal",
    color: "text-sky-400",
    border: "border-sky-400",
    bg: "bg-sky-400 bg-opacity-10",
    headline: "One place for every conversation, document, and decision.",
    desc: "Centralize approvals, conversations, documents, and updates into one professional experience homeowners can trust. Eliminate the 6am \"what's happening today?\" texts. Clients check the portal instead.",
    bullets: [
      "Real-time project status visible to clients",
      "Document storage — contracts, permits, warranties",
      "Approval requests sent directly to client portal",
      "Branded with your firm's identity",
    ],
  },
  {
    tm: "SCOPELOCK™",
    name: "Change Orders",
    color: "text-ember",
    border: "border-ember",
    bg: "bg-ember bg-opacity-10",
    headline: "Capture every field change before work begins.",
    desc: "Capture field changes in real time and secure documented approval before additional work begins. Stop doing free work. Every change order is logged, priced, and approved in writing before your crew touches it.",
    bullets: [
      "Field change documented on-site via mobile",
      "Client receives SMS + portal notification",
      "One-tap approval with digital signature",
      "Approved change orders trigger PayRail automatically",
    ],
  },
  {
    tm: "PAYRAIL™",
    name: "Payments",
    color: "text-gold",
    border: "border-gold",
    bg: "bg-gold bg-opacity-10",
    headline: "Get paid the moment work is approved.",
    desc: "Trigger milestone payments immediately after approvals using modern billing workflows powered by Stripe. Send a payment link via SMS. Client pays from their phone. Money moves the same day.",
    bullets: [
      "Milestone-based payment schedule set at project start",
      "Payment link sent via SMS — no app download needed",
      "Stripe-powered — ACH and card accepted",
      "Eliminates Net-30 and invoice chasing forever",
    ],
  },
  {
    tm: "CREWLENS™",
    name: "Field Documentation",
    color: "text-jade",
    border: "border-jade",
    bg: "bg-jade bg-opacity-10",
    headline: "Build an irrefutable visual record of every job.",
    desc: "Maintain a visual timeline of the build with organized site uploads, progress tracking, and accountability records. When a client questions work quality or scope, you have timestamped, GPS-tagged proof.",
    bullets: [
      "Photo and video uploads organized by project phase",
      "GPS-tagged and timestamped automatically",
      "Client-visible progress gallery in portal",
      "Exportable project documentation package at close",
    ],
  },
];

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-void">
      <NavBar />

      <section className="pt-32 pb-16 border-b border-rim">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <p className="text-xs font-mono text-fog uppercase tracking-widest mb-4">Product</p>
          <h1 className="text-5xl sm:text-6xl font-bold text-chalk leading-tight mb-5 tracking-tight">
            Five modules.<br />
            <span className="text-fog">One operating system.</span>
          </h1>
          <p className="text-lg text-fog max-w-2xl leading-relaxed mb-8">
            Every module is designed to eliminate a specific source of operational chaos — and they all work together from a single project view.
          </p>
          <Link href="/provision" className="inline-flex items-center gap-2 bg-chalk hover:bg-mist text-void font-bold px-6 py-3 rounded-xl text-sm">
            Provision Your Vault →
          </Link>
        </div>
      </section>

      {modules.map((m, idx) => (
        <section key={m.tm} className={`py-16 border-b border-rim ${idx % 2 === 1 ? "bg-obsid" : "bg-void"}`}>
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                <div className={`inline-flex items-center gap-2 border ${m.border} bg-opacity-10 px-3 py-1 rounded-lg mb-5 ${m.bg}`}>
                  <span className={`text-xs font-mono ${m.color} uppercase tracking-widest`}>{m.tm}</span>
                </div>
                <h2 className="text-3xl font-bold text-chalk mb-2">{m.name}</h2>
                <p className={`text-lg font-semibold ${m.color} mb-4`}>{m.headline}</p>
                <p className="text-fog leading-relaxed mb-6">{m.desc}</p>
                <ul className="space-y-3">
                  {m.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-fog">
                      <svg className={`w-4 h-4 flex-shrink-0 mt-0.5 ${m.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={idx % 2 === 1 ? "lg:order-1" : ""}>
                <div className={`border ${m.border} border-opacity-30 rounded-2xl p-7 ${m.bg}`}>
                  <p className={`text-xs font-mono ${m.color} uppercase tracking-widest mb-4`}>{m.tm} · Module preview</p>
                  <div className="space-y-3">
                    {m.bullets.map((b, i) => (
                      <div key={i} className="flex items-center gap-3 bg-void bg-opacity-40 border border-rim rounded-lg px-4 py-3">
                        <span className={`text-xs font-mono ${m.color} flex-shrink-0`}>{String(i + 1).padStart(2, "0")}</span>
                        <span className="text-xs text-fog">{b}</span>
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
          <h2 className="text-3xl font-bold text-chalk mb-4">Ready to replace chaos with clarity?</h2>
          <p className="text-fog mb-8 leading-relaxed">Vault is provisioned for your firm personally. We set it up, walk your team through it, and you&apos;re live in 48 hours.</p>
          <Link href="/provision" className="inline-flex items-center gap-2 bg-chalk hover:bg-mist text-void font-bold px-8 py-4 rounded-xl text-base">
            Provision Your Vault →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
