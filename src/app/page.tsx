import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import QuoteSection from "@/components/QuoteSection";
import SourcingWizard from "@/components/SourcingWizard";
import LogisticsWizard from "@/components/LogisticsWizard";
import SmartTrackingWidget from "@/components/SmartTrackingWidget";
import ProcessSection from "@/components/ProcessSection";

export default function HomePage() {
  return (
    <main className="relative overflow-x-clip">
      {/* 1. Accroche */}
      <HeroSection />

      {/* 2. Réassurance */}
      <AboutSection />
      <ServicesSection />

      {/* 3. Hub de conversion (cible du Header : /#devis) */}
      <QuoteSection />

      {/* 4. Parcours qualifiants (ancres : #sourcing, #logistique, #tracking) */}
      <SourcingWizard />
      <LogisticsWizard />
      <SmartTrackingWidget />

      {/* 5. Processus */}
      <ProcessSection />
    </main>
  );
}