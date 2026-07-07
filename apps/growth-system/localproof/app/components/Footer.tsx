import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-rim bg-panel">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded bg-sky flex items-center justify-center">
                <svg className="w-3 h-3 text-ink" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M2 2h5v5H2V2zm7 0h5v5H9V2zM2 9h5v5H2V9zm7 3l2-2 2 2-2 2-2-2z"/>
                </svg>
              </div>
              <span className="text-sm font-semibold text-chalk">LocalProof</span>
              <span className="text-xs text-mist">by BuildRail</span>
            </div>
            <p className="text-sm text-mist leading-relaxed max-w-xs">
              The content engine for local service businesses. One job note becomes a week of posts.
            </p>
          </div>
          <div>
            <div className="text-xs text-mist uppercase tracking-widest mb-3">Product</div>
            <div className="flex flex-col gap-2">
              {[
                ["How it works", "/how-it-works"],
                ["Examples", "/examples"],
                ["Pricing", "/pricing"],
                ["Start free", "/start"],
              ].map(([l, h]) => (
                <Link key={h} href={h} className="text-sm text-mist hover:text-chalk">{l}</Link>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs text-mist uppercase tracking-widest mb-3">Also by BuildRail</div>
            <div className="flex flex-col gap-2">
              {[
                ["BuildRail Growth System", "https://buildrail.com"],
                ["Field Intelligence", "https://fieldintel.buildrail.com"],
              ].map(([l, h]) => (
                <a key={h} href={h} className="text-sm text-mist hover:text-chalk">{l}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-rim mt-10 pt-5 flex flex-col sm:flex-row justify-between gap-2">
          <p className="text-xs text-mist opacity-50">© 2025 BuildRail. All rights reserved.</p>
          <p className="text-xs text-mist opacity-50">localproof.buildrail.com</p>
        </div>
      </div>
    </footer>
  );
}
