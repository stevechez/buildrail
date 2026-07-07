"use client";
export default function Nav() {
  return (
    <nav>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span className="font-display" style={{ fontSize: "1.1rem", color: "var(--text)", letterSpacing: "-0.01em" }}>
          Local Lead OS
        </span>
        <span className="tag-pill">Beta</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <a href="#what-we-build" style={{ fontSize: "0.82rem", color: "var(--text-muted)", textDecoration: "none" }}
          className="nav-link">What&apos;s Included</a>
        <a href="#offer" style={{ fontSize: "0.82rem", color: "var(--text-muted)", textDecoration: "none" }}
          className="nav-link">Pricing</a>
        <a href="#offer" className="btn-primary" style={{ padding: "9px 18px", fontSize: "0.82rem" }}>
          Get Started →
        </a>
      </div>
      <style>{`
        .nav-link { transition: color 0.15s; }
        .nav-link:hover { color: var(--text) !important; }
        @media (max-width: 560px) { .nav-link { display: none; } }
      `}</style>
    </nav>
  );
}
