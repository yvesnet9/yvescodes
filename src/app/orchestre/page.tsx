"use client";
import { useState } from "react";

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
      const data = await res.json();
      console.log("[Waitlist]", res.status, data);
      if (res.ok) setSubmitted(true);
      else alert("Erreur: " + JSON.stringify(data));
    } catch (error) {
      alert("Erreur reseau: " + error);
    }
    setLoading(false);
  };

  return (
    <main style={{ fontFamily: "sans-serif", background: "#09090b", color: "#fafafa", minHeight: "100vh", padding: "80px 24px" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 24 }}>🎼</div>
        <h1 style={{ fontSize: 48, fontWeight: 400, marginBottom: 16, letterSpacing: "-0.02em" }}>Un Orchestre</h1>
        <p style={{ fontSize: 18, color: "rgba(255,255,255,0.4)", marginBottom: 48, lineHeight: 1.6 }}>
          Posez votre question.<br />Obtenez la reponse parfaite.
        </p>
        {submitted ? (
          <p style={{ color: "#1D9E75", fontSize: 16 }}>Vous etes sur la liste.</p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            <input type="email" required placeholder="votre@email.com" value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: "12px 16px", borderRadius: 10, border: "0.5px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.05)", color: "#fafafa", fontSize: 14, minWidth: 220, outline: "none" }} />
            <button type="submit" disabled={loading}
              style={{ padding: "12px 22px", background: loading ? "rgba(255,255,255,0.3)" : "#fafafa", color: "#09090b", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
              {loading ? "..." : "Rejoindre"}
            </button>
          </form>
        )}
        <p style={{ marginTop: 48, fontSize: 13 }}>
          <a href="/" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>yvescodes.com</a>
        </p>
      </div>
    </main>
  );
}
