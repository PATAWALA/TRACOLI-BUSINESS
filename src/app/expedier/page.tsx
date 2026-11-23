import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import PageCTA from "@/components/layout/PageCTA";
import ShippingOptionsGrid from "@/components/shipping/ShippingOptionsGrid";
import DestinationsGrid from "@/components/shipping/DestinationsGrid";
import LogisticsWizard from "@/components/LogisticsWizard";

export const metadata: Metadata = {
  title: "Expédier une marchandise",
  description:
    "Estimez votre fret aérien ou maritime de la Chine vers l'Afrique. Cotation immédiate, coordination douanière, livraison porte-à-porte.",
  openGraph: {
    title: "Expédier une marchandise — TRACOLI BUSINESS",
    description:
      "Fret aérien et maritime Chine–Afrique. Cotation immédiate, dédouanement inclus.",
    type: "website",
  },
  alternates: {
    canonical: "https://www.tracolibusiness.com/expedier",
  },
};

export default function ShippingPage() {
  return (
    <main className="pt-header">
      <PageHero
        title="Expédiez votre marchandise vers l'Afrique"
        description="Fret aérien ou maritime, dédouanement et livraison porte-à-porte dans 5 pays d'Afrique Centrale et de l'Est."
        ctaLabel="Estimer mon fret"
        ctaHref="#logistique"
        image={{
          src: "/images/box-handover.webp",
          alt: "Remise de colis entre deux personnes",
          blend: true,
        }}
      />

      <PageSection>
        <ShippingOptionsGrid />
      </PageSection>

      <PageSection variant="alt">
        <DestinationsGrid />
      </PageSection>

      <LogisticsWizard />

      <PageCTA
        title="Une question sur votre envoi ?"
        description="Contactez notre équipe pour une cotation personnalisée sous 2 heures ouvrées."
        primaryLabel="Passer commande"
      />
    </main>
  );
}