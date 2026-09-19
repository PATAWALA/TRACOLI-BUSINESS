"use client";

import { ABOUT, STATS } from "@/data/content";
import { useLocale } from "@/hooks/useLocale";

export default function AboutSection() {
  const { locale } = useLocale();

  return (
    <section id="about" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-tracoli-50 px-3.5 py-1.5 text-[11px] font-bold tracking-wide text-tracoli-600 uppercase">
              {ABOUT.eyebrow[locale]}
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl">
              {ABOUT.title[locale]}
            </h2>
          </div>

          <div className="space-y-5 text-[14.5px] leading-relaxed text-ink-600">
            {ABOUT.paragraphs.map((p, i) => (
              <p key={i}>{p[locale]}</p>
            ))}

            <div className="grid grid-cols-3 gap-4 border-t border-ink-200 pt-6">
              {STATS.map((s) => (
                <div key={s.label.fr}>
                  <p className="text-xl font-extrabold text-tracoli-500">{s.value}</p>
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