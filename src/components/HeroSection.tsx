import { ArrowRight, MessageCircle, ShieldCheck, Plane, Package, CheckCircle2 } from "lucide-react";
import { CONTACT, STATS, waLink } from "@/data/content";
import Reveal from "@/components/ui/Reveal";

export default function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 lg:pt-40 lg:pb-24">
      {/* Décor lumineux */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gold-600/12 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-[420px] w-[420px] rounded-full bg-crimson-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-900 to-transparent" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-8">
        {/* ---------------- Colonne texte ---------------- */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/25 bg-gold-500/8 px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-gold-400 sm:text-xs">
              <span className="size-1.5 rounded-full bg-gold-500" />
              Supply-Chain & Transit Chine — Afrique 🇨🇳 🇨🇩 🇧🇮
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-5 text-[2rem] leading-[1.08] font-extrabold tracking-tight text-white text-balance sm:text-5xl lg:text-[3.4rem]">
              Vos expéditions depuis la Chine :{" "}
              <span className="bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent">
                simples, rapides et sécurisées
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-400 sm:text-base lg:text-lg">
              Vous commandez en Chine, nous gérons tout le reste : entreposage à Guangzhou &amp;
              Yiwu, contrôle qualité, groupage, fret aérien ou maritime, puis dédouanement à
              Kinshasa, Goma ou Bujumbura.{" "}
              <span className="font-semibold text-slate-200">
                Vous gagnez des semaines et vous arrêtez de perdre de l&apos;argent.
              </span>
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#simulateur"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-gold-500 to-gold-600 px-6 py-3.5 text-sm font-bold text-navy-950 shadow-lg shadow-gold-600/25 transition-all hover:shadow-glow-gold hover:brightness-110 active:scale-[0.98]"
              >
                Calculer ma cotation
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>

              <a
                href={waLink(
                  `Bonjour ${CONTACT.manager}, je viens du site TRACOLI BUSINESS et j'aimerais discuter de mon projet d'importation Chine–Afrique.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all hover:border-white/30 hover:bg-white/[0.07] active:scale-[0.98]"
              >
                <MessageCircle className="size-4 text-emerald-400" />
                Contacter {CONTACT.manager} (WhatsApp)
              </a>
            </div>
          </Reveal>

          {/* Réassurance */}
          <Reveal delay={0.32}>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="size-3.5 text-gold-500" /> Dédouanement inclus
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-gold-500" /> Suivi WhatsApp direct
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Package className="size-3.5 text-gold-500" /> Porte-à-porte
              </span>
            </div>
          </Reveal>
        </div>

        {/* ---------------- Colonne visuelle ---------------- */}
        <Reveal delay={0.2} className="relative">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            {/* Halo */}
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-gold-600/20 via-transparent to-crimson-600/10 blur-2xl" />

            {/* Carte principale */}
            <div className="border-gradient-gold relative rounded-3xl p-5 shadow-glow-soft sm:p-6">
              {/* Header carte */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="grid size-9 place-items-center rounded-xl bg-gold-500/15 text-gold-400">
                    <Plane className="size-4" />
                  </span>
                  <div>
                    <p className="text-[13px] font-bold text-white">CTN-2041</p>
                    <p className="text-[11px] text-slate-500">Guangzhou → Kinshasa</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-500/12 px-2.5 py-1 text-[10px] font-bold tracking-wide text-emerald-300">
                  EN TRANSIT
                </span>
              </div>

              {/* Progression */}
              <div className="mt-5 space-y-2">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/8">
                  <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-gold-500 to-gold-400" />
                </div>
                <div className="flex justify-between text-[10px] font-medium text-slate-500">
                  <span>Guangzhou</span>
                  <span className="text-gold-400">68%</span>
                  <span>Kinshasa</span>
                </div>
              </div>

              {/* Timeline */}
              <ul className="mt-5 space-y-3.5">
                {[
                  { label: "Colis réceptionné & pesé", time: "12 Jan", done: true },
                  { label: "Contrôle qualité validé", time: "14 Jan", done: true },
                  { label: "Vol AF-8821 embarqué", time: "16 Jan", done: true },
                  { label: "Dédouanement Kinshasa", time: "ETA 20 Jan", done: false },
                ].map((it) => (
                  <li key={it.label} className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${
                        it.done
                          ? "bg-emerald-500/15 text-emerald-400"
                          : "border border-dashed border-gold-500/40 bg-gold-500/5 text-gold-400"
                      }`}
                    >
                      {it.done ? (
                        <CheckCircle2 className="size-3" />
                      ) : (
                        <span className="size-1.5 animate-pulse rounded-full bg-gold-400" />
                      )}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[12.5px] font-medium text-slate-200">{it.label}</p>
                      <p className="text-[10.5px] text-slate-500">{it.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Badge flottant */}
            <div className="absolute -bottom-5 -left-3 animate-float rounded-2xl border border-white/10 bg-navy-800/95 px-4 py-3 shadow-glow-soft backdrop-blur sm:-left-6">
              <p className="text-[10px] font-medium tracking-wide text-slate-500 uppercase">
                Délai moyen aérien
              </p>
              <p className="text-xl font-extrabold text-white">
                5–8 <span className="text-sm font-semibold text-gold-500">jours</span>
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ---------------- Bandeau stats ---------------- */}
      <div className="relative mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:mt-24 lg:px-8">
        <Reveal>
          <div className="grid grid-cols-1 divide-y divide-white/8 overflow-hidden rounded-2xl border border-white/8 bg-navy-800/40 backdrop-blur sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {STATS.map((s) => (
              <div key={s.label} className="px-6 py-6 text-center sm:text-left">
                <p className="text-2xl font-extrabold tracking-tight text-gold-500 sm:text-3xl">
                  {s.value}
                </p>
                <p className="mt-1 text-[13px] font-semibold text-white">{s.label}</p>
                <p className="mt-0.5 text-[11px] text-slate-500">{s.sublabel}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}