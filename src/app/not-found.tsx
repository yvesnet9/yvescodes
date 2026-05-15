import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-bg grid-bg flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="font-display font-extrabold text-8xl gradient-text mb-4">404</div>
        <h1 className="font-display font-bold text-2xl text-text mb-3 tracking-tight">
          Page introuvable
        </h1>
        <p className="text-text-2 font-body leading-relaxed mb-8">
          Cette page n'existe pas. Retournez à l'accueil pour découvrir mes services.
        </p>
        <Link href="/" className="px-6 py-3 bg-accent hover:bg-accent-dim text-white rounded-xl font-body font-medium transition-all">
          Retour à l'accueil
        </Link>
      </div>
    </main>
  );
}