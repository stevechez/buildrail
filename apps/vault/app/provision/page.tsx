"use client";
import { useState } from "react";
import Link from "next/link";
import NavBar from "../components/NavBar";

export default function ProvisionPage() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="min-h-screen bg-void">
      <NavBar stripped />
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

          {/* Left */}
          <div>
            <p className="text-xs font-mono text-fog tracking-widest uppercase mb-4">Concierge provisioning</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-chalk mb-4 leading-tight">
              Provision your Vault.
            </h1>
            <p className="text-fog leading-relaxed mb-7">
              Vault is set up personally for your firm — your projects, your team, your client workflows. Tell us about your business and we&apos;ll reach out within 24 hours to get you started.
            </p>
            <div className="space-y-4 mb-8">
              {[
                { n: "01", title: "We review your firm", detail: "We look at your project volume, team size, and current workflows before your setup call." },
                { n: "02", title: "Concierge setup call", detail: "A BuildRail specialist configures your Vault, imports your templates, and walks your team through it." },
                { n: "03", title: "You&apos;re live in 48 hours", detail: "Your client portal, change order system, and payment workflows are live before your next project starts." },
              ].map((s) => (
                <div key={s.n} className="flex gap-4">
                  <span className="text-xl font-mono font-bold text-rim flex-shrink-0">{s.n}</span>
                  <div>
                    <p className="text-sm font-bold text-chalk mb-0.5" dangerouslySetInnerHTML={{ __html: s.title }} />
                    <p className="text-xs text-fog leading-relaxed" dangerouslySetInnerHTML={{ __html: s.detail }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="border border-rim rounded-xl p-5 bg-carbon">
              <p className="text-sm italic text-chalk leading-relaxed mb-3">
                &ldquo;BUILDRAIL gave our clients a far more professional experience while eliminating constant follow-ups, approval confusion, and payment delays.&rdquo;
              </p>
              <p className="text-xs text-fog">Michael Reynolds · Owner, Reynolds Design Build</p>
            </div>
          </div>

          {/* Right — form */}
          <div>
            {!submitted ? (
              <div className="border border-rim rounded-2xl overflow-hidden bg-carbon">
                <div className="px-6 py-4 border-b border-rim">
                  <h2 className="text-sm font-bold text-chalk">About your firm</h2>
                  <p className="text-xs text-fog mt-1">We provision Vault for firms doing $1M+ in annual residential construction.</p>
                </div>
                <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                  {[
                    { label: "Your name", placeholder: "Michael Reynolds", type: "text" },
                    { label: "Company name", placeholder: "Reynolds Design Build", type: "text" },
                    { label: "Email", placeholder: "michael@reynoldsdesignbuild.com", type: "email" },
                    { label: "Phone", placeholder: "(831) 555-0142", type: "tel" },
                  ].map((f) => (
                    <div key={f.label}>
                      <label className="block text-xs font-mono text-fog mb-1.5">{f.label}</label>
                      <input type={f.type} required placeholder={f.placeholder}
                        className="w-full bg-void border border-rim text-chalk placeholder-wire text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-gold" />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-mono text-fog mb-1.5">Annual revenue range</label>
                    <select required className="w-full bg-void border border-rim text-chalk text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-gold appearance-none">
                      <option value="">Select range</option>
                      {["$500K – $1M", "$1M – $2.5M", "$2.5M – $5M", "$5M – $10M", "Over $10M"].map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-fog mb-1.5">Biggest operational challenge right now</label>
                    <textarea required rows={3} placeholder="e.g. Change orders not getting approved before work starts, clients calling for updates, slow payment collection..."
                      className="w-full bg-void border border-rim text-chalk placeholder-wire text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-gold resize-none" />
                  </div>
                  <button type="submit"
                    className="w-full bg-chalk hover:bg-mist text-void font-bold py-3.5 rounded-xl text-sm">
                    Submit — we&apos;ll reach out within 24 hours →
                  </button>
                  <p className="text-xs text-fog opacity-60 text-center">Concierge setup included. No long-term contract required.</p>
                </form>
              </div>
            ) : (
              <div className="border border-gold border-opacity-40 rounded-2xl p-10 bg-carbon text-center">
                <div className="w-14 h-14 rounded-full border border-gold border-opacity-40 flex items-center justify-center mx-auto mb-5">
                  <span className="text-gold text-xl">✓</span>
                </div>
                <h2 className="text-xl font-bold text-chalk mb-2">Request received.</h2>
                <p className="text-sm text-fog leading-relaxed mb-6">We&apos;ll review your firm and reach out within 24 hours to schedule your Vault setup.</p>
                <div className="space-y-2 text-left border-t border-rim pt-5">
                  <p className="text-xs font-mono text-fog">While you wait:</p>
                  <Link href="/product" className="block text-xs text-gold hover:text-amber-300">→ See how each module works</Link>
                  <Link href="/" className="block text-xs text-gold hover:text-amber-300">→ Back to BuildRail Vault</Link>
                </div>
              </div>
            )}
            <div className="flex flex-wrap gap-4 mt-4 justify-center">
              {["Concierge setup", "Live in 48 hours", "Cancel anytime"].map((t) => (
                <span key={t} className="text-xs text-fog flex items-center gap-1.5">
                  <span className="text-jade">✓</span> {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
