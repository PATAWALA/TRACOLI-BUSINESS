"use client";

import { STATS } from "@/data/home/proof";

export default function ProofSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-ink-50 to-white py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-xl font-extrabold tracking-tight text-ink-900 sm:text-2xl lg:text-3xl">
            Nos chiffres parlent
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-ink-200 bg-white p-5 text-center shadow-card lg:p-6 lg:text-left"
            >
              <p className="text-2xl font-extrabold tracking-tight text-tracoli-500 sm:text-3xl lg:text-4xl">
                {s.value}
              </p>
              <p className="mt-2 text-[12px] font-semibold text-ink-800 lg:text-[13px]">
                {s.label}
              </p>
              <p className="mt-0.5 text-[10.5px] text-ink-500 lg:text-[11px]">
                {s.sublabel}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-col items-center justify-between gap-3 rounded-2xl border border-ink-200 bg-white px-5 py-4 shadow-card sm:flex-row lg:mt-6 lg:px-6">
          <p className="text-center text-[13px] font-semibold text-ink-700 sm:text-left lg:text-[14px]">
            Nous connectons les entrepreneurs africains aux meilleurs fournisseurs d&apos;Asie.
          </p>
          <a
            href="/a-propos"
            className="shrink-0 rounded-xl border border-tracoli-200 bg-tracoli-50 px-4 py-2.5 text-[12.5px] font-bold text-tracoli-600 transition-colors hover:bg-tracoli-100"
          >
            Découvrir notre histoire
          </a>
        </div>
      </div>
    </section>
  );
}
