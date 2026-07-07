import Link from "next/link";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How LocalProof Works | One job note → a week of local content",
  description: "Three steps: describe your job, set your business profile, get your content pack. No blank pages, no generic AI voice.",
};

const steps = [
  {
    n: "01",
    title: "Describe what happened on the job",
    sub: "You already have the content — you just need to say it",
    color: "text-sky",
    border: "border-sky",
    desc: "Type 3–5 sentences about what you did today. Who called, what was broken, what you fixed, how it went. No formatting required. No marketing language. Just what happened.",
    example: {
      label: "Example job note",
      text: "Got a call this morning from a homeowner in Aptos — garage door stuck halfway open. Broken spring. Went out, replaced it, balanced the door, tested the opener. Had it working before lunch. Customer was relieved, said she'd been leaving for work with it open all week.",
    },
    bullets: [
      "Write it like a text message, not a press release",
      "Include the city or neighborhood — it matters for SEO",
      "Mention the customer reaction if you have it",
      "One job = one content pack",
    ],
  },
  {
    n: "02",
    title: "Your business profile does the rest",
    sub: "LocalProof knows who you are before you type a word",
    color: "text-amber",
    border: "border-amber",
    desc: "Your business name, service area, brand voice, tone settings, and words to avoid are saved once — and applied to every pack you generate. You never re-explain yourself.",
    example: {
      label: "Business profile (set once)",
      text: "Business: Coastline Garage Doors\nService area: Aptos, Santa Cruz, Capitola, Soquel\nTone: Friendly, direct, no corporate language\nCTA: 'One call and we come to you'\nAvoid: 'cutting-edge', 'solutions', 'leveraging'",
    },
    bullets: [
      "Set it once, applied to every content pack",
      "Tone matching makes it sound like you — not AI",
      "Service area baked into every post for local SEO",
      "Custom CTA used consistently across all platforms",
    ],
  },
  {
    n: "03",
    title: "Get your full content pack in 90 seconds",
    sub: "Platform-specific, ready to copy, nothing generic",
    color: "text-green-400",
    border: "border-green-400",
    desc: "LocalProof generates a complete content pack from your job note — 8–10 assets across every platform you post on. Each one is written for that specific platform's format, length, and audience.",
    example: {
      label: "What's in a content pack",
      text: "✓ Google Business Profile post\n✓ Facebook update\n✓ Instagram caption + hashtags\n✓ LinkedIn post\n✓ Short video script (60s)\n✓ Review request message\n✓ FAQ from this job\n✓ Email blurb\n✓ 5-day posting schedule",
    },
    bullets: [
      "Each post formatted for the right platform",
      "Copy button on every piece — paste straight into your app",
      "Edit any piece before posting — you're always in control",
      "Save to your library for future reference",
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-ink">
      <NavBar />

      <section className="pt-32 pb-16 border-b border-rim">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <p className="text-xs text-mist uppercase tracking-widest mb-4 font-mono">How it works</p>
          <h1 className="text-5xl sm:text-6xl font-bold text-chalk leading-tight tracking-tight mb-5">
            Three steps.<br />
            <span className="text-sky">One job. A week of content.</span>
          </h1>
          <p className="text-lg text-mist leading-relaxed max-w-2xl mb-8">
            No blank pages. No prompt engineering. No re-explaining your business every time. Just describe a real job and get a full content pack ready to post.
          </p>
          <Link href="/start" className="inline-flex items-center gap-2 bg-sky hover:bg-skylit text-ink font-bold px-6 py-3 rounded-xl text-sm">
            Try it free — first pack on us →
          </Link>
        </div>
      </section>

      {steps.map((step, idx) => (
        <section key={step.n} className={`py-16 border-b border-rim ${idx % 2 === 1 ? "bg-panel" : "bg-ink"}`}>
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                <div className="flex items-center gap-4 mb-5">
                  <span className={`text-4xl font-mono font-bold ${step.color}`}>{step.n}</span>
                  <div>
                    <p className="text-xs text-mist uppercase tracking-wider font-mono">{step.sub}</p>
                    <h2 className="text-xl font-bold text-chalk">{step.title}</h2>
                  </div>
                </div>
                <p className="text-mist leading-relaxed mb-6">{step.desc}</p>
                <ul className="space-y-2">
                  {step.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-mist">
                      <svg className={`w-4 h-4 flex-shrink-0 mt-0.5 ${step.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={idx % 2 === 1 ? "lg:order-1" : ""}>
                <div className="bg-ink border border-rim rounded-xl overflow-hidden">
                  <div className={`px-4 py-2.5 border-b border-rim flex items-center gap-2`}>
                    <span className={`text-xs font-mono uppercase tracking-wider ${step.color}`}>{step.example.label}</span>
                  </div>
                  <pre className="px-5 py-4 text-xs font-mono text-mist leading-relaxed whitespace-pre-wrap">{step.example.text}</pre>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="text-3xl font-bold text-chalk mb-4">Ready to turn your last job into this week&apos;s content?</h2>
          <p className="text-mist mb-8">First content pack is free. No credit card. Results in 90 seconds.</p>
          <Link href="/start" className="inline-flex items-center gap-2 bg-sky hover:bg-skylit text-ink font-bold px-8 py-4 rounded-xl text-base">
            Create your first free pack →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
