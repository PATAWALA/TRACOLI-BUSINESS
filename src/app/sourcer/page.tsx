import type { Metadata } from "next";
import { Search } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import PageCTA from "@/components/layout/PageCTA";
import QuickStats from "@/components/sourcing/QuickStats";
import CategoriesExplorer from "@/components/sourcing/CategoriesExplorer";
import FeaturedProducts from "@/components/sourcing/FeaturedProducts";
import ProductsByCategory from "@/components/sourcing/ProductsByCategory";
import CustomRequestBanner from "@/components/sourcing/CustomRequestBanner";
import SourcingWizard from "@/components/SourcingWizard";

export const metadata: Metadata = {
  title: "Sourcer un produit en Chine",
  description:
    "Trouvez le fournisseur idéal en Chine. Envoyez-nous une photo ou un lien et recevez une cotation sous 24h.",
};

export default function SourcingPage() {
  return (
    <main className="pt-14 sm:pt-16 lg:pt-20">
      <PageHero
        icon={<Search className="size-3" />}
        badge={{ fr: "Sourcing en Chine", en: "Sourcing in China" }}
        title={{
          fr: "Trouvez le fournisseur idéal pour votre produit",
          en: "Find the ideal supplier for your product",
        }}
        description={{
          fr: "Vous avez un produit en tête ? Envoyez-nous une photo ou un lien. Nos équipes en Chine identifient les meilleurs fournisseurs, négocient les prix et sécurisent votre commande.",
          en: "Got a product in mind? Send us a photo or a link. Our teams in China identify the best suppliers, negotiate prices and secure your order.",
        }}
        ctaLabel={{ fr: "Lancer une recherche", en: "Start a search" }}
        ctaHref="#sourcing"
      />

      <PageSection tight>
        <QuickStats />
      </PageSection>

      <PageSection variant="alt">
        <CategoriesExplorer />
      </PageSection>

      <PageSection>
        <FeaturedProducts />
      </PageSection>

      <PageSection variant="alt">
        <ProductsByCategory />
      </PageSection>

      <PageSection>
        <CustomRequestBanner />
      </PageSection>

      <SourcingWizard />

      <PageCTA
        title={{
          fr: "Besoin d'un autre produit ?",
          en: "Looking for another product?",
        }}
        description={{
          fr: "Envoyez-nous votre besoin par WhatsApp. Nos acheteurs en Chine vous répondent sous 24h.",
          en: "Send us your requirement via WhatsApp. Our buyers in China reply within 24h.",
        }}
        primaryLabel={{ fr: "Contacter un acheteur", en: "Contact a buyer" }}
        primaryHref="/#devis"
      />
    </main>
  );
}