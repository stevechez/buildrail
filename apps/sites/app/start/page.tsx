"use client";
import { useState } from "react";
import Link from "next/link";
import NavBar from "../components/NavBar";

const BoltIcon = () => (
  <svg className="w-4 h-4 text-void" fill="currentColor" viewBox="0 0 24 24">
    <path d="M13 2L4.09 12.97A1 1 0 005 14.5h6.5L10 22l9.91-10.97A1 1 0 0019 10h-6.5L13 2z"/>
  </svg>
);

export default function StartPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-void">
      <NavBar stripped />

      <div className="max-w-2xl mx-auto px-5 sm:px-8 pt-28 pb-20">
        {!submitted ? (
          <>
            <div className="text-center mb-10">
              <div className="w-12 h-12 rounded-xl bg-orange flex items-center justify-center mx-auto mb-4">
                <BoltIcon />
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-chalk mb-3">Start your build.</h1>
              <p className="text-mist leading-relaxed">
                Tell us about your business. We&apos;ll reach out within 2 hours with your upload link and next steps.
              </p>
            </div>

            <div className="bg-card border border-rim rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-rim flex items-center justify-between">
                <h2 className="text-sm font-bold text-chalk">Your business info</h2>
                <span className="text-xs text-orange font-mono">Step 1 of 1</span>
              </div>
              <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Your name", placeholder: "Mike Torres", type: "text" },
                    { label: "Business name", placeholder: "Torres Roofing", type: "text" },
                  ].map((f) => (
                    <div key={f.label}>
                      <label className="block text-xs text-fog mb-1.5">{f.label}</label>
                      <input type={f.type} required placeholder={f.placeholder}
                        className="w-full bg-void border border-rim text-chalk placeholder-wire text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-orange" />
                    </div>
                  ))}
                </div>
                {[
                  { label: "Phone number", placeholder: "(831) 555-0142", type: "tel" },
                  { label: "Email", placeholder: "mike@torresroofing.com", type: "email" },
                  { label: "City and state you serve", placeholder: "Santa Cruz, CA", type: "text" },
                  { label: "Existing website (if any)", placeholder: "torresroofing.com or none", type: "text" },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="block text-xs text-fog mb-1.5">{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder}
                      className="w-full bg-void border border-rim text-chalk placeholder-wire text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-orange" />
                  </div>
                ))}
                <div>
                  <label className="block text-xs text-fog mb-1.5">Your trade</label>
                  <select required defaultValue="" className="w-full bg-void border border-rim text-chalk text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-orange appearance-none">
                    <option value="" disabled>Select your trade</option>
                    {["Roofing","Remodeling","HVAC","Plumbing","Electrical","Painting","Landscaping","General contracting","Concrete","Handyman","Other"].map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-fog mb-1.5">What kind of clients do you want to attract?</label>
                  <textarea required rows={3} placeholder="e.g. High-end homeowners in Santa Cruz willing to pay premium prices for quality work..."
                    className="w-full bg-void border border-rim text-chalk placeholder-wire text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-orange resize-none" />
                </div>
                <button type="submit" className="w-full bg-orange hover:bg-oranglit text-void font-black py-4 rounded-xl text-base mt-2">
                  Submit — We&apos;ll contact you within 2 hours →
                </button>
                <div className="flex flex-wrap justify-center gap-5">
                  {["48-hr delivery guarantee", "One-time $2,499", "You own the site"].map((t) => (
                    <span key={t} className="text-xs text-fog flex items-center gap-1">
                      <svg className="w-3 h-3 text-jade" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                      </svg>
                      {t}
                    </span>
                  ))}
                </div>
              </form>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="w-14 h-14 rounded-xl bg-orange flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-void" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h2 className="text-3xl font-black text-chalk mb-2">You&apos;re in the queue.</h2>
            <p className="text-mist leading-relaxed mb-8 max-w-md mx-auto">
              We&apos;ll contact you within 2 hours with your photo upload link and project brief. Check your email and phone.
            </p>
            <div className="bg-card border border-rim rounded-xl p-6 text-left max-w-sm mx-auto mb-6">
              <p className="text-xs text-fog font-mono mb-3 uppercase tracking-widest">What happens next</p>
              {["We review your submission", "You receive your upload link (2hrs)", "You upload 10–20 photos", "We build your site (48hrs)", "You approve and go live"].map((s, i) => (
                <div key={s} className="flex items-center gap-3 py-2 border-b border-rim last:border-0">
                  <span className="text-xs font-mono text-orange">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-xs text-silver">{s}</span>
                </div>
              ))}
            </div>
            <Link href="/" className="text-sm text-orange hover:text-oranglit font-medium">← Back to BuildRail Sites</Link>
          </div>
        )}
      </div>
    </div>
  );
}
