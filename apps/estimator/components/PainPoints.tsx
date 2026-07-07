"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const PAINS = [
  { icon: "📵", title: "Leads Call Once and Disappear", desc: "A homeowner finds your site at 9pm. They want a quote. You're not there. They move on to your competitor who is.", stat: "73%", statLabel: "of leads never call back", color: "#EF4444" },
  { icon: "⏰", title: "Hours Wasted on Tire-Kickers", desc: "You spend 30 minutes driving out for a quote, only to find they wanted a $500 job or weren't serious.", stat: "12hrs", statLabel: "wasted on bad leads monthly", color: "#F59E0B" },
  { icon: "📉", title: "Contact Forms Don't Convert", desc: "Your generic 'Name, Email, Message' form collects nothing useful. No budget. No timeline. No scope.", stat: "2.4%", statLabel: "avg. contact form conversion", color: "#3B82F6" },
  { icon: "💸", title: "You're Leaving Money on the Table", desc: "Every week without a proper lead capture system is thousands of dollars walking to your competition.", stat: "$8,400", statLabel: "avg. monthly lost revenue", color: "#10B981" },
];

export default function PainPoints() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pain-points" ref={ref} style={{ position: "relative", padding: "96px 0", background: "var(--navy)" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.3), transparent)" }} />

      <div className="page-container">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="badge badge-red" style={{ marginBottom: 20, display: "inline-flex" }}>Sound familiar?</div>
          <h2 className="font-display"
            style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 700, lineHeight: 1.15, margin: "0 0 18px", color: "var(--white)" }}>
            Your Website Is Sending Leads<br />
            <span style={{ color: "var(--danger)" }}>Straight to Your Competitors</span>
          </h2>
          <p style={{ color: "var(--slate)", fontSize: 18, maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>
            You built a great business. But without the right system, your best opportunities are slipping away every single day.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid-2">
          {PAINS.map((p, i) => (
            <motion.div key={p.title}
              initial={{ opacity: 0, y: 36, scale: 0.97 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
              whileHover={{ scale: 1.02, y: -4 } as any}
              className="card"
              style={{ padding: 28, position: "relative", overflow: "hidden", cursor: "default" }}>
              {/* Top accent line */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${p.color}, transparent)`, opacity: 0.5 }} />

              <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
                {/* Icon */}
                <div style={{
                  width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                  background: `${p.color}18`, border: `1px solid ${p.color}28`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
                }}>
                  {p.icon}
                </div>
                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 className="font-display" style={{ color: "var(--white)", fontWeight: 700, fontSize: 17, margin: "0 0 8px", lineHeight: 1.3 }}>
                    {p.title}
                  </h3>
                  <p style={{ color: "var(--slate)", fontSize: 14, lineHeight: 1.6, margin: "0 0 14px" }}>{p.desc}</p>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: `${p.color}14`, border: `1px solid ${p.color}22`,
                    borderRadius: 8, padding: "6px 12px",
                  }}>
                    <span className="font-display" style={{ color: p.color, fontWeight: 700, fontSize: 18 }}>{p.stat}</span>
                    <span style={{ color: "var(--slate)", fontSize: 12 }}>{p.statLabel}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bridge */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.55 }}
          style={{ textAlign: "center", marginTop: 48 }}>
          <p style={{ color: "var(--slate)", fontSize: 17 }}>
            There&apos;s a better way — and it takes{" "}
            <span style={{ color: "var(--amber)", fontWeight: 600 }}>less than 5 minutes to set up.</span>
          </p>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}
            style={{ color: "rgba(59,130,246,0.4)", fontSize: 24, marginTop: 12 }}>↓</motion.div>
        </motion.div>
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.3), transparent)" }} />
    </section>
  );
}
