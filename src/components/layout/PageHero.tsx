"use client";

import type { ReactNode } from "react";
import { useLocale } from "@/hooks/useLocale";

type PageHeroProps = {
  icon: ReactNode; // ✅ JSX, pas une fonction
  badge: { fr: string; en: string };
  title: { fr: string; en: string };
  description: { fr: string; en: string };
  ctaLabel?: { fr: string; en: string };
  ctaHref?: string;
};

export default function PageHero({
  icon,
  badge,
  title,
  description,
  ctaLabel,
  ctaHref,
}: PageHeroProps) {
  const { locale } = useLocale();

  return (
    <section className="relative overflow-hidden border-b border-ink-200 bg-gradient-to-b from-white via-ink-50 to-white py-10 lg:py-14">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.3]" />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-white px-3.5 py-1.5 text-[11px] font-bold tracking-wide text-tracoli-600 uppercase">
          {/* ✅ Le ReactNode est rendu directement, sans sérialisation */}
          <span className="grid size-3 place-items-center text-tracoli-500">
            {icon}
          </span>
          {badge[locale]}
        </span>

        <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-3xl lg:text-4xl">
          {title[locale]}
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-[14px] leading-relaxed text-ink-500 lg:text-[14.5px]">
          {description[locale]}
        </p>

        {ctaLabel && ctaHref && (
          <a
            href={ctaHref}
            className="mt-7 inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-tracoli-500 px-5 py-3 text-[13px] font-bold text-white shadow-[var(--shadow-red)] transition-all hover:bg-tracoli-600 active:scale-[0.98]"
          >
            {ctaLabel[locale]}
          </a>
        )}
      </div>
    </section>
  );
}