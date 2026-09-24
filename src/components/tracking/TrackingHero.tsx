"use client";

import { MapPin } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

export default function TrackingHero() {
  const { locale } = useLocale();

  return (
    <section className="relative overflow-hidden border-b border-ink-200 bg-gradient-to-b from-white via-ink-50 to-white py-12 lg:py-16">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.3]" />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-white px-3.5 py-1.5 text-[11px] font-bold tracking-wide text-tracoli-600 uppercase">
          <MapPin className="size-3" />
          {locale === "fr" ? "Suivi" : "Tracking"}
        </span>

        <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl lg:text-5xl">
          {locale === "fr" ? "Où est ma marchandise ?" : "Where is my shipment?"}
        </h1>
      </div>
    </section>
  );
}