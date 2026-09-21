"use client";

import Image from "next/image";
import { ABOUT, STATS, IDENTITY } from "@/data/content";
import { useLocale } from "@/hooks/useLocale";

export default function AboutSection() {
  const { locale } = useLocale();

  return (
    <section id="about" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ---------- TITRE + IMAGE ---------- */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-tracoli-50 px-3.5 py-1.5 text-[11px] font-bold tracking-wide text-tracoli-600 uppercase">
            {ABOUT.eyebrow[locale]}
          </span>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl lg:text-[2.75rem]">
            {ABOUT.title[locale]}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[14.5px] font-semibold text-tracoli-500">
            {IDENTITY.motto[locale]}
          </p>
        </div>

        {/* ---------- IMAGE PRINCIPALE ---------- */}
        <div className="relative mt-12">
          <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-tracoli-500/10 via-transparent to-transparent blur-2xl" />

          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-ink-200 shadow-card-lg">
            <Image
              src="/about1.jpg"
              alt={
                locale === "fr"
                  ? "L'équipe TRACOLI BUSINESS en opération"
                  : "TRACOLI BUSINESS team at work"
              }
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1152px"
              className="object-cover"
            />

            {/* Overlay dégradé subtil en bas pour lisibilité si texte par-dessus */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/30 via-transparent to-transparent" />

            {/* Badge flottant */}
            <div className="absolute bottom-4 left-4 rounded-xl border border-white/20 bg-white/90 px-3.5 py-2 backdrop-blur-sm sm:bottom-6 sm:left-6">
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

        {/* ---------- PARAGRAPHES + STATS ---------- */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Paragraphes */}
          <div className="space-y-5 text-[14.5px] leading-relaxed text-ink-600">
            {ABOUT.paragraphs.map((p, i) => (
              <p key={i}>{p[locale]}</p>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 self-start rounded-2xl border border-ink-200 bg-ink-50 p-6 lg:grid-cols-1 lg:gap-5">
            {STATS.map((s, i) => (
              <div
                key={s.label.fr}
                className={`${
                  i < STATS.length - 1
                    ? "border-b border-ink-200 pb-4 lg:pb-5"
                    : ""
                }`}
              >
                <p className="text-2xl font-extrabold tracking-tight text-tracoli-500">
                  {s.value}
                </p>
                <p className="mt-1 text-[11.5px] font-semibold text-ink-800">
                  {s.label[locale]}
                </p>
                <p className="mt-0.5 hidden text-[11px] text-ink-500 lg:block">
                  {s.sublabel[locale]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}