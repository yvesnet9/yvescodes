type Service = {
  icon: string;
  title: string;
  desc: string;
  price: string;
  includes: string[];
  tags: string[];
  featured?: boolean;
  cta?: { label: string; href: string };
};

const SERVICES: Service[] = [
  {
    icon: "🖥",
    title: "Site qui convertit",
    desc: "Un site vitrine premium qui transforme vos visiteurs en clients. SEO optimisé, rapide et responsive.",
    price: "à partir de 800€",
    includes: ["Design premium", "SEO optimisé", "Responsive", "Formulaire de contact", "Livraison 7-14 jours"],
    tags: ["Next.js", "Tailwind", "SEO"],
    featured: false,
  },
  {
    icon: "🛒",
    title: "E-commerce performant",
    desc: "Boutique complète prête à vendre — paiement Stripe, gestion du stock, dashboard admin.",
    price: "à partir de 1 500€",
    includes: ["Paiement Stripe", "Gestion stock", "Dashboard admin", "Emails automatiques", "Mobile first"],
    tags: ["Stripe", "Prisma", "Dashboard"],
    featured: true,
  },
  {
    icon: "⚡",
    title: "SaaS scalable",
    desc: "Application web ou SaaS prêt à monétiser — auth, paiements récurrents, dashboard, API.",
    price: "Sur devis",
    includes: ["Auth complète", "Stripe abonnements", "Dashboard", "API REST", "Documentation"],
    tags: ["API", "Auth", "DB"],
    featured: false,
  },
  {
    icon: "🔄",
    title: "Refonte conversion",
    desc: "Modernisation de votre site — nouveau design, stack optimisé et performances boostées.",
    price: "à partir de 600€",
    includes: ["Audit gratuit", "Nouveau design", "Performance +", "SEO migré", "Formation incluse"],
    tags: ["Migration", "Perf", "UX"],
    featured: false,
  },
  {
    icon: "🔑",
    title: "Site Location Vitrine",
    desc: "Votre site professionnel sans investissement de départ — je m'occupe de tout, vous payez au mois.",
    price: "49€/mois",
    includes: ["En ligne sous 2 semaines", "Hébergement & maintenance inclus", "Mises à jour 1h/mois", "Support permanent", "Appel de cadrage offert"],
    tags: ["Tout inclus", "12 mois"],
    featured: false,
    cta: { label: "Démarrer ma location", href: "https://buy.stripe.com/6oUcN5aEJ7Gb4S89nf43S00" },
  },
  {
    icon: "🚀",
    title: "Site Location Pro",
    desc: "La formule complète — plus de pages, galeries, multilingue. Une présence qui grandit avec vous.",
    price: "99€/mois",
    includes: ["Site complet multi-pages", "Galeries photos & vidéos", "Option multilingue", "Maintenance & support inclus", "Appel de cadrage offert"],
    tags: ["Complet", "12 mois"],
    featured: false,
    cta: { label: "Démarrer ma location", href: "https://buy.stripe.com/dRm9AT28daSn70ggPH43S01" },
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 relative">
      <div className="section-divider mb-24" />
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <span className="font-mono text-xs text-accent tracking-widest uppercase">02 — Services</span>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-text mt-3 tracking-tight">Ce que je construis</h2>
          <p className="text-text-2 mt-4 max-w-lg font-body">Chaque projet est livré avec un objectif clair — plus de clients, plus de ventes, plus de croissance.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service) => (
            <div key={service.title} className={`relative rounded-2xl p-6 border transition-all duration-300 group hover:-translate-y-1 flex flex-col ${service.featured ? "border-accent/40 bg-accent/5" : "border-border hover:border-border-hover bg-bg-2"}`}>
              {service.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 bg-accent text-white text-xs rounded-full font-body font-medium whitespace-nowrap">Le plus demandé</span>
                </div>
              )}
              <div className="text-3xl mb-4">{service.icon}</div>
              <h3 className="font-display font-semibold text-lg text-text mb-2">{service.title}</h3>
              <p className="text-text-2 text-sm leading-relaxed mb-4 font-body flex-1">{service.desc}</p>

              {/* Inclus */}
              <ul className="space-y-1 mb-5">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs font-body text-text-2">
                    <span className="text-teal">✓</span> {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {service.tags.map((tag) => <span key={tag} className="px-2 py-0.5 bg-bg-3 border border-border rounded text-xs font-mono text-text-3">{tag}</span>)}
              </div>
              <div className="font-display font-bold text-lg gradient-text">{service.price}</div>
              {service.cta && (
                <a
                  href={service.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center justify-center w-full px-4 py-2.5 bg-accent text-white text-sm font-body font-medium rounded-xl hover:opacity-90 transition-opacity"
                >
                  {service.cta.label}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Process */}
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
