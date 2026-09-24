"use client";

import {
  Search,
  Handshake,
  ShieldCheck,
  Plane,
  FileCheck2,
  Truck,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { WHY_TRACOLI } from "@/data/home/why";
import { useLocale } from "@/hooks/useLocale";

const ICON_MAP: Record<string, LucideIcon> = {
  search: Search,
  handshake: Handshake,
  shield: ShieldCheck,
  plane: Plane,
  file: FileCheck2,
  truck: Truck,
  pin: MapPin,
};

export default function WhyTracoliSection() {
  const { locale } = useLocale();

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Titre */}
        <div className="mb-8 text-center lg:mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-tracoli-50 px-3 py-1.5 text-[10.5px] font-bold tracking-wide text-tracoli-600 uppercase">
            {locale === "fr" ? "Pourquoi TRACOLI" : "Why TRACOLI"}
          </span>
          <h2 className="mt-3 text-xl font-extrabold tracking-tight text-ink-900 sm:text-2xl lg:text-3xl">
            {locale === "fr"
              ? "Un partenaire, toute la chaîne"
              : "One partner, the whole chain"}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-[13.5px] text-ink-500 lg:text-[14.5px]">
            {locale === "fr"
              ? "De la recherche produit jusqu'à la livraison dans votre entrepôt."
              : "From product sourcing to delivery in your warehouse."}
          </p>
        </div>

        {/* Grille de piliers */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {WHY_TRACOLI.map((item) => {
            const Icon = ICON_MAP[item.icon] ?? Search;
            return (
              <div
                key={item.id}
                className="flex flex-col rounded-2xl border border-ink-200 bg-white p-4 shadow-card transition-all hover:border-tracoli-500/40 hover:shadow-card-lg lg:p-5"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-tracoli-50 text-tracoli-500 lg:size-12">
                  <Icon className="size-4 lg:size-5" strokeWidth={2} />
                </span>
                <h3 className="mt-3 text-[13px] font-extrabold tracking-tight text-ink-900 lg:text-[14px]">
                  {item.title[locale]}
                </h3>
                <p className="mt-1 text-[11.5px] leading-snug text-ink-500 lg:text-[12.5px]">
                  {item.description[locale]}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}