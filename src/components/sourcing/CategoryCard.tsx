"use client";

import Image from "next/image";
import { ArrowRight, Package } from "lucide-react";
import { CONTACT } from "@/data/config/contact";
import { waLink } from "@/data/shared/helpers";
import type { ProductCategory } from "@/data/products/categories";
import { useLocale } from "@/hooks/useLocale";

export default function CategoryCard({ category }: { category: ProductCategory }) {
  const { locale } = useLocale();

  return (
    <a
      href={waLink(
        `${locale === "fr" ? "Bonjour" : "Hello"} ${CONTACT.manager}, ${locale === "fr" ? "je cherche un produit dans la catégorie" : "I'm looking for a product in category"} : ${category.label[locale]}.`
      )}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-ink-200 bg-white shadow-card transition-all hover:border-tracoli-500/40 hover:shadow-card-lg active:scale-[0.98]"
    >
      {/* ============ IMAGE ============ */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-100">
        <Image
          src={category.image}
          alt={category.label[locale]}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Overlay dégradé */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/20 to-transparent" />

        {/* Compteur produits (badge haut droit) */}
        <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold text-ink-800 backdrop-blur">
          <Package className="size-2.5 text-tracoli-500" />
          {category.productCount}
        </span>

        {/* Titre sur l'image (bas) */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="text-[16px] font-extrabold tracking-tight text-white">
            {category.label[locale]}
          </h3>
          <p className="mt-0.5 line-clamp-1 text-[11.5px] text-white/85">
            {category.tagline[locale]}
          </p>
        </div>
      </div>

      {/* ============ CONTENU ============ */}
      <div className="flex flex-1 flex-col p-4">
        {/* Sous-catégories */}
        <div className="flex flex-wrap gap-1.5">
          {category.subCategories[locale].slice(0, 4).map((sub) => (
            <span
              key={sub}
              className="rounded-md border border-ink-200 bg-ink-50 px-2 py-0.5 text-[10px] font-medium text-ink-600"
            >
              {sub}
            </span>
          ))}
          {category.subCategories[locale].length > 4 && (
            <span className="rounded-md border border-tracoli-200 bg-tracoli-50 px-2 py-0.5 text-[10px] font-bold text-tracoli-600">
              +{category.subCategories[locale].length - 4}
            </span>
          )}
        </div>

        {/* CTA */}
        <span className="mt-auto flex items-center gap-1.5 pt-4 text-[12px] font-bold text-tracoli-500">
          {locale === "fr" ? "Voir les produits" : "See products"}
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </a>
  );
}