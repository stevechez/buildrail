"use client";
import Link from "next/link";
import { useState } from "react";

export default function NavBar({ stripped = false }: { stripped?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-rim bg-void bg-opacity-95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <span className="text-base font-bold tracking-tight">
              <span className="text-chalk">BUILD</span><span className="text-gold">RAIL</span>
            </span>
            <span className="text-fog text-xs ml-2 border border-wire px-1.5 py-0.5 rounded font-mono">VAULT</span>
          </Link>

          {!stripped && (
            <>
              <div className="hidden md:flex items-center gap-8">
                {[
                  { label: "Product", href: "/product" },
                  { label: "Solutions", href: "/solutions" },
                  { label: "Pricing", href: "/pricing" },
                  { label: "Case Studies", href: "/case-studies" },
                ].map((l) => (
                  <Link key={l.href} href={l.href} className="text-sm text-fog hover:text-chalk">
                    {l.label}
                  </Link>
                ))}
              </div>
              <div className="hidden md:flex items-center gap-3">
                <Link href="/provision" className="text-sm text-fog hover:text-chalk">Log in</Link>
                <Link
                  href="/provision"
                  className="text-sm font-bold bg-chalk text-void px-4 py-2 rounded-lg hover:bg-mist"
                >
                  Provision Your Vault
                </Link>
              </div>
              <button onClick={() => setOpen(!open)} className="md:hidden text-fog p-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {open
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  }
                </svg>
              </button>
            </>
          )}
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-rim bg-obsid px-5 pb-4">
          <div className="flex flex-col gap-3 pt-3">
            {["Product", "Solutions", "Pricing", "Case Studies"].map((l) => (
              <Link key={l} href={`/${l.toLowerCase().replace(" ", "-")}`} className="text-sm text-fog py-1" onClick={() => setOpen(false)}>{l}</Link>
            ))}
            <Link href="/provision" className="text-sm font-bold bg-chalk text-void px-4 py-2.5 rounded-lg text-center mt-1" onClick={() => setOpen(false)}>
              Provision Your Vault
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
