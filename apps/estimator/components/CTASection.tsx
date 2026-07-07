"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="get-started" ref={ref} style={{
      position: "relative", padding: "96px 0", overflow: "hidden",
      background: "linear-gradient(135deg, #0A1628 0%, #142348 50%, #0F2460 100%)",
    }} className="grid-bg">
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 900, height: 500, background: "rgba(245,158,11,0.07)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, right: 0, width: 400, height: 400, background: "rgba(59,130,246,0.08)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />

      <div className="page-container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        {/* Badge */}
        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5 }}
          className="badge badge-amber" style={{ marginBottom: 28, display: "inline-flex" }}>
          ⚡ Leads start flowing within 24 hours of setup
        </motion.div>

        {/* Headline */}
        <motion.h2 initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="font-display"
          style={{ fontSize: "clamp(36px,6vw,64px)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.02em", margin: "0 0 22px", color: "var(--white)" }}>
          Your Next Job Is<br />
          <span className="shimmer-text">Waiting on Your Site</span>
        </motion.h2>

        {/* Sub */}
        <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.22 }}
          style={{ color: "var(--slate)", fontSize: 18, maxWidth: 560, margin: "0 auto 44px", lineHeight: 1.65 }}>
          Join 2,400+ contractors already using BuildRail to capture qualified leads, skip the tire-kickers, and close more jobs — automatically.
        </motion.p>

        {/* Email capture */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.32 }}
          style={{ maxWidth: 520, margin: "0 auto 28px" }}>
          {!submitted ? (
            <form onSubmit={e => { e.preventDefault(); if (email.trim()) setSubmitted(true); }}
              style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="Enter your work email" required
                style={{
                  flex: "1 1 240px", background: "var(--navy-light)",
                  border: "1px solid rgba(59,130,246,0.28)", borderRadius: 12,
                  padding: "14px 18px", color: "var(--white)", fontSize: 15, outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={e => (e.target.style.borderColor = "rgba(245,158,11,0.5)")}
                onBlur={e => (e.target.style.borderColor = "rgba(59,130,246,0.28)")} />
              <motion.button type="submit" whileHover={{ scale: 1.03, y: -2 } as any} whileTap={{ scale: 0.97 } as any}
                className="btn btn-primary" style={{ flex: "0 0 auto" }}>
                Start Free Trial →
              </motion.button>
            </form>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
                background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)",
                borderRadius: 12, padding: "16px 24px",
              }}>
              <span style={{ color: "var(--success)", fontSize: 18 }}>✓</span>
              <span style={{ color: "var(--white)", fontWeight: 600 }}>You&apos;re in! Check your inbox to activate your trial.</span>
            </motion.div>
          )}
        </motion.div>

        {/* Trust signals */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.48 }}
          style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 20, marginBottom: 56 }}>
          {["✓ No credit card required","✓ 14-day free trial","✓ Cancel anytime","✓ Setup in 5 minutes"].map(t => (
            <span key={t} style={{ color: "var(--slate)", fontSize: 13 }}>{t}</span>
          ))}
        </motion.div>

        {/* Urgency block */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            background: "rgba(15,30,58,0.7)", border: "1px solid rgba(245,158,11,0.15)",
            borderRadius: 20, padding: "36px 40px", backdropFilter: "blur(12px)",
            maxWidth: 700, margin: "0 auto",
          }}>
          <p className="font-display" style={{ color: "var(--white)", fontSize: 18, fontWeight: 700, margin: "0 0 12px" }}>
            Every day without BuildRail is a day your website is collecting dust.
          </p>
          <p style={{ color: "var(--slate)", fontSize: 15, margin: 0, lineHeight: 1.65 }}>
            The average contractor loses{" "}
            <span style={{ color: "var(--amber)", fontWeight: 600 }}>$8,400/month</span> in revenue because their website can&apos;t capture and convert interested visitors. That&apos;s $100,800 a year walking out the door.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
