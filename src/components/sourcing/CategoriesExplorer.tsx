"use client";

import { PRODUCT_CATEGORIES } from "@/data/products/categories";
import CategoryCard from "./CategoryCard";
import { useLocale } from "@/hooks/useLocale";

export default function CategoriesExplorer() {
  const { locale } = useLocale();

  return (
    <div>
      {/* Header de section */}
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-white px-3 py-1.5 text-[10.5px] font-bold tracking-wide text-tracoli-600 uppercase">
          {locale === "fr" ? "Catégories" : "Categories"}
        </span>
        <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
          {locale === "fr" ? "Explorez par catégorie" : "Explore by category"}
        </h2>
        <p className="mt-2 max-w-2xl text-[14px] text-ink-500">
          {locale === "fr"
            ? "Sélectionnez une catégorie pour découvrir des exemples de produits sourcés par nos équipes."
            : "Select a category to explore sample products sourced by our teams."}
        </p>
      </div>

      {/* Grille */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {PRODUCT_CATEGORIES.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </div>
  );
}