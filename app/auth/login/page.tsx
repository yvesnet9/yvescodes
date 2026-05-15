"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle"|"loading"|"error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      console.log("Auth response:", { data, error });
      if (error) {
        setErrorMsg(error.message);
        setStatus("error");
      } else if (data.session) {
        router.push("/dashboard");
      } else {
        setErrorMsg("Session non créée. Réessayez.");
        setStatus("error");
      }
    } catch (err) {
      console.error("Auth error:", err);
      setErrorMsg("Erreur de connexion.");
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen grid-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="font-display font-bold text-2xl">
            <span className="gradient-text">yvescodes</span>
            <span className="text-text-3 font-mono text-xs ml-1">app</span>
          </Link>
          <h1 className="font-display font-bold text-2xl text-text mt-6 mb-2">Bon retour !</h1>
          <p className="text-text-2 text-sm font-body">Connectez-vous à votre compte</p>
        </div>
        <div className="bg-bg-2 border border-border rounded-2xl p-8">
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="text-text-2 text-xs font-mono mb-2 block">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.com"
                autoComplete="email"
                className="w-full px-4 py-3 bg-bg-3 border border-border rounded-xl text-text placeholder-text-3 font-body focus:outline-none focus:border-accent/40 transition-colors"
              />
            </div>
            <div>
              <label className="text-text-2 text-xs font-mono mb-2 block">Mot de passe</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full px-4 py-3 bg-bg-3 border border-border rounded-xl text-text placeholder-text-3 font-body focus:outline-none focus:border-accent/40 transition-colors"
              />
              <div className="text-right mt-1">
                <Link href="/auth/reset" className="text-text-3 hover:text-accent text-xs font-body transition-colors">
                  Mot de passe oublié ?
                </Link>
              </div>
            </div>
            {status === "error" && <p className="text-red-400 text-xs font-body">{errorMsg}</p>}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3 bg-accent hover:bg-accent-dim disabled:opacity-50 text-white rounded-xl font-body font-medium transition-all mt-2"
            >
              {status === "loading" ? "Connexion..." : "Se connecter →"}
            </button>
          </form>
          <p className="text-center text-text-3 text-sm font-body mt-6">
            Pas encore de compte ?{" "}
            <Link href="/auth/register" className="text-accent hover:underline">Créer un compte</Link>
          </p>
        </div>
      </div>
    </main>
  );
}