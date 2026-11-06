import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter — TRACOLI BUSINESS",
  description:
    "Inscrivez-vous à la newsletter TRACOLI Business pour recevoir nos conseils sourcing, offres spéciales et actualités du fret Chine–Afrique.",
  openGraph: {
    title: "Newsletter — TRACOLI BUSINESS",
    description:
      "Recevez nos conseils sourcing et actualités du fret Chine–Afrique.",
    type: "website",
  },
  alternates: {
    canonical: "https://www.tracolibusiness.com/newsletter",
  },
};

export default function NewsletterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
