const PROJECTS = [
  {
    name: "MoneyPilot",
    desc: "Agent IA qui négocie automatiquement vos contrats télécom, énergie et assurance. Économies moyennes de 25-75 CHF/mois.",
    stack: ["Next.js", "AI", "Stripe", "PostgreSQL"],
    color: "from-accent/20 to-accent/5",
    accent: "#7c5dfa",
    emoji: "🤖",
    link: "https://www.getmoneypilot.com",
    year: "2024",
  },
  {
    name: "Trovu",
    desc: "Marketplace de seconde main gratuite, sans commission. Active en Suisse, Belgique, France, Luxembourg, Allemagne et Pays-Bas.",
    stack: ["Next.js", "Stripe", "PostgreSQL", "Node.js"],
    color: "from-teal/20 to-teal/5",
    accent: "#00c9a7",
    emoji: "🛍️",
    link: "https://www.trovu.ch",
    year: "2024",
  },
  {
    name: "Formia",
    desc: "SaaS pour créer et vendre sa formation en 15 minutes. 0% de commission, paiement Stripe, sans technique.",
    stack: ["Next.js", "Stripe", "Supabase", "Node.js"],
    color: "from-orange-500/20 to-orange-500/5",
    accent: "#f97316",
    emoji: "🎓",
    link: "https://www.myformia.com",
    year: "2024",
  },
  {
    name: "UnlockPro",
    desc: "Plateforme de déblocage téléphone, recharges et gift cards. 500 000+ recharges envoyées, livraison instantanée.",
    stack: ["Next.js", "Stripe", "PostgreSQL", "API"],
    color: "from-pink-500/20 to-pink-500/5",
    accent: "#ec4899",
    emoji: "📱",
    link: "https://www.unlockpro.fr",
    year: "2023",
  },
  {
    name: "SupersPro",
    desc: "Plateforme de mise en relation entre élèves et professeurs particuliers. Réservation, paiement et suivi intégrés.",
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
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-text mt-3 tracking-tight">Projets réels</h2>
          </div>
          <a href="https://github.com/yvesnet9" target="_blank" rel="noopener noreferrer" className="text-text-2 hover:text-text text-sm font-body border border-border hover:border-border-hover px-4 py-2 rounded-lg transition-all">Voir GitHub ↗</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((project) => (
            <div key={project.name} className="group relative rounded-2xl bg-bg-2 border border-border hover:border-border-hover overflow-hidden transition-all duration-300 hover:-translate-y-1">
              <div className={`h-36 bg-gradient-to-br ${project.color} flex items-center justify-center relative overflow-hidden`}>
                <span className="text-5xl">{project.emoji}</span>
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