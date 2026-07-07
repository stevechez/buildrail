const steps = [
  {
    num: "1",
    title: "Local Lead Audit",
    description:
      "We review your website, Google profile, offer, existing reviews, current content, and lead path — so we know exactly what's missing and what to prioritize.",
    detail: "Typically takes 24–48 hours after your intake form is submitted.",
  },
  {
    num: "2",
    title: "Build Your Lead Assets",
    description:
      "We create your landing page copy, local content plan, lead magnet, follow-up scripts, review system, and Google Business content — everything assembled as ready-to-use files.",
    detail: "Delivered as a clean Google Drive folder or Notion doc.",
  },
  {
    num: "3",
    title: "Launch Your System",
    description:
      "You receive a clear 30-day action plan you can publish, record, send, or hand directly to your web person. No ad spend required to get started.",
    detail: "Full buildout delivered within 5–7 business days.",
  },
];

export default function HowItWorks() {
  return (
    <section>
      <div className="container">
        <p className="eyebrow" style={{ marginBottom: "24px" }}>The Process</p>

        <h2 className="font-display" style={{
          fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
          lineHeight: "1.15",
          letterSpacing: "-0.018em",
          color: "var(--text)",
          fontWeight: 400,
          marginBottom: "64px",
          maxWidth: "500px",
        }}>
          A simple buildout — not a bloated agency retainer.
        </h2>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {steps.map((step, i) => (
            <div key={step.num} style={{
              display: "grid",
              gridTemplateColumns: "72px 1fr",
              gap: "28px",
              paddingBottom: i < steps.length - 1 ? "52px" : 0,
              position: "relative",
            }}>
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div aria-hidden style={{
                  position: "absolute",
                  left: "34px",
                  top: "48px",
                  bottom: "0",
                  width: "1px",
                  background: "linear-gradient(to bottom, rgba(201,168,76,0.25) 0%, rgba(201,168,76,0.04) 100%)",
                }} />
              )}

              <div style={{ paddingTop: "2px" }}>
                <span className="step-num">{step.num}</span>
              </div>

              <div style={{ paddingTop: "6px" }}>
                <h3 style={{
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  color: "var(--text)",
                  marginBottom: "10px",
                  letterSpacing: "-0.005em",
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontSize: "0.88rem",
                  color: "var(--text-muted)",
                  lineHeight: "1.72",
                  marginBottom: "10px",
                }}>
                  {step.description}
                </p>
                <p style={{
                  fontSize: "0.76rem",
                  color: "var(--gold)",
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                }}>
                  {step.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
