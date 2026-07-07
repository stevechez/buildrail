"use client";
import { useState, useEffect } from "react";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const sections = [
    { label: "The Lifecycle", id: "lifecycle" },
    { label: "Products", id: "products" },
    { label: "Audience", id: "audience" },
    { label: "Revenue", id: "revenue" },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-void bg-opacity-95 backdrop-blur-md border-b border-rim" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-14">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-orange flex items-center justify-center flex-shrink-0">
            <svg className="w-3.5 h-3.5 text-void" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 2L4.09 12.97A1 1 0 005 14.5h6.5L10 22l9.91-10.97A1 1 0 0019 10h-6.5L13 2z"/>
            </svg>
          </div>
          <span className="text-sm font-bold text-chalk">Build<span className="text-orange">Rail</span></span>
          <span className="hidden sm:inline text-xs text-fog ml-1 border border-rim px-1.5 py-0.5 rounded font-mono">Ecosystem</span>
        </div>
        <div className="hidden md:flex items-center gap-7">
          {sections.map(s => (
            <button key={s.id} onClick={() => scrollTo(s.id)} className="text-xs text-fog hover:text-chalk font-mono uppercase tracking-wider">
              {s.label}
            </button>
          ))}
        </div>
        <button onClick={() => scrollTo("products")} className="text-xs font-bold bg-orange hover:bg-oranglit text-void px-4 py-2 rounded-lg">
          Explore products
        </button>
      </div>
    </nav>
  );
}
