"use client";
import { useState } from "react";
import Link from "next/link";
import NavBar from "../components/NavBar";

export default function StartPage() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);

  return (
    <div className="min-h-screen bg-ink">
      <NavBar stripped />

      <div className="max-w-2xl mx-auto px-5 sm:px-8 pt-28 pb-20">
        {!done ? (
          <>
            {/* Progress */}
            <div className="flex items-center gap-3 mb-10">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold border ${s <= step ? "bg-sky border-sky text-ink" : "border-wire text-wire"}`}>
                    {s < step ? "✓" : s}
                  </div>
                  {s < 3 && <div className={`flex-1 h-px w-8 ${s < step ? "bg-sky" : "bg-wire"}`} />}
                </div>
              ))}
              <span className="text-xs font-mono text-mist ml-2">
                {step === 1 ? "Your business" : step === 2 ? "Your job" : "Generate"}
              </span>
            </div>

            {step === 1 && (
              <div>
                <h1 className="text-3xl font-bold text-chalk mb-2">Tell us about your business.</h1>
                <p className="text-mist mb-8 text-sm leading-relaxed">Set it once — LocalProof applies it to every content pack you generate.</p>
                <div className="space-y-4">
                  {[
                    { label: "Business name", placeholder: "Coastline Garage Doors" },
                    { label: "Trade / industry", placeholder: "Garage door repair" },
                    { label: "Service area (cities you work in)", placeholder: "Aptos, Santa Cruz, Capitola" },
                    { label: "Your call to action", placeholder: "One call and we come to you" },
                  ].map((f) => (
                    <div key={f.label}>
                      <label className="block text-xs font-mono text-mist mb-1.5">{f.label}</label>
                      <input
                        type="text"
                        placeholder={f.placeholder}
                        className="w-full bg-panel border border-rim text-chalk placeholder-wire text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-sky"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-mono text-mist mb-1.5">Email (to save your profile)</label>
                    <input
                      type="email"
                      placeholder="you@yourbusiness.com"
                      className="w-full bg-panel border border-rim text-chalk placeholder-wire text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-sky"
                    />
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="w-full bg-sky hover:bg-skylit text-ink font-bold py-3.5 rounded-xl text-sm mt-2"
                  >
                    Next: Describe a job →
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h1 className="text-3xl font-bold text-chalk mb-2">Describe your last job.</h1>
                <p className="text-mist mb-8 text-sm leading-relaxed">3–5 sentences. Who called, what was wrong, what you fixed. Write it like a text to a friend — not a press release.</p>
                <div>
                  <label className="block text-xs font-mono text-mist mb-2">Your job note</label>
                  <textarea
                    rows={6}
                    placeholder="Got a call from a homeowner in Aptos — garage door stuck halfway open. Broken spring. Went out, replaced it, balanced the door, tested the opener. Had it working before lunch. Customer was relieved, said she'd been leaving for work with it open all week."
                    className="w-full bg-panel border border-rim text-chalk placeholder-wire text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-sky resize-none leading-relaxed"
                  />
                  <p className="text-xs text-mist mt-2 opacity-70">
                    Tip: mention the city or neighborhood — LocalProof uses it in every post for local SEO.
                  </p>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(1)} className="flex-1 border border-wire text-mist py-3 rounded-xl text-sm hover:border-mist hover:text-chalk">
                    ← Back
                  </button>
                  <button onClick={() => setStep(3)} className="flex-2 flex-grow bg-sky hover:bg-skylit text-ink font-bold py-3 rounded-xl text-sm">
                    Generate my content pack →
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h1 className="text-3xl font-bold text-chalk mb-2">Ready to generate.</h1>
                <p className="text-mist mb-8 text-sm">LocalProof will create your Google post, Facebook update, Instagram caption, video script, and more in under 90 seconds.</p>
                <div className="bg-panel border border-rim rounded-xl p-5 mb-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-sky" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-chalk">Business profile saved</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-sky" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-chalk">Job note ready</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-sky" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-chalk">8 content assets will be generated</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="border border-wire text-mist py-3 px-5 rounded-xl text-sm hover:border-mist hover:text-chalk">
                    ← Back
                  </button>
                  <button
                    onClick={() => setDone(true)}
                    className="flex-grow bg-sky hover:bg-skylit text-ink font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Generate my content pack
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-sky bg-opacity-20 border border-sky flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-sky" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-chalk mb-2">Your content pack is generating.</h2>
            <p className="text-mist mb-8 leading-relaxed text-sm">
              This is where your Google post, Facebook update, Instagram caption, video script, and more would appear — ready to copy and post.
            </p>
            <div className="bg-panel border border-rim rounded-xl p-5 text-left space-y-3 mb-7">
              {["Google Business post", "Facebook update", "Instagram caption + hashtags", "Short video script", "Review request template", "Email blurb", "5-day posting schedule"].map((item) => (
                <div key={item} className="shimmer rounded h-6 w-full opacity-70" />
              ))}
            </div>
            <p className="text-xs text-mist mb-5">
              This is a demo. Connect the generation API to see real output here.
            </p>
            <Link href="/examples" className="text-sm text-sky hover:text-skylit font-medium">
              See real example output →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
