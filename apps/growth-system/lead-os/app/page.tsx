import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import WhatWeBuild from "@/components/WhatWeBuild";
import Niches from "@/components/Niches";
import HowItWorks from "@/components/HowItWorks";
import SampleDeliverables from "@/components/SampleDeliverables";
import StarterOffer from "@/components/StarterOffer";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />

      {/* Trust bar */}
      <div className="trust-bar">
        {[
          { icon: "◆", text: "Organic-first — no ad spend required" },
          { icon: "◆", text: "Built for local service businesses" },
          { icon: "◆", text: "Delivered in 5–7 business days" },
          { icon: "◆", text: "No long-term retainer" },
        ].map((item) => (
          <div key={item.text} className="trust-item">
            <span style={{ color: "var(--gold)", fontSize: "0.4rem" }}>{item.icon}</span>
            {item.text}
          </div>
        ))}
      </div>

      <Problem />
      <WhatWeBuild />
      <Niches />
      <HowItWorks />
      <SampleDeliverables />
      <StarterOffer />
      <FAQ />
      <Footer />
    </main>
  );
}
