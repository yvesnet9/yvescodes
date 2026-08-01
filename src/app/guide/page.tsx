// Fichier : app/guide/page.tsx
// Page publique de capture — formulaire Brevo intégré.
// URL finale : https://yvescodes.com/guide

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guide gratuit — Combien coûte vraiment un site qui vend en 2026 ? | YvesCodes",
  description:
    "Les vraies fourchettes de prix du marché, les 5 pièges des devis et la checklist des 10 questions à poser avant de signer. Guide gratuit par YvesCodes.",
  openGraph: {
    title: "Combien coûte vraiment un site qui vend en 2026 ?",
    description:
      "Grille de prix honnête + les 5 pièges des devis + la checklist des 10 questions. Guide gratuit.",
    url: "https://yvescodes.com/guide",
    siteName: "yvescodes",
    locale: "fr_FR",
    type: "website",
  },
};

const BREVO_FORM_URL =
  "https://ff222657.sibforms.com/v2/serve/MUIFAOOGNZukU0_jws-fingKQwyMIrfGKdceGIVAqW_skDty6bQvWM8Z1rbDJmCi1kCKUDq0-p3u3kCpXAF9R6V0HSYg-fNbyaRaVTpjm9gnUlIm_1DxFOBmssgYd3ak2bHAV3BHrTl1tP70tu2CoBSP5OfBv1IVrEEXEnTZ8zcicdOkhqU2AIsWWeFgn73OjY8SGXG4cuCl5pm8WQ==";

export default function GuidePage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        {/* En-tête */}
        <p className="text-sm uppercase tracking-widest text-neutral-500">
          Guide gratuit — édition 2026
        </p>
        <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
          Combien coûte <span className="underline decoration-neutral-600 underline-offset-8">vraiment</span> un site qui vend en 2026&nbsp;?
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-neutral-300">
          Vous avez reçu des devis allant de 300&nbsp;€ à 15&nbsp;000&nbsp;€ pour «&nbsp;la
          même chose&nbsp;»&nbsp;? Ce guide met les chiffres à plat — sans jargon,
          sans langue de bois.
        </p>

        {/* Ce que contient le guide */}
        <ul className="mt-10 space-y-4">
          <li className="flex gap-3">
            <span aria-hidden className="mt-1 text-neutral-500">01</span>
            <p className="text-neutral-200">
              <strong className="text-white">La grille de prix 2026</strong> — les
              vraies fourchettes du marché, poste par poste, prestataire par
              prestataire.
            </p>
          </li>
          <li className="flex gap-3">
            <span aria-hidden className="mt-1 text-neutral-500">02</span>
            <p className="text-neutral-200">
              <strong className="text-white">Les 5 pièges des devis</strong> — ceux
              qui transforment un projet à 1&nbsp;000&nbsp;€ en facture à
              4&nbsp;000&nbsp;€, et comment les déjouer.
            </p>
          </li>
          <li className="flex gap-3">
            <span aria-hidden className="mt-1 text-neutral-500">03</span>
            <p className="text-neutral-200">
              <strong className="text-white">La checklist des 10 questions</strong> —
              à poser à n&apos;importe quel prestataire avant de signer. Moi
              compris.
            </p>
          </li>
        </ul>

        {/* Formulaire Brevo */}
        <div className="mt-12 rounded-2xl border border-neutral-800 bg-neutral-900 p-2 sm:p-4">
          <iframe
            title="Recevoir le guide gratuit"
            src={BREVO_FORM_URL}
            width="100%"
            height="420"
            frameBorder="0"
            scrolling="auto"
            className="block w-full rounded-xl"
          />
        </div>

        <p className="mt-6 text-sm text-neutral-500">
          Gratuit. Pas de spam — 4 emails utiles, puis c&apos;est tout. Désinscription
          en un clic.
        </p>

        {/* Signature */}
        <div className="mt-16 border-t border-neutral-800 pt-8 text-sm text-neutral-400">
          <p>
            <strong className="text-neutral-200">Yves</strong> — Développeur
            fullstack, Lausanne. 12+ projets livrés, paiement Stripe, garanties
            écrites.
          </p>
          <p className="mt-2">
            <a href="https://yvescodes.com" className="underline underline-offset-4 hover:text-white">
              yvescodes.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

