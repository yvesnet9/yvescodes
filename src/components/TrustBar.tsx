const TRUST_ITEMS = [
  { icon: "✓", text: "12+ projets livrés" },
  { icon: "✓", text: "Paiement sécurisé Stripe" },
  { icon: "✓", text: "Livraison dans les délais" },
  { icon: "✓", text: "Support inclus 30 jours" },
  { icon: "✓", text: "Satisfaction garantie" },
];

export default function TrustBar() {
  return (
    <div className="border-y border-border bg-bg-2 py-3 overflow-hidden">
      <div className="flex animate-[scroll_20s_linear_infinite] whitespace-nowrap">
        {[...TRUST_ITEMS, ...TRUST_ITEMS].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 px-8 text-sm font-body">
            <span className="text-teal font-bold">{item.icon}</span>
            <span className="text-text-2">{item.text}</span>
            <span className="text-text-3 mx-4">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}