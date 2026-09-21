"use client";

import Image from "next/image";
import { ABOUT, STATS, IDENTITY } from "@/data/content";
import { useLocale } from "@/hooks/useLocale";

export default function AboutSection() {
  const { locale } = useLocale();

  return (
    <section id="about" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ============================================================
              IMAGE — 1er sur mobile, à gauche sur desktop
              ============================================================ */}
          <div className="relative">
            <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-tracoli-500/10 via-transparent to-transparent blur-2xl" />

            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-ink-200 shadow-card-lg sm:aspect-[4/3] lg:aspect-[4/5]">
              <Image
                src="/about1.jpg"
                alt={
                  locale === "fr"
                    ? "L'équipe TRACOLI BUSINESS en opération"
                    : "TRACOLI BUSINESS team at work"
                }
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/30 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-4 rounded-xl border border-white/20 bg-white/90 px-3.5 py-2 backdrop-blur-sm">
                <p className="text-[10px] font-bold tracking-wide text-ink-500 uppercase">
                  {locale === "fr" ? "Depuis 2018" : "Since 2018"}
                </p>
                <p className="text-[12.5px] font-extrabold text-ink-900">
                  {locale === "fr"
                    ? "Corridor Asie ⇄ Afrique"
                    : "Asia ⇄ Africa corridor"}
                </p>
              </div>
            </div>
          </div>

          {/* ============================================================
              TEXTE — 2e sur mobile, à droite sur desktop
              ============================================================ */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-tracoli-50 px-3.5 py-1.5 text-[11px] font-bold tracking-wide text-tracoli-600 uppercase">
              {ABOUT.eyebrow[locale]}
            </span>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl">
              {ABOUT.title[locale]}
            </h2>

            <p className="mt-3 text-[13.5px] font-semibold text-tracoli-500">
              {IDENTITY.motto[locale]}
            </p>

            <div className="mt-6 space-y-4 text-[14.5px] leading-relaxed text-ink-600">
              {ABOUT.paragraphs.map((p, i) => (
                <p key={i}>{p[locale]}</p>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-ink-200 pt-6">
              {STATS.map((s) => (
                <div key={s.label.fr}>
                  <p className="text-xl font-extrabold tracking-tight text-tracoli-500 sm:text-2xl">
                    {s.value}
                  </p>
                  <p className="mt-1 text-[11.5px] font-semibold text-ink-800">
                    {s.label[locale]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

