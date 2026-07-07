import Link from "next/link";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Examples | LocalProof — See what gets generated from a real job note",
  description: "See how LocalProof turns a real job description into Google posts, Facebook updates, Instagram captions, video scripts, and more — specific to the business and location.",
};

const examples = [
  {
    trade: "Garage door repair",
    location: "Aptos, CA",
    note: "Got a call from a homeowner in Aptos — garage door stuck halfway open. Broken spring. Went out, replaced it, balanced the door, tested the opener. Had it working before dinner. She said she didn't realize how long she'd been leaving for work with it like that.",
    outputs: [
      {
        platform: "Google Business",
        color: "text-sky",
        border: "border-sky",
        content: "Got a call from a homeowner in Aptos whose garage door was stuck halfway open. Broken spring. We went out, replaced it, balanced the door, and tested the opener. Had everything working before dinner. She said she didn't realize how long she'd been leaving for work with it like that.\n\nIf your door isn't moving right, don't leave it. We're local to Aptos and Santa Cruz County — one call and we come to you.",
      },
      {
        platform: "Instagram",
        color: "text-pink-400",
        border: "border-pink-400",
        content: "Broken spring → working door, same day ✅\n\nAptos homeowner called us with a garage door stuck halfway open. We were there in under 2 hours. Spring replaced, door balanced, opener tested.\n\nLocal. Fast. Done right.\n\n#GarageDoorRepair #Aptos #SantaCruz #SameDayService",
      },
      {
        platform: "Video script",
        color: "text-green-400",
        border: "border-green-400",
        content: "[HOOK] Your garage door is stuck and you can't get your car out. Here's what happened in Aptos this morning.\n\n[BODY] Homeowner called at 8am. Broken torsion spring. We were there by 10, replaced the spring, balanced the door, tested the opener.\n\n[CTA] We're local to Aptos and Santa Cruz County. One call and we come to you. Link in bio.",
      },
    ],
  },
  {
    trade: "Plumbing",
    location: "Denver, CO",
    note: "Water heater replacement in Wheat Ridge. Older couple, 15-year-old gas unit finally gave out. No hot water for two days. Installed a new 50-gallon Bradford White, brought it all up to current code, had them back in hot water by noon.",
    outputs: [
      {
        platform: "Google Business",
        color: "text-sky",
        border: "border-sky",
        content: "Water heater replacement in Wheat Ridge today. An older couple had been without hot water for two days after their 15-year-old gas unit finally gave out. We installed a new 50-gallon Bradford White, updated everything to current code, and had them back in hot water before noon.\n\nWe serve Denver and the west suburbs — same-day water heater replacements available. Call us and we'll get you sorted.",
      },
      {
        platform: "Facebook",
        color: "text-blue-400",
        border: "border-blue-400",
        content: "Two days without hot water — nobody should have to deal with that ☕\n\nWe were out in Wheat Ridge this morning for a water heater that finally gave up after 15 years. New 50-gallon Bradford White, brought up to current code, everything tested.\n\nIf your water heater is giving you trouble, don't wait until it fails completely. We serve Denver and the west side — call or message us anytime.",
      },
      {
        platform: "Instagram",
        color: "text-pink-400",
        border: "border-pink-400",
        content: "15-year-old water heater → new Bradford White, same morning 🔥\n\nWheat Ridge family was without hot water for two days. We got there, pulled the old unit, installed a new 50-gallon, updated to current code, tested everything.\n\nBack in hot water by noon.\n\n#PlumbingDenver #WheatRidge #WaterHeater #SameDayPlumbing",
      },
    ],
  },
  {
    trade: "Roofing",
    location: "Phoenix, AZ",
    note: "Storm damage inspection in Chandler. Three-year-old roof, hail came through last week. Found significant granule loss on the south slope, two cracked shingles near the ridge, and a flashing issue at the chimney that was probably pre-existing but now compromised. Filed the insurance claim with the homeowner on-site.",
    outputs: [
      {
        platform: "Google Business",
        color: "text-sky",
        border: "border-sky",
        content: "Post-storm inspection in Chandler this week. Three-year-old roof after last week's hail — significant granule loss on the south slope, two cracked shingles near the ridge, and a chimney flashing issue that the storm made worse.\n\nWe documented everything and filed the insurance claim with the homeowner on-site. If your roof took hail last week, don't wait for a leak to find out. We serve Chandler and the East Valley — free storm inspections available now.",
      },
      {
        platform: "Video script",
        color: "text-green-400",
        border: "border-green-400",
        content: "[HOOK] You think your roof is fine after last week's storm. Here's what we found in Chandler today.\n\n[BODY] Three-year-old roof. Hail from last week. Significant granule loss, two cracked shingles, compromised chimney flashing. The homeowner had no idea.\n\n[CTA] If you're in the East Valley and you had hail last week, call us. Free inspection. We help you through the insurance claim too. Link in bio.",
      },
      {
        platform: "Facebook",
        color: "text-blue-400",
        border: "border-blue-400",
        content: "PSA for Chandler homeowners: if you had hail last week, get your roof looked at before you assume it's fine.\n\nWe were out today on a three-year-old roof. Significant granule loss, cracked shingles near the ridge, chimney flashing compromised. Nothing visible from the ground — but it'll be a problem by monsoon season.\n\nWe offer free storm inspections and help you file the insurance claim on-site. East Valley and greater Phoenix. Call or message us.",
      },
    ],
  },
];

export default function ExamplesPage() {
  return (
    <div className="min-h-screen bg-ink">
      <NavBar />

      <section className="pt-32 pb-16 border-b border-rim">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <p className="text-xs text-mist uppercase tracking-widest mb-4 font-mono">Real examples</p>
          <h1 className="text-5xl sm:text-6xl font-bold text-chalk leading-tight mb-5">
            This is what gets generated<br />
            <span className="text-sky">from a real job note.</span>
          </h1>
          <p className="text-lg text-mist leading-relaxed max-w-2xl mb-8">
            Three different trades. Three different cities. Each content pack starts with a plain job description — no marketing language, no formatting. LocalProof does the rest.
          </p>
          <Link href="/start" className="inline-flex items-center gap-2 bg-sky hover:bg-skylit text-ink font-bold px-6 py-3 rounded-xl text-sm">
            Create your first free pack →
          </Link>
        </div>
      </section>

      {examples.map((ex, idx) => (
        <section key={ex.trade} className={`py-16 border-b border-rim ${idx % 2 === 1 ? "bg-panel" : "bg-ink"}`}>
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-xs font-mono text-sky border border-sky px-2.5 py-1 rounded">{ex.trade.toUpperCase()}</span>
              <span className="text-xs font-mono text-mist">{ex.location}</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Job note */}
              <div className="bg-ink border border-rim rounded-xl overflow-hidden lg:col-span-1">
                <div className="px-4 py-2.5 border-b border-rim">
                  <span className="text-xs font-mono text-mist uppercase tracking-wider">Job note</span>
                </div>
                <p className="px-4 py-4 text-sm text-mist leading-relaxed">{ex.note}</p>
                <div className="px-4 py-3 border-t border-rim flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-sky" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-xs text-mist">LocalProof generates ↓</span>
                </div>
              </div>

              {/* Output cards */}
              <div className="lg:col-span-2 space-y-4">
                {ex.outputs.map((out) => (
                  <div key={out.platform} className="bg-ink border border-rim rounded-xl overflow-hidden">
                    <div className={`flex items-center justify-between px-4 py-2.5 border-b border-rim`}>
                      <span className={`text-xs font-mono uppercase tracking-wider ${out.color}`}>{out.platform}</span>
                      <button className="text-xs text-mist border border-rim px-2.5 py-1 rounded hover:border-mist hover:text-chalk flex items-center gap-1.5">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy
                      </button>
                    </div>
                    <pre className="px-4 py-4 text-sm text-chalk leading-relaxed whitespace-pre-wrap font-sans">{out.content}</pre>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="text-3xl font-bold text-chalk mb-4">Your last job is your next post.</h2>
          <p className="text-mist mb-8">Describe one job. Get a full content pack in 90 seconds. First one is free.</p>
          <Link href="/start" className="inline-flex items-center gap-2 bg-sky hover:bg-skylit text-ink font-bold px-8 py-4 rounded-xl text-base">
            Create your first free pack →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
