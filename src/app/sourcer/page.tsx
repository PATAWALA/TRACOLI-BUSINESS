import type { Metadata } from "next";
import SourcingHero from "@/components/sourcing/SourcingHero";
import CategoriesGrid from "@/components/sourcing/CategoriesGrid";
import ProductsGrid from "@/components/sourcing/ProductsGrid";
import SourcingWizard from "@/components/SourcingWizard";

export const metadata: Metadata = {
  title: "Sourcer un produit en Chine",
  description:
    "Trouvez le fournisseur idéal en Chine. Envoyez-nous une photo ou un lien et recevez une cotation sous 24h.",
};

export default function SourcingPage() {
  return (
    <main className="pt-14 sm:pt-16 lg:pt-20">
      <SourcingHero />
      <CategoriesGrid />
      <ProductsGrid />
      <SourcingWizard />
    </main>
  );
}