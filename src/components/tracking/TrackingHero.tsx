"use client";

import { MapPin } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

export default function TrackingHero() {
  const { locale } = useLocale();

  return (
    <section className="relative overflow-hidden border-b border-ink-200 bg-gradient-to-b from-white via-ink-50 to-white py-12 lg:py-20">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.3]" />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-white px-3.5 py-1.5 text-[11px] font-bold tracking-wide text-tracoli-600 uppercase">
          <MapPin className="size-3" />
          {locale === "fr" ? "Suivi en temps réel" : "Real-time tracking"}
        </span>

        <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl lg:text-5xl">
          {locale === "fr" ? "Où est ma marchandise ?" : "Where is my shipment?"}
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-ink-500 lg:text-base">
          {locale === "fr"
            ? "Saisissez votre numéro de suivi TRACOLI pour consulter l'avancement de votre envoi, de Guangzhou jusqu'à votre entrepôt."
            : "Enter your TRACOLI tracking number to check the progress of your shipment, from Guangzhou to your warehouse."}
        </p>
      </div>
    </section>
  );
}