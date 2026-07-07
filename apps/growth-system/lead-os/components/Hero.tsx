export default function Hero() {
  return (
    <section style={{
      paddingTop: "148px",
      paddingBottom: "100px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Subtle radial gradient behind headline */}
      <div aria-hidden style={{
        position: "absolute",
        top: "0", left: "50%",
        transform: "translateX(-50%)",
        width: "800px", height: "500px",
        background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative" }}>
        <p className="eyebrow" style={{ marginBottom: "28px" }}>
          Done-for-you local lead systems
        </p>

        <h1 className="font-display" style={{
          fontSize: "clamp(2.6rem, 6.5vw, 4.6rem)",
          lineHeight: "1.09",
          letterSpacing: "-0.025em",
          color: "var(--text)",
          marginBottom: "30px",
          maxWidth: "820px",
        }}>
          Local lead systems for businesses that{" "}
          <em style={{ fontStyle: "italic", color: "var(--text-secondary)" }}>don&apos;t want</em>{" "}
          <span style={{ position: "relative", display: "inline-block" }}>
            <span style={{ color: "var(--gold)" }}>to rely on ads.</span>
            <span style={{
              position: "absolute", bottom: "-5px", left: 0, right: 0,
              height: "1.5px",
              background: "linear-gradient(90deg, var(--gold), transparent)",
              borderRadius: "1px",
            }} />
          </span>
        </h1>

        <p style={{
          fontSize: "1.05rem",
          color: "var(--text-secondary)",
          lineHeight: "1.72",
          maxWidth: "560px",
          marginBottom: "44px",
        }}>
          We build the marketing assets local businesses should already have — a clear landing page, lead magnet, local content plan, review system, and follow-up scripts. For realtors, contractors, and home-service businesses.
        </p>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center", marginBottom: "60px" }}>
          <a href="#offer" className="btn-primary" style={{ padding: "15px 30px", fontSize: "0.9rem" }}>
            Get My Local Lead Plan →
          </a>
          <a href="#what-we-build" className="btn-ghost">
            View What&apos;s Included
          </a>
        </div>

        {/* Trust signals */}
        <div style={{
          display: "flex",
          gap: "28px",
          flexWrap: "wrap",
          paddingTop: "28px",
          borderTop: "1px solid var(--border)",
        }}>
          {[
            { dot: true, text: "No ad spend required" },
            { dot: true, text: "No cold calling" },
            { dot: true, text: "No long-term retainer" },
          ].map((item) => (
            <div key={item.text} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{
                width: "4px", height: "4px", borderRadius: "50%",
                background: "var(--gold)", display: "inline-block", flexShrink: 0,
              }} />
              <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
