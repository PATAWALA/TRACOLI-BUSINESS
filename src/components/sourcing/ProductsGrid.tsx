"use client";

import Image from "next/image";
import { ArrowRight, Package } from "lucide-react";
import { PRODUCTS } from "@/data/products/items";
import { CONTACT } from "@/data/config/contact";
import { waLink } from "@/data/shared/helpers";
import { useLocale } from "@/hooks/useLocale";

export default function ProductsGrid() {
  const { locale } = useLocale();

  return (
    <section className="bg-ink-50 py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-white px-3 py-1.5 text-[10.5px] font-bold tracking-wide text-tracoli-600 uppercase">
            <Package className="size-3" />
            {locale === "fr" ? "Exemples" : "Examples"}
          </span>
          <h2 className="mt-3 text-xl font-extrabold tracking-tight text-ink-900 sm:text-2xl lg:text-3xl">
            {locale === "fr"
              ? "Quelques produits que nous sourçons régulièrement"
              : "Some products we regularly source"}
          </h2>
          <p className="mt-2 max-w-2xl text-[13.5px] text-ink-500 lg:text-[14.5px]">
            {locale === "fr"
              ? "Ces exemples vous donnent une idée des prix et des quantités minimums. Vous cherchez autre chose ? Envoyez-nous votre besoin."
              : "These examples give you an idea of prices and minimum quantities. Looking for something else? Send us your requirement."}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {PRODUCTS.map((product) => (
            <article
              key={product.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-card transition-all hover:border-tracoli-500/40 hover:shadow-card-lg"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-ink-100">
                <Image
                  src={product.image}
                  alt={product.name[locale]}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-2 left-2 rounded-md bg-white/95 px-2 py-0.5 text-[9px] font-bold tracking-wide text-ink-700 uppercase backdrop-blur">
                  {product.origin}
                </span>
              </div>

              {/* Contenu */}
              <div className="flex flex-1 flex-col p-3">
                <h3 className="text-[12.5px] leading-snug font-extrabold tracking-tight text-ink-900 lg:text-[13px]">
                  {product.name[locale]}
                </h3>

                <p className="mt-1.5 text-[10.5px] font-semibold text-tracoli-500">
                  {product.priceRange[locale]}
                </p>
                <p className="mt-0.5 text-[10px] text-ink-500">
                  MOQ : {product.moq}
                </p>

                <a
                  href={waLink(
                    `${locale === "fr" ? "Bonjour" : "Hello"} ${CONTACT.manager}, ${locale === "fr" ? "je suis intéressé par ce produit" : "I'm interested in this product"} : ${product.name[locale]}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center gap-1 rounded-lg bg-tracoli-500 px-2.5 py-2 text-[10.5px] font-bold text-white transition-colors hover:bg-tracoli-600 active:scale-[0.98]"
                >
                  {locale === "fr" ? "Demander ce produit" : "Request this product"}
                  <ArrowRight className="size-3" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 text-center text-[11.5px] text-ink-400">
          {locale === "fr"
            ? "Tarifs indicatifs hors fret, taxes et frais de dédouanement."
            : "Indicative prices excluding freight, taxes and customs fees."}
        </p>
      </div>
    </section>
  );
}