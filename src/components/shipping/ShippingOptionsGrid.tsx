"use client";

import { Plane, Ship, Check, Clock } from "lucide-react";
import { FREIGHT_RATES } from "@/data/logistics/rates";

export default function ShippingOptionsGrid() {
  const options = [
    {
      id: "air" as const,
      icon: Plane,
      rate: FREIGHT_RATES.air,
      tagline: "Rapide",
      recommended: false,
      features: [
        "Dédouanement inclus",
        "Suivi WhatsApp direct",
        "Consolidation Guangzhou",
        "Idéal pour colis urgents",
      ],
    },
    {
      id: "sea" as const,
      icon: Ship,
      rate: FREIGHT_RATES.sea,
      tagline: "Économique",
      recommended: true,
      features: [
        "Groupage LCL ou FCL",
        "Entreposage gratuit",
        "Dédouanement portuaire",
        "Idéal pour gros volumes",
      ],
    },
  ];

  return (
    <div>
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
          Deux modes d&apos;expédition
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-[14px] text-ink-500">
          Choisissez selon votre arbitrage vitesse / coût. Cotation ferme après contrôle en entrepôt.
        </p>
      </div>

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
              {opt.recommended && (
                <span className="absolute -top-3 right-6 rounded-full bg-tracoli-500 px-3 py-1 text-[10px] font-bold tracking-wide text-white uppercase shadow-[var(--shadow-red)]">
                  Meilleur coût
                </span>
              )}

              <div className="flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-2xl bg-tracoli-500 text-white">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h3 className="text-[16px] font-extrabold tracking-tight text-ink-900">
                    {rate.label}
                  </h3>
                  <p className="text-[11.5px] font-semibold text-tracoli-500">
                    {opt.tagline}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold tracking-tight text-tracoli-500">
                  {rate.min}–{rate.max}
                </span>
                <span className="text-[13px] font-semibold text-ink-500">
                  USD / {rate.unit}
                </span>
              </div>

              <p className="mt-3 flex items-center gap-1.5 text-[12.5px] font-semibold text-ink-700">
                <Clock className="size-3.5 text-tracoli-500" />
                {rate.delay}
              </p>

              <ul className="mt-5 space-y-2 border-t border-ink-200 pt-5">
                {opt.features.map((f) => (
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
