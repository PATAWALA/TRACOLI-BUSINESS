"use client";

import { ArrowRight } from "lucide-react";
import { QUICK_ACTIONS_MOBILE } from "@/data/home/actions";
import { useLocale } from "@/hooks/useLocale";

export default function ActionCardsSection() {
  const { locale } = useLocale();

  return (
    <section className="relative bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Titre */}
        <div className="mb-8 text-center lg:mb-10">
          <h2 className="text-xl font-extrabold tracking-tight text-ink-900 sm:text-2xl lg:text-3xl">
            {locale === "fr"
              ? "Que souhaitez-vous faire ?"
              : "What would you like to do?"}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-[13.5px] text-ink-500 lg:text-[14.5px]">
            {locale === "fr"
              ? "Choisissez votre parcours. Nous nous occupons du reste."
              : "Choose your path. We handle the rest."}
          </p>
        </div>

        {/* Cartes */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {QUICK_ACTIONS_MOBILE.map((action) => (
            <a
              key={action.id}
              href={action.href}
              className="group relative flex min-h-[140px] flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white p-5 shadow-card transition-all hover:border-tracoli-500/40 hover:shadow-card-lg active:scale-[0.985] sm:min-h-[160px] lg:p-6"
            >
              {/* Emoji gros */}
              <span className="text-3xl sm:text-4xl">{action.emoji}</span>

              {/* Titre */}
              <h3 className="mt-3 text-[15px] leading-snug font-extrabold tracking-tight text-ink-900 lg:text-base">
                {action.title[locale]}
              </h3>

              {/* Description */}
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-500 lg:text-[13px]">
                {action.description[locale]}
              </p>

              {/* CTA */}
              <span className="mt-auto flex items-center gap-1.5 pt-4 text-[12.5px] font-bold text-tracoli-500 transition-colors group-hover:text-tracoli-600">
                {action.cta[locale]}
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}