// Fichier : src/components/GuideBanner.tsx
// Bandeau promotionnel affiché en haut de toutes les pages du site,
// sauf sur /guide et /guide-prix-2026 (inutile d'y faire de la pub pour eux-mêmes).
// Le visiteur peut le fermer (croix) — il reste fermé pendant la session.

"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

export default function GuideBanner() {
  const [visible, setVisible] = useState(true);
  const pathname = usePathname();

  // Pas de bandeau sur les pages du guide lui-même
  if (pathname === "/guide" || pathname === "/guide-prix-2026") return null;
  if (!visible) return null;

  return (
    <div className="relative z-50 flex items-center justify-center gap-2 bg-white px-10 py-2.5 text-center text-sm font-medium text-neutral-950">
      <span aria-hidden>📊</span>
      <p>
        <span className="hidden sm:inline">Guide gratuit : </span>
        <a
          href="/guide"
          className="underline underline-offset-4 hover:opacity-70"
        >
          Combien coûte vraiment un site qui vend en 2026&nbsp;?
        </a>
      </p>
      <button
        type="button"
        onClick={() => setVisible(false)}
        aria-label="Fermer le bandeau"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-neutral-500 hover:text-neutral-950"
      >
        ✕
      </button>
    </div>
  );
}
