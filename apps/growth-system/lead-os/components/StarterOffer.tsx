const deliverables = [
  "Local lead audit — website, Google, offer & lead path",
  "Landing page copy outline",
  "30 local content ideas for your market",
  "8 video or blog scripts ready to record",
  "1 lead magnet PDF outline",
  "1 follow-up text & email sequence",
  "1 review request sequence",
  "Google Business post ideas",
  "30-day action plan",
];

export default function StarterOffer() {
  return (
    <section id="offer">
      <div className="container">
        <p className="eyebrow" style={{ marginBottom: "24px" }}>The Offer</p>

        <h2 className="font-display" style={{
          fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
          lineHeight: "1.15",
          letterSpacing: "-0.018em",
          color: "var(--text)",
          fontWeight: 400,
          marginBottom: "48px",
          maxWidth: "580px",
        }}>
          Everything you need to start building trust and generating leads locally.
        </h2>

        <div className="package-box">
          {/* Header row */}
          <div style={{
            padding: "32px 36px",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "24px",
            flexWrap: "wrap",
          }}>
            <div style={{ flex: 1, minWidth: "240px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--text)" }}>
                  Local Lead Starter Buildout
                </h3>
                <span className="tag-pill">Most Popular</span>
              </div>
              <p style={{
                fontSize: "0.85rem",
                color: "var(--text-muted)",
                lineHeight: "1.65",
                maxWidth: "380px",
              }}>
                A practical starter package for local businesses that want a clearer lead system without committing to a monthly agency retainer.
              </p>
            </div>

            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "4px", justifyContent: "flex-end", marginBottom: "2px" }}>
                <span className="font-display" style={{
                  fontSize: "2.8rem",
                  color: "var(--text)",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                }}>
                  $497
                </span>
              </div>
              <span style={{
                fontSize: "0.68rem", fontWeight: 600,
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: "var(--gold)",
              }}>
                Launch Price · One-Time
              </span>
            </div>
          </div>

          {/* Deliverables grid */}
          <div style={{ padding: "30px 36px", borderBottom: "1px solid var(--border)" }}>
            <p style={{
              fontSize: "0.68rem", fontWeight: 600,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: "var(--text-muted)", marginBottom: "18px",
            }}>
              What&apos;s Included
            </p>
            <div className="grid-2" style={{ gap: "10px 32px" }}>
              {deliverables.map((item) => (
                <div key={item} className="check-item">
                  <div className="check-icon">
                    <span style={{ color: "var(--gold)", fontSize: "7px" }}>✓</span>
                  </div>
                  <span style={{ fontSize: "0.84rem" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline strip */}
          <div style={{
            padding: "16px 36px",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            gap: "32px",
            flexWrap: "wrap",
          }}>
            {[
              { label: "Delivery", value: "5–7 business days" },
              { label: "Format", value: "Google Drive or Notion" },
              { label: "Retainer", value: "None required" },
            ].map((item) => (
              <div key={item.label}>
                <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "2px" }}>
                  {item.label}
                </p>
                <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", fontWeight: 500 }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* CTA row */}
          <div style={{
            padding: "26px 36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            flexWrap: "wrap",
          }}>
            <p style={{
              fontSize: "0.82rem",
              color: "var(--text-muted)",
              lineHeight: "1.65",
              maxWidth: "400px",
            }}>
              Designed to give you the core assets your business should already have — without wasting money on ads before your message and follow-up are ready.
            </p>
            <a
              href="https://tally.so"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ padding: "15px 30px" }}
            >
              Request a Starter Buildout →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
