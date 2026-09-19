"use client";

import { useMemo, useState } from "react";
import {
  Plane,
  Ship,
  Calculator,
  MessageCircle,
  MapPin,
  Info,
  ArrowRight,
} from "lucide-react";
import {
  DESTINATIONS,
  FREIGHT_RATES,
  CONTACT,
  waLink,
  type ShippingMode,
} from "@/data/content";

const nf = new Intl.NumberFormat("fr-FR");

export default function SimulatorSection() {
  const [mode, setMode] = useState<ShippingMode>("air");
  const [quantity, setQuantity] = useState<string>("50");
  const [destinationId, setDestinationId] = useState<string>("kinshasa");

  const rate = FREIGHT_RATES[mode];
  const destination =
    DESTINATIONS.find((d) => d.id === destinationId) ?? DESTINATIONS[0];

  const result = useMemo(() => {
    const qty = Math.max(0, Number(quantity) || 0);
    const factor = mode === "air" ? destination.airFactor : destination.seaFactor;
    const low = Math.round(qty * rate.min * factor);
    const high = Math.round(qty * rate.max * factor);
    const delay = mode === "air" ? destination.airDelay : destination.seaDelay;
    return { qty, low, high, delay, valid: qty >= rate.minQty };
  }, [quantity, mode, destination, rate]);

  const whatsappHref = waLink(
    `Bonjour ${CONTACT.manager} 👋\n\n` +
      `Je viens du simulateur TRACOLI BUSINESS.\n\n` +
      `• Mode : ${rate.label}\n` +
      `• Quantité : ${result.qty} ${rate.unit}\n` +
      `• Destination : ${destination.city} (${destination.country})\n` +
      `• Estimation affichée : ${nf.format(result.low)} $ – ${nf.format(result.high)} $\n` +
      `• Délai estimé : ${result.delay}\n\n` +
      `Merci de me confirmer le tarif définitif.`
  );

  return (
    <section id="simulateur" className="relative scroll-mt-24 py-20 lg:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[680px] -translate-x-1/2 rounded-full bg-gold-600/8 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Titre */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/25 bg-gold-500/8 px-3.5 py-1.5 text-[11px] font-semibold text-gold-400">
            <Calculator className="size-3.5" />
            Simulateur instantané
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white text-balance sm:text-4xl">
            Obtenez votre estimation de fret en{" "}
            <span className="text-gold-500">30 secondes</span>
          </h2>
          <p className="mt-3 text-[15px] text-slate-400">
            Sélectionnez votre mode, votre volume et votre ville de destination. Aucun compte,
            aucune attente.
          </p>
        </div>

        {/* Carte simulateur */}
        <div className="mt-12 grid overflow-hidden rounded-3xl border border-white/8 bg-navy-800/50 backdrop-blur lg:grid-cols-[1.1fr_0.9fr]">
          {/* ---------- Panneau de saisie ---------- */}
          <div className="space-y-7 p-6 sm:p-8 lg:p-10">
            {/* Mode */}
            <div>
              <label className="mb-3 block text-[11px] font-bold tracking-[0.14em] text-slate-500 uppercase">
                Mode d&apos;expédition
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {(["air", "sea"] as ShippingMode[]).map((m) => {
                  const active = mode === m;
                  const Icon = m === "air" ? Plane : Ship;
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMode(m)}
                      className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all ${
                        active
                          ? "border-gold-500/50 bg-gold-500/10 shadow-glow-gold"
                          : "border-white/8 bg-white/[0.02] hover:border-white/20"
                      }`}
                    >
                      <span
                        className={`grid size-9 shrink-0 place-items-center rounded-xl ${
                          active ? "bg-gold-500 text-navy-950" : "bg-white/8 text-slate-300"
                        }`}
                      >
                        <Icon className="size-4" />
                      </span>
                      <span className="min-w-0">
                        <span
                          className={`block text-[13px] font-bold ${
                            active ? "text-white" : "text-slate-300"
                          }`}
                        >
                          {m === "air" ? "Aérien" : "Maritime"}
                        </span>
                        <span className="block text-[10.5px] text-slate-500">
                          {m === "air" ? "Express 5–8j" : "LCL 35–45j"}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantité */}
            <div>
              <div className="mb-3 flex items-end justify-between">
                <label
                  htmlFor="qty"
                  className="text-[11px] font-bold tracking-[0.14em] text-slate-500 uppercase"
                >
                  {mode === "air" ? "Poids total" : "Volume total"}
                </label>
                <span className="text-[11px] font-semibold text-gold-500">
                  {rate.unit === "kg" ? "en kilogrammes" : "en mètres cubes"}
                </span>
              </div>
              <div className="relative">
                <input
                  id="qty"
                  type="number"
                  min={rate.minQty}
                  step={rate.step}
                  inputMode="decimal"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-navy-900/70 py-4 pr-20 pl-4 text-lg font-bold text-white outline-none transition-colors placeholder:text-slate-600 focus:border-gold-500/60 focus:ring-2 focus:ring-gold-500/20"
                  placeholder="0"
                />
                <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-sm font-bold text-slate-500">
                  {rate.unit === "kg" ? "KG" : "CBM"}
                </span>
              </div>
            </div>

            {/* Destination */}
            <div>
              <label
                htmlFor="dest"
                className="mb-3 block text-[11px] font-bold tracking-[0.14em] text-slate-500 uppercase"
              >
                Ville de destination
              </label>
              <div className="relative">
                <MapPin className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-gold-500" />
                <select
                  id="dest"
                  value={destinationId}
                  onChange={(e) => setDestinationId(e.target.value)}
                  className="w-full appearance-none rounded-2xl border border-white/10 bg-navy-900/70 py-4 pr-10 pl-11 text-[15px] font-semibold text-white outline-none transition-colors focus:border-gold-500/60 focus:ring-2 focus:ring-gold-500/20"
                >
                  {DESTINATIONS.map((d) => (
                    <option key={d.id} value={d.id} className="bg-navy-800">
                      {d.flag} {d.city} — {d.country}
                    </option>
                  ))}
                </select>
                <ArrowRight className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 rotate-90 text-slate-500" />
              </div>
            </div>

            <p className="flex items-start gap-2 text-[11px] leading-relaxed text-slate-500">
              <Info className="mt-0.5 size-3.5 shrink-0 text-slate-600" />
              Estimation indicative hors taxes locales et hors marchandises dangereuses. Le tarif
              définitif est confirmé après contrôle de vos colis en entrepôt.
            </p>
          </div>

          {/* ---------- Panneau résultat ---------- */}
          <div className="relative flex flex-col justify-between border-t border-white/8 bg-gradient-to-br from-gold-600/12 via-navy-900 to-navy-900 p-6 sm:p-8 lg:border-t-0 lg:border-l lg:p-10">
            <div>
              <p className="text-[11px] font-bold tracking-[0.14em] text-gold-500 uppercase">
                Estimation instantanée
              </p>

              {result.valid ? (
                <>
                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold tracking-tight text-white sm:text-[2.6rem]">
                      {nf.format(result.low)} $
                    </span>
                    <span className="text-lg font-bold text-slate-500">–</span>
                    <span className="text-3xl font-extrabold tracking-tight text-white sm:text-[2.6rem]">
                      {nf.format(result.high)} $
                    </span>
                  </div>

                  <p className="mt-2 text-[13px] text-slate-400">
                    pour{" "}
                    <span className="font-bold text-slate-200">
                      {nf.format(result.qty)} {rate.unit}
                    </span>{" "}
                    vers{" "}
                    <span className="font-bold text-slate-200">
                      {destination.city} {destination.flag}
                    </span>
                  </p>

                  <div className="mt-7 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                      <p className="text-[10px] font-semibold tracking-wide text-slate-500 uppercase">
                        Délai estimé
                      </p>
                      <p className="mt-1 text-sm font-bold text-white">{result.delay}</p>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                      <p className="text-[10px] font-semibold tracking-wide text-slate-500 uppercase">
                        Base tarifaire
                      </p>
                      <p className="mt-1 text-sm font-bold text-white">
                        {rate.min}–{rate.max} $/{rate.unit}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="mt-8 rounded-2xl border border-dashed border-white/12 p-6 text-center">
                  <p className="text-sm font-medium text-slate-400">
                    Saisissez une quantité supérieure à {rate.minQty} {rate.unit} pour voir votre
                    estimation.
                  </p>
                </div>
              )}
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!result.valid}
              className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-bold transition-all active:scale-[0.98] ${
                result.valid
                  ? "bg-gradient-to-b from-gold-500 to-gold-600 text-navy-950 shadow-lg shadow-gold-600/25 hover:shadow-glow-gold hover:brightness-110"
                  : "pointer-events-none bg-white/8 text-slate-500"
              }`}
            >
              <MessageCircle className="size-4" />
              Valider ce tarif sur WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}