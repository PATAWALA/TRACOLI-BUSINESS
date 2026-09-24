import type { Metadata } from "next";
import ShippingHero from "@/components/shipping/ShippingHero";
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
      <ShippingHero />
      <ShippingOptionsGrid />
      <DestinationsGrid />
      <LogisticsWizard />
    </main>
  );
}