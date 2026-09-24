"use client";

import { Plane, Ship, Check } from "lucide-react";
import { FREIGHT_RATES } from "@/data/logistics/rates";
import { useLocale } from "@/hooks/useLocale";

export default function ShippingOptionsGrid() {
  const { locale } = useLocale();
  const options = [
    {
      id: "air",
      icon: Plane,
      ...FREIGHT_RATES.air,
      recommended: false,
      features: {
        fr: ["Dédouanement inclus", "Suivi WhatsApp direct", "Consolidation Guangzhou"],
        en: ["Customs included", "Direct WhatsApp tracking", "Guangzhou consolidation"],
      },
    },
    {
      id: "sea",
      icon: Ship,
      ...FREIGHT_RATES.sea,
      recommended: true,
      features: {
        fr: ["Groupage LCL ou FCL", "Entreposage gratuit", "Dédouanement portuaire"],
        en: ["LCL or FCL consolidation", "Free warehousing", "Port customs clearance"],
      },
    },
  ] as const;

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-xl font-extrabold tracking-tight text-ink-900 sm:text-2xl lg:text-3xl">
            {locale === "fr" ? "Deux modes d'expédition" : "Two shipping modes"}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-[13.5px] text-ink-500 lg:text-[14.5px]">
            {locale === "fr"
              ? "Choisissez selon votre arbitrage vitesse / coût."
              : "Choose based on your speed / cost trade-off."}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {options.map((opt) => {
            const Icon = opt.icon;
            return (
              <div
                key={opt.id}
                className={`relative flex flex-col rounded-3xl border p-6 lg:p-8 ${
                  opt.recommended
                    ? "border-tracoli-200 bg-gradient-to-br from-tracoli-50 via-white to-white shadow-card-lg"
                    : "border-ink-200 bg-white shadow-card"
                }`}
              >
                {opt.recommended && (
                  <span className="absolute -top-3 right-6 rounded-full bg-tracoli-500 px-3 py-1 text-[9.5px] font-bold tracking-wide text-white uppercase">
                    {locale === "fr" ? "Meilleur coût" : "Best value"}
                  </span>
                )}

                <span className="grid size-14 place-items-center rounded-2xl bg-tracoli-500 text-white">
                  <Icon className="size-6" strokeWidth={2} />
                </span>

                <h3 className="mt-5 text-xl font-extrabold tracking-tight text-ink-900">
                  {opt.label[locale]}
                </h3>

                <p className="mt-2 text-[13px] text-ink-500">
                  {locale === "fr" ? "Délai" : "Lead time"} :{" "}
                  <span className="font-bold text-ink-900">{opt.delay[locale]}</span>
                </p>

                <p className="mt-4 text-2xl font-extrabold tracking-tight text-tracoli-500">
                  {opt.min} - {opt.max} USD
                  <span className="ml-1 text-[13px] font-semibold text-ink-500">
                    / {opt.unit}
                  </span>
                </p>

                <ul className="mt-5 space-y-2 border-t border-ink-200 pt-5">
                  {opt.features[locale].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[12.5px] text-ink-700">
                      <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-emerald-100">
                        <Check className="size-2.5 text-emerald-600" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}