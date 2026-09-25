"use client";

import { Users, Package, Globe, Clock } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

export default function QuickStats() {
  const { locale } = useLocale();

  const stats = [
    {
      icon: Users,
      value: "500+",
      label: { fr: "Fournisseurs audités", en: "Audited suppliers" },
    },
    {
      icon: Package,
      value: "1 800+",
      label: { fr: "Produits sourcés", en: "Products sourced" },
    },
    {
      icon: Globe,
      value: "5",
      label: { fr: "Pays desservis", en: "Countries served" },
    },
    {
      icon: Clock,
      value: "24h",
      label: { fr: "Réponse max", en: "Max response" },
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <div
            key={s.label.fr}
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
                {s.label[locale]}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}