"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const TESTIMONIALS = [
  { quote: "I was skeptical at first. But within the first week, I had 11 qualified leads in my inbox. Closed 4 of them for $62,000 total. BuildRail paid for itself 100x over.", name: "Marcus T.", title: "General Contractor", location: "Denver, CO", revenue: "$62K closed", initials: "MT", color: "#F59E0B" },
  { quote: "We used to chase leads for days. Now they come pre-qualified with photos, budget, and a timeline. My estimator said it's like getting a gift every morning.", name: "Diane K.", title: "Roofing Contractor", location: "Austin, TX", revenue: "3x more leads", initials: "DK", color: "#3B82F6" },
  { quote: "The old contact form on my site got maybe 2-3 leads a month, all junk. BuildRail gets me 15-20 real leads. My calendar is booked 6 weeks out now.", name: "James R.", title: "Electrical Contractor", location: "Nashville, TN", revenue: "6-week backlog", initials: "JR", color: "#10B981" },
  { quote: "I run a small plumbing outfit — just me and two guys. BuildRail made me look like a serious operation. Customers say my booking process feels more professional than the big companies.", name: "Sandra L.", title: "Plumbing Contractor", location: "Phoenix, AZ", revenue: "Fully booked", initials: "SL", color: "#8B5CF6" },
  { quote: "I've tried every lead gen thing out there — Angi, Thumbtack, Facebook ads. Nothing converts like BuildRail. These are MY leads from MY website. No competition.", name: "Tom B.", title: "HVAC & Mechanical", location: "Seattle, WA", revenue: "$120K pipeline", initials: "TB", color: "#EF4444" },
];

const STATS = [
  { value: "2,400+", label: "Active Contractors", color: "#F59E0B" },
  { value: "$127M+", label: "In Booked Jobs (2024)", color: "#3B82F6" },
  { value: "4.9/5",  label: "Average Rating",       color: "#10B981" },
  { value: "68%",    label: "Lead-to-Estimate Rate", color: "#F59E0B" },
  { value: "98K+",   label: "Leads Delivered",       color: "#3B82F6" },
  { value: "14 days",label: "Free Trial, No CC",     color: "#10B981" },
];

export default function SocialProof() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const cur = TESTIMONIALS[active];

  return (
    <section id="testimonials" ref={ref} style={{ position: "relative", padding: "96px 0", background: "var(--navy-light)", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: 400, height: 400, background: "rgba(245,158,11,0.05)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />

      <div className="page-container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="badge badge-green" style={{ marginBottom: 20, display: "inline-flex" }}>Real Contractors. Real Results.</div>
          <h2 className="font-display" style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 700, lineHeight: 1.15, margin: "0 0 16px", color: "var(--white)" }}>
            Don&apos;t Take Our Word For It
          </h2>
          <p style={{ color: "var(--slate)", fontSize: 18, maxWidth: 520, margin: "0 auto", lineHeight: 1.6 }}>
            Hear from contractors and tradesmen who stopped guessing and started growing.
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }}
          style={{ marginBottom: 48 }}>
          <div className="grid-6">
            {STATS.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, scale: 0.92 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.1 * i + 0.15 }}
                style={{
                  background: "var(--navy)", border: "1px solid rgba(59,130,246,0.12)",
                  borderRadius: 12, padding: "16px 12px", textAlign: "center",
                }}>
                <p className="font-display" style={{ color: s.color, fontSize: 22, fontWeight: 700, margin: "0 0 4px" }}>{s.value}</p>
                <p style={{ color: "var(--slate)", fontSize: 12, margin: 0 }}>{s.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Featured testimonial */}
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.28 }}>
          <div style={{
            background: "var(--navy)", border: "1px solid rgba(59,130,246,0.15)",
            borderRadius: 20, padding: "40px 44px", position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: 20, right: 24, fontSize: 100, color: "rgba(245,158,11,0.05)", lineHeight: 1, fontFamily: "Georgia, serif", pointerEvents: "none" }}>&ldquo;</div>

            <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 280, position: "relative" }}>
                <div style={{ display: "flex", gap: 3, marginBottom: 20 }}>
                  {[0,1,2,3,4].map(i => <span key={i} style={{ color: "var(--amber)", fontSize: 16 }}>★</span>)}
                </div>
                <AnimatePresence mode="wait">
                  <motion.blockquote key={active}
                    initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.35 }}
                    style={{ color: "var(--white)", fontSize: "clamp(16px,2vw,20px)", lineHeight: 1.6, margin: "0 0 28px", fontWeight: 500 }}>
                    &ldquo;{cur.quote}&rdquo;
                  </motion.blockquote>
                </AnimatePresence>
                <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: "50%", flexShrink: 0,
                    background: cur.color, display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--navy)", fontWeight: 700, fontSize: 14,
                  }} className="font-display">{cur.initials}</div>
                  <div>
                    <p className="font-display" style={{ color: "var(--white)", fontWeight: 700, margin: 0, fontSize: 15 }}>{cur.name}</p>
                    <p style={{ color: "var(--slate)", fontSize: 13, margin: 0 }}>{cur.title} · {cur.location}</p>
                  </div>
                  <div style={{
                    marginLeft: "auto",
                    background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.28)",
                    borderRadius: 8, padding: "6px 14px",
                  }}>
                    <span className="font-display" style={{ color: "var(--success)", fontWeight: 700, fontSize: 14 }}>{cur.revenue}</span>
                  </div>
                </div>
              </div>

              {/* Nav */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}>
                <button onClick={() => setActive(a => (a === 0 ? TESTIMONIALS.length - 1 : a - 1))}
                  style={{
                    width: 40, height: 40, borderRadius: 10, background: "none",
                    border: "1px solid rgba(59,130,246,0.25)", color: "var(--slate)",
                    cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "border-color 0.2s, color 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(59,130,246,0.6)"; e.currentTarget.style.color = "var(--white)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(59,130,246,0.25)"; e.currentTarget.style.color = "var(--slate)"; }}>
                  ‹
                </button>
                <button onClick={() => setActive(a => (a === TESTIMONIALS.length - 1 ? 0 : a + 1))}
                  style={{
                    width: 40, height: 40, borderRadius: 10, background: "none",
                    border: "1px solid rgba(59,130,246,0.25)", color: "var(--slate)",
                    cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "border-color 0.2s, color 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(59,130,246,0.6)"; e.currentTarget.style.color = "var(--white)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(59,130,246,0.25)"; e.currentTarget.style.color = "var(--slate)"; }}>
                  ›
                </button>
              </div>
            </div>

            {/* Dots */}
            <div style={{ display: "flex", gap: 8, marginTop: 28 }}>
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} style={{
                  height: 4, borderRadius: 2, border: "none", cursor: "pointer",
                  background: i === active ? "var(--amber)" : "rgba(59,130,246,0.25)",
                  width: i === active ? 28 : 16, transition: "all 0.3s", padding: 0,
                }} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Mini cards */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.45 }}
          style={{ marginTop: 24 }}>
          <div className="grid-3">
            {TESTIMONIALS.slice(1, 4).map((t, i) => (
              <div key={t.name} onClick={() => setActive(TESTIMONIALS.indexOf(t))}
                className="card" style={{ padding: 20, cursor: "pointer" }}>
                <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
                  {[0,1,2,3,4].map(j => <span key={j} style={{ color: "var(--amber)", fontSize: 13 }}>★</span>)}
                </div>
                <p style={{ color: "var(--slate)", fontSize: 13, lineHeight: 1.6, margin: "0 0 16px",
                  display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: t.color, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--navy)", fontSize: 11, fontWeight: 700 }}>{t.initials}</div>
                  <div>
                    <p style={{ color: "var(--white)", fontSize: 12, fontWeight: 600, margin: 0 }}>{t.name}</p>
                    <p style={{ color: "var(--slate)", fontSize: 11, margin: 0 }}>{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.3), transparent)" }} />
    </section>
  );
}
