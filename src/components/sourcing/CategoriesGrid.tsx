"use client";

import Image from "next/image";
import { CATEGORIES } from "@/data/home/categories";
import { useLocale } from "@/hooks/useLocale";

export default function CategoriesGrid() {
  const { locale } = useLocale();

  return (
    <div>
      {/* Header de section */}
      <div className="mb-8">
        <h2 className="text-xl font-extrabold tracking-tight text-ink-900 sm:text-2xl">
          {locale === "fr" ? "Explorer par catégorie" : "Explore by category"}
        </h2>
        <p className="mt-2 max-w-2xl text-[13.5px] text-ink-500">
          {locale === "fr"
            ? "Cliquez sur une catégorie pour voir des exemples de produits sourcés par nos équipes."
            : "Click a category to see sample products sourced by our teams."}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-card"
          >
            <div className="relative aspect-square w-full overflow-hidden bg-ink-100">
              <Image
                src={cat.image}
                alt={cat.label[locale]}
                fill
                sizes="(max-width: 640px) 50vw, 20vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-3">
              <p className="text-[13px] font-extrabold tracking-tight text-ink-900">
                {cat.label[locale]}
              </p>
              <p className="mt-0.5 line-clamp-2 text-[10.5px] leading-snug text-ink-500">
                {cat.examples[locale]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}