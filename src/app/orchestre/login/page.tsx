"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function OrchestreLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else window.location.href = "/orchestre/chat";
    } else {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
      else if (data.session) window.location.href = "/orchestre/chat";
      else setSuccess("Verifiez votre email pour confirmer votre compte.");
    }
    setLoading(false);
  };

  return (
    <main style={{ fontFamily: "sans-serif", background: "#09090b", color: "#fafafa", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 380 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <a href="/orchestre" style={{ fontSize: 32, display: "block", marginBottom: 12, textDecoration: "none" }}>🎼</a>
          <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 4 }}>Un Orchestre</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
            {mode === "login" ? "Connectez-vous pour continuer" : "Creer votre compte"}
          </div>
        </div>

        <form onSubmit={handle} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="votre@email.com"
            required
            style={{ padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "0.5px solid rgba(255,255,255,0.12)", borderRadius: 10, color: "#fafafa", fontSize: 14, outline: "none" }}
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Mot de passe"
            required
            style={{ padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "0.5px solid rgba(255,255,255,0.12)", borderRadius: 10, color: "#fafafa", fontSize: 14, outline: "none" }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{ padding: "12px", background: loading ? "rgba(255,255,255,0.1)" : "#fafafa", color: "#09090b", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: loading ? "not-allowed" : "pointer" }}
          >
            {loading ? "..." : mode === "login" ? "Se connecter" : "Creer mon compte"}
          </button>
        </form>

        {error && <p style={{ color: "#E24B4A", fontSize: 13, textAlign: "center", marginTop: 12 }}>{error}</p>}
        {success && <p style={{ color: "#1D9E75", fontSize: 13, textAlign: "center", marginTop: 12 }}>{success}</p>}

        <p style={{ textAlign: "center", fontSize: 13, color: "rgba(255,255,255,0.35)", marginTop: 20 }}>
          {mode === "login" ? "Pas encore de compte ? " : "Deja un compte ? "}
          <button
            onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}
            style={{ background: "none", border: "none", color: "rgba(255,255,255,0.7)", cursor: "pointer", fontSize: 13, textDecoration: "underline" }}
          >
            {mode === "login" ? "Creer un compte" : "Se connecter"}
          </button>
        </p>

        <p style={{ textAlign: "center", marginTop: 24, fontSize: 12 }}>
          <a href="/orchestre" style={{ color: "rgba(255,255,255,0.25)", textDecoration: "none" }}>← Retour</a>
        </p>
      </div>
    </main>
  );
}
