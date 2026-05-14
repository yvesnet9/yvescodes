"use client";

import { useState } from "react";

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
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleWaitlist = async () => {
    if (!email) return;
    setStatus("loading");
    setErrorMsg("");
    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (res.ok) {
      setStatus("success");
    } else {
      const data = await res.json();
      setErrorMsg(data.error === "Email déjà inscrit" ? "Cet email est déjà inscrit !" : "Une erreur est survenue.");
      setStatus("error");
    }
  };

  return (
    <section id="plateforme" className="py-24 relative">
      <div className="section-divider mb-24" />
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <span className="font-mono text-xs text-teal tracking-widest uppercase">04 — Plateforme SaaS</span>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-text mt-3 tracking-tight">
            Créez votre site<br /><span className="text-teal">vous-même.</span>
          </h2>
          <p className="text-text-2 mt-4 max-w-lg font-body">
            Notre plateforme en ligne vous permet de lancer un site professionnel en quelques minutes — sans coder.
          </p>
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

            {status === "success" ? (
              <p className="text-teal text-sm font-body font-medium">✅ Inscrit avec succès ! On vous contacte bientôt.</p>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex gap-3 flex-wrap">
                  <input
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-4 py-2.5 bg-bg-3 border border-border rounded-lg text-sm text-text placeholder-text-3 font-body focus:outline-none focus:border-teal/40 w-56 transition-colors"
                  />
                  <button
                    onClick={handleWaitlist}
                    disabled={status === "loading"}
                    className="px-5 py-2.5 bg-teal hover:bg-teal-dim disabled:opacity-50 text-bg font-body font-semibold text-sm rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {status === "loading" ? "..." : "Rejoindre ✓"}
                  </button>
                </div>
                {status === "error" && (
                  <p className="text-red-400 text-xs font-body">{errorMsg}</p>
                )}
              </div>
            )}
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