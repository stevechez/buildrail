const samples = [
  {
    type: "Lead Magnet",
    title: "The Santa Cruz County Buyer Starter Guide",
    preview: [
      "Best areas by lifestyle & commute",
      "Coastal buying considerations",
      "Budget reality check for 2025",
      "Questions to ask before touring homes",
      "Local lender & agent process overview",
    ],
    tag: "PDF Guide · 8 pages",
    color: "rgba(201,168,76,0.08)",
    borderColor: "rgba(201,168,76,0.2)",
  },
  {
    type: "Video Script",
    title: "\"Top 5 Mistakes Santa Cruz Home Sellers Make\" — 8-min script",
    preview: [
      "Hook: opens with the most common $20k mistake",
      "Problem walkthrough with local market context",
      "Practical correction for each mistake",
      "CTA to consultation page or lead magnet",
      "Repurposable as a blog post or Google post",
    ],
    tag: "Video Script · ~800 words",
    color: "rgba(80,130,200,0.06)",
    borderColor: "rgba(80,130,200,0.15)",
  },
  {
    type: "Follow-Up Sequence",
    title: "3-Touch Text & Email Sequence for New Leads",
    preview: [
      "Day 1 text: warm, personal, no pressure",
      "Day 3 email: value-first with a resource",
      "Day 7 text: simple check-in with a soft CTA",
      "Written to sound like you — not a CRM",
      "Editable templates with fill-in fields",
    ],
    tag: "3-message sequence",
    color: "rgba(100,180,120,0.06)",
    borderColor: "rgba(100,180,120,0.15)",
  },
  {
    type: "Google Business Pack",
    title: "12 Google Business Posts for a Contractor",
    preview: [
      "Project spotlight with before/after framing",
      "Seasonal homeowner tip posts",
      "FAQ posts based on common search queries",
      "Review highlight posts",
      "Service area + availability posts",
    ],
    tag: "12 posts · ready to publish",
    color: "rgba(180,100,200,0.06)",
    borderColor: "rgba(180,100,200,0.15)",
  },
];

export default function SampleDeliverables() {
  return (
    <section>
      <div className="container">
        <p className="eyebrow" style={{ marginBottom: "24px" }}>Sample Deliverables</p>

        <h2 className="font-display" style={{
          fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
          lineHeight: "1.15",
          letterSpacing: "-0.018em",
          color: "var(--text)",
          fontWeight: 400,
          marginBottom: "16px",
          maxWidth: "580px",
        }}>
          Here&apos;s what the actual work looks like.
        </h2>
        <p style={{
          color: "var(--text-muted)",
          fontSize: "0.9rem",
          marginBottom: "52px",
          lineHeight: "1.65",
          maxWidth: "460px",
        }}>
          Every buildout is tailored to your niche, market, and offer. These are representative examples of what clients receive.
        </p>

        <div className="grid-2">
          {samples.map((s) => (
            <div key={s.title} className="sample-card" style={{ background: s.color, borderColor: s.borderColor }}>
              <div style={{
                padding: "22px 24px",
                borderBottom: `1px solid ${s.borderColor}`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "12px",
              }}>
                <div>
                  <p style={{
                    fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.1em",
                    textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "6px",
                  }}>
                    {s.type}
                  </p>
                  <h3 style={{
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    color: "var(--text)",
                    lineHeight: "1.4",
                  }}>
                    {s.title}
                  </h3>
                </div>
              </div>

              <div style={{ padding: "20px 24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "18px" }}>
                  {s.preview.map((line) => (
                    <div key={line} className="check-item">
                      <div className="check-icon">
                        <span style={{ color: "var(--gold)", fontSize: "7px" }}>✓</span>
                      </div>
                      <span style={{ fontSize: "0.8rem" }}>{line}</span>
                    </div>
                  ))}
                </div>
                <span style={{
                  fontSize: "0.7rem", color: "var(--text-muted)",
                  fontWeight: 500, letterSpacing: "0.04em",
                }}>
                  {s.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
