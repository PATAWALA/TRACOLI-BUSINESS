"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Download,
  GraduationCap,
  FileText,
  Lock,
  Sparkles,
} from "lucide-react";
import {
  RESOURCES_HERO,
  RESOURCES,
  RESOURCE_FILTERS,
  CONTACT,
  waLink,
  type ResourceType,
} from "@/data/content";

const TYPE_ICONS: Record<ResourceType, typeof BookOpen> = {
  guide: FileText,
  ebook: BookOpen,
  formation: GraduationCap,
  template: FileText,
};

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
    <main className="pt-16 lg:pt-20">
      <section className="relative overflow-hidden border-b border-ink-200 bg-gradient-to-b from-white via-ink-50 to-white py-16 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.3]" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-ink-500 transition-colors hover:text-tracoli-500"
          >
            <ArrowLeft className="size-3.5" />
            Retour à l&apos;accueil
          </Link>

          <div className="mt-6 max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-white px-3.5 py-1.5 text-[11px] font-bold tracking-wide text-tracoli-600 uppercase">
              {RESOURCES_HERO.eyebrow}
            </span>

            <h1 className="mt-5 text-3xl leading-tight font-extrabold tracking-tight text-ink-900 text-balance sm:text-5xl lg:text-[3.4rem]">
              {RESOURCES_HERO.title}
            </h1>

            <p className="mt-6 text-[15px] leading-relaxed text-ink-500 sm:text-base">
              {RESOURCES_HERO.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {RESOURCE_FILTERS.map((f) => {
              const active = filter === f.value;
              return (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setFilter(f.value)}
                  className={`rounded-full border px-4 py-2 text-[12.5px] font-bold transition-all ${
                    active
                      ? "border-tracoli-500 bg-tracoli-500 text-white shadow-[var(--shadow-red)]"
                      : "border-ink-200 bg-white text-ink-600 hover:border-ink-300 hover:text-ink-900"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((resource) => {
              const Icon = TYPE_ICONS[resource.type];
              const isPremium = resource.access === "premium";

              const ctaMessage = isPremium
                ? `Bonjour ${CONTACT.manager}, je souhaite acheter la ressource : "${resource.title}".`
                : `Bonjour ${CONTACT.manager}, je souhaite recevoir la ressource gratuite : "${resource.title}".`;

              return (
                <article
                  key={resource.id}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-card transition-all hover:border-tracoli-500/40 hover:shadow-card-lg"
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
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/10 to-transparent" />

                    {isPremium ? (
                      <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-ink-900/80 px-2.5 py-1 text-[9.5px] font-bold tracking-wide text-white uppercase backdrop-blur">
                        <Lock className="size-2.5" />
                        Premium
                      </span>
                    ) : (
                      <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[9.5px] font-bold tracking-wide text-emerald-700 uppercase backdrop-blur">
                        <Download className="size-2.5" />
                        Gratuit
                      </span>
                    )}

                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 rounded-md bg-white/95 px-2 py-0.5 text-[10px] font-bold tracking-wide text-ink-800 uppercase backdrop-blur">
                        <Icon className="size-3" />
                        {TYPE_LABELS[resource.type]}
                      </span>
                      <span className="rounded-md bg-white/95 px-2 py-0.5 text-[10px] font-bold tracking-wide text-ink-800 uppercase backdrop-blur">
                        {resource.level}
                      </span>
                    </div>
                  </Link>

                  <div className="flex flex-1 flex-col p-5">
                    <Link href={`/ressources/${resource.slug}`}>
                      <h3 className="text-[15px] leading-snug font-extrabold tracking-tight text-ink-900 transition-colors group-hover:text-tracoli-600">
                        {resource.title}
                      </h3>
                    </Link>

                    <p className="mt-2 text-[12.5px] leading-relaxed text-ink-500">
                      {resource.description}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] text-ink-500">
                      <span className="rounded-md bg-ink-100 px-2 py-0.5 font-semibold">
                        {resource.meta}
                      </span>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-ink-200 pt-4 mt-5">
                      <div>
                        {isPremium ? (
                          <p className="text-[15px] font-extrabold text-ink-900">
                            {resource.price}
                          </p>
                        ) : (
                          <p className="text-[12px] font-bold text-emerald-600">
                            Accès libre
                          </p>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Link
                          href={`/ressources/${resource.slug}`}
                          className="inline-flex items-center gap-1 rounded-lg border border-ink-200 bg-white px-3 py-2 text-[12px] font-bold text-ink-700 transition-colors hover:border-ink-300 hover:text-ink-900"
                        >
                          Détails
                        </Link>

                        <a
                          href={waLink(ctaMessage)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[12px] font-bold transition-all active:scale-[0.98] ${
                            isPremium
                              ? "bg-tracoli-500 text-white shadow-[var(--shadow-red)] hover:bg-tracoli-600"
                              : "bg-ink-900 text-white hover:bg-ink-800"
                          }`}
                        >
                          {isPremium ? "Acheter" : "Télécharger"}
                          <ArrowRight className="size-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="mt-12 rounded-2xl border border-dashed border-ink-300 bg-ink-50 p-12 text-center">
              <p className="text-[13.5px] font-semibold text-ink-700">
                Aucune ressource dans cette catégorie pour le moment.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-ink-50 py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-tracoli-200 bg-white p-8 shadow-card-lg sm:p-12">
            <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-tracoli-500/10 blur-3xl" />

            <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-10">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-tracoli-50 px-3 py-1 text-[10.5px] font-bold tracking-wide text-tracoli-600 uppercase">
                  <Sparkles className="size-3" />
                  Ressource offerte
                </span>

                <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-3xl">
                  Recevez notre checklist d&apos;importation en 30 points
                </h2>

                <p className="mt-3 text-[14px] leading-relaxed text-ink-500">
                  Un document pratique pour ne rien oublier avant, pendant et après votre importation. Envoyé directement sur WhatsApp.
                </p>

                <ul className="mt-6 space-y-2.5 text-[12.5px] text-ink-600">
                  {[
                    "Checklist fournisseur et paiement",
                    "Points de contrôle avant expédition",
                    "Documents douaniers obligatoires",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-tracoli-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-ink-200 bg-ink-50 p-5 text-center">
                <p className="text-[11px] font-bold tracking-wide text-ink-500 uppercase">
                  Livraison instantanée
                </p>
                <p className="mt-2 text-[13px] text-ink-600">
                  Cliquez ci-dessous pour recevoir la checklist sur WhatsApp.
                </p>

                <a
                  href={waLink(
                    `Bonjour ${CONTACT.manager}, je souhaite recevoir la checklist d'importation en 30 points.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-tracoli-500 px-5 py-3.5 text-[13px] font-bold text-white shadow-[var(--shadow-red)] transition-all hover:bg-tracoli-600 active:scale-[0.98]"
                >
                  Recevoir la checklist
                  <ArrowRight className="size-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-3xl">
            Envie d&apos;aller plus loin et d&apos;en faire votre métier ?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-ink-500">
            Nos formations vous accompagnent pas à pas, avec un mentorat individuel et des sessions en direct avec nos équipes en Chine.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={waLink(
                `Bonjour ${CONTACT.manager}, je souhaite en savoir plus sur vos formations en sourcing et importation.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-tracoli-500 px-6 py-3.5 text-[13px] font-bold text-white shadow-[var(--shadow-red)] transition-all hover:bg-tracoli-600 active:scale-[0.98]"
            >
              Demander le programme
              <ArrowRight className="size-3.5" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
