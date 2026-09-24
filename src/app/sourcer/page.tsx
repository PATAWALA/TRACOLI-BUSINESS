import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import PageCTA from "@/components/layout/PageCTA";
import SmartTrackingWidget from "@/components/SmartTrackingWidget";
import { MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Suivre ma marchandise",
  description:
    "Suivez votre marchandise en temps réel depuis la Chine jusqu'à votre entrepôt en Afrique.",
};

export default function TrackingPage() {
  return (
    <main className="pt-14 sm:pt-16 lg:pt-20">
      <PageHero
        icon={MapPin}
        badge={{ fr: "Suivi en temps réel", en: "Real-time tracking" }}
        title={{
          fr: "Où est ma marchandise ?",
          en: "Where is my shipment?",
        }}
        description={{
          fr: "Saisissez votre numéro de suivi TRACOLI pour consulter l'avancement de votre envoi, de Guangzhou jusqu'à votre entrepôt.",
          en: "Enter your TRACOLI tracking number to view the progress of your shipment, from Guangzhou to your warehouse.",
        }}
      />

      <PageSection tight>
        <SmartTrackingWidget />
      </PageSection>

      <PageCTA
        title={{
          fr: "Besoin d'aide pour localiser un colis ?",
          en: "Need help locating a shipment?",
        }}
        description={{
          fr: "Notre équipe vous répond directement sur WhatsApp pour tout renseignement.",
          en: "Our team replies directly on WhatsApp for any inquiry.",
        }}
        primaryLabel={{
          fr: "Contacter le service client",
          en: "Contact customer service",
        }}
      />
    </main>
  );
}