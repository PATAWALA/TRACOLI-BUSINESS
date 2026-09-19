import { PROCESS_STEPS } from "@/data/content";
import Reveal from "@/components/ui/Reveal";

export default function ProcessSection() {
  return (
    <section id="processus" className="relative scroll-mt-24 overflow-hidden py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
      <div className="pointer-events-none absolute top-1/3 -left-32 h-80 w-80 rounded-full bg-gold-600/8 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Titre */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[11px] font-semibold text-slate-300">
            Notre processus
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white text-balance sm:text-4xl">
            De l&apos;usine chinoise à votre entrepôt, en 4 étapes maîtrisées
          </h2>
          <p className="mt-3 text-[15px] text-slate-400">
            Chaque étape est tracée et vous est notifiée sur WhatsApp. Aucune zone d&apos;ombre.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Ligne de liaison — desktop */}
          <div className="pointer-events-none absolute top-7 right-0 left-0 hidden h-px bg-gradient-to-r from-transparent via-gold-500/35 to-transparent lg:block" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.1} className="h-full">
                <div className="group relative flex h-full flex-col">
                  {/* Numéro */}
                  <div className="relative z-10 mb-6 flex items-center gap-3 lg:mb-7 lg:block">
                    <span className="grid size-14 shrink-0 place-items-center rounded-2xl border border-gold-500/25 bg-navy-800 text-lg font-extrabold text-gold-500 shadow-[0_0_35px_-14px_rgba(245,158,11,0.7)] transition-all duration-300 group-hover:border-gold-500/60 group-hover:text-gold-400">
                      {step.step}
                    </span>
                    <span className="rounded-full bg-white/[0.04] px-2.5 py-1 text-[10px] font-bold tracking-wide text-slate-400 uppercase lg:hidden">
                      {step.meta}
                    </span>
                  </div>

                  {/* Contenu */}
                  <div className="rounded-2xl border border-white/8 bg-navy-800/40 p-5 backdrop-blur transition-colors duration-300 group-hover:border-gold-500/25 lg:p-6">
                    <h3 className="text-[15px] leading-snug font-extrabold tracking-tight text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 text-[12.5px] leading-relaxed text-slate-400">
                      {step.description}
                    </p>
                    <span className="mt-4 hidden w-fit rounded-full bg-gold-500/8 px-2.5 py-1 text-[10px] font-bold tracking-wide text-gold-400 uppercase lg:inline-block">
                      {step.meta}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}