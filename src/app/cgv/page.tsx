export default function CGV() {
  return (
    <main className="min-h-screen bg-bg py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <span className="font-mono text-xs text-accent tracking-widest uppercase">Légal</span>
        <h1 className="font-display font-bold text-4xl text-text mt-3 mb-12 tracking-tight">Conditions Générales de Vente</h1>

        <div className="flex flex-col gap-10 font-body text-text-2 leading-relaxed">
          <section>
            <h2 className="font-display font-semibold text-xl text-text mb-4">1. Objet</h2>
            <p className="text-sm">Les présentes CGV régissent les relations entre Yves (ci-après "le Prestataire") et ses clients (ci-après "le Client") dans le cadre de prestations de développement web, création de sites internet et applications web.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-text mb-4">2. Prestations</h2>
            <p className="text-sm mb-3">Le Prestataire propose les services suivants :</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Création de sites vitrine</li>
              <li>Développement d'applications web et SaaS</li>
              <li>Boutiques e-commerce</li>
              <li>Refonte de sites existants</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-text mb-4">3. Devis et commande</h2>
            <p className="text-sm">Tout projet débute par un devis gratuit. La commande est confirmée par la signature du devis et le versement d'un acompte de 30% du montant total. Le devis est valable 30 jours.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-text mb-4">4. Tarifs et paiement</h2>
            <p className="text-sm">Les tarifs sont exprimés en euros TTC. Le solde est dû à la livraison du projet. Les paiements s'effectuent par virement bancaire ou via Stripe. Tout retard de paiement entraîne des pénalités de 3% par mois.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-text mb-4">5. Délais de livraison</h2>
            <p className="text-sm">Les délais sont définis dans le devis. Ils peuvent être prolongés en cas de retard dans la fourniture des contenus par le Client ou de demandes de modifications importantes.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-text mb-4">6. Propriété et droits</h2>
            <p className="text-sm">Le Prestataire cède au Client les droits d'exploitation du site après paiement intégral. Le Prestataire se réserve le droit de mentionner le projet dans son portfolio.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-text mb-4">7. Garantie</h2>
            <p className="text-sm">Le Prestataire garantit le bon fonctionnement du site pendant 30 jours après livraison pour les bugs liés au développement. Les modifications demandées par le Client ne sont pas couvertes par cette garantie.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-text mb-4">8. Résiliation</h2>
            <p className="text-sm">En cas d'annulation par le Client après démarrage, l'acompte reste acquis au Prestataire. En cas d'annulation par le Prestataire, l'acompte est intégralement remboursé.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-text mb-4">9. Droit applicable</h2>
            <p className="text-sm">Les présentes CGV sont soumises au droit belge. En cas de litige, les tribunaux de Bruxelles sont compétents.</p>
          </section>

          <p className="text-xs text-text-3 font-mono">Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}</p>
        </div>
      </div>
    </main>
  );
}