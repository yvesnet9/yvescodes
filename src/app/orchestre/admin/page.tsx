"use client";
import { useState } from "react";

interface WaitlistEntry {
  email: string;
  date: string;
}

interface AdminData {
  stats: { total_waitlist: number; last_signup: string | null };
  waitlist: WaitlistEntry[];
}

const IA_PROVIDERS = [
  { id: "claude", name: "Claude Sonnet", role: "Texte, analyse, code, vision", status: "active", color: "#7F77DD" },
  { id: "dall-e", name: "DALL-E 3", role: "Generation d images", status: "pending", color: "#F59E0B" },
  { id: "tts", name: "OpenAI TTS", role: "Synthese vocale", status: "available", color: "#10B981" },
  { id: "perplexity", name: "Perplexity", role: "Recherche web temps reel", status: "inactive", color: "#6B7280" },
  { id: "wolfram", name: "Wolfram Alpha", role: "Calculs mathematiques", status: "inactive", color: "#6B7280" },
  { id: "runway", name: "Runway Gen-4", role: "Generation video", status: "inactive", color: "#6B7280" },
];

const STATUS_LABEL: Record<string, { label: string; color: string; bg: string }> = {
  active:    { label: "Actif",      color: "#10B981", bg: "rgba(16,185,129,0.08)" },
  pending:   { label: "En attente", color: "#F59E0B", bg: "rgba(245,158,11,0.08)" },
  available: { label: "Disponible", color: "#7F77DD", bg: "rgba(127,119,221,0.08)" },
  inactive:  { label: "Inactif",    color: "#6B7280", bg: "rgba(107,114,128,0.08)" },
};

export default function Admin() {
  const [password, setPassword] = useState("");
  const [data, setData] = useState<AdminData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin", {
        headers: { "x-admin-key": password },
      });
      if (!res.ok) { setError("Mot de passe incorrect."); setLoading(false); return; }
      const json = await res.json();
      setData(json);
    } catch {
      setError("Erreur reseau.");
    }
    setLoading(false);
  };

  const fmt = (d: string) => new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

  if (!data) return (
    <main style={{ fontFamily: "sans-serif", background: "#09090b", color: "#fafafa", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 360 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🎼</div>
          <div style={{ fontSize: 15, fontWeight: 500 }}>Admin · Un Orchestre</div>
        </div>
        <form onSubmit={login} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}
            placeholder="Mot de passe admin" required
            style={{ padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "0.5px solid rgba(255,255,255,0.12)", borderRadius: 10, color: "#fafafa", fontSize: 14, outline: "none" }} />
          <button type="submit" disabled={loading}
            style={{ padding: "12px", background: "#fafafa", color: "#09090b", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
            {loading ? "..." : "Connexion"}
          </button>
          {error && <p style={{ color: "#E24B4A", fontSize: 13, textAlign: "center" }}>{error}</p>}
        </form>
      </div>
    </main>
  );

  return (
    <main style={{ fontFamily: "sans-serif", background: "#09090b", color: "#fafafa", minHeight: "100vh", padding: 24 }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32, paddingBottom: 16, borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
          <span style={{ fontSize: 20 }}>🎼</span>
          <span style={{ fontSize: 15, fontWeight: 500 }}>Dashboard Admin</span>
          <a href="/orchestre" style={{ marginLeft: "auto", fontSize: 12, color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>← Retour</a>
        </div>

        {/* Stats waitlist */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 8, marginBottom: 24 }}>
          {[
            { label: "Inscrits waitlist", value: data.stats.total_waitlist },
            { label: "Dernier inscrit", value: data.stats.last_signup ? fmt(data.stats.last_signup) : "—" },
          ].map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "20px 18px" }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
              <div style={{ fontSize: 22, fontWeight: 500 }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* IAs configurees */}
        <div style={{ background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 12, overflow: "hidden", marginBottom: 24 }}>
          <div style={{ padding: "14px 18px", borderBottom: "0.5px solid rgba(255,255,255,0.06)", fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Moteur de routing — IAs configurees
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 1, background: "rgba(255,255,255,0.04)" }}>
            {IA_PROVIDERS.map((ia) => {
              const s = STATUS_LABEL[ia.status];
              return (
                <div key={ia.id} style={{ background: "#09090b", padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: `${ia.color}18`, border: `0.5px solid ${ia.color}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: ia.color }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>{ia.name}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ia.role}</div>
                  </div>
                  <div style={{ fontSize: 10, color: s.color, background: s.bg, border: `0.5px solid ${s.color}40`, borderRadius: 20, padding: "2px 8px", whiteSpace: "nowrap", flexShrink: 0 }}>
                    {s.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Waitlist */}
        <div style={{ background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 12, overflow: "hidden" }}>
          <div style={{ padding: "14px 18px", borderBottom: "0.5px solid rgba(255,255,255,0.06)", fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Liste d&apos;attente ({data.waitlist.length})
          </div>
          {data.waitlist.length === 0 ? (
            <div style={{ padding: "24px 18px", fontSize: 13, color: "rgba(255,255,255,0.3)", textAlign: "center" }}>Aucun inscrit pour le moment.</div>
          ) : (
            data.waitlist.map((w, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 18px", borderBottom: i < data.waitlist.length - 1 ? "0.5px solid rgba(255,255,255,0.04)" : "none" }}>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>{w.email}</span>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{fmt(w.date)}</span>
              </div>
            ))
          )}
        </div>

      </div>
    </main>
  );
}
