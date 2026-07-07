const assets = [
  {
    title: "Landing Page Copy & Structure",
    description:
      "Clear messaging that explains who you help, what you do, where you work, and why someone should contact you — written for the way local buyers actually read.",
  },
  {
    title: "Local Content System",
    description:
      "A content plan built around the questions your ideal customers are already searching for in your local market — video topics, blog angles, and social hooks.",
  },
  {
    title: "Lead Magnet",
    description:
      "A useful guide, checklist, or local resource that gives prospects a real reason to raise their hand before they're ready to buy — and a way for you to follow up.",
  },
  {
    title: "Follow-Up Scripts",
    description:
      "Simple text and email messages that help turn early interest into real conversations without sounding like a template or a pushy sales pitch.",
  },
  {
    title: "Review & Referral System",
    description:
      "Proven templates to help you collect more five-star reviews, testimonials, and referrals from happy clients — systematically, not awkwardly.",
  },
  {
    title: "Google Business Content Pack",
    description:
      "Local post ideas, service descriptions, FAQs, and profile content that build trust the moment someone finds you on Google Maps or in local search.",
  },
];

export default function WhatWeBuild() {
  return (
    <section id="what-we-build">
      <div className="container">
        <p className="eyebrow" style={{ marginBottom: "24px" }}>What We Build</p>

        <h2 className="font-display" style={{
          fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
          lineHeight: "1.15",
          letterSpacing: "-0.018em",
          color: "var(--text)",
          fontWeight: 400,
          marginBottom: "16px",
          maxWidth: "600px",
        }}>
          The assets that help local prospects find you, trust you, and contact you.
        </h2>

        <p style={{
          color: "var(--text-muted)",
          fontSize: "0.9rem",
          marginBottom: "52px",
          maxWidth: "460px",
          lineHeight: "1.65",
        }}>
          Six core deliverables your local business should have — and probably doesn&apos;t yet.
        </p>

        <div className="grid-2">
          {assets.map((asset) => (
            <div key={asset.title} className="asset-card">
              <h3 style={{
                fontSize: "0.92rem",
                fontWeight: 600,
                color: "var(--text)",
                marginBottom: "9px",
                lineHeight: "1.35",
              }}>
                {asset.title}
              </h3>
              <p style={{
                fontSize: "0.83rem",
                color: "var(--text-muted)",
                lineHeight: "1.68",
                margin: 0,
              }}>
                {asset.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
