"use client";
import Link from "next/link";
import { useState } from "react";

const BoltIcon = () => (
  <svg className="w-4 h-4 text-void" fill="currentColor" viewBox="0 0 24 24">
    <path d="M13 2L4.09 12.97A1 1 0 005 14.5h6.5L10 22l9.91-10.97A1 1 0 0019 10h-6.5L13 2z"/>
  </svg>
);

export default function NavBar({ stripped = false }: { stripped?: boolean }) {
  const [open, setOpen] = useState(false);
  const navLinks = [
    { label: "How it Works", href: "/how-it-works" },
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Examples", href: "/examples" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-rim bg-void bg-opacity-95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-orange flex items-center justify-center flex-shrink-0">
              <BoltIcon />
            </div>
            <span className="text-sm font-bold text-chalk">
              BuildRail <span className="text-orange">Sites</span>
            </span>
          </Link>

          {!stripped && (
            <>
              <div className="hidden md:flex items-center gap-7">
                {navLinks.map((l) => (
                  <Link key={l.href} href={l.href} className="text-sm text-mist hover:text-chalk">{l.label}</Link>
                ))}
              </div>
              <div className="hidden md:flex items-center gap-3">
                <Link href="/admin" className="text-sm text-mist hover:text-chalk">Staff Login</Link>
                <Link href="/start" className="flex items-center gap-1.5 text-sm font-bold bg-orange hover:bg-oranglit text-void px-4 py-2 rounded-lg">
                  Start Build →
                </Link>
              </div>
              <button onClick={() => setOpen(!open)} className="md:hidden text-mist p-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {open
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                  }
                </svg>
              </button>
            </>
          )}
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-rim bg-carbon px-5 pb-4">
          <div className="flex flex-col gap-3 pt-3">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm text-mist py-1" onClick={() => setOpen(false)}>{l.label}</Link>
            ))}
            <Link href="/start" className="text-sm font-bold bg-orange text-void px-4 py-2.5 rounded-lg text-center mt-1" onClick={() => setOpen(false)}>
              Start Build →
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
