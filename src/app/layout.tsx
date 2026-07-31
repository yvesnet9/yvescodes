import type { Metadata } from "next";
import { Syne, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({ subsets: ["latin"], weight: ["400","500","600","700","800"], variable: "--font-syne", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], weight: ["300","400","500","600"], variable: "--font-outfit", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400","500"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Yves — Développeur Fullstack à Lausanne & Genève | Sites web & SaaS", template: "%s | Yves" },
  description: "Développeur fullstack basé à Lausanne, actif à Genève et en Suisse romande. Je conçois des sites web, applications SaaS et e-commerce premium sur mesure pour PME et indépendants.",
  keywords: ["développeur Lausanne", "développeur Genève", "création site web Lausanne", "création site web Genève", "développeur fullstack Suisse romande", "SaaS Lausanne", "application web Genève", "Next.js", "React"],
  authors: [{ name: "Yves", url: "https://yvescodes.com" }],
  creator: "Yves — yvescodes",
  metadataBase: new URL("https://yvescodes.com"),
  openGraph: {
    type: "website",
    locale: "fr_CH",
    url: "https://yvescodes.com",
    title: "Yves — Développeur Fullstack à Lausanne & Genève",
    description: "Sites web, SaaS et applications sur mesure. Basé à Lausanne, actif en Suisse romande.",
    siteName: "yvescodes",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yves — Développeur Fullstack à Lausanne & Genève",
    description: "Sites web, SaaS et applications sur mesure. Basé à Lausanne, actif en Suisse romande.",
    creator: "@yvescodes",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "yvescodes — Yves, Développeur Fullstack",
    description: "Développeur fullstack : sites web, SaaS et e-commerce premium sur mesure pour PME et indépendants en Suisse romande.",
    url: "https://yvescodes.com",
    priceRange: "CHF",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lausanne",
      addressRegion: "Vaud",
      addressCountry: "CH",
    },
    areaServed: [
      { "@type": "City", name: "Lausanne" },
      { "@type": "City", name: "Genève" },
      { "@type": "AdministrativeArea", name: "Suisse romande" },
    ],
    knowsAbout: ["Next.js", "React", "TypeScript", "SaaS", "E-commerce", "Stripe"],
    sameAs: ["https://github.com/yvesnet9"],
  };

  return (
    <html lang="fr" className={`${syne.variable} ${outfit.variable} ${jetbrains.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}