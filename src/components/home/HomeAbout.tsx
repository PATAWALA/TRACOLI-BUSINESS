"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ABOUT } from "@/data/about/hero";
import { IDENTITY } from "@/data/config/identity";
import { useLocale } from "@/hooks/useLocale";

export default function HomeAbout() {
  const { locale } = useLocale();

  return (
    <section className="bg-ink-50 py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* ============================================================
              IMAGE — Ratio fixe, bien proportionnée
              ============================================================ */}
          <div className="relative order-1 lg:order-1">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-ink-200 shadow-card-lg sm:aspect-[16/10] lg:aspect-[4/5]">
              <Image
                src="/about1.jpg"
                alt={locale === "fr" ? "L'équipe TRACOLI" : "TRACOLI team"}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/40 via-transparent to-transparent" />

              {/* Badge flottant bas-gauche */}
              <div className="absolute bottom-4 left-4 rounded-xl border border-white/20 bg-white/95 px-3 py-2 backdrop-blur-sm">
                <p className="text-[9.5px] font-bold tracking-wide text-ink-500 uppercase">
                  {locale === "fr" ? "Depuis 2018" : "Since 2018"}
                </p>
                <p className="text-[11.5px] font-extrabold text-ink-900">
                  {locale === "fr"
                    ? "Corridor Asie ⇄ Afrique"
                    : "Asia ⇄ Africa corridor"}
                </p>
              </div>
            </div>
          </div>

          {/* ============================================================
              TEXTE
              ============================================================ */}
          <div className="order-2 lg:order-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-white px-3 py-1.5 text-[10.5px] font-bold tracking-wide text-tracoli-600 uppercase">
              {locale === "fr" ? "Qui sommes-nous" : "Who we are"}
            </span>

            <h2 className="mt-3 text-xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-2xl lg:text-3xl">
              {ABOUT.title[locale]}
            </h2>

            <p className="mt-2 text-[12.5px] font-semibold text-tracoli-500">
              {IDENTITY.motto[locale]}
            </p>

            <p className="mt-4 text-[13.5px] leading-relaxed text-ink-600 lg:text-[14.5px]">
              {ABOUT.paragraphs[0][locale]}
            </p>

            <Link
              href="/a-propos"
              className="mt-6 inline-flex items-center gap-1.5 rounded-xl border border-tracoli-200 bg-white px-4 py-3 text-[12.5px] font-bold text-tracoli-600 transition-colors hover:bg-tracoli-50"
            >
              {locale === "fr"
                ? "Découvrir notre histoire"
                : "Discover our story"}
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}