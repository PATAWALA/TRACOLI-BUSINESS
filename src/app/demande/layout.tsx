import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Faire une demande — TRACOLI BUSINESS",
  description:
    "Soumettez votre demande de sourcing ou d'expédition. Envoyez une photo, un lien ou une description et recevez une cotation sous 24h.",
  openGraph: {
    title: "Faire une demande — TRACOLI BUSINESS",
    description:
      "Soumettez votre demande de sourcing ou d'expédition et recevez une cotation rapide.",
    type: "website",
  },
  alternates: {
    canonical: "https://tracoli-business.com/demande",
  },
};

export default function DemandeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
