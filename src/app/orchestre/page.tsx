"use client";
import { useState } from "react";

const EXEMPLES = [
  { tag: "Ecriture", texte: "Redige un email professionnel pour demander un delai" },
  { tag: "Recherche", texte: "Quelles sont les tendances business de cette semaine ?" },
  { tag: "Analyse", texte: "Comment optimiser les performances d'une app Next.js ?" },
  { tag: "Creation", texte: "Donne-moi 5 idees de contenu pour LinkedIn" },
  { tag: "Code", texte: "Explique la difference entre useMemo et useCallback" },
  { tag: "Marketing", texte: "Redige une description produit pour une montre premium" },
];

export default function Orchestre() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) setSubmitted(true);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <main style={{ fontFamily: "'DM Sans', sans-serif", background: "#09090b", color: "#fafafa", minHeight: "100vh", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />

      {/* Nav */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "0.5px solid rgba(255,255,255,0.06)", background: "rgba(9,9,11,0.88)", backdropFilter: "blur(12px)" }}>
        <a href="/" style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
          <span>←</span> yvescodes.com
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18 }}>🎼</span>
          <span style={{ fontSize: 15, fontWeight: 500, letterSpacing: "-0.02em" }}>Un Orchestre</span>
        </div>
        <a href="#waitlist" style={{ fontSize: 13, padding: "8px 16px", border: "0.5px solid rgba(255,255,255,0.15)", borderRadius: 8, color: "#fafafa", textDecoration: "none" }}>
          Acces anticipe
        </a>
      </nav>

      {/* Hero */}
      <section style={{ paddingTop: 140, paddingBottom: 80, textAlign: "center", padding: "140px 24px 80px", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(127,119,221,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "0.5px solid rgba(127,119,221,0.25)", borderRadius: 20, padding: "6px 14px", marginBottom: 32, background: "rgba(127,119,221,0.06)" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#7F77DD", display: "inline-block" }} />
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", letterSpacing: "0.05em" }}>ACCES ANTICIPE · JUILLET 2026</span>
        </div>
        <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(40px, 7vw, 80px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.02em", margin: "0 auto 24px", maxWidth: 800 }}>
          Posez votre question.<br />
          <span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.4)" }}>Obtenez la reponse parfaite.</span>
        </h1>
        <p style={{ fontSize: 17, color: "rgba(255,255,255,0.4)", maxWidth: 440, margin: "0 auto 48px", lineHeight: 1.7, fontWeight: 300 }}>
          Une seule interface. Toutes les expertises. Automatiquement.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#waitlist" style={{ padding: "14px 28px", background: "#fafafa", color: "#09090b", borderRadius: 10, fontSize: 14, fontWeight: 500, textDecoration: "none" }}>
            Rejoindre la liste d&apos;attente
          </a>
          <a href="#comment" style={{ padding: "14px 28px", border: "0.5px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)", borderRadius: 10, fontSize: 14, textDecoration: "none" }}>
            Comment ca marche
          </a>
        </div>
      </section>

      {/* Piliers */}
      <section style={{ padding: "60px 24px", maxWidth: 860, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 2 }}>
          {[
            { icon: "⚡", titre: "Instantane", desc: "La reponse arrive en secondes, precise et directement actionnable. Pas de configuration." },
            { icon: "◎", titre: "Automatique", desc: "Le bon outil se selectionne selon votre besoin, en arriere-plan. Invisible. Silencieux." },
            { icon: "∞", titre: "Polyvalent", desc: "Texte, code, visuels, recherche, calculs, audio. Un seul endroit pour tout faire." },
          ].map((v, i) => (
            <div key={i} style={{ padding: "32px 28px", background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(255,255,255,0.06)", borderRadius: 12 }}>
              <div style={{ fontSize: 22, marginBottom: 14, color: "rgba(255,255,255,0.5)" }}>{v.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 500, marginBottom: 10 }}>{v.titre}</h3>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", lineHeight: 1.6, fontWeight: 300 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comment ca marche */}
      <section id="comment" style={{ padding: "80px 24px", maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontSize: 11, letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)", marginBottom: 12, textTransform: "uppercase" }}>Comment ca marche</p>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em" }}>
            Simple comme bonjour.
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 2 }}>
          {[
            { n: "01", titre: "Vous posez une question", desc: "N'importe quelle question, dans n'importe quel domaine. Pas besoin de savoir quel outil choisir." },
            { n: "02", titre: "Le systeme analyse", desc: "En quelques millisecondes, votre question est analysee et le meilleur traitement est selectionne." },
            { n: "03", titre: "La reponse parfaite", desc: "Vous recevez une reponse precise, complete et directement utilisable. Rien de plus." },
          ].map((s, i) => (
            <div key={i} style={{ padding: "32px 28px", background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(255,255,255,0.06)", borderRadius: 12 }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em", marginBottom: 16 }}>{s.n}</div>
              <h3 style={{ fontSize: 16, fontWeight: 500, marginBottom: 10 }}>{s.titre}</h3>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", lineHeight: 1.6, fontWeight: 300 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Exemples */}
      <section style={{ padding: "60px 24px", maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <p style={{ fontSize: 11, letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)", marginBottom: 12, textTransform: "uppercase" }}>Exemples</p>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em" }}>
            Tout. Dans un seul espace.
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 8 }}>
          {EXEMPLES.map((ex, i) => (
            <div key={i} style={{ padding: "20px 22px", background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(255,255,255,0.06)", borderRadius: 12 }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "0.05em", marginBottom: 10 }}>{ex.tag.toUpperCase()}</div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.5, fontWeight: 300, fontStyle: "italic" }}>"{ex.texte}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ce que vous pouvez faire */}
      <section style={{ padding: "60px 24px", maxWidth: 860, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 8 }}>
          {[
            { label: "Ecrire", items: ["Emails, articles, posts", "Descriptions produit", "Rapports professionnels"] },
            { label: "Chercher", items: ["Actualites en temps reel", "Faits verifies", "Veille marche"] },
            { label: "Creer", items: ["Visuels et illustrations", "Voix et narrations", "Presentations"] },
            { label: "Analyser", items: ["Calculs precis", "Donnees complexes", "Code et bugs"] },
          ].map((c, i) => (
            <div key={i} style={{ padding: "22px 20px", background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(255,255,255,0.06)", borderRadius: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 12, color: "rgba(255,255,255,0.7)" }}>{c.label}</div>
              {c.items.map((item, j) => (
                <div key={j} style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginBottom: 5, display: "flex", alignItems: "center", gap: 7 }}>
                  <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "inline-block", flexShrink: 0 }} />
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: "80px 24px", maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontSize: 11, letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)", marginBottom: 12, textTransform: "uppercase" }}>Tarifs</p>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em" }}>
            Simple et transparent.
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 8 }}>
          {[
            { plan: "Starter", prix: "0€", periode: "pour toujours", items: ["20 requetes / mois", "Acces basique", "Support communaute"] },
            { plan: "Pro", prix: "19€", periode: "/ mois", items: ["500 requetes / mois", "Toutes les expertises", "Image et audio inclus", "Historique 30 jours"], featured: true },
            { plan: "Team", prix: "49€", periode: "/ siege / mois", items: ["Requetes illimitees", "Espace partage", "API access", "Support prioritaire"] },
          ].map((p, i) => (
            <div key={i} style={{ padding: "28px 24px", background: p.featured ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)", border: p.featured ? "0.5px solid rgba(255,255,255,0.2)" : "0.5px solid rgba(255,255,255,0.06)", borderRadius: 14 }}>
              {p.featured && <div style={{ fontSize: 10, color: "#7F77DD", letterSpacing: "0.08em", marginBottom: 8 }}>LE PLUS POPULAIRE</div>}
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", marginBottom: 14, textTransform: "uppercase" }}>{p.plan}</div>
              <div style={{ fontSize: 30, fontWeight: 500, letterSpacing: "-0.03em", marginBottom: 2 }}>{p.prix}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", marginBottom: 22 }}>{p.periode}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {p.items.map((item, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "rgba(255,255,255,0.45)" }}>
                    <span style={{ color: "#7F77DD", fontSize: 11, flexShrink: 0 }}>✓</span>{item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" style={{ padding: "60px 24px 120px", maxWidth: 540, margin: "0 auto", textAlign: "center" }}>
        <div style={{ padding: "48px 40px", background: "rgba(127,119,221,0.05)", border: "0.5px solid rgba(127,119,221,0.18)", borderRadius: 20 }}>
          <span style={{ fontSize: 32, display: "block", marginBottom: 20 }}>🎼</span>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, fontWeight: 400, letterSpacing: "-0.02em", marginBottom: 12 }}>
            Acces anticipe gratuit
          </h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", marginBottom: 28, lineHeight: 1.65, fontWeight: 300 }}>
            Lancement prevu en juillet 2026.<br />Les premiers inscrits ont 3 mois offerts.
          </p>
          {submitted ? (
            <div style={{ padding: "16px 24px", background: "rgba(29,158,117,0.08)", border: "0.5px solid rgba(29,158,117,0.25)", borderRadius: 10, fontSize: 14, color: "#1D9E75" }}>
              Vous etes sur la liste — a tres bientot.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="votre@email.com" required
                style={{ flex: 1, minWidth: 180, padding: "12px 16px", background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.12)", borderRadius: 10, color: "#fafafa", fontSize: 14, outline: "none", fontFamily: "'DM Sans', sans-serif" }} />
              <button type="submit" disabled={loading}
                style={{ padding: "12px 22px", background: loading ? "rgba(255,255,255,0.2)" : "#fafafa", color: "#09090b", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>
                {loading ? "..." : "Rejoindre →"}
              </button>
            </form>
          )}
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.15)", marginTop: 14 }}>Pas de spam. Desabonnement en un clic.</p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)", padding: "24px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.25)" }}>
          <span>🎼</span>
          <span>Un Orchestre</span>
          <span style={{ margin: "0 6px" }}>·</span>
          <a href="/" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>yvescodes.com</a>
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.15)" }}>2026 — Bruxelles</div>
      </footer>
    </main>
  );
}
