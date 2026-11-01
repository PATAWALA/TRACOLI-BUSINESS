import type { Metadata } from "next";
import { Suspense } from "react";
import { Search } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import PageCTA from "@/components/layout/PageCTA";
import QuickStats from "@/components/sourcing/QuickStats";
import CatalogSection from "@/components/sourcing/CatalogSection";
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
        badge="Sourcing en Chine"
        title="Trouvez le fournisseur idéal pour votre produit"
        description="Vous avez un produit en tête ? Envoyez-nous une photo ou un lien. Nos équipes en Chine identifient les meilleurs fournisseurs, négocient les prix et sécurisent votre commande."
        ctaLabel="Lancer une recherche"
        ctaHref="#sourcing"
      />

      <PageSection tight>
        <QuickStats />
      </PageSection>

      {/* Catalogue — filtres + grille produits (une seule section) */}
      <PageSection variant="alt">
        <CatalogSection />
      </PageSection>

      <PageSection>
        <CustomRequestBanner />
      </PageSection>

      <Suspense fallback={null}>
        <SourcingWizard />
      </Suspense>

      <PageCTA
        title="Besoin d'un autre produit ?"
        description="Envoyez-nous votre besoin par WhatsApp. Nos acheteurs en Chine vous répondent sous 24h."
        primaryLabel="Contacter un acheteur"
        primaryHref="/#devis"
      />
    </main>
  );
}