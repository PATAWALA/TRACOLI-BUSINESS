"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import {
  ABOUT_HERO,
  ABOUT_VALUES,
  ABOUT_TIMELINE,
  ABOUT_TEAM,
  CONTACT,
  IDENTITY,
  STATS,
  DESTINATIONS,
  waLink,
} from "@/data/content";

export default function AboutPage() {
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
              {ABOUT_HERO.eyebrow}
            </span>

            <h1 className="mt-5 text-3xl leading-tight font-extrabold tracking-tight text-ink-900 text-balance sm:text-5xl lg:text-[3.4rem]">
              {ABOUT_HERO.title}
            </h1>

            <p className="mt-6 text-[15px] leading-relaxed text-ink-500 sm:text-base">
              {ABOUT_HERO.subtitle}
            </p>

            <p className="mt-6 text-[14px] font-semibold text-tracoli-500">
              {IDENTITY.motto}
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-card sm:grid-cols-3">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`border-ink-200 px-6 py-6 ${
                  i < STATS.length - 1 ? "border-b sm:border-b-0 sm:border-r" : ""
                }`}
              >
                <p className="text-2xl font-extrabold text-tracoli-500 sm:text-3xl">
                  {s.value}
                </p>
                <p className="mt-1 text-[13px] font-semibold text-ink-800">
                  {s.label}
                </p>
                <p className="mt-0.5 text-[11.5px] text-ink-500">{s.sublabel}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl">
                Six années à bâtir un corridor fiable
              </h2>
              <p className="mt-4 text-[14.5px] leading-relaxed text-ink-500">
                De nos premiers colis groupés à Bujumbura jusqu&apos;à notre couverture actuelle de 5 pays, chaque étape a été guidée par une seule obsession : rendre l&apos;importation accessible et sûre pour les entrepreneurs africains.
              </p>
            </div>

            <ol className="relative">
              {ABOUT_TIMELINE.map((item, i) => (
                <li key={item.year} className="relative flex gap-5 pb-10 last:pb-0">
                  {i < ABOUT_TIMELINE.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute top-12 left-[27px] h-[calc(100%-32px)] w-px bg-ink-200"
                    />
                  )}
                  <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-2xl border border-ink-200 bg-white text-[15px] font-extrabold text-tracoli-500 shadow-card">
                    {item.year}
                  </span>
                  <div className="pt-2">
                    <h3 className="text-[15px] font-extrabold tracking-tight text-ink-900">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-ink-500">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-ink-50 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-white px-3.5 py-1.5 text-[11px] font-bold tracking-wide text-tracoli-600 uppercase">
              Nos valeurs
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl">
              Ce qui guide chacune de nos décisions
            </h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ABOUT_VALUES.map((v) => (
              <article
                key={v.id}
                className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card transition-all hover:border-tracoli-500/40 hover:shadow-card-lg"
              >
                <span className="block h-1 w-10 rounded-full bg-tracoli-500" />
                <h3 className="mt-5 text-[15px] font-extrabold tracking-tight text-ink-900">
                  {v.title}
                </h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-ink-500">
                  {v.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-tracoli-50 px-3.5 py-1.5 text-[11px] font-bold tracking-wide text-tracoli-600 uppercase">
              Notre équipe
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl">
              Des femmes et des hommes sur le terrain
            </h2>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {ABOUT_TEAM.map((member) => (
              <article
                key={member.id}
                className={`relative overflow-hidden rounded-2xl border p-6 shadow-card ${
                  member.featured
                    ? "border-tracoli-500/30 bg-gradient-to-br from-tracoli-50 via-white to-white"
                    : "border-ink-200 bg-white"
                }`}
              >
                {member.featured && (
                  <span className="absolute top-4 right-4 rounded-full bg-tracoli-500 px-2.5 py-1 text-[9.5px] font-bold tracking-wide text-white uppercase">
                    Contact principal
                  </span>
                )}

                <span className="grid size-14 place-items-center rounded-2xl bg-tracoli-50 text-xl font-extrabold text-tracoli-500">
                  {member.name.replace(/[^A-Z]/g, "").slice(0, 2) || "TR"}
                </span>

                <h3 className="mt-5 text-[16px] font-extrabold tracking-tight text-ink-900">
                  {member.name}
                </h3>
                <p className="mt-0.5 text-[12px] font-semibold text-tracoli-500">
                  {member.role}
                </p>
                <p className="mt-3 text-[12.5px] leading-relaxed text-ink-500">
                  {member.bio}
                </p>

                <p className="mt-4 flex items-center gap-1.5 text-[11.5px] font-semibold text-ink-500">
                  <MapPin className="size-3" />
                  {member.location}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink-50 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-white px-3.5 py-1.5 text-[11px] font-bold tracking-wide text-tracoli-600 uppercase">
              Couverture géographique
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl">
              5 pays, 14 villes desservies
            </h2>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DESTINATIONS.map((c) => (
              <article
                key={c.id}
                className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-[14px] font-extrabold tracking-tight text-ink-900">
                    {c.country}
                  </h3>
                  <span className="rounded-md bg-ink-100 px-2 py-0.5 text-[10.5px] font-bold tracking-wide text-ink-600">
                    {c.code}
                  </span>
                </div>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {c.cities.map((city) => (
                    <li
                      key={city.id}
                      className="rounded-md border border-ink-200 bg-ink-50 px-2 py-0.5 text-[11px] font-medium text-ink-600"
                    >
                      {city.name}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-tracoli-200 bg-gradient-to-br from-tracoli-50 via-white to-white p-8 text-center sm:p-12">
            <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-3xl">
              Discutons de votre projet d&apos;importation
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-ink-500">
              Que vous soyez débutant ou importateur confirmé, notre équipe est là pour vous accompagner à chaque étape.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/ressources"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-ink-200 bg-white px-6 py-3.5 text-[13px] font-bold text-ink-800 transition-colors hover:border-ink-300"
              >
                Voir nos ressources
                <ArrowRight className="size-3.5" />
              </Link>

              <a
                href={waLink(
                  `Bonjour ${CONTACT.manager}, je souhaite discuter de mon projet d'importation.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-tracoli-500 px-6 py-3.5 text-[13px] font-bold text-white shadow-[var(--shadow-red)] transition-all hover:bg-tracoli-600 active:scale-[0.98]"
              >
                Contacter {CONTACT.manager}
                <ArrowRight className="size-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
