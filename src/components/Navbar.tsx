"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const links = [
  { label: "Services", href: "#services" },
  { label: "Projets", href: "#projets" },
  { label: "Plateforme", href: "#plateforme" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass border-b border-border py-4" : "py-6"}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="font-display font-bold text-lg tracking-tight group">
          <span className="gradient-text">Yves</span>
          <span className="text-text-3"></span>
          <span className="text-text-3 font-mono text-xs ml-1 opacity-0 group-hover:opacity-100 transition-opacity">codes</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-text-2 hover:text-text text-sm transition-colors duration-200 font-body">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <span className="flex items-center gap-2 text-xs text-teal font-mono">
            <span className="w-1.5 h-1.5 bg-teal rounded-full animate-pulse2" />
            Disponible
          </span>
          <Link href="#contact" className="px-4 py-2 bg-accent hover:bg-accent-dim text-white text-sm rounded-lg transition-all duration-200 font-body font-medium">
            Démarrer un projet →
          </Link>
        </div>
        <button className="md:hidden text-text-2 hover:text-text p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <div className="space-y-1.5">
            <span className={`block w-5 h-0.5 bg-current transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-current transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-current transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden glass border-t border-border mt-2 px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-text-2 hover:text-text text-sm transition-colors" onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link href="#contact" className="px-4 py-2 bg-accent text-white text-sm rounded-lg text-center" onClick={() => setMenuOpen(false)}>
            Démarrer un projet →
          </Link>
        </div>
      )}
    </header>
  );
}
