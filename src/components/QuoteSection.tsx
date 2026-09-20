"use client";

import { Search, Plane, MapPin, ArrowRight, Clock3, ShieldCheck, Check } from "lucide-react";
import { QUOTE_HUB } from "@/data/content";
import { useLocale } from "@/hooks/useLocale";

const ICONS = {
  search: Search,
  plane: Plane,
  pin: MapPin,
} as const;

export default function QuoteSection() {
  const { locale } = useLocale();

  return (
    <section
      id="devis"
      className="relative scroll-mt-24 overflow-hidden border-t border-ink-200 bg-gradient-to-b from-ink-50 via-white to-white py-20 lg:py-28"
    >
      {/* Décor */}
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.25]" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-80 w-[640px] -translate-x-1/2 rounded-full bg-tracoli-500/8 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Titre */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-white px-3.5 py-1.5 text-[11px] font-bold tracking-wide text-tracoli-600 uppercase">
            {QUOTE_HUB.eyebrow[locale]}
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl lg:text-[2.75rem]">
            {QUOTE_HUB.title[locale]}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-ink-500">
            {QUOTE_HUB.subtitle[locale]}
          </p>
        </div>

        {/* 3 cards de parcours */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {QUOTE_HUB.options.map((option) => {
            const Icon = ICONS[option.icon as keyof typeof ICONS];
            const isPrimary = option.accent === "primary";
            const isDark = option.accent === "dark";
            const isOutline = option.accent === "outline";

            return (
              <a
                key={option.id}
                href={option.href}
                className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-300 active:scale-[0.985] ${
                  isPrimary
                    ? "border-tracoli-500 bg-tracoli-500 text-white shadow-[var(--shadow-red)] hover:bg-tracoli-600"
                    : isDark
                    ? "border-ink-900 bg-ink-900 text-white shadow-card-lg hover:bg-ink-800"
                    : "border-ink-200 bg-white text-ink-900 shadow-card hover:border-ink-300 hover:shadow-card-lg"
                }`}
              >
                {/* Icône */}
                <div className="flex items-start justify-between">
                  <span
                    className={`grid size-12 place-items-center rounded-xl ${
                      isPrimary
                        ? "bg-white/15 text-white"
                        : isDark
                        ? "bg-white/10 text-white"
                        : "bg-tracoli-50 text-tracoli-500"
                    }`}
                  >
                    <Icon className="size-5" />
                  </span>
                  <span className="grid size-8 place-items-center rounded-full border border-current/15 opacity-50 transition-all group-hover:translate-x-0.5 group-hover:opacity-100">
                    <ArrowRight className="size-4" />
                  </span>
                </div>

                {/* Titre */}
                <h3 className="mt-6 text-[17px] font-extrabold tracking-tight">
                  {option.title[locale]}
                </h3>
                <p
                  className={`mt-2 text-[13px] leading-relaxed ${
                    isPrimary
                      ? "text-white/85"
                      : isDark
                      ? "text-white/70"
                      : "text-ink-500"
                  }`}
                >
                  {option.description[locale]}
                </p>

                {/* Features */}
                <ul className="mt-4 space-y-1.5">
                  {option.features[locale].map((f) => (
                    <li
                      key={f}
                      className={`flex items-center gap-2 text-[11.5px] ${
                        isPrimary
                          ? "text-white/80"
                          : isDark
                          ? "text-white/60"
                          : "text-ink-500"
                      }`}
                    >
                      <Check
                        className={`size-3 shrink-0 ${
                          isPrimary
                            ? "text-white"
                            : isDark
                            ? "text-emerald-400"
                            : "text-emerald-500"
                        }`}
                        strokeWidth={3}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <span
                  className={`mt-auto flex items-center gap-1.5 pt-6 text-[13px] font-bold ${
                    isPrimary || isDark ? "text-white" : "text-tracoli-500"
                  }`}
                >
                  {option.cta[locale]}
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            );
          })}
        </div>

        {/* Bandeau garanties */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 rounded-2xl border border-ink-200 bg-white px-6 py-4 shadow-card sm:flex-row sm:gap-6">
          <span className="flex items-center gap-2 text-[12px] font-semibold text-ink-600">
            <Clock3 className="size-3.5 text-tracoli-500" />
            {locale === "fr" ? "Réponse sous 2 h" : "Reply within 2 h"}
          </span>
          <span className="hidden h-3 w-px bg-ink-200 sm:block" />
          <span className="flex items-center gap-2 text-[12px] font-semibold text-ink-600">
            <ShieldCheck className="size-3.5 text-tracoli-500" />
            {locale === "fr" ? "Devis ferme sans frais cachés" : "Firm quote, no hidden fees"}
          </span>
          <span className="hidden h-3 w-px bg-ink-200 sm:block" />
          <span className="flex items-center gap-2 text-[12px] font-semibold text-ink-600">
            <Check className="size-3.5 text-tracoli-500" strokeWidth={3} />
            {locale === "fr" ? "Aucun engagement" : "No commitment"}
          </span>
        </div>
      </div>
    </section>
  );
}