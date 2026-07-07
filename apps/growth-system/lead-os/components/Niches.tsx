const niches = [
  {
    label: "Realtors",
    tagline: "Buyer & seller trust systems",
    items: [
      "Local video topic plans",
      "Buyer & seller guides",
      "Neighborhood content strategy",
      "Relocation lead systems",
      "Seller consultation pages",
    ],
  },
  {
    label: "Contractors",
    tagline: "Estimate & review systems",
    items: [
      "Estimate request pages",
      "Before-and-after project stories",
      "Google review systems",
      "Homeowner education content",
      "Service area landing pages",
    ],
  },
  {
    label: "ADU Builders",
    tagline: "Education-first lead systems",
    items: [
      "Feasibility checklists",
      "Homeowner starter guides",
      "Consultation request pages",
      "Local permitting content",
      "Timeline & cost explainers",
    ],
  },
  {
    label: "Movers & Home Services",
    tagline: "Quote & local visibility",
    items: [
      "Quote request page copy",
      "Service-area content plans",
      "Review request sequences",
      "Follow-up scripts",
      "Local search content",
    ],
  },
];

export default function Niches() {
  return (
    <section>
      <div className="container">
        <p className="eyebrow" style={{ marginBottom: "24px" }}>Who It&apos;s For</p>

        <h2 className="font-display" style={{
          fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
          lineHeight: "1.15",
          letterSpacing: "-0.018em",
          color: "var(--text)",
          fontWeight: 400,
          marginBottom: "52px",
          maxWidth: "520px",
        }}>
          Built for local businesses where trust drives the sale.
        </h2>

        <div className="grid-2">
          {niches.map((niche) => (
            <div key={niche.label} className="niche-card">
              <div style={{ marginBottom: "22px" }}>
                <h3 className="font-display" style={{
                  fontSize: "1.4rem",
                  fontWeight: 400,
                  color: "var(--text)",
                  letterSpacing: "-0.01em",
                  marginBottom: "4px",
                }}>
                  {niche.label}
                </h3>
                <p style={{ fontSize: "0.74rem", color: "var(--gold)", margin: 0, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  {niche.tagline}
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                {niche.items.map((item) => (
                  <div key={item} className="check-item">
                    <div className="check-icon">
                      <span style={{ color: "var(--gold)", fontSize: "7px", lineHeight: 1 }}>✓</span>
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
