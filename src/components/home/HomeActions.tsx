"use client";

import Link from "next/link";
import { Search, Plane, MapPin, ArrowRight } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

export default function HomeActions() {
  const { locale } = useLocale();

  const actions = [
    {
      icon: Search,
      title: { fr: "Sourcer un produit", en: "Source a product" },
      description: {
        fr: "Envoyez-nous une photo ou un lien. Nous trouvons le fournisseur.",
        en: "Send us a photo or link. We find the supplier.",
      },
      href: "/sourcer",
      primary: true,
    },
    {
      icon: Plane,
      title: { fr: "Expédier une marchandise", en: "Ship goods" },
      description: {
        fr: "Déjà acheté ? Estimez votre fret Chine → Afrique.",
        en: "Already purchased? Estimate your China → Africa freight.",
      },
      href: "/expedier",
      primary: false,
    },
    {
      icon: MapPin,
      title: { fr: "Suivre un colis", en: "Track a shipment" },
      description: {
        fr: "Consultez l'avancement de votre marchandise.",
        en: "Check your goods' progress.",
      },
      href: "/suivre",
      primary: false,
    },
  ];

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center lg:mb-10">
          <h2 className="text-xl font-extrabold tracking-tight text-ink-900 sm:text-2xl lg:text-3xl">
            {locale === "fr" ? "Que souhaitez-vous faire ?" : "What would you like to do?"}
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {actions.map((action) => {
            const Icon = action.icon;
            const isPrimary = action.primary;
            return (
              <Link
                key={action.href}
                href={action.href}
                className={`group relative flex min-h-[140px] flex-col overflow-hidden rounded-2xl border p-5 transition-all duration-300 active:scale-[0.985] sm:min-h-[160px] lg:p-6 ${
                  isPrimary
                    ? "border-tracoli-500 bg-tracoli-500 text-white shadow-[var(--shadow-red)] hover:bg-tracoli-600"
                    : "border-ink-200 bg-white text-ink-900 shadow-card hover:border-tracoli-500/40 hover:shadow-card-lg"
                }`}
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`grid size-12 place-items-center rounded-xl ${
                      isPrimary ? "bg-white/15 text-white" : "bg-tracoli-50 text-tracoli-500"
                    }`}
                  >
                    <Icon className="size-5" />
                  </span>
                  <span className="grid size-8 place-items-center rounded-full border border-current/15 opacity-50 transition-all group-hover:translate-x-0.5 group-hover:opacity-100">
                    <ArrowRight className="size-4" />
                  </span>
                </div>

                <h3 className="mt-5 text-[16px] font-extrabold tracking-tight lg:text-[17px]">
                  {action.title[locale]}
                </h3>
                <p
                  className={`mt-2 text-[12.5px] leading-relaxed lg:text-[13px] ${
                    isPrimary ? "text-white/85" : "text-ink-500"
                  }`}
                >
                  {action.description[locale]}
                </p>

                <span
                  className={`mt-auto flex items-center gap-1.5 pt-5 text-[12.5px] font-bold lg:text-[13px] ${
                    isPrimary ? "text-white" : "text-tracoli-500"
                  }`}
                >
                  {locale === "fr" ? "Commencer" : "Start"}
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}