import Link from "next/link";

const links = [
  { group: "Product", items: [["Product overview", "/product"], ["Pricing", "/pricing"], ["Case studies", "/case-studies"], ["Provision Your Vault", "/provision"]] },
  { group: "Modules", items: [["BidForge™ Proposals", "/product"], ["Comm Vault™ Client Portal", "/product"], ["ScopeLock™ Change Orders", "/product"], ["PayRail™ Payments", "/product"], ["CrewLens™ Field Docs", "/product"]] },
  { group: "BuildRail Ecosystem", items: [["BuildRail Growth System", "https://buildrail.com"], ["Field Intelligence", "https://fieldintel.buildrail.com"], ["LocalProof", "https://localproof.buildrail.com"]] },
];

export default function Footer() {
  return (
    <footer className="border-t border-rim bg-obsid">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="text-base font-bold mb-3">
              <span className="text-chalk">BUILD</span><span className="text-gold">RAIL</span>
              <span className="text-fog text-xs ml-2 border border-wire px-1.5 py-0.5 rounded font-mono">VAULT</span>
            </div>
            <p className="text-sm text-fog leading-relaxed mb-4">
              The operating system for premium residential construction firms.
            </p>
            <p className="text-xs text-fog opacity-50">vault.buildrail.com</p>
          </div>
          {links.map((group) => (
            <div key={group.group}>
              <div className="text-xs text-fog uppercase tracking-widest mb-4 font-mono">{group.group}</div>
              <div className="flex flex-col gap-2">
                {group.items.map(([label, href]) => (
                  href.startsWith("http")
                    ? <a key={href} href={href} className="text-sm text-fog hover:text-chalk">{label}</a>
                    : <Link key={href} href={href} className="text-sm text-fog hover:text-chalk">{label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-rim mt-12 pt-5 flex flex-col sm:flex-row justify-between gap-2">
          <p className="text-xs text-fog opacity-40">© 2025 BuildRail. All rights reserved.</p>
          <p className="text-xs text-fog opacity-40">Built for premium residential construction firms</p>
        </div>
      </div>
    </footer>
  );
}
