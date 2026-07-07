"use client";
import { useState } from "react";

const faqs = [
  {
    q: "Do I need to run ads?",
    a: "No. This system is designed entirely around organic local visibility, trust-building, and simple follow-up. You don't need to spend on ads to use what we build — though everything we create can complement paid campaigns if you decide to run them later.",
  },
  {
    q: "Do you guarantee leads?",
    a: "No. We don't promise overnight results or fake lead counts. We build the core assets that meaningfully improve your chances of being found, trusted, and contacted. Businesses that implement these consistently see better inbound quality over time.",
  },
  {
    q: "Is this social media management?",
    a: "No. This is a one-time lead system buildout — not ongoing management. You receive the strategy, copy, scripts, and assets to use across your website, YouTube, Google Business profile, and follow-up process. You own everything.",
  },
  {
    q: "Do I need to be on camera?",
    a: "No. For video content, we provide simple talking-point scripts you can record casually on your phone. Everything can also be repurposed into written posts, Google updates, or blog content if you prefer to stay off camera entirely.",
  },
  {
    q: "Is there a monthly retainer?",
    a: "No long-term retainer is required for the Starter Buildout. Optional monthly content support — new scripts, post ideas, and seasonal updates — can be added after you have the core system in place.",
  },
  {
    q: "How long does the buildout take?",
    a: "Most Starter Buildouts are delivered within 5–7 business days from the time we complete your intake review. You receive everything as a single organized package — not piecemeal over several weeks.",
  },
  {
    q: "What do I actually receive?",
    a: "You receive a Google Drive folder or Notion doc containing your landing page copy outline, 30 content ideas, 8 scripts, lead magnet outline, follow-up sequences, review request templates, Google Business posts, and a 30-day action plan. All editable, all yours.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section>
      <div className="container">
        <p className="eyebrow" style={{ marginBottom: "24px" }}>FAQ</p>

        <h2 className="font-display" style={{
          fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
          lineHeight: "1.15",
          letterSpacing: "-0.018em",
          color: "var(--text)",
          fontWeight: 400,
          marginBottom: "52px",
          maxWidth: "440px",
        }}>
          Common questions, answered honestly.
        </h2>

        <div>
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <button
                className="faq-btn"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span style={{
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  color: "var(--text)",
                  lineHeight: "1.4",
                }}>
                  {faq.q}
                </span>
                <span style={{
                  color: "var(--gold)",
                  fontSize: "1.2rem",
                  flexShrink: 0,
                  transform: open === i ? "rotate(45deg)" : "rotate(0)",
                  transition: "transform 0.2s ease",
                  display: "inline-block",
                  width: "20px",
                  textAlign: "center",
                }}>
                  +
                </span>
              </button>

              <div style={{
                overflow: "hidden",
                maxHeight: open === i ? "300px" : "0",
                transition: "max-height 0.28s ease",
              }}>
                <p style={{
                  fontSize: "0.88rem",
                  color: "var(--text-muted)",
                  lineHeight: "1.78",
                  paddingTop: "14px",
                  paddingRight: "48px",
                }}>
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
