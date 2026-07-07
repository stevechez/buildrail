"use client";
import { motion } from "framer-motion";

const LINKS = [
  { title: "Product",  items: ["Features","Pricing","Integrations","Changelog","Roadmap"] },
  { title: "Company",  items: ["About","Blog","Careers","Press","Contact"] },
  { title: "Legal",    items: ["Privacy Policy","Terms of Service","Cookie Policy","GDPR","Security"] },
];

export default function Footer() {
  return (
    <footer style={{ background: "#060E1C", borderTop: "1px solid rgba(59,130,246,0.1)" }}>
      <div className="page-container" style={{ padding: "64px 24px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))", gap: 40, marginBottom: 48 }}>
          {/* Brand */}
          <div style={{ gridColumn: "span 2" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#F59E0B,#D97706)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 16 }}>⚡</span>
              </div>
              <span className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--white)" }}>
                Build<span style={{ color: "var(--amber)" }}>Rail</span>
              </span>
            </div>
            <p style={{ color: "var(--slate)", fontSize: 14, lineHeight: 1.65, maxWidth: 260, margin: "0 0 20px" }}>
              The Instant Estimate lead capture engine for contractors and tradesmen. Turn your website traffic into booked jobs.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {["𝕏","in","▶"].map((icon, i) => (
                <motion.a key={i} href="#" whileHover={{ scale: 1.1 } as any}
                  style={{
                    width: 36, height: 36, borderRadius: 8,
                    border: "1px solid rgba(59,130,246,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--slate)", textDecoration: "none", fontSize: 14,
                    transition: "border-color 0.2s, color 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(245,158,11,0.4)"; e.currentTarget.style.color = "var(--white)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(59,130,246,0.2)"; e.currentTarget.style.color = "var(--slate)"; }}>
                  {icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {LINKS.map(col => (
            <div key={col.title}>
              <h4 className="font-display" style={{ color: "var(--white)", fontWeight: 600, fontSize: 14, margin: "0 0 16px" }}>{col.title}</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {col.items.map(link => (
                  <a key={link} href="#" style={{ color: "var(--slate)", fontSize: 14, textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--white)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--slate)")}>
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ paddingTop: 24, borderTop: "1px solid rgba(59,130,246,0.1)", display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ color: "rgba(148,163,184,0.5)", fontSize: 13, margin: 0 }}>
            © 2026 BuildRail, Inc. All rights reserved. Made for contractors, by people who know the trade.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--success)" }} className="dot-pulse" />
            <span style={{ color: "rgba(148,163,184,0.5)", fontSize: 13 }}>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
