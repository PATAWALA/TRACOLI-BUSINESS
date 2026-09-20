"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/data/content";
import { useLocale } from "@/hooks/useLocale";

/* Mapping service.id → slug de la page détail */
const SLUG_MAP: Record<string, string> = {
  sourcing: "sourcing-negotiation",
  inspection: "inspection-conformite",
  freight: "fret-international",
  customs: "dedouanement-livraison",
};

export default function ServicesSection() {
  const { locale } = useLocale();

  return (
    <section id="services" className="scroll-mt-24 bg-ink-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ---------- TITRE ---------- */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-white px-3.5 py-1.5 text-[11px] font-bold tracking-wide text-tracoli-600 uppercase">
            {locale === "fr" ? "Nos services" : "Our services"}
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl">
            {locale === "fr"
              ? "Une offre logistique complète, de l'usine à votre entrepôt"
              : "A complete logistics offer, from factory to your warehouse"}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[14.5px] text-ink-500">
            {locale === "fr"
              ? "Quatre expertises complémentaires pour sécuriser chaque étape de votre importation."
              : "Four complementary areas of expertise to secure every stage of your import."}
          </p>
        </div>

        {/* ---------- GRILLE ---------- */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            const slug = SLUG_MAP[service.id];

            return (
              <article
                key={service.id}
                className="group flex h-full flex-col rounded-2xl border border-ink-200 bg-white p-6 shadow-card transition-all duration-300 hover:border-tracoli-500/40 hover:shadow-card-lg lg:p-7"
              >
                {/* Icône */}
                <span className="grid size-12 place-items-center rounded-xl bg-tracoli-50 text-tracoli-500 transition-colors group-hover:bg-tracoli-500 group-hover:text-white">
                  <Icon className="size-5" strokeWidth={2} />
                </span>

                {/* Titre */}
                <h3 className="mt-5 text-[15px] font-extrabold tracking-tight text-ink-900">
                  {service.title[locale]}
                </h3>

                {/* Description */}
                <p className="mt-2 text-[13px] leading-relaxed text-ink-500">
                  {service.description[locale]}
                </p>

                {/* Features */}
                <ul className="mt-5 space-y-2 border-t border-ink-200 pt-5">
                  {service.features[locale].map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-[12.5px] leading-snug text-ink-600"
                    >
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-tracoli-500" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA → Page détail du service */}
                <Link
                  href={`/services/${slug}`}
                  className="mt-auto flex items-center gap-1.5 pt-6 text-[12.5px] font-bold text-tracoli-500 transition-colors group-hover:text-tracoli-600"
                >
                  {locale === "fr" ? "Découvrir le service" : "Discover the service"}
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}