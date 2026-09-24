"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/data/services/list";
import { useLocale } from "@/hooks/useLocale";

export default function HomeWhatWeDo() {
  const { locale } = useLocale();

  const SLUG_MAP: Record<string, string> = {
    sourcing: "sourcing-negotiation",
    inspection: "inspection-conformite",
    freight: "fret-international",
    customs: "dedouanement-livraison",
  };

  return (
    <section className="bg-ink-50 py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-xl font-extrabold tracking-tight text-ink-900 sm:text-2xl lg:text-3xl">
            {locale === "fr" ? "Ce que nous faisons" : "What we do"}
          </h2>
          <p className="mt-2 max-w-xl text-[13.5px] text-ink-500 lg:text-[14.5px]">
            {locale === "fr"
              ? "Un partenaire, toute la chaîne — de l'usine chinoise jusqu'à votre entrepôt."
              : "One partner, the whole chain — from Chinese factory to your warehouse."}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.id}
                href={`/services/${SLUG_MAP[service.id]}`}
                className="group flex flex-col rounded-2xl border border-ink-200 bg-white p-5 shadow-card transition-all hover:border-tracoli-500/40 hover:shadow-card-lg"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-tracoli-50 text-tracoli-500 transition-colors group-hover:bg-tracoli-500 group-hover:text-white">
                  <Icon className="size-4" strokeWidth={2} />
                </span>
                <h3 className="mt-4 text-[14px] font-extrabold tracking-tight text-ink-900">
                  {service.title[locale]}
                </h3>
                <p className="mt-1.5 line-clamp-3 text-[12px] leading-relaxed text-ink-500">
                  {service.description[locale]}
                </p>
                <span className="mt-auto flex items-center gap-1 pt-4 text-[11.5px] font-bold text-tracoli-500">
                  {locale === "fr" ? "En savoir plus" : "Learn more"}
                  <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}