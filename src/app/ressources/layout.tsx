import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Boutique — Guides, ebooks & formations import Chine–Afrique",
  description:
    "Guides gratuits, livres PDF et formations pour réussir votre import de Chine vers l'Afrique. Apprenez le sourcing, le fret et le dédouanement.",
  openGraph: {
    title: "Boutique — TRACOLI BUSINESS",
    description:
      "Guides, e-books et formations pour réussir votre import Chine–Afrique.",
    type: "website",
  },
  alternates: {
    canonical: "https://www.tracolibusiness.com/ressources",
  },
};

export default function RessourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
