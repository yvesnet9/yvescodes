// Fichier : app/guide-prix-2026/page.tsx
// Le guide complet, livré par l'Email 1 de la séquence Brevo.
// URL finale : https://yvescodes.com/guide-prix-2026
// noindex : réservé aux inscrits (pas de référencement Google).

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Combien coûte vraiment un site qui vend en 2026 ? | YvesCodes",
  description:
    "La grille de prix honnête + les 5 pièges des devis qui coûtent cher + la checklist des 10 questions.",
  robots: { index: false, follow: false },
};

const CAL_URL = "https://cal.com/yvescodes/30min";

function Table({
  head,
  rows,
}: {
  head: string[];
  rows: string[][];
}) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-neutral-800">
      <table className="w-full min-w-[560px] border-collapse text-left text-sm">
        <thead>
          <tr className="bg-neutral-900">
            {head.map((h) => (
              <th key={h} className="px-4 py-3 font-semibold text-neutral-200">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-neutral-800">
              {r.map((c, j) => (
                <td key={j} className="px-4 py-3 align-top text-neutral-300">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-16 text-2xl font-bold text-white sm:text-3xl">{children}</h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-10 text-xl font-semibold text-white">{children}</h3>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 leading-relaxed text-neutral-300">{children}</p>;
}

export default function GuidePrix2026() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <article className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        {/* ===== En-tête ===== */}
        <p className="text-sm uppercase tracking-widest text-neutral-500">
          Guide YvesCodes — édition 2026
        </p>
        <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
          Combien coûte vraiment un site qui vend en 2026&nbsp;?
        </h1>
        <p className="mt-4 text-lg text-neutral-400">
          La grille de prix honnête + les 5 pièges des devis qui coûtent cher.
          Pour les indépendants et PME qui veulent un site qui rapporte, pas un
          site qui décore.
        </p>

        {/* ===== Intro ===== */}
        <H2>Pourquoi ce guide&nbsp;?</H2>
        <P>
          Si vous avez déjà demandé des devis pour un site web, vous avez
          probablement reçu des chiffres allant de 300&nbsp;€ à
          15&nbsp;000&nbsp;€... pour ce qui semblait être la même chose. Ce
          n&apos;est pas normal, et ce n&apos;est pas une fatalité.
        </P>
        <P>
          Ce guide vous donne trois choses que la plupart des agences préfèrent
          garder floues&nbsp;: les <strong className="text-white">vraies fourchettes de prix</strong> du
          marché en 2026, les <strong className="text-white">5 pièges classiques des devis</strong> —
          ceux qui transforment un projet à 1&nbsp;000&nbsp;€ en facture à
          4&nbsp;000&nbsp;€ — et une <strong className="text-white">checklist de 10 questions</strong> à
          poser à n&apos;importe quel prestataire avant de signer.
        </P>

        {/* ===== Partie 1 ===== */}
        <H2>Partie 1 — La grille de prix 2026 (le marché réel)</H2>
        <P>
          Voici ce que coûte réellement chaque type de projet en 2026, en
          Belgique et en Suisse, selon le type de prestataire.
        </P>

        <H3>Site vitrine (5 à 8 pages)</H3>
        <Table
          head={["Prestataire", "Fourchette", "Ce que vous obtenez vraiment"]}
          rows={[
            [
              "Plateforme DIY (Wix, Squarespace)",
              "200 – 400 €/an",
              "Vous faites tout vous-même. Abonnement à vie, site difficile à migrer.",
            ],
            [
              "Freelance junior / offshore",
              "300 – 600 €",
              "Prix attractif, mais support incertain et qualité variable.",
            ],
            [
              "Développeur indépendant expérimenté",
              "700 – 1 500 €",
              "Site sur mesure, code propre, vous êtes propriétaire, contact direct.",
            ],
            [
              "Petite agence",
              "2 000 – 5 000 €",
              "Même résultat technique, mais vous payez la structure (chef de projet, locaux...).",
            ],
            [
              "Grande agence",
              "5 000 – 15 000 €",
              "Pertinent pour les grandes marques. Surdimensionné pour une PME.",
            ],
          ]}
        />
        <P>
          👉 <strong className="text-white">Chez YvesCodes&nbsp;: site vitrine complet à 800&nbsp;€</strong>,
          livré en 7 à 14 jours, dont vous êtes propriétaire à 100&nbsp;%.
        </P>

        <H3>Site e-commerce (boutique en ligne avec paiement)</H3>
        <Table
          head={["Prestataire", "Fourchette", "À savoir"]}
          rows={[
            [
              "Shopify DIY",
              "400 – 800 €/an + 2 % de commission",
              "Rapide à lancer, mais commissions à vie sur chaque vente.",
            ],
            [
              "Freelance junior",
              "800 – 1 500 €",
              "Attention à la sécurité des paiements et au suivi.",
            ],
            [
              "Développeur indépendant expérimenté",
              "1 500 – 3 500 €",
              "Boutique sur mesure, paiement sécurisé (Stripe), zéro commission sur vos ventes.",
            ],
            [
              "Agence",
              "5 000 – 20 000 €",
              "Justifié à partir de catalogues très complexes.",
            ],
          ]}
        />
        <P>
          👉 <strong className="text-white">Chez YvesCodes&nbsp;: e-commerce complet à 1 500&nbsp;€</strong>,
          paiements Stripe intégrés, aucune commission sur vos ventes.
        </P>

        <H3>Refonte d&apos;un site existant</H3>
        <P>
          Modernisation design + mobile + vitesse&nbsp;: le marché pratique
          <strong className="text-white"> 500 – 2 500 €</strong>. Chez YvesCodes&nbsp;:
          <strong className="text-white"> 600 €</strong>, audit gratuit inclus.
        </P>
        <P>
          Une refonte bien faite récupère souvent en quelques mois son coût en
          clients qui ne fuient plus un site lent ou daté&nbsp;: en 2026, plus de
          70&nbsp;% des visites se font sur mobile, et un site qui s&apos;affiche
          mal sur téléphone perd la majorité de ses prospects avant même le
          premier contact.
        </P>

        <H3>Les coûts récurrents (ceux qu&apos;on oublie de vous dire)</H3>
        <P>
          Quel que soit le prestataire, un site vit avec des frais annuels&nbsp;:
          nom de domaine (10 – 25 €/an), hébergement (50 – 150 €/an pour un site
          vitrine, 100 – 300 €/an pour un e-commerce), et
          maintenance&nbsp;: 0&nbsp;€ si le site est bien construit, 300 – 1 200 €/an
          si le prestataire vous a rendu dépendant (voir Piège n°3...).
        </P>
        <P>
          <strong className="text-white">
            Total honnête pour un site vitrine professionnel&nbsp;: environ
            800&nbsp;€ une fois + ~100&nbsp;€/an.
          </strong>{" "}
          Toute offre très éloignée de ces chiffres — dans un sens ou dans
          l&apos;autre — mérite vos questions.
        </P>

        {/* ===== Partie 2 ===== */}
        <H2>Partie 2 — Les 5 pièges des devis (et comment les déjouer)</H2>

        <H3>Piège n°1&nbsp;: le prix d&apos;appel incomplet</H3>
        <P>
          <strong className="text-white">Le scénario&nbsp;:</strong> un devis à 500&nbsp;€ qui
          semble imbattable. Puis en cours de projet&nbsp;: «&nbsp;Ah, le
          formulaire de contact, c&apos;est en option&nbsp;»&nbsp;; «&nbsp;la
          version mobile, c&apos;est un supplément&nbsp;»&nbsp;; «&nbsp;les
          textes, ce n&apos;est pas compris&nbsp;». Facture finale&nbsp;:
          2&nbsp;200&nbsp;€.
        </P>
        <P>
          <strong className="text-white">La parade&nbsp;:</strong> exigez un devis qui liste
          explicitement ce qui est inclus ET exclu. Les mots à chercher noir sur
          blanc&nbsp;: responsive mobile, formulaire de contact, référencement de
          base (SEO), mise en ligne, nombre de pages exact. Si un de ces éléments
          n&apos;apparaît pas, posez la question par écrit avant de signer.
        </P>

        <H3>Piège n°2&nbsp;: l&apos;abonnement déguisé</H3>
        <P>
          <strong className="text-white">Le scénario&nbsp;:</strong> «&nbsp;Votre site pour
          seulement 49&nbsp;€/mois&nbsp;!&nbsp;» Séduisant... sauf que sur 4 ans,
          cela fait 2&nbsp;352&nbsp;€ — pour un site qui ne vous appartient
          pas&nbsp;: arrêtez de payer, le site disparaît.
        </P>
        <P>
          <strong className="text-white">La parade&nbsp;:</strong> demandez toujours
          «&nbsp;si j&apos;arrête de payer, que devient mon site&nbsp;?&nbsp;».
          La bonne réponse&nbsp;: «&nbsp;rien, il est à vous&nbsp;». Toute autre
          réponse signifie que vous louez, vous n&apos;achetez pas.
        </P>

        <H3>Piège n°3&nbsp;: la dépendance technique organisée</H3>
        <P>
          <strong className="text-white">Le scénario&nbsp;:</strong> le site est livré, mais
          chaque modification — changer une photo, corriger un prix — passe par
          le prestataire, facturée 80&nbsp;€/heure. Certains prestataires
          construisent volontairement ainsi.
        </P>
        <P>
          <strong className="text-white">La parade&nbsp;:</strong> vérifiez avant de signer que
          le devis inclut vos accès complets (hébergement, nom de domaine, code
          source) et idéalement une courte formation pour les modifications
          simples. Vous devez pouvoir changer de prestataire du jour au lendemain
          sans rien perdre.
        </P>

        <H3>Piège n°4&nbsp;: le site joli qui ne vend rien</H3>
        <P>
          <strong className="text-white">Le scénario&nbsp;:</strong> le site est magnifique, le
          prestataire est fier, vous aussi... mais six mois plus tard&nbsp;: zéro
          demande de devis, zéro appel. Parce que personne n&apos;a pensé au
          parcours client&nbsp;: où clique le visiteur&nbsp;? Comment vous
          contacte-t-il&nbsp;? Pourquoi vous ferait-il confiance&nbsp;?
        </P>
        <P>
          <strong className="text-white">La parade&nbsp;:</strong> demandez au prestataire
          «&nbsp;quel est l&apos;objectif de chaque page&nbsp;?&nbsp;». Un
          professionnel du web qui vend vous parlera d&apos;appel à l&apos;action,
          de preuve sociale (avis, réalisations), de prise de rendez-vous en
          ligne, de vitesse de chargement. Un simple exécutant vous parlera de
          couleurs.
        </P>

        <H3>Piège n°5&nbsp;: le devis sans engagement de délai ni garantie</H3>
        <P>
          <strong className="text-white">Le scénario&nbsp;:</strong> projet signé en janvier,
          livré... en juin. Ou jamais. Sans clause de délai, vous n&apos;avez
          aucun recours, et votre activité attend.
        </P>
        <P>
          <strong className="text-white">La parade&nbsp;:</strong> le devis doit mentionner une
          date de livraison et idéalement une garantie (corrections incluses
          après livraison). Un prestataire sûr de son travail n&apos;a aucun
          problème à s&apos;engager par écrit.
        </P>

        {/* ===== Partie 3 ===== */}
        <H2>Partie 3 — La checklist des 10 questions avant de signer</H2>
        <P>Posez ces questions à tout prestataire (nous y compris&nbsp;!)&nbsp;:</P>
        <ol className="mt-6 list-decimal space-y-3 pl-6 text-neutral-300">
          <li>Le prix est-il définitif et tout compris&nbsp;? Qu&apos;est-ce qui est explicitement exclu&nbsp;?</li>
          <li>Le site sera-t-il ma propriété à 100&nbsp;% (code, contenu, accès)&nbsp;?</li>
          <li>Est-il adapté au mobile (là où sont 70&nbsp;% de mes visiteurs)&nbsp;?</li>
          <li>Le référencement de base (Google) est-il inclus&nbsp;?</li>
          <li>Pourrai-je faire moi-même les petites modifications&nbsp;?</li>
          <li>Quelle est la date de livraison engagée&nbsp;?</li>
          <li>Que se passe-t-il après la livraison (corrections, support)&nbsp;?</li>
          <li>Quels sont les frais récurrents exacts (hébergement, domaine, maintenance)&nbsp;?</li>
          <li>Pouvez-vous me montrer des sites que vous avez réellement livrés&nbsp;?</li>
          <li>Comment le site va-t-il m&apos;apporter des clients, concrètement&nbsp;?</li>
        </ol>
        <P>
          Si un prestataire esquive plus de deux de ces questions, continuez vos
          recherches.
        </P>

        {/* ===== CTA final ===== */}
        <div className="mt-16 rounded-2xl border border-neutral-800 bg-neutral-900 p-8">
          <h2 className="text-2xl font-bold text-white">Et maintenant&nbsp;?</h2>
          <P>
            Vous savez désormais ce que coûte un site honnête et comment lire un
            devis. Il vous reste une question, la vôtre&nbsp;:{" "}
            <strong className="text-white">«&nbsp;et pour MON projet, concrètement&nbsp;?&nbsp;»</strong>
          </P>
          <P>
            C&apos;est exactement l&apos;objet de l&apos;appel découverte gratuit
            de 30 minutes&nbsp;: vous me décrivez votre activité, je vous dis
            franchement ce dont vous avez besoin (et ce dont vous n&apos;avez PAS
            besoin), avec un chiffre précis à la fin. Sans engagement, sans
            relance insistante — au pire, vous repartez avec des réponses claires
            pour comparer les devis des autres.
          </P>
          <a
            href={CAL_URL}
            className="mt-6 inline-block rounded-xl bg-white px-6 py-3 font-semibold text-neutral-950 transition hover:bg-neutral-200"
          >
            Réserver mon appel découverte gratuit →
          </a>
        </div>

        {/* ===== Signature ===== */}
        <div className="mt-16 border-t border-neutral-800 pt-8 text-sm text-neutral-400">
          <p>
            <strong className="text-neutral-200">Yves — YvesCodes</strong>
            <br />
            Des sites qui vendent, au prix juste.
          </p>
          <p className="mt-2">
            <a
              href="https://yvescodes.com"
              className="underline underline-offset-4 hover:text-white"
            >
              yvescodes.com
            </a>{" "}
            · hello@yvescodes.com
          </p>
          <p className="mt-4 text-neutral-600">
            © 2026 YvesCodes. Ce guide peut être partagé librement avec toute
            personne qui cherche un prestataire web.
          </p>
        </div>
      </article>
    </main>
  );
}
