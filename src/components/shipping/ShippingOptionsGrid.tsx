"use client";

import { Plane, Ship, Clock } from "lucide-react";
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
    },
    {
      id: "sea",
      icon: Ship,
      rate: FREIGHT_RATES.sea,
      tagline: { fr: "Économique", en: "Economical" },
      recommended: true,
    },
  ] as const;

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-xl font-extrabold tracking-tight text-ink-900 sm:text-2xl lg:text-3xl">
            {locale === "fr" ? "Deux modes d'expédition" : "Two shipping modes"}
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {options.map((opt) => {
            const Icon = opt.icon;
            const { rate } = opt;

            return (
              <div
                key={opt.id}
                className={`relative flex flex-col rounded-2xl border p-5 lg:p-6 ${
                  opt.recommended
                    ? "border-tracoli-200 bg-gradient-to-br from-tracoli-50 via-white to-white shadow-card"
                    : "border-ink-200 bg-white shadow-card"
                }`}
              >
                {opt.recommended && (
                  <span className="absolute -top-2.5 right-5 rounded-full bg-tracoli-500 px-2.5 py-0.5 text-[9px] font-bold tracking-wide text-white uppercase">
                    {locale === "fr" ? "Meilleur coût" : "Best value"}
                  </span>
                )}

                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-tracoli-50 text-tracoli-500">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-[15px] font-extrabold tracking-tight text-ink-900">
                      {rate.label[locale]}
                    </h3>
                    <p className="text-[11.5px] font-semibold text-ink-500">
                      {opt.tagline[locale]}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-end gap-2">
                  <span className="text-2xl font-extrabold tracking-tight text-tracoli-500">
                    {rate.min} – {rate.max}
                  </span>
                  <span className="pb-1 text-[12px] font-semibold text-ink-500">
                    USD / {rate.unit}
                  </span>
                </div>

                <p className="mt-3 flex items-center gap-1.5 text-[12px] font-semibold text-ink-600">
                  <Clock className="size-3.5 text-tracoli-500" />
                  {rate.delay[locale]}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}