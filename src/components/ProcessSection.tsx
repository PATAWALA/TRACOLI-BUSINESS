"use client";

import { PROCESS_STEPS } from "@/data/content";

export default function ProcessSection() {
  return (
    <section id="processus" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-tracoli-50 px-3.5 py-1.5 text-[11px] font-bold tracking-wide text-tracoli-600 uppercase">
            Notre processus
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl">
            De l&apos;usine chinoise à votre entrepôt, en 4 étapes maîtrisées
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[14.5px] text-ink-500">
            Chaque étape est tracée et vous est communiquée par WhatsApp. Aucune zone d&apos;ombre.
          </p>
        </div>

        <div className="relative mt-16">
          <div className="pointer-events-none absolute top-7 right-0 left-0 hidden h-px bg-gradient-to-r from-transparent via-ink-300 to-transparent lg:block" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {PROCESS_STEPS.map((step) => (
              <div key={step.step} className="group relative flex h-full flex-col">
                <div className="relative z-10 mb-6 flex items-center gap-3 lg:mb-7 lg:block">
                  <span className="grid size-14 shrink-0 place-items-center rounded-2xl border border-ink-200 bg-white text-lg font-extrabold text-tracoli-500 shadow-card transition-all duration-300 group-hover:border-tracoli-500 group-hover:shadow-[var(--shadow-red)]">
                    {step.step}
                  </span>
                  <span className="rounded-full border border-ink-200 bg-white px-2.5 py-1 text-[10px] font-bold tracking-wide text-ink-500 uppercase lg:hidden">
                    {step.meta}
                  </span>
                </div>
                <div className="flex h-full flex-col rounded-2xl border border-ink-200 bg-white p-5 shadow-card transition-all duration-300 group-hover:border-tracoli-500/30 group-hover:shadow-card-lg lg:p-6">
                  <h3 className="text-[15px] leading-snug font-extrabold tracking-tight text-ink-900">{step.title}</h3>
                  <p className="mt-2.5 text-[12.5px] leading-relaxed text-ink-500">{step.description}</p>
                  <span className="mt-4 hidden w-fit rounded-full border border-tracoli-200 bg-tracoli-50 px-2.5 py-1 text-[10px] font-bold tracking-wide text-tracoli-600 uppercase lg:inline-block">
                    {step.meta}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
