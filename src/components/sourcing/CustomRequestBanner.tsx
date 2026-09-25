"use client";

import { Camera, ArrowRight } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

export default function CustomRequestBanner() {
  const { locale } = useLocale();

  return (
    <div className="relative overflow-hidden rounded-3xl border border-tracoli-200 bg-gradient-to-br from-tracoli-50 via-white to-white p-6 shadow-card-lg sm:p-8 lg:p-10">
      <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-tracoli-500/10 blur-3xl" />

      <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-8">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-white px-3 py-1.5 text-[10.5px] font-bold tracking-wide text-tracoli-600 uppercase">
            <Camera className="size-3" />
            {locale === "fr" ? "Recherche personnalisée" : "Custom search"}
          </span>

          <h3 className="mt-3 text-xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-2xl">
            {locale === "fr"
              ? "Vous ne trouvez pas votre produit ?"
              : "Can't find your product?"}
          </h3>

          <p className="mt-2 max-w-xl text-[13.5px] leading-relaxed text-ink-500">
            {locale === "fr"
              ? "Envoyez-nous simplement une photo, un lien ou une description. Nos acheteurs en Chine trouvent le fournisseur idéal et vous envoient une cotation sous 24h."
              : "Simply send us a photo, link or description. Our buyers in China find the ideal supplier and send you a quote within 24h."}
          </p>
        </div>

        <a
          href="#sourcing"
          className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-tracoli-500 px-6 py-3.5 text-[13px] font-bold text-white shadow-[var(--shadow-red)] transition-all hover:bg-tracoli-600 active:scale-[0.98]"
        >
          {locale === "fr" ? "Lancer une recherche" : "Start a search"}
          <ArrowRight className="size-3.5" />
        </a>
      </div>
    </div>
  );
}