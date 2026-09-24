"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, Lock } from "lucide-react";
import { RESOURCES } from "@/data/resources/items";
import { useLocale } from "@/hooks/useLocale";

export default function HomeResources() {
  const { locale } = useLocale();
  const featured = RESOURCES.slice(0, 3);

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-ink-900 sm:text-2xl lg:text-3xl">
              {locale === "fr" ? "Ressources à découvrir" : "Resources to discover"}
            </h2>
            <p className="mt-2 max-w-xl text-[13.5px] text-ink-500 lg:text-[14.5px]">
              {locale === "fr"
                ? "Guides, ebooks et formations pour structurer votre activité d'importation."
                : "Guides, ebooks and training to structure your import business."}
            </p>
          </div>
          <Link
            href="/ressources"
            className="hidden shrink-0 items-center gap-1 rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-[12.5px] font-bold text-ink-700 transition-colors hover:border-ink-300 sm:inline-flex"
          >
            {locale === "fr" ? "Tout voir" : "See all"}
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((r) => {
            const isPremium = r.access === "premium";
            return (
              <Link
                key={r.id}
                href={`/ressources/${r.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-card transition-all hover:border-tracoli-500/40 hover:shadow-card-lg"
              >
                <div className="relative aspect-video overflow-hidden bg-ink-100">
                  <Image
                    src={r.image}
                    alt={r.imageAlt[locale]}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-transparent" />
                  <span
                    className={`absolute top-3 right-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9.5px] font-bold tracking-wide uppercase ${
                      isPremium
                        ? "bg-ink-900/80 text-white backdrop-blur"
                        : "bg-white/95 text-emerald-700 backdrop-blur"
                    }`}
                  >
                    {isPremium ? <Lock className="size-2.5" /> : <Download className="size-2.5" />}
                    {isPremium
                      ? locale === "fr" ? "Premium" : "Premium"
                      : locale === "fr" ? "Gratuit" : "Free"}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-[14px] leading-snug font-extrabold tracking-tight text-ink-900 group-hover:text-tracoli-600">
                    {r.title[locale]}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-[12px] leading-relaxed text-ink-500">
                    {r.description[locale]}
                  </p>
                  <span className="mt-auto flex items-center gap-1 pt-4 text-[12px] font-bold text-tracoli-500">
                    {locale === "fr" ? "Voir la ressource" : "View resource"}
                    <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-6 sm:hidden">
          <Link
            href="/ressources"
            className="flex w-full items-center justify-center gap-1 rounded-xl border border-ink-200 bg-white px-4 py-3 text-[13px] font-bold text-ink-700"
          >
            {locale === "fr" ? "Voir toutes les ressources" : "See all resources"}
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}