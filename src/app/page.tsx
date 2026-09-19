import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SourcingWizard from "@/components/SourcingWizard";
import LogisticsWizard from "@/components/LogisticsWizard";
import SmartTrackingWidget from "@/components/SmartTrackingWidget";
import ServiceCards from "@/components/ServiceCards";
import ProcessSection from "@/components/ProcessSection";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="relative overflow-x-clip">
        {/* 1. Aiguillage immédiat */}
        <HeroSection />

        {/* 2. Les 3 wizards (ancres des Quick Actions) */}
        <SourcingWizard />
        <LogisticsWizard />
        <SmartTrackingWidget />

        {/* 3. Réassurance : services + process */}
        <ServiceCards />
        <ProcessSection />

        {/* 4. Formulaire final complet */}
        <QuoteForm />
      </main>

      <Footer />
    </>
  );
}