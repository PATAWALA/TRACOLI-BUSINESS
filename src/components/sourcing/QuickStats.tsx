"use client";

import { Users, Package, Globe, Clock } from "lucide-react";

export default function QuickStats() {
  const stats = [
    { icon: Users, value: "5", label: "Pays desservis" },
    { icon: Package, value: "Guangzhou", label: "Hub principal" },
    { icon: Globe, value: "14", label: "Villes couvertes" },
    { icon: Clock, value: "24h", label: "Réponse max" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <div
            key={s.label}
            className="flex items-center gap-3 rounded-2xl border border-ink-200 bg-white p-4 shadow-card"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-tracoli-50 text-tracoli-500">
              <Icon className="size-4" strokeWidth={2} />
            </span>
            <div className="min-w-0">
              <p className="text-[18px] leading-none font-extrabold tracking-tight text-ink-900">
                {s.value}
              </p>
              <p className="mt-1 text-[10.5px] font-semibold text-ink-500">
                {s.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
