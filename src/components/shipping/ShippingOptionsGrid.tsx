"use client";

import { Plane, Ship, Check, Clock, Package } from "lucide-react";
import { FREIGHT_RATES } from "@/data/logistics/rates";
import { useLocale } from "@/hooks/useLocale";

export default function ShippingOptionsGrid() {
  const { locale } = useLocale();

  const options = [
    {
      id: "air",
      icon: Plane,
      rate: FREIGHT_RATES.air,
      tagline: { fr: "Rapide", en: "Fast" },
      recommended: false,
      features: {
        fr: [
          "Dédouanement inclus",
          "Suivi WhatsApp direct",
          "Consolidation Guangzhou",
          "Idéal pour colis urgents",
        ],
        en: [
          "Customs included",
          "Direct WhatsApp tracking",
          "Guangzhou consolidation",
          "Ideal for urgent parcels",
        ],
      },
    },
    {
      id: "sea",
      icon: Ship,
      rate: FREIGHT_RATES.sea,
      tagline: { fr: "Économique", en: "Economical" },
      recommended: true,
      features: {
        fr: [
          "Groupage LCL ou FCL",
          "Entreposage gratuit",
          "Dédouanement portuaire",
          "Idéal pour gros volumes",
        ],
        en: [
          "LCL or FCL consolidation",
          "Free warehousing",
          "Port customs clearance",
          "Ideal for large volumes",
        ],
      },
    },
  ] as const;

  return (
    <div>
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
          {locale === "fr" ? "Deux modes d'expédition" : "Two shipping modes"}
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-[14px] text-ink-500">
          {locale === "fr"
            ? "Choisissez selon votre arbitrage vitesse / coût. Cotation ferme après contrôle en entrepôt."
            : "Choose based on your speed / cost trade-off. Final quote after warehouse inspection."}
        </p>
      </div>

      {/* Grille 2 colonnes */}
      <div className="grid gap-4 sm:grid-cols-2">
        {options.map((opt) => {
          const Icon = opt.icon;
          const { rate } = opt;

          return (
            <div
              key={opt.id}
              className={`relative flex flex-col rounded-3xl border p-6 lg:p-7 ${
                opt.recommended
                  ? "border-tracoli-500/30 bg-gradient-to-br from-tracoli-50 via-white to-white shadow-card-lg"
                  : "border-ink-200 bg-white shadow-card"
              }`}
            >
              {/* Badge recommandé */}
              {opt.recommended && (
                <span className="absolute -top-3 right-6 rounded-full bg-tracoli-500 px-3 py-1 text-[10px] font-bold tracking-wide text-white uppercase shadow-[var(--shadow-red)]">
                  {locale === "fr" ? "Meilleur coût" : "Best value"}
                </span>
              )}

              {/* Icône + titre */}
              <div className="flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-2xl bg-tracoli-500 text-white">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h3 className="text-[16px] font-extrabold tracking-tight text-ink-900">
                    {rate.label[locale]}
                  </h3>
                  <p className="text-[11.5px] font-semibold text-tracoli-500">
                    {opt.tagline[locale]}
                  </p>
                </div>
              </div>

              {/* Prix */}
              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold tracking-tight text-tracoli-500">
                  {rate.min}–{rate.max}
                </span>
                <span className="text-[13px] font-semibold text-ink-500">
                  USD / {rate.unit}
                </span>
              </div>

              {/* Délai */}
              <p className="mt-3 flex items-center gap-1.5 text-[12.5px] font-semibold text-ink-700">
                <Clock className="size-3.5 text-tracoli-500" />
                {rate.delay[locale]}
              </p>

              {/* Features */}
              <ul className="mt-5 space-y-2 border-t border-ink-200 pt-5">
                {opt.features[locale].map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-emerald-100">
                      <Check className="size-2.5 text-emerald-600" strokeWidth={3} />
                    </span>
                    <span className="text-[12px] leading-snug text-ink-600">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}