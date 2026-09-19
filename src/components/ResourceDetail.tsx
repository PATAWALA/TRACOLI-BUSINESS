"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Download,
  FileText,
  GraduationCap,
  Lock,
  Users,
} from "lucide-react";
import {
  CONTACT,
  RESOURCES,
  waLink,
  type Resource,
  type ResourceType,
} from "@/data/content";
import { useLocale } from "@/hooks/useLocale";

/* ------------------------------------------------------------------ */
/*  Config par type de ressource                                       */
/* ------------------------------------------------------------------ */

const TYPE_ICONS: Record<ResourceType, typeof BookOpen> = {
  guide: FileText,
  ebook: BookOpen,
  formation: GraduationCap,
  template: FileText,
};

const TYPE_LABELS = {
  guide: { fr: "Guide", en: "Guide" },
  ebook: { fr: "Ebook", en: "Ebook" },
  formation: { fr: "Formation", en: "Training" },
  template: { fr: "Modèle", en: "Template" },
} as const;

/* ------------------------------------------------------------------ */
/*  Composant                                                          */
/* ------------------------------------------------------------------ */

export default function ResourceDetail({ resource }: { resource: Resource }) {
  const { locale } = useLocale();
  const isPremium = resource.access === "premium";
  const Icon = TYPE_ICONS[resource.type];

  /* Message WhatsApp pré-rempli */
  const ctaMessage = isPremium
    ? `${locale === "fr" ? "Bonjour" : "Hello"} ${CONTACT.manager}, ${locale === "fr" ? "je souhaite acheter la ressource" : "I would like to purchase the resource"} : "${resource.title[locale]}".`
    : `${locale === "fr" ? "Bonjour" : "Hello"} ${CONTACT.manager}, ${locale === "fr" ? "je souhaite recevoir la ressource gratuite" : "I would like to receive the free resource"} : "${resource.title[locale]}".`;

  /* Ressources liées (3 max, sauf celle-ci) */
  const related = RESOURCES.filter((r) => r.id !== resource.id).slice(0, 3);

  return (
    <main className="pt-16 lg:pt-20">
      {/* ==================================================================
          HERO DÉTAIL
          ================================================================== */}
      <section className="relative border-b border-ink-200 bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/ressources"
            className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-ink-500 transition-colors hover:text-tracoli-500"
          >
            <ArrowLeft className="size-3.5" />
            {locale === "fr" ? "Toutes les ressources" : "All resources"}
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-14">
            {/* -------- Colonne texte -------- */}
            <div>
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-ink-100 px-2.5 py-1 text-[10.5px] font-bold tracking-wide text-ink-700 uppercase">
                  <Icon className="size-3" />
                  {TYPE_LABELS[resource.type][locale]}
                </span>
                <span className="rounded-md bg-ink-100 px-2.5 py-1 text-[10.5px] font-bold tracking-wide text-ink-700 uppercase">
                  {resource.level[locale]}
                </span>
                {isPremium ? (
                  <span className="inline-flex items-center gap-1 rounded-md bg-tracoli-500 px-2.5 py-1 text-[10.5px] font-bold tracking-wide text-white uppercase">
                    <Lock className="size-2.5" />
                    {locale === "fr" ? "Premium" : "Premium"}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2.5 py-1 text-[10.5px] font-bold tracking-wide text-emerald-700 uppercase">
                    <Download className="size-2.5" />
                    {locale === "fr" ? "Gratuit" : "Free"}
                  </span>
                )}
              </div>

              {/* Titre */}
              <h1 className="mt-5 text-3xl leading-tight font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl lg:text-[2.75rem]">
                {resource.title[locale]}
              </h1>

              {/* Description longue */}
              <p className="mt-5 text-[14.5px] leading-relaxed text-ink-500">
                {resource.longDescription[locale]}
              </p>

              {/* Meta bar */}
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-ink-500">
                <span className="flex items-center gap-1.5">
                  <FileText className="size-3.5" />
                  {resource.meta[locale]}
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen className="size-3.5" />
                  {resource.format[locale]}
                </span>
              </div>

              {/* CTA prix */}
              <div className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-ink-200 bg-ink-50 p-5">
                <div className="flex-1">
                  <p className="text-[11px] font-bold tracking-wide text-ink-500 uppercase">
                    {isPremium
                      ? locale === "fr"
                        ? "Accès premium"
                        : "Premium access"
                      : locale === "fr"
                      ? "Accès gratuit"
                      : "Free access"}
                  </p>
                  <p className="mt-1 text-2xl font-extrabold text-ink-900">
                    {isPremium ? resource.price : "0 USD"}
                  </p>
                </div>

                <a
                  href={waLink(ctaMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-tracoli-500 px-6 py-3.5 text-[13px] font-bold text-white shadow-[var(--shadow-red)] transition-all hover:bg-tracoli-600 active:scale-[0.98]"
                >
                  {isPremium
                    ? locale === "fr"
                      ? "Acheter maintenant"
                      : "Buy now"
                    : locale === "fr"
                    ? "Télécharger gratuitement"
                    : "Download for free"}
                  <ArrowRight className="size-3.5" />
                </a>
              </div>
            </div>

            {/* -------- Colonne image -------- */}
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-ink-200 shadow-card-lg">
                <Image
                  src={resource.image}
                  alt={resource.imageAlt[locale]}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          CONTENU DÉTAILLÉ
          ================================================================== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            {/* -------- Colonne principale -------- */}
            <div className="space-y-14">
              {/* Ce que vous allez apprendre */}
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
                  {locale === "fr" ? "Ce que vous allez apprendre" : "What you will learn"}
                </h2>
                <ul className="mt-6 space-y-3">
                  {resource.outcomes[locale].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-tracoli-50 text-tracoli-500">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      <span className="text-[14px] leading-relaxed text-ink-700">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Table des matières */}
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
                  {locale === "fr" ? "Contenu détaillé" : "Detailed content"}
                </h2>
                <div className="mt-6 space-y-4">
                  {resource.chapters.map((chapter, i) => (
                    <div
                      key={i}
                      className="overflow-hidden rounded-2xl border border-ink-200 bg-white"
                    >
                      <div className="flex items-center gap-3 border-b border-ink-200 bg-ink-50 px-5 py-3.5">
                        <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-tracoli-500 text-[11px] font-extrabold text-white">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-[13.5px] font-extrabold tracking-tight text-ink-900">
                          {chapter.title[locale]}
                        </h3>
                      </div>
                      <ul className="space-y-2 px-5 py-4">
                        {chapter.items[locale].map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-[13px] text-ink-600"
                          >
                            <span className="mt-1.5 size-1 shrink-0 rounded-full bg-ink-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* -------- Sidebar -------- */}
            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              {/* Pour qui */}
              <div className="rounded-2xl border border-ink-200 bg-ink-50 p-6">
                <div className="flex items-center gap-2.5">
                  <Users className="size-4 text-tracoli-500" />
                  <h3 className="text-[13px] font-extrabold tracking-wide text-ink-900 uppercase">
                    {locale === "fr" ? "Pour qui ?" : "Who is it for?"}
                  </h3>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {resource.audience[locale].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-ink-600"
                    >
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-tracoli-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Aide */}
              <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card">
                <h3 className="text-[13px] font-extrabold tracking-wide text-ink-900 uppercase">
                  {locale === "fr" ? "Besoin d'aide ?" : "Need help?"}
                </h3>
                <p className="mt-3 text-[12.5px] leading-relaxed text-ink-500">
                  {locale === "fr"
                    ? `Contactez ${CONTACT.manager}, notre responsable service client. Réponse sous 2 heures ouvrées.`
                    : `Contact ${CONTACT.manager}, our customer service manager. Response within 2 business hours.`}
                </p>
                <a
                  href={waLink(
                    `${locale === "fr" ? "Bonjour" : "Hello"} ${CONTACT.manager}, ${locale === "fr" ? "j'ai une question sur la ressource" : "I have a question about the resource"} : "${resource.title[locale]}".`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-ink-200 bg-white px-4 py-3 text-[12.5px] font-bold text-ink-800 transition-colors hover:border-ink-300"
                >
                  {locale === "fr" ? "Contacter par WhatsApp" : "Contact via WhatsApp"}
                  <ArrowRight className="size-3.5" />
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ==================================================================
          RESSOURCES LIÉES
          ================================================================== */}
      {related.length > 0 && (
        <section className="bg-ink-50 py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
              {locale === "fr" ? "À découvrir également" : "Also discover"}
            </h2>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => {
                const RelIcon = TYPE_ICONS[r.type];
                const relPremium = r.access === "premium";
                return (
                  <Link
                    key={r.id}
                    href={`/ressources/${r.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-card transition-all hover:border-tracoli-500/40 hover:shadow-card-lg"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={r.image}
                        alt={r.imageAlt[locale]}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-transparent" />
                      <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-md bg-white/95 px-2 py-0.5 text-[9.5px] font-bold tracking-wide text-ink-800 uppercase backdrop-blur">
                        <RelIcon className="size-2.5" />
                        {TYPE_LABELS[r.type][locale]}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-[14px] font-extrabold tracking-tight text-ink-900 group-hover:text-tracoli-600">
                        {r.title[locale]}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-[12px] leading-relaxed text-ink-500">
                        {r.description[locale]}
                      </p>
                      <div className="mt-4 flex items-center justify-between border-t border-ink-200 pt-4">
                        <span className="text-[11px] text-ink-500">
                          {r.meta[locale]}
                        </span>
                        <span
                          className={`text-[13px] font-extrabold ${
                            relPremium ? "text-ink-900" : "text-emerald-600"
                          }`}
                        >
                          {relPremium
                            ? r.price
                            : locale === "fr"
                            ? "Gratuit"
                            : "Free"}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}