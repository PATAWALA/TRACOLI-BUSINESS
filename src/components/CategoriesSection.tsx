"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/data/home/categories";
import { CONTACT } from "@/data/config/contact";
import { waLink } from "@/data/shared/helpers";
import { useLocale } from "@/hooks/useLocale";

export default function CategoriesSection() {
  const { locale } = useLocale();

  return (
    <section className="relative bg-ink-50 py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Titre */}
        <div className="mb-8 flex items-end justify-between gap-4 lg:mb-10">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-ink-900 sm:text-2xl lg:text-3xl">
              {locale === "fr" ? "Vous cherchez quoi ?" : "Looking for what?"}
            </h2>
            <p className="mt-2 max-w-xl text-[13.5px] text-ink-500 lg:text-[14.5px]">
              {locale === "fr"
                ? "Envoyez-nous une photo ou un lien. Nous trouvons le fournisseur pour vous."
                : "Send us a photo or link. We find the supplier for you."}
            </p>
          </div>
        </div>

        {/* Carrousel horizontal mobile / grille desktop */}
        <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide snap-x-mandatory sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0 lg:grid-cols-5 lg:gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={waLink(
                `${locale === "fr" ? "Bonjour" : "Hello"} ${CONTACT.manager}, ${locale === "fr" ? "je cherche un produit dans la catégorie" : "I'm looking for a product in category"} : ${cat.label[locale]}.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex w-[140px] shrink-0 flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-card transition-all hover:border-tracoli-500/40 hover:shadow-card-lg active:scale-[0.98] sm:w-auto"
            >
              {/* Image */}
              <div className="relative aspect-square w-full overflow-hidden bg-ink-100">
                <Image
                  src={cat.image}
                  alt={cat.label[locale]}
                  fill
                  sizes="(max-width: 640px) 140px, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/40 via-transparent to-transparent" />
              </div>

              {/* Texte */}
              <div className="p-3">
                <p className="text-[13px] font-extrabold tracking-tight text-ink-900">
                  {cat.label[locale]}
                </p>
                <p className="mt-0.5 line-clamp-2 text-[10.5px] leading-snug text-ink-500">
                  {cat.examples[locale]}
                </p>
              </div>

              {/* Micro CTA */}
              <span className="flex items-center gap-1 px-3 pb-3 text-[11px] font-bold text-tracoli-500">
                {locale === "fr" ? "Demander" : "Request"}
                <ArrowRight className="size-3" />
              </span>
            </Link>
          ))}
        </div>

        {/* Note bas */}
        <p className="mt-4 text-center text-[11.5px] text-ink-400 sm:text-left">
          {locale === "fr"
            ? "Un produit spécifique ? Envoyez-nous une photo, on s'occupe de la recherche."
            : "A specific product? Send us a photo and we'll handle the search."}
        </p>
      </div>
    </section>
  );
}