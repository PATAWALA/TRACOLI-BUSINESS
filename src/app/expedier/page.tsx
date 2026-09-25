import type { Metadata } from "next";
import { Plane } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import PageCTA from "@/components/layout/PageCTA";
import ShippingOptionsGrid from "@/components/shipping/ShippingOptionsGrid";
import DestinationsGrid from "@/components/shipping/DestinationsGrid";
import LogisticsWizard from "@/components/LogisticsWizard";

export const metadata: Metadata = {
  title: "Expédier une marchandise",
  description:
    "Estimez votre fret aérien ou maritime de la Chine vers l'Afrique. Cotation immédiate, dédouanement inclus, livraison porte-à-porte.",
};

export default function ShippingPage() {
  return (
    <main className="pt-14 sm:pt-16 lg:pt-20">
      <PageHero
        icon={<Plane className="size-3" />}
        badge={{ fr: "Expédition", en: "Shipping" }}
        title={{
          fr: "Expédiez votre marchandise vers l'Afrique",
          en: "Ship your goods to Africa",
        }}
        description={{
          fr: "Fret aérien ou maritime, dédouanement et livraison porte-à-porte dans 5 pays d'Afrique Centrale et de l'Est.",
          en: "Air or sea freight, customs clearance and door-to-door delivery in 5 Central and East African countries.",
        }}
        ctaLabel={{ fr: "Estimer mon fret", en: "Estimate my freight" }}
        ctaHref="#logistique"
      />

      <PageSection>
        <ShippingOptionsGrid />
      </PageSection>

      <PageSection variant="alt">
        <DestinationsGrid />
      </PageSection>

      <LogisticsWizard />

      <PageCTA
        title={{
          fr: "Une question sur votre envoi ?",
          en: "A question about your shipment?",
        }}
        description={{
          fr: "Contactez notre équipe pour une cotation personnalisée sous 2 heures ouvrées.",
          en: "Contact our team for a personalized quote within 2 business hours.",
        }}
        primaryLabel={{
          fr: "Demander une cotation",
          en: "Request a quote",
        }}
      />
    </main>
  );
}