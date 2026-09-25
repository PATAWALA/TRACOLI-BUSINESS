"use client";

import { useState } from "react";
import { PRODUCT_CATEGORIES } from "@/data/products/categories";
import { getProductsByCategory } from "@/data/products/items";
import ProductCard from "./ProductCard";
import { useLocale } from "@/hooks/useLocale";

export default function ProductsByCategory() {
  const { locale } = useLocale();
  const [activeCategory, setActiveCategory] = useState(
    PRODUCT_CATEGORIES[0].slug
  );

  const products = getProductsByCategory(activeCategory);

  return (
    <div>
      {/* Header de section */}
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-white px-3 py-1.5 text-[10.5px] font-bold tracking-wide text-tracoli-600 uppercase">
          {locale === "fr" ? "Catalogue" : "Catalog"}
        </span>
        <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
          {locale === "fr"
            ? "Parcourez notre catalogue d'exemples"
            : "Browse our sample catalog"}
        </h2>
        <p className="mt-2 max-w-2xl text-[14px] text-ink-500">
          {locale === "fr"
            ? "Ces exemples vous donnent une idée des prix et des quantités minimums. Vous cherchez autre chose ? Envoyez-nous votre besoin."
            : "These examples give you an idea of prices and minimum quantities. Looking for something else? Send us your requirement."}
        </p>
      </div>

      {/* ============ ONGLETS CATÉGORIES ============ */}
      <div className="-mx-4 mb-6 overflow-x-auto px-4 scrollbar-hide">
        <div className="flex gap-2">
          {PRODUCT_CATEGORIES.map((cat) => {
            const active = activeCategory === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.slug)}
                className={`shrink-0 rounded-full border px-4 py-2 text-[12px] font-bold transition-all active:scale-[0.98] ${
                  active
                    ? "border-tracoli-500 bg-tracoli-500 text-white shadow-[var(--shadow-red)]"
                    : "border-ink-200 bg-white text-ink-600 hover:border-ink-300 hover:text-ink-900"
                }`}
              >
                {cat.label[locale]}
                <span
                  className={`ml-1.5 text-[10px] ${
                    active ? "text-white/70" : "text-ink-400"
                  }`}
                >
                  {cat.productCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ============ GRILLE PRODUITS ============ */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-ink-300 bg-ink-50 p-8 text-center">
          <p className="text-[13.5px] font-semibold text-ink-700">
            {locale === "fr"
              ? "Aucun exemple disponible dans cette catégorie pour l'instant."
              : "No example available in this category yet."}
          </p>
        </div>
      )}

      <p className="mt-6 text-center text-[11.5px] text-ink-400">
        {locale === "fr"
          ? "Tarifs indicatifs hors fret, taxes et frais de dédouanement."
          : "Indicative prices excluding freight, taxes and customs fees."}
      </p>
    </div>
  );
}