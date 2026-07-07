"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STEPS = [
  { n: "01", icon: "💬", title: "Visitor Lands on Your Site", desc: "A homeowner searches for a contractor. They find your site. BuildRail's embed instantly activates — no coding needed.", detail: "Works on any website: WordPress, Squarespace, Wix, custom HTML." },
  { n: "02", icon: "🎯", title: "Smart Estimate Form Fires", desc: "Our AI-powered intake form asks the right questions: scope, budget, timeline, location. No fluff. Just qualified data.", detail: "25-point qualification checklist built in. Configurable for your trade." },
  { n: "03", icon: "📤", title: "You Get a Qualified Lead Pack", desc: "Within 60 seconds, you receive a complete lead profile via SMS and email — fully scored and ready to quote.", detail: "Includes: contact info, job photos, estimated budget range, and urgency score." },
  { n: "04", icon: "✅", title: "Close the Job, Get Paid", desc: "You show up prepared, quote with confidence, and win more jobs because you already know it's a good fit.", detail: "Our users report 3x higher close rates vs. cold leads from ads." },
];

export default function SolutionReveal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="how-it-works" ref={ref} style={{ position: "relative", padding: "96px 0", background: "var(--navy-light)" }} className="grid-bg">
      <div className="page-container">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 72 }}>
          <div className="badge badge-steel" style={{ marginBottom: 20, display: "inline-flex" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--steel)" }} />
            How BuildRail Works
          </div>
          <h2 className="font-display" style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 700, lineHeight: 1.15, margin: "0 0 18px", color: "var(--white)" }}>
            From Website Visitor to<br />
            <span style={{ color: "var(--amber)" }}>Booked Estimate in 60 Seconds</span>
          </h2>
          <p style={{ color: "var(--slate)", fontSize: 18, maxWidth: 580, margin: "0 auto", lineHeight: 1.6 }}>
            No chasing. No voicemail. No tire-kickers. Just a steady stream of pre-qualified leads landing in your inbox.
          </p>
        </motion.div>

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {STEPS.map((step, i) => (
            <motion.div key={step.n}
              initial={{ opacity: 0, x: i % 2 === 0 ? -32 : 32 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.14, ease: "easeOut" }}
              whileHover={{ scale: 1.015, y: -3 } as any}
              className="card"
              style={{ padding: 28 }}>
              <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                {/* Step number + icon */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flexShrink: 0 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
                  }}>
                    {step.icon}
                  </div>
                  <span className="font-display" style={{ color: "rgba(245,158,11,0.4)", fontSize: 12, fontWeight: 700 }}>{step.n}</span>
                </div>
                {/* Content */}
                <div style={{ flex: 1 }}>
                  <h3 className="font-display" style={{ color: "var(--white)", fontWeight: 700, fontSize: 18, margin: "0 0 8px" }}>{step.title}</h3>
                  <p style={{ color: "var(--slate)", fontSize: 14, lineHeight: 1.65, margin: "0 0 12px" }}>{step.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: "var(--success)", fontSize: 14 }}>✓</span>
                    <span style={{ color: "var(--success)", fontSize: 13 }}>{step.detail}</span>
                  </div>
                </div>
                {/* Number badge (desktop) */}
                <div style={{
                  width: 40, height: 40, borderRadius: "50%", background: "var(--amber)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  boxShadow: "0 0 20px rgba(245,158,11,0.35)",
                }}>
                  <span className="font-display" style={{ color: "var(--navy)", fontWeight: 700, fontSize: 14 }}>{i + 1}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.7 }}
          style={{ textAlign: "center", marginTop: 52 }}>
          <motion.a href="#get-started" whileHover={{ scale: 1.04, y: -2 } as any} whileTap={{ scale: 0.97 } as any}
            className="btn btn-primary">
            See It Live on Your Site →
          </motion.a>
          <p style={{ color: "var(--slate)", fontSize: 13, marginTop: 12 }}>Free 14-day trial. No credit card needed.</p>
        </motion.div>
      </div>
    </section>
  );
}
