"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Package } from "lucide-react";
import type { Product } from "@/data/products/items";
import { useLocale } from "@/hooks/useLocale";

export default function ProductCard({ product }: { product: Product }) {
  const { locale } = useLocale();

  /* URL avec pré-remplissage du wizard */
  const requestHref = `/sourcer?sourcing-product=${encodeURIComponent(
    product.name[locale]
  )}&sourcing-product-url=${encodeURIComponent(product.image)}#sourcing`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-card transition-all hover:border-tracoli-500/40 hover:shadow-card-lg">
      {/* ============ IMAGE ============ */}
      <div className="relative aspect-square w-full overflow-hidden bg-ink-100">
        <Image
          src={product.image}
          alt={product.imageAlt[locale]}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {product.featured && (
          <span className="absolute top-2.5 left-2.5 rounded-full bg-tracoli-500 px-2.5 py-0.5 text-[9px] font-bold tracking-wide text-white uppercase shadow-[var(--shadow-red)]">
            {locale === "fr" ? "Populaire" : "Popular"}
          </span>
        )}

        <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-0.5 text-[9.5px] font-bold text-ink-700 backdrop-blur">
          <MapPin className="size-2.5" />
          {product.origin}
        </span>

        <div className="absolute inset-x-2 bottom-2 flex flex-wrap gap-1">
          {product.tags[locale].slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-white/95 px-2 py-0.5 text-[9px] font-semibold text-ink-700 backdrop-blur"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ============ CONTENU ============ */}
      <div className="flex flex-1 flex-col p-3.5">
        <h3 className="line-clamp-2 text-[13px] leading-snug font-extrabold tracking-tight text-ink-900">
          {product.name[locale]}
        </h3>

        <p className="mt-2 text-[13px] font-extrabold text-tracoli-500">
          {product.priceRange[locale]}
        </p>

        <p className="mt-0.5 flex items-center gap-1 text-[10.5px] text-ink-500">
          <Package className="size-3" />
          MOQ : <span className="font-semibold text-ink-700">{product.moq}</span>
        </p>

        {/* CTA → Wizard avec pré-remplissage */}
        <Link
          href={requestHref}
          className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-tracoli-500 px-3 py-2.5 text-[11.5px] font-bold text-white shadow-[var(--shadow-red)] transition-all hover:bg-tracoli-600 active:scale-[0.98]"
        >
          {locale === "fr" ? "Demander ce produit" : "Request this product"}
          <ArrowRight className="size-3" />
        </Link>
      </div>
    </article>
  );
}