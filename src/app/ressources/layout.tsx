import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ressources — Guides & formations import Chine–Afrique",
  description:
    "Guides pratiques, e-books et formations pour réussir votre import de Chine vers l'Afrique. Apprenez le sourcing, le fret et le dédouanement.",
  openGraph: {
    title: "Ressources — TRACOLI BUSINESS",
    description:
      "Guides, e-books et formations pour réussir votre import Chine–Afrique.",
    type: "website",
  },
  alternates: {
    canonical: "https://tracoli-business.com/ressources",
  },
};

export default function RessourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
