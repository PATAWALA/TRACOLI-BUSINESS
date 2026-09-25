"use client";

import { getFeaturedProducts } from "@/data/products/items";
import ProductCard from "./ProductCard";
import { useLocale } from "@/hooks/useLocale";

export default function FeaturedProducts() {
  const { locale } = useLocale();
  const products = getFeaturedProducts();

  return (
    <div>
      {/* Header de section */}
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-white px-3 py-1.5 text-[10.5px] font-bold tracking-wide text-tracoli-600 uppercase">
            {locale === "fr" ? "Populaires" : "Popular"}
          </span>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
            {locale === "fr"
              ? "Produits les plus demandés"
              : "Most requested products"}
          </h2>
          <p className="mt-2 max-w-2xl text-[14px] text-ink-500">
            {locale === "fr"
              ? "Une sélection des produits que nos clients sourcent le plus souvent."
              : "A selection of products our clients source most often."}
          </p>
        </div>
      </div>

      {/* Carrousel mobile / grille desktop */}
      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-3 scrollbar-hide snap-x-mandatory sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 lg:gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[200px] shrink-0 snap-start-item sm:w-auto"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}