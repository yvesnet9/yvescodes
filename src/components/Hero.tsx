"use client";

import { useEffect } from "react";
import Link from "next/link";

const TECH_TAGS = ["Next.js 14", "TypeScript", "React", "Node.js", "PostgreSQL", "Prisma", "Tailwind CSS", "Docker", "Stripe", "Vercel"];

const STATS = [
  { value: "12+", label: "projets livrés" },
  { value: "3 ans", label: "d'expérience" },
  { value: "100%", label: "satisfaction client" },
];

export default function Hero() {
  useEffect(() => {
    document.querySelectorAll(".stagger-1,.stagger-2,.stagger-3,.stagger-4,.stagger-5").forEach((el) => {
      el.classList.add("animate-fade-up");
    });
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center grid-bg overflow-hidden pt-24 pb-16">
      <div className="hero-glow" aria-hidden />
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent hidden lg:block" />
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent hidden lg:block" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Badge disponibilité avec urgence */}
        <div className="stagger-1 inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-teal/30 bg-teal/5 text-xs text-teal font-mono mb-8">
          <span className="w-1.5 h-1.5 bg-teal rounded-full animate-pulse2" />
          <span>1 place disponible pour juin 2026 — Remote / Bruxelles</span>
        </div>

        {/* Heading orienté résultats */}
        <h1 className="stagger-2 font-display font-extrabold leading-[0.95] tracking-tight mb-6">
          <span className="block text-5xl sm:text-6xl lg:text-8xl text-text">Sites web &</span>
          <span className="block text-5xl sm:text-6xl lg:text-8xl gradient-text">SaaS qui vendent.</span>
          <span className="block text-3xl sm:text-4xl lg:text-5xl text-text-2 mt-3 font-light">
            Du code propre. Des résultats mesurables.
          </span>
        </h1>

        {/* Subtext orienté business */}
        <p className="stagger-3 text-text-2 text-lg max-w-xl leading-relaxed mb-10 font-body">
          Développeur fullstack basé à Bruxelles — je transforme vos idées en produits web 
          <strong className="text-text"> rapides, premium et pensés pour convertir</strong>. 
          SaaS, e-commerce, applications sur mesure.
        </p>

        {/* CTAs orientés conversion */}
        <div className="stagger-4 flex flex-wrap gap-3 mb-16">
          
            href="https://cal.com/yvescodes/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-accent hover:bg-accent-dim text-white rounded-lg font-body font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            📅 Réserver un appel gratuit
          </a>
          <Link href="#projets" className="px-6 py-3 border border-border hover:border-border-hover text-text-2 hover:text-text rounded-lg font-body transition-all duration-200">
            Voir mes projets
          </Link>
          
            href="mailto:hello@yvescodes.com?subject=Demande de devis"
            className="px-6 py-3 border border-teal/20 hover:border-teal/40 text-teal hover:bg-teal/5 rounded-lg font-body transition-all duration-200"
          >
            Devis en 24h →
          </a>
        </div>

        {/* Tech tags */}
        <div className="stagger-5 flex flex-wrap gap-2 mb-16">
          {TECH_TAGS.map((tag) => <span key={tag} className="tech-tag">{tag}</span>)}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-lg">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-bg-2 border border-border rounded-xl p-4 text-center hover:border-border-hover transition-colors">
              <div className="font-display font-bold text-2xl gradient-text">{stat.value}</div>
              <div className="text-text-3 text-xs mt-1 font-body">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-3 text-xs animate-float">
        <span className="font-mono">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-text-3 to-transparent" />
      </div>
    </section>
  );
}