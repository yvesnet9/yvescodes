const GUARANTEES = [
  {
    icon: "🛡️",
    title: "Satisfaction garantie",
    desc: "30 jours de garantie sur tous les bugs liés au développement après livraison. Je corrige sans frais supplémentaires.",
    color: "border-accent/20 hover:border-accent/40",
  },
  {
    icon: "💳",
    title: "Paiement sécurisé",
    desc: "Paiements via Stripe, certifié PCI-DSS niveau 1. Aucune donnée bancaire stockée sur nos serveurs.",
    color: "border-teal/20 hover:border-teal/40",
  },
  {
    icon: "⚡",
    title: "Livraison dans les délais",
    desc: "Les délais sont définis dans le devis et respectés. En cas de retard de ma part, des pénalités s'appliquent.",
    color: "border-accent/20 hover:border-accent/40",
  },
  {
    icon: "💬",
    title: "Support 30 jours inclus",
    desc: "Je reste disponible 30 jours après livraison pour répondre à vos questions et corriger d'éventuels problèmes.",
    color: "border-teal/20 hover:border-teal/40",
  },
];

export default function Guarantees() {
  return (
    <section className="py-24 relative">
      <div className="section-divider mb-24" />
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <span className="font-mono text-xs text-accent tracking-widest uppercase">
            Garanties
          </span>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-text mt-3 tracking-tight">
            Travaillez l'esprit<br />
            <span className="gradient-text">tranquille.</span>
          </h2>
          <p className="text-text-2 mt-4 max-w-lg font-body">
            Chaque projet est livré avec des garanties concrètes. Pas de mauvaises surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {GUARANTEES.map((g) => (
            <div key={g.title} className={`bg-bg-2 border rounded-2xl p-6 transition-all duration-300 ${g.color}`}>
              <div className="text-3xl mb-4">{g.icon}</div>
              <h3 className="font-display font-semibold text-lg text-text mb-2">{g.title}</h3>
              <p className="text-text-2 text-sm font-body leading-relaxed">{g.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 p-8 rounded-2xl bg-bg-2 border border-border flex flex-wrap items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-semibold text-xl text-text mb-1">
              Prêt à démarrer votre projet ?
            </h3>
            <p className="text-text-2 text-sm font-body">
              Premier appel gratuit · Devis sous 24h · Sans engagement
            </p>
          </div>
          
            href="#contact"
            className="px-6 py-3 bg-accent hover:bg-accent-dim text-white rounded-xl font-body font-medium transition-all hover:scale-[1.02]"
          >
            Discutons de votre projet →
          </a>
        </div>
      </div>
    </section>
  );
}