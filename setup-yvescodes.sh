#!/bin/bash
mkdir -p src/components

# ─── tailwind.config.ts ───────────────────────────────────────────────────────
cat > tailwind.config.ts << 'EOF'
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#08090e",
          2: "#0d0e16",
          3: "#13141f",
          4: "#1a1b2a",
        },
        accent: {
          DEFAULT: "#7c5dfa",
          dim: "#5a3fd4",
          glow: "rgba(124,93,250,0.15)",
        },
        teal: {
          DEFAULT: "#00c9a7",
          dim: "#009e84",
          glow: "rgba(0,201,167,0.12)",
        },
        text: {
          DEFAULT: "#eeedf8",
          2: "#8887a0",
          3: "#4a4960",
        },
        border: {
          DEFAULT: "rgba(255,255,255,0.06)",
          hover: "rgba(255,255,255,0.12)",
          accent: "rgba(124,93,250,0.3)",
        },
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-outfit)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.5s ease forwards",
        pulse2: "pulse2 2.5s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pulse2: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
EOF

# ─── src/app/globals.css ──────────────────────────────────────────────────────
cat > src/app/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --font-syne: "Syne", sans-serif;
  --font-outfit: "Outfit", sans-serif;
  --font-jetbrains: "JetBrains Mono", monospace;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }

body {
  background-color: #08090e;
  color: #eeedf8;
  font-family: var(--font-outfit);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #08090e; }
::-webkit-scrollbar-thumb { background: rgba(124,93,250,0.4); border-radius: 3px; }

.hero-glow {
  position: absolute;
  top: -200px;
  left: 50%;
  transform: translateX(-50%);
  width: 700px;
  height: 700px;
  background: radial-gradient(circle, rgba(124,93,250,0.12) 0%, transparent 70%);
  pointer-events: none;
}

.grid-bg {
  background-image:
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 48px 48px;
}

.gradient-text {
  background: linear-gradient(135deg, #7c5dfa 0%, #00c9a7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.glass {
  background: rgba(13, 14, 22, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.stagger-1 { animation-delay: 0.1s; opacity: 0; }
.stagger-2 { animation-delay: 0.2s; opacity: 0; }
.stagger-3 { animation-delay: 0.3s; opacity: 0; }
.stagger-4 { animation-delay: 0.4s; opacity: 0; }
.stagger-5 { animation-delay: 0.5s; opacity: 0; }

.tech-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  background: rgba(124,93,250,0.08);
  border: 1px solid rgba(124,93,250,0.2);
  border-radius: 20px;
  font-family: var(--font-jetbrains);
  font-size: 12px;
  color: #8887a0;
  transition: all 0.2s;
}

.tech-tag:hover {
  background: rgba(124,93,250,0.15);
  border-color: rgba(124,93,250,0.4);
  color: #c4b8ff;
}

.section-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
}
EOF

# ─── src/app/layout.tsx ───────────────────────────────────────────────────────
cat > src/app/layout.tsx << 'EOF'
import type { Metadata } from "next";
import { Syne, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yves — Fullstack Developer & Digital Craftsman",
  description: "Je conçois et développe des expériences web premium — portfolios, sites vitrine, applications SaaS et e-commerce.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${syne.variable} ${outfit.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}
EOF

# ─── src/app/page.tsx ─────────────────────────────────────────────────────────
cat > src/app/page.tsx << 'EOF'
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import SaasTeaser from "@/components/SaasTeaser";
import ContactFooter from "@/components/ContactFooter";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Projects />
      <SaasTeaser />
      <ContactFooter />
    </main>
  );
}
EOF

# ─── src/components/Navbar.tsx ────────────────────────────────────────────────
cat > src/components/Navbar.tsx << 'EOF'
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
          <span className="text-text-3">.</span>
          <span className="text-text-3 font-mono text-xs ml-1 opacity-0 group-hover:opacity-100 transition-opacity">dev</span>
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
EOF

# ─── src/components/Hero.tsx ──────────────────────────────────────────────────
cat > src/components/Hero.tsx << 'EOF'
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
        <div className="stagger-1 inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-border bg-bg-2 text-xs text-text-2 font-mono mb-8">
          <span className="w-1.5 h-1.5 bg-teal rounded-full animate-pulse2" />
          <span>Disponible pour de nouveaux projets</span>
          <span className="text-text-3 mx-1">·</span>
          <span className="text-teal">Remote / Bruxelles</span>
        </div>
        <h1 className="stagger-2 font-display font-extrabold leading-[0.95] tracking-tight mb-6">
          <span className="block text-5xl sm:text-6xl lg:text-8xl text-text">Fullstack</span>
          <span className="block text-5xl sm:text-6xl lg:text-8xl gradient-text">developer.</span>
          <span className="block text-4xl sm:text-5xl lg:text-6xl text-text-2 mt-2 font-light">Je crée des expériences</span>
          <span className="block text-4xl sm:text-5xl lg:text-6xl text-text-2 font-light">qui <em className="text-text not-italic">marquent</em>.</span>
        </h1>
        <p className="stagger-3 text-text-2 text-lg max-w-xl leading-relaxed mb-10 font-body">
          Du portfolio élégant au SaaS sur mesure — je conçois et développe des produits web qui convertissent, performent et impressionnent.
        </p>
        <div className="stagger-4 flex flex-wrap gap-3 mb-16">
          <Link href="#projets" className="px-6 py-3 bg-accent hover:bg-accent-dim text-white rounded-lg font-body font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">Voir mes projets</Link>
          <Link href="#services" className="px-6 py-3 border border-border hover:border-border-hover text-text-2 hover:text-text rounded-lg font-body transition-all duration-200">Mes services</Link>
          <Link href="#plateforme" className="px-6 py-3 border border-teal/20 hover:border-teal/40 text-teal hover:bg-teal/5 rounded-lg font-body transition-all duration-200">Créer mon site ↗</Link>
        </div>
        <div className="stagger-5 flex flex-wrap gap-2 mb-16">
          {TECH_TAGS.map((tag) => <span key={tag} className="tech-tag">{tag}</span>)}
        </div>
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
EOF

# ─── src/components/Services.tsx ──────────────────────────────────────────────
cat > src/components/Services.tsx << 'EOF'
const SERVICES = [
  { icon: "🖥", title: "Site Vitrine", desc: "Design premium, SEO optimisé, rapide et responsive.", price: "à partir de 800€", tags: ["Next.js", "Tailwind", "SEO"], featured: false },
  { icon: "🛒", title: "E-commerce", desc: "Boutique complète avec paiement Stripe, gestion du stock et tableau de bord admin.", price: "à partir de 1 500€", tags: ["Stripe", "Prisma", "Dashboard"], featured: true },
  { icon: "⚡", title: "Application Web", desc: "SaaS, dashboard, outil métier — architecture fullstack robuste et scalable.", price: "Sur devis", tags: ["API", "Auth", "DB"], featured: false },
  { icon: "🔄", title: "Refonte", desc: "Modernisation de votre site existant — design, performance et stack mis à jour.", price: "à partir de 600€", tags: ["Migration", "Perf", "UX"], featured: false },
];

export default function Services() {
  return (
    <section id="services" className="py-24 relative">
      <div className="section-divider mb-24" />
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <span className="font-mono text-xs text-accent tracking-widest uppercase">02 — Services</span>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-text mt-3 tracking-tight">Ce que je construis</h2>
          <p className="text-text-2 mt-4 max-w-lg font-body">Chaque projet est unique. Je m'adapte à ton besoin — du simple site de présentation à l'application complexe.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((service) => (
            <div key={service.title} className={`relative rounded-2xl p-6 border transition-all duration-300 group hover:-translate-y-1 ${service.featured ? "border-accent/40 bg-accent-glow" : "border-border hover:border-border-hover bg-bg-2"}`}>
              {service.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 bg-accent text-white text-xs rounded-full font-body font-medium whitespace-nowrap">Le plus demandé</span>
                </div>
              )}
              <div className="text-3xl mb-4 animate-float">{service.icon}</div>
              <h3 className="font-display font-semibold text-lg text-text mb-2">{service.title}</h3>
              <p className="text-text-2 text-sm leading-relaxed mb-4 font-body">{service.desc}</p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {service.tags.map((tag) => <span key={tag} className="px-2 py-0.5 bg-bg-3 border border-border rounded text-xs font-mono text-text-3">{tag}</span>)}
              </div>
              <div className="font-display font-bold text-lg gradient-text">{service.price}</div>
            </div>
          ))}
        </div>
        <div className="mt-16 p-8 rounded-2xl bg-bg-2 border border-border">
          <div className="flex flex-wrap gap-8 items-center justify-between">
            <div>
              <h3 className="font-display font-semibold text-xl text-text mb-2">Comment je travaille</h3>
              <p className="text-text-2 text-sm font-body">Un processus clair, transparent et collaboratif à chaque étape.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              {["Brief", "Design", "Dev", "Livraison"].map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full border border-accent/40 flex items-center justify-center text-xs font-mono text-accent">{i + 1}</div>
                  <span className="text-text-2 text-sm font-body">{step}</span>
                  {i < 3 && <span className="text-text-3 text-xs">→</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
EOF

# ─── src/components/Projects.tsx ──────────────────────────────────────────────
cat > src/components/Projects.tsx << 'EOF'
const PROJECTS = [
  { name: "AnalyticsPro", desc: "Dashboard SaaS de visualisation de données en temps réel pour PME.", stack: ["Next.js", "Chart.js", "Prisma", "PostgreSQL"], color: "from-accent/20 to-accent/5", accent: "#7c5dfa", emoji: "📊", link: "#", year: "2024" },
  { name: "EcoShop", desc: "Boutique e-commerce éco-responsable avec paiement Stripe et gestion d'inventaire.", stack: ["React", "Node.js", "Stripe", "MongoDB"], color: "from-teal/20 to-teal/5", accent: "#00c9a7", emoji: "🌿", link: "#", year: "2024" },
  { name: "TeamFlow", desc: "Outil de collaboration interne avec messagerie temps réel et gestion de tâches.", stack: ["Vue.js", "Socket.io", "Express", "PostgreSQL"], color: "from-orange-500/20 to-orange-500/5", accent: "#f97316", emoji: "⚡", link: "#", year: "2023" },
  { name: "DevPortal", desc: "Portail de documentation interactive avec search full-text et versioning.", stack: ["Next.js", "MDX", "Algolia", "Vercel"], color: "from-pink-500/20 to-pink-500/5", accent: "#ec4899", emoji: "📖", link: "#", year: "2023" },
];

export default function Projects() {
  return (
    <section id="projets" className="py-24 relative">
      <div className="section-divider mb-24" />
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap justify-between items-end mb-16 gap-6">
          <div>
            <span className="font-mono text-xs text-accent tracking-widest uppercase">03 — Portfolio</span>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-text mt-3 tracking-tight">Projets récents</h2>
          </div>
          <a href="https://github.com/yvesnet9" target="_blank" rel="noopener noreferrer" className="text-text-2 hover:text-text text-sm font-body border border-border hover:border-border-hover px-4 py-2 rounded-lg transition-all">Voir GitHub ↗</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PROJECTS.map((project) => (
            <div key={project.name} className="group relative rounded-2xl bg-bg-2 border border-border hover:border-border-hover overflow-hidden transition-all duration-300 hover:-translate-y-1">
              <div className={`h-44 bg-gradient-to-br ${project.color} flex items-center justify-center relative overflow-hidden`}>
                <span className="text-6xl">{project.emoji}</span>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display font-semibold text-xl text-text">{project.name}</h3>
                  <span className="font-mono text-xs text-text-3 pt-1">{project.year}</span>
                </div>
                <p className="text-text-2 text-sm leading-relaxed mb-4 font-body">{project.desc}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.stack.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 bg-bg-3 border border-border rounded-lg text-xs font-mono" style={{ color: project.accent + "cc" }}>{tech}</span>
                  ))}
                </div>
                <a href={project.link} className="inline-flex items-center gap-2 text-sm font-body transition-colors" style={{ color: project.accent }}>
                  Voir le projet <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
EOF

# ─── src/components/SaasTeaser.tsx ────────────────────────────────────────────
cat > src/components/SaasTeaser.tsx << 'EOF'
const STEPS = [
  { num: "01", label: "Choisir un template" },
  { num: "02", label: "Personnaliser le contenu" },
  { num: "03", label: "Choisir le stack (pro)" },
  { num: "04", label: "Publier en un clic" },
];

const FEATURES = [
  { emoji: "🎨", title: "Templates premium", desc: "Designs soignés, prêts à l'emploi." },
  { emoji: "⚙️", title: "Stack au choix", desc: "React, Vue, Astro — pour les devs." },
  { emoji: "🌐", title: "Sous-domaine inclus", desc: "monsite.yvescodes.com dès la création." },
  { emoji: "📈", title: "Analytics intégré", desc: "Visiteurs, clics, conversions." },
];

export default function SaasTeaser() {
  return (
    <section id="plateforme" className="py-24 relative">
      <div className="section-divider mb-24" />
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <span className="font-mono text-xs text-teal tracking-widest uppercase">04 — Plateforme SaaS</span>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-text mt-3 tracking-tight">Créez votre site<br /><span className="text-teal">vous-même.</span></h2>
          <p className="text-text-2 mt-4 max-w-lg font-body">Notre plateforme en ligne vous permet de lancer un site professionnel en quelques minutes — sans coder.</p>
        </div>
        <div className="rounded-3xl border border-teal/20 overflow-hidden">
          <div className="border-b border-teal/10 px-8 py-6">
            <div className="flex flex-wrap gap-3">
              {STEPS.map((step, i) => (
                <div key={step.num} className="flex items-center gap-2.5 px-4 py-2 rounded-lg bg-bg-3 border border-teal/10">
                  <span className="font-mono text-xs text-teal">{step.num}</span>
                  <span className="text-text-2 text-xs font-body">{step.label}</span>
                  {i < STEPS.length - 1 && <span className="text-text-3 text-xs ml-1">→</span>}
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {FEATURES.map((feat, i) => (
              <div key={feat.title} className={`p-6 bg-bg-2 ${i < FEATURES.length - 1 ? "border-r border-teal/10" : ""}`}>
                <div className="text-2xl mb-3">{feat.emoji}</div>
                <div className="font-display font-semibold text-text text-sm mb-1">{feat.title}</div>
                <div className="text-text-2 text-xs leading-relaxed font-body">{feat.desc}</div>
              </div>
            ))}
          </div>
          <div className="border-t border-teal/10 px-8 py-6 bg-bg-2 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="font-display font-semibold text-text text-lg">Bêta ouverte bientôt</div>
              <div className="text-text-2 text-sm font-body mt-1">Rejoignez la liste d'attente pour un accès anticipé gratuit.</div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <input type="email" placeholder="votre@email.com" className="px-4 py-2.5 bg-bg-3 border border-border rounded-lg text-sm text-text placeholder-text-3 font-body focus:outline-none focus:border-teal/40 w-56" />
              <button className="px-5 py-2.5 bg-teal hover:bg-teal-dim text-bg font-body font-semibold text-sm rounded-lg transition-all">Rejoindre ✓</button>
            </div>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { plan: "Starter", price: "0€", desc: "1 site, template de base", accent: false },
            { plan: "Pro", price: "19€/mois", desc: "Sites illimités, stack au choix", accent: true },
            { plan: "Agency", price: "49€/mois", desc: "White-label, clients illimités", accent: false },
          ].map((p) => (
            <div key={p.plan} className={`rounded-xl bg-bg-2 border ${p.accent ? "border-accent/40" : "border-border"} p-5 flex items-center gap-4`}>
              <div className="flex-1">
                <div className="font-display font-semibold text-text text-sm">{p.plan}</div>
                <div className="text-text-2 text-xs mt-0.5 font-body">{p.desc}</div>
              </div>
              <div className="font-display font-bold text-lg gradient-text whitespace-nowrap">{p.price}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
EOF

# ─── src/components/ContactFooter.tsx ─────────────────────────────────────────
cat > src/components/ContactFooter.tsx << 'EOF'
export default function ContactFooter() {
  return (
    <>
      <section id="contact" className="py-24 relative">
        <div className="section-divider mb-24" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-3xl bg-bg-2 border border-border p-8 lg:p-16 relative overflow-hidden">
            <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-accent opacity-5 blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl">
              <span className="font-mono text-xs text-accent tracking-widest uppercase">05 — Contact</span>
              <h2 className="font-display font-bold text-4xl lg:text-5xl text-text mt-3 mb-4 tracking-tight">On travaille<br /><span className="gradient-text">ensemble ?</span></h2>
              <p className="text-text-2 font-body leading-relaxed mb-10">Tu as un projet en tête ? Écris-moi — je réponds sous 24h et le premier appel est gratuit.</p>
              <div className="flex flex-wrap gap-4">
                <a href="mailto:hello@yvescodes.com" className="px-6 py-3 bg-accent hover:bg-accent-dim text-white rounded-lg font-body font-medium transition-all duration-200 hover:scale-[1.02]">hello@yvescodes.com ✉</a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-border hover:border-border-hover text-text-2 hover:text-text rounded-lg font-body transition-all">LinkedIn ↗</a>
              </div>
              <div className="mt-8 flex items-center gap-3 text-sm text-text-2 font-body">
                <div className="w-2 h-2 bg-teal rounded-full animate-pulse2" />
                <span>Prochaine disponibilité : <strong className="text-text">Juin 2025</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <span className="font-display font-bold gradient-text">Yves.</span>
            <span className="text-text-3 text-xs font-mono">© {new Date().getFullYear()} — Fullstack Developer</span>
          </div>
          <div className="flex items-center gap-6">
            {[{ label: "GitHub", href: "https://github.com/yvesnet9" }, { label: "LinkedIn", href: "https://linkedin.com" }, { label: "Twitter", href: "https://twitter.com" }].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-text-3 hover:text-text text-xs font-body transition-colors">{s.label}</a>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs text-text-3 font-mono">
            <span>Made with</span><span className="text-accent">Next.js</span><span>&</span><span className="text-teal">Tailwind</span>
          </div>
        </div>
      </footer>
    </>
  );
}
EOF

echo ""
echo "✅ Tous les fichiers ont été créés avec succès !"
echo ""
echo "Lance maintenant : npm run dev"
