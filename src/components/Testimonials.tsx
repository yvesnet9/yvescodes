const TESTIMONIALS = [
  {
    name: "Sophie M.",
    role: "Fondatrice",
    company: "EcoShop",
    country: "🇧🇪 Belgique",
    rating: 5,
    text: "Yves a transformé notre idée en boutique e-commerce en un temps record. Le résultat dépasse nos attentes — design soigné, rapide et facile à gérer.",
    avatar: "S",
    color: "bg-teal/20 text-teal",
  },
  {
    name: "Marc D.",
    role: "CEO",
    company: "AnalyticsPro",
    country: "🇫🇷 France",
    rating: 5,
    text: "Professionnel, réactif et techniquement excellent. Notre dashboard SaaS est robuste et nos clients adorent l'interface. Je recommande sans hésiter.",
    avatar: "M",
    color: "bg-accent/20 text-accent",
  },
  {
    name: "Fatou K.",
    role: "Consultante",
    company: "Indépendante",
    country: "🇨🇭 Suisse",
    rating: 5,
    text: "Mon site vitrine est exactement ce que je voulais. Yves a su comprendre mes besoins dès le premier appel. Livraison dans les délais, parfait.",
    avatar: "F",
    color: "bg-orange-500/20 text-orange-400",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 relative">
      <div className="section-divider mb-24" />
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 flex flex-wrap justify-between items-end gap-6">
          <div>
            <span className="font-mono text-xs text-accent tracking-widest uppercase">
              Témoignages
            </span>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-text mt-3 tracking-tight">
              Ce que disent<br />mes clients
            </h2>
          </div>
          <div className="flex items-center gap-3 bg-bg-2 border border-border rounded-2xl px-6 py-4">
            <div>
              <div className="font-display font-bold text-3xl gradient-text">4.9</div>
              <div className="flex gap-0.5 my-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>
              <div className="text-text-3 text-xs font-mono">12+ projets livrés</div>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-bg-2 border border-border rounded-2xl p-6 hover:border-border-hover transition-all flex flex-col gap-4">
              {/* Stars */}
              <div className="flex gap-0.5">
                {[...Array(t.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>

              {/* Text */}
              <p className="text-text-2 text-sm font-body leading-relaxed flex-1">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-display font-bold ${t.color}`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="font-body font-medium text-text text-sm">{t.name}</div>
                  <div className="text-text-3 text-xs font-mono">{t.role} · {t.company} · {t.country}</div>
                </div>
                <div className="ml-auto text-xs text-text-3 font-mono">✓ Vérifié</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}