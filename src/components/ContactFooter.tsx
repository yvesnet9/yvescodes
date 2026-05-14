"use client";

import { useState } from "react";

export default function ContactFooter() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setStatus(res.ok ? "success" : "error");
  };

  return (
    <>
      <section id="contact" className="py-24 relative">
        <div className="section-divider mb-24" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-3xl bg-bg-2 border border-border p-8 lg:p-16 relative overflow-hidden">
            <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-accent opacity-5 blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl">
              <span className="font-mono text-xs text-accent tracking-widest uppercase">05 — Contact</span>
              <h2 className="font-display font-bold text-4xl lg:text-5xl text-text mt-3 mb-4 tracking-tight">
                On travaille<br /><span className="gradient-text">ensemble ?</span>
              </h2>
              <p className="text-text-2 font-body leading-relaxed mb-10">
                Tu as un projet en tête ? Écris-moi — je réponds sous 24h et le premier appel est gratuit.
              </p>

              {status === "success" ? (
                <div className="p-6 rounded-2xl border border-teal/30 bg-teal/5 text-teal font-body">
                  ✅ Message envoyé ! Je te réponds sous 24h.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Ton nom"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="px-4 py-3 bg-bg-3 border border-border rounded-xl text-text placeholder-text-3 font-body focus:outline-none focus:border-accent/40 transition-colors"
                    />
                    <input
                      type="email"
                      placeholder="Ton email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="px-4 py-3 bg-bg-3 border border-border rounded-xl text-text placeholder-text-3 font-body focus:outline-none focus:border-accent/40 transition-colors"
                    />
                  </div>
                  <textarea
                    placeholder="Ton message..."
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="px-4 py-3 bg-bg-3 border border-border rounded-xl text-text placeholder-text-3 font-body focus:outline-none focus:border-accent/40 transition-colors resize-none"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="px-6 py-3 bg-accent hover:bg-accent-dim disabled:opacity-50 text-white rounded-xl font-body font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] w-fit"
                  >
                    {status === "loading" ? "Envoi en cours..." : "Envoyer le message →"}
                  </button>
                  {status === "error" && (
                    <p className="text-red-400 text-sm font-body">Une erreur est survenue, réessaie.</p>
                  )}
                </form>
              )}

              <div className="mt-8 flex items-center gap-3 text-sm text-text-2 font-body">
                <div className="w-2 h-2 bg-teal rounded-full animate-pulse2" />
                <span>Prochaine disponibilité : <strong className="text-text">Juin 2025</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <span className="font-display font-bold gradient-text">Yves.</span>
            <span className="text-text-3 text-xs font-mono">© {new Date().getFullYear()} — Fullstack Developer</span>
          </div>
          <div className="flex items-center gap-6">
            {[
              { label: "GitHub", href: "https://github.com/yvesnet9" },
              { label: "LinkedIn", href: "https://linkedin.com" },
              { label: "Twitter", href: "https://twitter.com" },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-text-3 hover:text-text text-xs font-body transition-colors">{s.label}</a>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs text-text-3 font-mono">
            <span>Made with</span><span className="text-accent">Next.js</span><span>&</span><span className="text-teal">Tailwind</span>
          </div>
        </div>
      </footer>
    </>
  );
}