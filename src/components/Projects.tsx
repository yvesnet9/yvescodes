const PROJECTS = [
  {
    name: "MoneyPilot",
    desc: "Agent de négociation automatique de contrats. 25-75 CHF/mois d'économies moyennes par utilisateur, actif en Suisse.",
    result: "🇨🇭 Actif en Suisse",
    stack: ["Next.js", "AI", "Stripe", "PostgreSQL"],
    color: "from-accent/20 to-accent/5",
    accent: "#7c5dfa",
    emoji: "🤖",
    link: "https://www.getmoneypilot.com",
    year: "2024",
  },
  {
    name: "Trovu",
    desc: "Marketplace de seconde main gratuite, sans commission. Architecture scalable multi-pays.",
    result: "🌍 6 pays couverts",
    stack: ["Next.js", "Stripe", "PostgreSQL", "Node.js"],
    color: "from-teal/20 to-teal/5",
    accent: "#00c9a7",
    emoji: "🛍️",
    link: "https://www.trovu.ch",
    year: "2024",
  },
  {
    name: "Formia",
    desc: "SaaS de création et vente de formations. 0% de commission, paiement Stripe intégré.",
    result: "🎓 23 consultants actifs",
    stack: ["Next.js", "Stripe", "Supabase", "Node.js"],
    color: "from-orange-500/20 to-orange-500/5",
    accent: "#f97316",
    emoji: "🎓",
    link: "https://www.myformia.com",
    year: "2024",
  },
  {
    name: "UnlockPro",
    desc: "Plateforme de recharges mobiles et déblocage téléphone. Livraison instantanée, paiement Stripe.",
    result: "📱 500 000+ recharges",
    stack: ["Next.js", "Stripe", "PostgreSQL", "API"],
    color: "from-pink-500/20 to-pink-500/5",
    accent: "#ec4899",
    emoji: "📱",
    link: "https://www.unlockpro.fr",
    year: "2023",
  },
  {
    name: "SupersPro",
    desc: "Plateforme de mise en relation élèves-professeurs. Réservation, paiement et suivi intégrés.",
    result: "📚 Multi-matières",
    stack: ["Next.js", "Stripe", "Supabase", "Tailwind"],
    color: "from-amber-500/20 to-amber-500/5",
    accent: "#f59e0b",
    emoji: "📚",
    link: "https://www.superspro.com",
    year: "2023",
  },
];

export default function Projects() {
  return (
    <section id="projets" className="py-24 relative">
      <div className="section-divider mb-24" />
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap justify-between items-end mb-16 gap-6">
          <div>
            <span className="font-mono text-xs text-accent tracking-widest uppercase">03 — Portfolio</span>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-text mt-3 tracking-tight">Projets réels,<br />résultats concrets</h2>
          </div>
          <a href="https://github.com/yvesnet9" target="_blank" rel="noopener noreferrer" className="text-text-2 hover:text-text text-sm font-body border border-border hover:border-border-hover px-4 py-2 rounded-lg transition-all">Voir GitHub ↗</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((project) => (
            <div key={project.name} className="group relative rounded-2xl bg-bg-2 border border-border hover:border-border-hover overflow-hidden transition-all duration-300 hover:-translate-y-1">
              <div className={`h-36 bg-gradient-to-br ${project.color} flex items-center justify-center relative overflow-hidden`}>
                <span className="text-5xl">{project.emoji}</span>
                <div className="absolute top-3 right-3 px-2 py-1 bg-black/30 rounded-lg text-xs font-mono text-white/70">
                  {project.year}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-display font-semibold text-xl text-text">{project.name}</h3>
                </div>

                {/* Résultat chiffré */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono mb-3" style={{ background: project.accent + "15", color: project.accent }}>
                  {project.result}
                </div>

                <p className="text-text-2 text-sm leading-relaxed mb-4 font-body">{project.desc}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.stack.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 bg-bg-3 border border-border rounded-lg text-xs font-mono" style={{ color: project.accent + "cc" }}>{tech}</span>
                  ))}
                </div>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-body transition-colors" style={{ color: project.accent }}>
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