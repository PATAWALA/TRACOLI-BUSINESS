"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import {
  RESOURCES_HERO,
  RESOURCES,
  RESOURCE_FILTERS,
  CONTACT,
  waLink,
  type ResourceType,
} from "@/data/content";

const TYPE_LABELS: Record<ResourceType, string> = {
  guide: "Guide",
  ebook: "Ebook",
  formation: "Formation",
  template: "Modèle",
};

export default function ResourcesPage() {
  const [filter, setFilter] = useState<string>("all");

  const filtered = useMemo(
    () =>
      filter === "all"
        ? RESOURCES
        : RESOURCES.filter((r) => r.type === filter),
    [filter]
  );

  return (
    <main className="pt-header">
      <section className="border-b border-ink-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="max-w-3xl text-4xl leading-[1.08] font-extrabold tracking-tight text-ink-900 text-balance sm:text-5xl lg:text-6xl">
            {RESOURCES_HERO.title}
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-700 lg:text-lg">
            {RESOURCES_HERO.subtitle}
          </p>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
            <div className="flex gap-2 sm:flex-wrap">
              {RESOURCE_FILTERS.map((f) => {
                const active = filter === f.value;
                return (
                  <button
                    key={f.value}
                    type="button"
                    onClick={() => setFilter(f.value)}
                    aria-pressed={active}
                    className={`min-h-11 shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition-colors active:scale-[0.98] ${
                      active
                        ? "border-tracoli-500 bg-tracoli-500 text-white"
                        : "border-ink-200 bg-white text-ink-700 hover:border-ink-300 hover:text-ink-900"
                    }`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {filtered.map((resource) => {
              const isPremium = resource.access === "premium";

              const ctaMessage = isPremium
                ? `Bonjour ${CONTACT.manager}, je souhaite acheter la ressource : "${resource.title}".`
                : `Bonjour ${CONTACT.manager}, je souhaite recevoir la ressource gratuite : "${resource.title}".`;

              return (
                <article
                  key={resource.id}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink-200 bg-white transition-colors hover:border-tracoli-500/40"
                >
                  <Link
                    href={`/ressources/${resource.slug}`}
                    className="relative block aspect-video overflow-hidden bg-ink-100"
                  >
                    <Image
                      src={resource.image}
                      alt={resource.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <span
                      className={`absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-bold ${
                        isPremium
                          ? "bg-ink-900 text-white"
                          : "bg-white text-ink-900"
                      }`}
                    >
                      {isPremium ? "Premium" : "Gratuit"}
                    </span>
                  </Link>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <p className="text-sm font-semibold text-ink-700">
                      {TYPE_LABELS[resource.type]} · {resource.level}
                      {resource.meta ? ` · ${resource.meta}` : ""}
                    </p>

                    <Link href={`/ressources/${resource.slug}`}>
                      <h3 className="mt-2 text-lg leading-snug font-extrabold tracking-tight text-ink-900 transition-colors group-hover:text-tracoli-600">
                        {resource.title}
                      </h3>
                    </Link>

                    <p className="mt-2 text-[15px] leading-relaxed text-ink-700">
                      {resource.description}
                    </p>

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-ink-200 pt-5">
                      <p className="text-base font-extrabold text-ink-900">
                        {isPremium ? resource.price : "Accès libre"}
                      </p>

                      <div className="flex gap-2">
                        <Link
                          href={`/ressources/${resource.slug}`}
                          className="inline-flex min-h-11 items-center rounded-xl border-2 border-ink-200 bg-white px-4 text-sm font-bold text-ink-800 transition-colors hover:border-ink-300"
                        >
                          Détails
                        </Link>

                        <a
                          href={waLink(ctaMessage)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex min-h-11 items-center gap-1.5 rounded-xl px-4 text-sm font-bold text-white transition-colors active:scale-[0.98] ${
                            isPremium
                              ? "bg-tracoli-500 hover:bg-tracoli-600"
                              : "bg-ink-900 hover:bg-ink-800"
                          }`}
                        >
                          {isPremium ? "Acheter" : "Télécharger"}
                          <ArrowRight className="size-4" aria-hidden />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="mt-12 rounded-3xl border border-dashed border-ink-300 bg-ink-50 p-12 text-center">
              <p className="text-base font-semibold text-ink-700">
                Aucune ressource dans cette catégorie pour le moment.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-ink-50 py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-16 lg:px-8">
          <div>
            <h2 className="max-w-xl text-3xl leading-[1.15] font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl">
              Recevez notre checklist d&apos;importation en 30 points
            </h2>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-700 lg:text-lg">
              Un document pratique pour ne rien oublier avant, pendant et après
              votre importation. Envoyé directement sur WhatsApp.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "Checklist fournisseur et paiement",
                "Points de contrôle avant expédition",
                "Documents douaniers obligatoires",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-base text-ink-800"
                >
                  <Check
                    className="mt-0.5 size-5 shrink-0 text-tracoli-500"
                    strokeWidth={3}
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-ink-200 bg-white p-6 sm:p-8">
            <p className="text-lg font-extrabold tracking-tight text-ink-900">
              Livraison sur WhatsApp
            </p>
            <p className="mt-2 text-base leading-relaxed text-ink-700">
              Un clic suffit pour recevoir la checklist dans votre conversation.
            </p>

            <a
              href={waLink(
                `Bonjour ${CONTACT.manager}, je souhaite recevoir la checklist d'importation en 30 points.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex min-h-[56px] w-full items-center justify-center gap-2.5 rounded-2xl bg-tracoli-500 px-8 py-4 text-[15px] font-bold text-white shadow-[var(--shadow-red)] transition-colors duration-200 hover:bg-tracoli-600 active:scale-[0.98]"
            >
              Recevoir la checklist
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden
              />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 pb-28 lg:py-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-tracoli-500 px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
            <h2 className="max-w-2xl text-3xl leading-[1.15] font-extrabold tracking-tight text-white text-balance sm:text-4xl">
              Envie d&apos;aller plus loin et d&apos;en faire votre métier ?
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white lg:text-lg">
              Nos formations vous accompagnent pas à pas, avec un mentorat
              individuel et des sessions en direct avec nos équipes en Chine.
            </p>

            <a
              href={waLink(
                `Bonjour ${CONTACT.manager}, je souhaite en savoir plus sur vos formations en sourcing et importation.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex min-h-[56px] items-center justify-center gap-2.5 rounded-2xl bg-white px-8 py-4 text-[15px] font-bold text-tracoli-600 transition-colors duration-200 hover:bg-tracoli-50 active:scale-[0.98]"
            >
              Demander le programme
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden
              />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
