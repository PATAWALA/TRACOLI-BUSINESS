"use client";

import { Package, ShieldCheck, Clock, Headphones } from "lucide-react";

export default function TrackingHero() {
  return (
    <section className="relative overflow-hidden border-b border-ink-200 bg-gradient-to-b from-white via-ink-50 to-white py-14 lg:py-20">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.3]" />

      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-white px-4 py-2 text-sm font-bold tracking-wide text-tracoli-600 uppercase">
          <Package className="size-4" />
          Suivi en temps réel
        </span>

        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-5xl lg:text-6xl">
          Où est ma marchandise ?
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-500">
          Entrez votre code de suivi pour voir exactement où en est votre
          commande, de la Chine jusqu&apos;à votre porte.
        </p>

        <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-5 sm:gap-8">
          {[
            { icon: Clock, text: "Mis à jour en continu" },
            { icon: ShieldCheck, text: "Données sécurisées" },
            { icon: Headphones, text: "Support WhatsApp" },
          ].map((b) => (
            <span
              key={b.text}
              className="inline-flex items-center gap-2 text-sm font-medium text-ink-500"
            >
              <b.icon className="size-4 text-tracoli-500" />
              {b.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
