import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SourcingWizard from "@/components/SourcingWizard";
import LogisticsWizard from "@/components/LogisticsWizard";
import SmartTrackingWidget from "@/components/SmartTrackingWidget";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import Footer from "@/components/Footer";
import { LocaleProvider } from "@/hooks/useLocale";

export default function HomePage() {
  return (
    <LocaleProvider>
      <Header />

      <main className="relative overflow-x-clip">
        {/* 1. Aiguillage immédiat */}
        <HeroSection />

        {/* 2. Réassurance */}
        <AboutSection />
        <ServicesSection />

        {/* 3. Les 3 wizards (ancres des Quick Actions) */}
        <SourcingWizard />
        <LogisticsWizard />
        <SmartTrackingWidget />

        {/* 4. Processus */}
        <ProcessSection />
      </main>

      <Footer />
    </LocaleProvider>
  );
}