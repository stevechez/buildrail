"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const PLANS = [
  {
    name: "Starter", icon: "⚡", monthlyPrice: 79, annualPrice: 59,
    desc: "For solo contractors getting started with digital lead capture.",
    color: "#3B82F6", popular: false, cta: "Start Free Trial",
    features: ["Up to 25 leads/month","Instant SMS + email alerts","Basic lead scoring","1 website embed","Standard intake form","Email support","14-day free trial"],
  },
  {
    name: "Pro", icon: "🛡", monthlyPrice: 179, annualPrice: 139,
    desc: "For growing trades businesses ready to dominate their market.",
    color: "#F59E0B", popular: true, badge: "Most Popular", cta: "Start Free Trial",
    features: ["Unlimited leads","Instant SMS + email alerts","Advanced AI lead scoring","3 website embeds","Custom intake forms","Automated follow-up sequences","CRM integrations (Jobber, etc.)","Priority support","14-day free trial"],
  },
  {
    name: "Agency", icon: "👑", monthlyPrice: 399, annualPrice: 299,
    desc: "For multi-location businesses and marketing agencies serving contractors.",
    color: "#10B981", popular: false, badge: "Best Value", cta: "Talk to Sales",
    features: ["Unlimited leads","Unlimited website embeds","White-label options","10 team member seats","Custom branding","API access","Advanced analytics & reporting","Dedicated account manager","14-day free trial"],
  },
];

export default function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" ref={ref} style={{ position: "relative", padding: "96px 0", background: "var(--navy)", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: 800, height: 400, background: "rgba(245,158,11,0.04)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.3), transparent)" }} />

      <div className="page-container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="badge badge-amber" style={{ marginBottom: 20, display: "inline-flex" }}>Simple, Transparent Pricing</div>
          <h2 className="font-display" style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 700, lineHeight: 1.15, margin: "0 0 16px", color: "var(--white)" }}>
            Pick Your Plan.<br />
            <span style={{ color: "var(--amber)" }}>Start Winning Jobs This Week.</span>
          </h2>
          <p style={{ color: "var(--slate)", fontSize: 18, maxWidth: 480, margin: "0 auto 28px", lineHeight: 1.6 }}>
            Every plan includes a 14-day free trial. No credit card required.
          </p>

          {/* Billing toggle */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 4,
            background: "var(--navy-light)", border: "1px solid rgba(59,130,246,0.22)",
            borderRadius: 14, padding: 6,
          }}>
            {[false, true].map(isAnnual => (
              <button key={String(isAnnual)} onClick={() => setAnnual(isAnnual)}
                style={{
                  padding: "8px 20px", borderRadius: 10, border: "none", cursor: "pointer",
                  fontWeight: 600, fontSize: 14, display: "flex", alignItems: "center", gap: 8,
                  background: annual === isAnnual ? "var(--steel)" : "transparent",
                  color: annual === isAnnual ? "var(--white)" : "var(--slate)",
                  transition: "all 0.2s",
                }}>
                {isAnnual ? "Annual" : "Monthly"}
                {isAnnual && (
                  <span style={{ background: "var(--success)", color: "var(--white)", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 100 }}>
                    Save 25%
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid-3">
          {PLANS.map((plan, i) => {
            const price = annual ? plan.annualPrice : plan.monthlyPrice;
            return (
              <motion.div key={plan.name}
                initial={{ opacity: 0, y: 36, scale: 0.96 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                whileHover={{ scale: 1.02, y: -6 } as any}
                style={{
                  background: "var(--navy-light)", borderRadius: 20, overflow: "hidden",
                  border: plan.popular ? "2px solid var(--amber)" : "1px solid rgba(59,130,246,0.15)",
                  boxShadow: plan.popular ? "0 0 40px rgba(245,158,11,0.2)" : "none",
                  transition: "transform 0.25s, box-shadow 0.25s",
                }}>
                {/* Badge banner */}
                {plan.badge && (
                  <div style={{
                    textAlign: "center", padding: "8px 0", fontSize: 11, fontWeight: 700,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    background: plan.popular ? "var(--amber)" : "var(--success)",
                    color: "var(--navy)",
                  }}>{plan.badge}</div>
                )}

                <div style={{ padding: 32 }}>
                  {/* Plan name */}
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: `${plan.color}18`, border: `1px solid ${plan.color}28`,
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17,
                    }}>{plan.icon}</div>
                    <h3 className="font-display" style={{ color: "var(--white)", fontWeight: 700, fontSize: 18, margin: 0 }}>{plan.name}</h3>
                  </div>

                  <p style={{ color: "var(--slate)", fontSize: 14, lineHeight: 1.55, margin: "0 0 20px" }}>{plan.desc}</p>

                  {/* Price */}
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 6 }}>
                      <AnimatePresence mode="wait">
                        <motion.span key={`${plan.name}-${annual}`}
                          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.25 }}
                          className="font-display" style={{ color: "var(--white)", fontSize: 48, fontWeight: 700, lineHeight: 1 }}>
                          ${price}
                        </motion.span>
                      </AnimatePresence>
                      <span style={{ color: "var(--slate)", fontSize: 14, marginBottom: 6 }}>/month</span>
                    </div>
                    {annual && (
                      <p style={{ color: "var(--success)", fontSize: 12, margin: "6px 0 0" }}>
                        Billed annually — save ${(plan.monthlyPrice - plan.annualPrice) * 12}/yr
                      </p>
                    )}
                  </div>

                  {/* CTA */}
                  <motion.a href="#get-started" whileHover={{ scale: 1.03 } as any} whileTap={{ scale: 0.97 } as any}
                    style={{
                      display: "block", textAlign: "center", padding: "14px 24px",
                      borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: "pointer",
                      textDecoration: "none", marginBottom: 28, transition: "transform 0.18s, box-shadow 0.18s",
                      ...(plan.popular
                        ? { background: "linear-gradient(135deg, var(--amber), var(--amber-dark))", color: "var(--navy)" }
                        : { background: "transparent", color: "var(--white)", border: "1px solid rgba(59,130,246,0.3)" }),
                    }}>
                    {plan.cta}
                  </motion.a>

                  {/* Features */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {plan.features.map(f => (
                      <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{
                          width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
                          background: `${plan.color}20`,
                          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10,
                        }}>
                          <span style={{ color: plan.color }}>✓</span>
                        </div>
                        <span style={{ color: "var(--slate)", fontSize: 13 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Guarantee */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.45 }}
          style={{ marginTop: 40, textAlign: "center" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 12,
            background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)",
            borderRadius: 14, padding: "14px 24px",
          }}>
            <span style={{ fontSize: 20 }}>🛡</span>
            <p style={{ margin: 0, fontSize: 14 }}>
              <span style={{ color: "var(--white)", fontWeight: 700 }}>30-day money-back guarantee. </span>
              <span style={{ color: "var(--slate)" }}>If BuildRail doesn&apos;t deliver leads in your first 30 days, we&apos;ll refund you completely.</span>
            </p>
          </div>
        </motion.div>
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.3), transparent)" }} />
    </section>
  );
}
