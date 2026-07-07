const problems = [
  "Unclear website — visitors don't know what to do next",
  "Generic copy that sounds like every other local business",
  "No lead magnet — nothing to capture early interest",
  "Random or nonexistent follow-up after first contact",
  "No local content strategy building trust over time",
  "No review or referral system working passively for you",
];

export default function Problem() {
  return (
    <section>
      <div className="container">
        <p className="eyebrow" style={{ marginBottom: "24px" }}>The Real Problem</p>

        <h2 className="font-display" style={{
          fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
          lineHeight: "1.15",
          letterSpacing: "-0.018em",
          color: "var(--text)",
          fontWeight: 400,
          marginBottom: "48px",
          maxWidth: "680px",
        }}>
          Most local businesses don&apos;t have a lead problem.{" "}
          <span style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>
            They have a trust system problem.
          </span>
        </h2>

        <div className="grid-2-loose" style={{ marginBottom: "44px" }}>
          <div>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", fontSize: "0.95rem", marginBottom: "18px" }}>
              People are already searching for your service. They&apos;re checking Google, reading reviews, comparing websites, and asking local questions.
            </p>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", fontSize: "0.95rem" }}>
              They decide who feels trustworthy <em>before</em> they ever call. The problem is that most businesses give them no clear reason to choose them over anyone else.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "11px" }}>
            {problems.map((p) => (
              <div key={p} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <span style={{
                  width: "18px", height: "18px",
                  border: "1px solid rgba(220,80,80,0.2)",
                  background: "rgba(220,80,80,0.05)",
                  borderRadius: "3px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, marginTop: "1px",
                }}>
                  <span style={{ color: "rgba(220,100,100,0.6)", fontSize: "9px" }}>✕</span>
                </span>
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: "1.55" }}>{p}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="highlight-box">
          <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: "1.75", margin: 0 }}>
            <strong style={{ color: "var(--text)", fontWeight: 500 }}>Local Lead OS fixes that.</strong>{" "}
            We build the core marketing assets your business should already have — so when someone finds you locally, they have a clear reason to reach out instead of scrolling past.
          </p>
        </div>
      </div>
    </section>
  );
}
