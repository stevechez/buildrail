"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["Pain Points", "How It Works", "Pricing", "Testimonials"];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        transition: "background 0.3s, border-color 0.3s, backdrop-filter 0.3s",
        background: scrolled ? "rgba(10,22,40,0.95)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(59,130,246,0.12)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <div className="page-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px" }}>
        {/* Logo */}
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, #F59E0B, #D97706)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 16 }}>⚡</span>
          </div>
          <span className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--white)" }}>
            Build<span style={{ color: "var(--amber)" }}>Rail</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`}
              style={{ color: "var(--slate)", fontSize: 14, fontWeight: 500, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--white)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--slate)")}>
              {l}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }} className="desktop-nav">
          <a href="#pricing" style={{ color: "var(--slate)", fontSize: 14, fontWeight: 500, textDecoration: "none" }}>Sign In</a>
          <motion.a href="#get-started" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className="btn btn-primary" style={{ padding: "10px 20px", fontSize: 14 }}>
            Start Free Trial
          </motion.a>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-btn"
          style={{ background: "none", border: "none", color: "var(--white)", cursor: "pointer", fontSize: 24, padding: 4 }}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}
            style={{ background: "var(--navy-light)", borderTop: "1px solid rgba(59,130,246,0.12)", overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
              {links.map(l => (
                <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`}
                  onClick={() => setMenuOpen(false)}
                  style={{ color: "var(--slate)", textDecoration: "none", fontWeight: 500, padding: "8px 0", borderBottom: "1px solid rgba(59,130,246,0.1)" }}>
                  {l}
                </a>
              ))}
              <a href="#get-started" className="btn btn-primary" style={{ marginTop: 8, textAlign: "center" }}>Start Free Trial</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) { .desktop-nav { display: none !important; } }
        @media (min-width: 769px) { .mobile-menu-btn { display: none !important; } }
      `}</style>
    </motion.nav>
  );
}
