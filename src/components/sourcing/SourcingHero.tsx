"use client";

import { Search, ArrowRight } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

export default function SourcingHero() {
  const { locale } = useLocale();

  return (
    <section className="relative overflow-hidden border-b border-ink-200 bg-gradient-to-b from-white via-ink-50 to-white py-12 lg:py-20">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.3]" />

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-white px-3.5 py-1.5 text-[11px] font-bold tracking-wide text-tracoli-600 uppercase">
          <Search className="size-3" />
          {locale === "fr" ? "Sourcing en Chine" : "Sourcing in China"}
        </span>

        <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl lg:text-5xl">
          {locale === "fr"
            ? "Trouvez le fournisseur idéal pour votre produit"
            : "Find the ideal supplier for your product"}
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-500 lg:text-base">
          {locale === "fr"
            ? "Vous avez un produit en tête ? Envoyez-nous une photo ou un lien. Nos équipes en Chine identifient les meilleurs fournisseurs, négocient les prix et sécurisent votre commande."
            : "Got a product in mind? Send us a photo or a link. Our teams in China identify the best suppliers, negotiate prices and secure your order."}
        </p>

        <a
          href="#sourcing"
          className="mt-8 inline-flex min-h-[52px] items-center gap-2 rounded-xl bg-tracoli-500 px-6 py-3.5 text-[14px] font-bold text-white shadow-[var(--shadow-red)] transition-all hover:bg-tracoli-600 active:scale-[0.98]"
        >
          {locale === "fr" ? "Lancer une recherche" : "Start a search"}
          <ArrowRight className="size-4" />
        </a>
      </div>
    </section>
  );
}