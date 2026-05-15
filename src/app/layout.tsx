import type { Metadata } from "next";
import { Syne, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({ subsets: ["latin"], weight: ["400","500","600","700","800"], variable: "--font-syne", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], weight: ["300","400","500","600"], variable: "--font-outfit", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400","500"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Yves — Fullstack Developer & Digital Craftsman", template: "%s | Yves" },
  description: "Développeur fullstack basé à Bruxelles. Je conçois et développe des sites web, applications SaaS et e-commerce premium sur mesure pour PME et entrepreneurs.",
  keywords: ["développeur fullstack", "Next.js", "React", "création site web", "Bruxelles", "SaaS", "application web", "portfolio"],
  authors: [{ name: "Yves", url: "https://yvescodes.com" }],
  creator: "Yves — yvescodes",
  metadataBase: new URL("https://yvescodes.com"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://yvescodes.com",
    title: "Yves — Fullstack Developer & Digital Craftsman",
    description: "Développeur fullstack basé à Bruxelles. Sites web, SaaS et applications sur mesure.",
    siteName: "yvescodes",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yves — Fullstack Developer",
    description: "Développeur fullstack basé à Bruxelles. Sites web, SaaS et applications sur mesure.",
    creator: "@yvescodes",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${syne.variable} ${outfit.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}