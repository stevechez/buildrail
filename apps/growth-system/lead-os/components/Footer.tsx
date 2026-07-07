export default function Footer() {
  return (
    <>
      {/* Final CTA Section */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{
          position: "absolute",
          bottom: 0, left: "50%",
          transform: "translateX(-50%)",
          width: "700px", height: "400px",
          background: "radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div className="container" style={{ textAlign: "center", position: "relative" }}>
          <p className="eyebrow" style={{ marginBottom: "24px" }}>Get Started</p>

          <h2 className="font-display" style={{
            fontSize: "clamp(2.2rem, 5.5vw, 4rem)",
            lineHeight: "1.1",
            letterSpacing: "-0.025em",
            color: "var(--text)",
            fontWeight: 400,
            marginBottom: "22px",
          }}>
            Build a local lead system{" "}
            <span style={{ color: "var(--gold)", fontStyle: "italic" }}>you actually own.</span>
          </h2>

          <p style={{
            fontSize: "1rem",
            color: "var(--text-secondary)",
            lineHeight: "1.72",
            maxWidth: "480px",
            margin: "0 auto 40px",
          }}>
            If your business depends on local reputation and high-trust conversations, your marketing should make it easier for people to choose you.
          </p>

          <a
            href="https://tally.so"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ fontSize: "0.95rem", padding: "16px 34px" }}
          >
            Get My Local Lead Plan →
          </a>

          <p style={{
            marginTop: "18px",
            fontSize: "0.78rem",
            color: "var(--text-muted)",
          }}>
            $497 one-time &nbsp;·&nbsp; Delivered in 5–7 business days &nbsp;·&nbsp; No retainer required
          </p>
        </div>
      </section>

      {/* Footer bar */}
      <footer style={{
        borderTop: "1px solid var(--border)",
        padding: "28px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "12px",
      }}>
        <span className="font-display" style={{ fontSize: "1rem", color: "var(--text-muted)" }}>
          Local Lead OS
        </span>
        <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
          Done-for-you local lead systems for realtors, contractors, and home-service businesses.
        </span>
      </footer>
    </>
  );
}
