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
      <h2 className="max-w-2xl text-3xl leading-[1.15] font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl">
        Deux modes d&apos;expédition
      </h2>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-700 lg:text-lg">
        Choisissez selon votre arbitrage vitesse / coût. Cotation ferme après
        contrôle en entrepôt.
      </p>

      <div className="mt-10 grid gap-5 lg:grid-cols-2 lg:gap-6">
        {options.map((opt) => {
          const Icon = opt.icon;
          const { rate } = opt;

          return (
            <article
              key={opt.id}
              className={`flex flex-col rounded-3xl bg-white p-6 sm:p-8 ${
                opt.recommended
                  ? "border-2 border-tracoli-500"
                  : "border border-ink-200"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="grid size-12 place-items-center rounded-xl bg-tracoli-50 text-tracoli-500">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-xl font-extrabold tracking-tight text-ink-900">
                      {rate.label}
                    </h3>
                    <p className="text-sm font-semibold text-ink-700">
                      {opt.tagline}
                    </p>
                  </div>
                </div>
                {opt.recommended && (
                  <span className="rounded-full bg-tracoli-500 px-3 py-1 text-xs font-bold text-white">
                    Meilleur coût
                  </span>
                )}
              </div>

              <p className="mt-7 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold tracking-tight text-ink-900 tabular-nums">
                  {rate.min}–{rate.max}
                </span>
                <span className="text-sm font-semibold text-ink-700">
                  USD / {rate.unit}
                </span>
              </p>

              <p className="mt-3 flex items-center gap-2 text-[15px] font-semibold text-ink-700">
                <Clock className="size-4 text-tracoli-500" aria-hidden />
                {rate.delay}
              </p>

              <ul className="mt-7 grid gap-3 border-t border-ink-200 pt-7 sm:grid-cols-2">
                {opt.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-tracoli-500"
                      strokeWidth={3}
                      aria-hidden
                    />
                    <span className="text-[15px] leading-snug text-ink-800">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </div>
  );
}
