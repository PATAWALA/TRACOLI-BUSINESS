import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos — TRACOLI BUSINESS",
  description:
    "Découvrez TRACOLI Business : notre histoire, notre équipe et notre mission de simplifier le sourcing et la logistique Chine–Afrique pour les entrepreneurs africains.",
  openGraph: {
    title: "À propos — TRACOLI BUSINESS",
    description:
      "Notre histoire, notre équipe et notre mission de simplifier le commerce Chine–Afrique.",
    type: "website",
  },
  alternates: {
    canonical: "https://tracoli-business.com/a-propos",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
