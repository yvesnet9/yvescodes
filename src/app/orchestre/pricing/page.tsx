"use client";
import { useState } from "react";

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "5 CHF",
    credits: 20,
    desc: "20 requetes. CV, facture, email. Pas d abonnement.",
    featured: false,
  },
  {
    id: "projet",
    name: "Projet",
    price: "15 CHF",
    credits: 100,
    desc: "100 requetes. Pour un projet complet. Sans limite de temps.",
    featured: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "19 CHF/mois",
    credits: 500,
    desc: "500 requetes par mois. Pour les pros. Toutes les expertises.",
    featured: false,
  },
];

export default function Pricing() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (planId: string) => {
    setLoading(planId);
    try {
      const res = await fetch("/api/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert("Erreur: " + (data.error || "Inconnue"));
    } catch {
      alert("Erreur reseau.");
    }
    setLoading(null);
  };

  return (
    <main style={{ fontFamily: "sans-serif", background: "#09090b", color: "#fafafa", minHeight: "100vh", padding: "60px 24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <a href="/orchestre" style={{ fontSize: 28, display: "block", marginBottom: 16, textDecoration: "none" }}>🎼</a>
          <h1 style={{ fontSize: 28, fontWeight: 500, letterSpacing: "-0.02em", marginBottom: 8 }}>Choisissez votre formule</h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>Pas d abonnement force. Payez selon vos besoins.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 32 }}>
          {PLANS.map(plan => (
            <div key={plan.id} style={{
              padding: "28px 24px",
              background: plan.featured ? "rgba(127,119,221,0.08)" : "rgba(255,255,255,0.02)",
              border: plan.featured ? "0.5px solid rgba(127,119,221,0.4)" : "0.5px solid rgba(255,255,255,0.08)",
              borderRadius: 14,
              display: "flex", flexDirection: "column", gap: 12
            }}>
              {plan.featured && <div style={{ fontSize: 10, color: "#7F77DD", letterSpacing: "0.08em" }}>LE PLUS POPULAIRE</div>}
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{plan.name}</div>
              <div style={{ fontSize: 28, fontWeight: 500, letterSpacing: "-0.02em" }}>{plan.price}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.5, flex: 1 }}>{plan.desc}</div>
              <button
                onClick={() => handleCheckout(plan.id)}
                disabled={loading === plan.id}
                style={{
                  padding: "11px",
                  background: plan.featured ? "#7F77DD" : "#fafafa",
                  color: plan.featured ? "#fff" : "#09090b",
                  border: "none", borderRadius: 10, fontSize: 13,
                  fontWeight: 500, cursor: loading === plan.id ? "not-allowed" : "pointer",
                  opacity: loading === plan.id ? 0.6 : 1,
                }}
              >
                {loading === plan.id ? "..." : "Commencer →"}
              </button>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <a href="/orchestre/chat" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>
            ← Retour au chat
          </a>
        </div>
      </div>
    </main>
  );
}
