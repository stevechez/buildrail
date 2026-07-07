"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const FEATURES = [
  { icon: "🎯", benefit: "Only talk to serious buyers",    feature: "AI Qualification",       badge: "AI-Powered",        desc: "Our intake logic filters out price-shoppers and tire-kickers before they ever reach you. Every lead scores above 7/10 or gets auto-disqualified." },
  { icon: "🔔", benefit: "Be first to respond, every time", feature: "Instant SMS + Email",  badge: "Speed Advantage",   desc: "The first contractor to respond wins 78% of the time. BuildRail makes sure that's always you — day or night." },
  { icon: "📊", benefit: "Know which leads are worth it",  feature: "Lead Scoring Dashboard", badge: "Smart Priority",    desc: "Every lead gets a score based on budget, timeline, and scope. You spend your energy where it counts." },
  { icon: "🌐", benefit: "Live in under 5 minutes",        feature: "Any Website",             badge: "Zero Dev Needed",   desc: "One snippet of code. Works on WordPress, Wix, Squarespace, custom-built sites, and everything in between." },
  { icon: "📱", benefit: "Capture leads from any device",  feature: "Mobile-First Forms",      badge: "Mobile-Optimized",  desc: "Over 70% of web traffic is mobile. Our forms are built for thumbs-first browsing with photo upload and location detection." },
  { icon: "🔁", benefit: "Never let a warm lead go cold",  feature: "Auto Follow-Up",          badge: "Autopilot Mode",    desc: "If a prospect doesn't book immediately, BuildRail sends timed nudges — so you stay top of mind without lifting a finger." },
  { icon: "🔒", benefit: "Your leads stay yours",          feature: "Exclusive Leads",         badge: "No Reselling",      desc: "Unlike lead marketplaces that sell the same lead to 5 contractors, BuildRail delivers every lead exclusively to you." },
  { icon: "⚡", benefit: "Fits your existing workflow",    feature: "CRM Integration Ready",   badge: "Integrates With",   desc: "Connects to Jobber, ServiceTitan, HouseCall Pro, and hundreds more via Zapier. Your leads, your tools." },
];

export default function FeaturesToBenefits() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{ position: "relative", padding: "96px 0", background: "var(--navy)" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.3), transparent)" }} />

      <div className="page-container">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="badge badge-amber" style={{ marginBottom: 20, display: "inline-flex" }}>⚡ Built for Tradesmen</div>
          <h2 className="font-display" style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 700, lineHeight: 1.15, margin: "0 0 18px", color: "var(--white)" }}>
            Every Feature Exists for<br />
            <span style={{ color: "var(--amber)" }}>One Reason: More Revenue</span>
          </h2>
          <p style={{ color: "var(--slate)", fontSize: 18, maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>
            We didn&apos;t build features for the sake of a feature list. Every single one was designed by talking to real contractors who were losing real money.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid-features">
          {FEATURES.map((f, i) => (
            <motion.div key={f.feature}
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
              whileHover={{ scale: 1.03, y: -5 } as any}
              className="card"
              style={{ padding: 24, position: "relative", overflow: "hidden", cursor: "default" }}>
              {/* Badge */}
              <div style={{
                display: "inline-block", background: "rgba(59,130,246,0.1)",
                border: "1px solid rgba(59,130,246,0.22)", borderRadius: 100,
                padding: "3px 10px", fontSize: 10, fontWeight: 600,
                color: "var(--steel-light)", letterSpacing: "0.08em",
                textTransform: "uppercase", marginBottom: 16,
              }}>
                {f.badge}
              </div>

              {/* Icon */}
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.22)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, marginBottom: 14,
                transition: "background 0.3s",
              }}>
                {f.icon}
              </div>

              <h3 className="font-display" style={{ color: "var(--white)", fontWeight: 700, fontSize: 14, margin: "0 0 4px", lineHeight: 1.35 }}>
                {f.benefit}
              </h3>
              <p style={{ color: "var(--amber)", fontSize: 12, fontWeight: 600, margin: "0 0 10px", opacity: 0.75 }}>
                via {f.feature}
              </p>
              <p style={{ color: "var(--slate)", fontSize: 12, lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Integration bar */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.65 }}
          style={{ marginTop: 56, paddingTop: 40, borderTop: "1px solid rgba(59,130,246,0.12)" }}>
          <p style={{ textAlign: "center", color: "var(--slate)", fontSize: 13, marginBottom: 24 }}>
            Integrates with the tools you already use
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center" }}>
            {["Jobber", "ServiceTitan", "HouseCall Pro", "Zapier", "Stripe", "Google Calendar", "Slack", "QuickBooks"].map(tool => (
              <span key={tool} className="font-display"
                style={{ color: "rgba(148,163,184,0.4)", fontSize: 14, fontWeight: 600, transition: "color 0.2s", cursor: "default" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--slate)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(148,163,184,0.4)")}>
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.3), transparent)" }} />
    </section>
  );
}
