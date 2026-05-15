export default function MentionsLegales() {
  return (
    <main className="min-h-screen bg-bg py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <span className="font-mono text-xs text-accent tracking-widest uppercase">Légal</span>
        <h1 className="font-display font-bold text-4xl text-text mt-3 mb-12 tracking-tight">Mentions légales</h1>

        <div className="flex flex-col gap-10 font-body text-text-2 leading-relaxed">
          <section>
            <h2 className="font-display font-semibold text-xl text-text mb-4">Éditeur du site</h2>
            <p>Le site <strong className="text-text">yvescodes.com</strong> est édité par :</p>
            <ul className="mt-3 space-y-1 text-sm">
              <li><strong className="text-text">Nom :</strong> Yves</li>
              <li><strong className="text-text">Statut :</strong> Développeur freelance</li>
              <li><strong className="text-text">Localisation :</strong> Bruxelles, Belgique</li>
              <li><strong className="text-text">Email :</strong> hello@yvescodes.com</li>
              <li><strong className="text-text">Site :</strong> https://yvescodes.com</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-text mb-4">Hébergement</h2>
            <ul className="space-y-1 text-sm">
              <li><strong className="text-text">Hébergeur :</strong> OVH SAS</li>
              <li><strong className="text-text">Adresse :</strong> 2 rue Kellermann, 59100 Roubaix, France</li>
              <li><strong className="text-text">Site :</strong> https://www.ovh.com</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-text mb-4">Propriété intellectuelle</h2>
            <p className="text-sm">L'ensemble du contenu de ce site (textes, images, graphismes, code) est la propriété exclusive de Yves, sauf mention contraire. Toute reproduction, distribution ou utilisation sans autorisation préalable est interdite.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-text mb-4">Données personnelles</h2>
            <p className="text-sm">Les données collectées via le formulaire de contact (nom, email, message) sont utilisées uniquement pour répondre à vos demandes. Elles ne sont pas transmises à des tiers. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données en contactant hello@yvescodes.com.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-text mb-4">Cookies</h2>
            <p className="text-sm">Ce site n'utilise pas de cookies de tracking ou publicitaires. Seuls des cookies techniques nécessaires au bon fonctionnement du site peuvent être utilisés.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-text mb-4">Responsabilité</h2>
            <p className="text-sm">Yves ne saurait être tenu responsable des dommages directs ou indirects causés au matériel de l'utilisateur lors de l'accès au site. Les informations présentes sur ce site sont fournies à titre indicatif.</p>
          </section>

          <p className="text-xs text-text-3 font-mono">Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}</p>
        </div>
      </div>
    </main>
  );
}