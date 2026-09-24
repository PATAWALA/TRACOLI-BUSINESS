"use client";

import { Plane, ArrowRight } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

export default function ShippingHero() {
  const { locale } = useLocale();

  return (
    <section className="relative overflow-hidden border-b border-ink-200 bg-gradient-to-b from-white via-ink-50 to-white py-12 lg:py-20">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.3]" />

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-white px-3.5 py-1.5 text-[11px] font-bold tracking-wide text-tracoli-600 uppercase">
          <Plane className="size-3" />
          {locale === "fr" ? "Fret international" : "International freight"}
        </span>

        <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl lg:text-5xl">
          {locale === "fr"
            ? "Expédiez votre marchandise vers l'Afrique"
            : "Ship your goods to Africa"}
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-500 lg:text-base">
          {locale === "fr"
            ? "Fret aérien express en 5 à 8 jours, fret maritime groupage en 35 à 45 jours, ou conteneur complet. Dédouanement et livraison porte-à-porte inclus."
            : "Air express freight in 5 to 8 days, sea consolidation in 35 to 45 days, or full container. Customs clearance and door-to-door delivery included."}
        </p>

        <a
          href="#logistique"
          className="mt-8 inline-flex min-h-[52px] items-center gap-2 rounded-xl bg-tracoli-500 px-6 py-3.5 text-[14px] font-bold text-white shadow-[var(--shadow-red)] transition-all hover:bg-tracoli-600 active:scale-[0.98]"
        >
          {locale === "fr" ? "Estimer mon fret" : "Estimate my freight"}
          <ArrowRight className="size-4" />
        </a>
      </div>
    </section>
  );
}