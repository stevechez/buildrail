"use client";
import Link from "next/link";
import { useState } from "react";

export default function NavBar({ stripped = false }: { stripped?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-rim bg-ink bg-opacity-95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-sky flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-ink" fill="currentColor" viewBox="0 0 16 16">
                <path d="M2 2h5v5H2V2zm7 0h5v5H9V2zM2 9h5v5H2V9zm7 3l2-2 2 2-2 2-2-2z"/>
              </svg>
            </div>
            <span className="text-sm font-semibold text-chalk tracking-tight">LocalProof</span>
            <span className="hidden sm:inline text-xs text-mist ml-1">by BuildRail</span>
          </Link>

          {!stripped && (
            <>
              <div className="hidden md:flex items-center gap-7">
                {[
                  { label: "How it works", href: "/how-it-works" },
                  { label: "Examples", href: "/examples" },
                  { label: "Pricing", href: "/pricing" },
                ].map((l) => (
                  <Link key={l.href} href={l.href} className="text-sm text-mist hover:text-chalk">
                    {l.label}
                  </Link>
                ))}
              </div>
              <div className="hidden md:flex items-center gap-3">
                <Link href="/start" className="text-sm text-mist hover:text-chalk">Log in</Link>
                <Link href="/start" className="text-sm font-semibold bg-sky hover:bg-skylit text-ink px-4 py-2 rounded-lg">
                  Start free
                </Link>
              </div>
              <button onClick={() => setOpen(!open)} className="md:hidden text-mist p-1">
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
        <div className="md:hidden border-t border-rim bg-panel px-5 pb-4">
          <div className="flex flex-col gap-3 pt-3">
            <Link href="/how-it-works" className="text-sm text-mist py-1" onClick={() => setOpen(false)}>How it works</Link>
            <Link href="/examples" className="text-sm text-mist py-1" onClick={() => setOpen(false)}>Examples</Link>
            <Link href="/pricing" className="text-sm text-mist py-1" onClick={() => setOpen(false)}>Pricing</Link>
            <Link href="/start" className="text-sm font-semibold bg-sky text-ink px-4 py-2.5 rounded-lg text-center" onClick={() => setOpen(false)}>
              Start free
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
