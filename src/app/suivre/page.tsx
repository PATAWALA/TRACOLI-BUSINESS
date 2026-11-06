import type { Metadata } from "next";
import TrackingHero from "@/components/tracking/TrackingHero";
import SmartTrackingWidget from "@/components/SmartTrackingWidget";

export const metadata: Metadata = {
  title: "Suivre ma marchandise",
  description:
    "Suivez votre marchandise en temps réel depuis la Chine jusqu'à votre entrepôt en Afrique.",
  openGraph: {
    title: "Suivre ma marchandise — TRACOLI BUSINESS",
    description:
      "Suivi en temps réel de votre marchandise Chine–Afrique.",
    type: "website",
  },
  alternates: {
    canonical: "https://tracoli-business.com/suivre",
  },
};

export default function TrackingPage() {
  return (
    <main className="pt-14 sm:pt-16 lg:pt-20">
      <TrackingHero />
      <SmartTrackingWidget />
    </main>
  );
}