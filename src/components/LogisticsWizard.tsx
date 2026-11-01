"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  ShieldCheck,
  UserCheck,
  Plane,
  Ship,
} from "lucide-react";
import { FLAT_DESTINATIONS } from "@/data/logistics/destinations";
import { FREIGHT_RATES } from "@/data/logistics/rates";
import { CONTACT } from "@/data/config/contact";
import { waLink } from "@/data/shared/helpers";
import type { ShippingMode } from "@/data/shared/types";

type Step = 1 | 2 | 3;

const STEP_LABELS = ["Mode d'expédition", "Dédouanement", "Détails du colis"];

const nf = new Intl.NumberFormat("fr-FR");

const inputCls =
  "w-full min-h-[52px] rounded-xl border border-ink-200 bg-white px-4 py-3.5 text-[14px] text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-tracoli-500 focus:ring-4 focus:ring-tracoli-500/10";

const DEPARTURE_HUBS = [
  "Guangzhou, China",
  "Yiwu, China",
  "Foshan, China",
  "Shenzhen, China",
];

export default function LogisticsWizard() {
  const [step, setStep] = useState<Step>(1);
  const [mode, setMode] = useState<ShippingMode>("air");
  const [customsManagedByTracoli, setCustomsManagedByTracoli] = useState(true);
  const [departure, setDeparture] = useState<string>(DEPARTURE_HUBS[0]);
  const [destinationId, setDestinationId] = useState(FLAT_DESTINATIONS[0].id);
  const [quantity, setQuantity] = useState("50");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const rate = FREIGHT_RATES[mode];
  const destination =
    FLAT_DESTINATIONS.find((d) => d.id === destinationId) ??
    FLAT_DESTINATIONS[0];

  const qty = Math.max(0, Number(quantity) || 0);
  const factor =
    mode === "air" ? destination.airFactor : destination.seaFactor;
  const low = Math.round(qty * rate.min * factor);
  const high = Math.round(qty * rate.max * factor);

  const next = () => setStep((s) => Math.min(3, s + 1) as Step);
  const back = () => setStep((s) => Math.max(1, s - 1) as Step);

  const submit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setDone(true);
  };

  const summary = () => {
    return (
      `Bonjour ${CONTACT.manager},\n\n` +
      `DEMANDE DE FRET — ${CONTACT.brand}\n\n` +
      `Mode : ${rate.label}\n` +
      `Dédouanement : ${customsManagedByTracoli ? "Géré par TRACOLI" : "Géré par le client"}\n` +
      `Départ : ${departure}\n` +
      `Arrivée : ${destination.city} (${destination.country})\n` +
      `Quantité : ${qty} ${rate.unit}\n` +
      `Estimation : ${nf.format(low)} USD - ${nf.format(high)} USD\n` +
      `Délai : ${rate.delay}\n`
    );
  };

  if (done) {
    return (
      <Shell>
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-8 text-center sm:p-12">
          <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-emerald-100">
            <Check className="size-8 text-emerald-600" strokeWidth={3} />
          </span>
          <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-ink-900">
            Estimation disponible
          </h3>
          <div className="mx-auto mt-6 max-w-sm rounded-2xl border border-ink-200 bg-white p-6">
            <p className="text-[11px] font-bold tracking-wide text-ink-500 uppercase">
              Estimation de fret
            </p>
            <p className="mt-2 text-3xl font-extrabold text-ink-900">
              {nf.format(low)} USD <span className="text-ink-400">-</span>{" "}
              {nf.format(high)} USD
            </p>
            <p className="mt-2 text-[13px] text-ink-500">
              {qty} {rate.unit} · {destination.city} · {rate.delay}
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href={waLink(summary())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-tracoli-500 px-6 py-3.5 text-sm font-bold text-white shadow-[var(--shadow-red)] hover:bg-tracoli-600"
            >
              Valider sur WhatsApp
            </a>
            <button
              onClick={() => {
                setDone(false);
                setStep(1);
              }}
              className="inline-flex min-h-[52px] items-center justify-center rounded-xl border border-ink-200 bg-white px-6 py-3.5 text-sm font-semibold text-ink-700 hover:bg-ink-50"
            >
              Nouvelle estimation
            </button>
          </div>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-card-lg sm:p-8 lg:p-10">
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-between text-[11px] font-bold tracking-wide uppercase">
            <span className="text-tracoli-500">Étape {step} sur 3</span>
            <span className="text-ink-400">{STEP_LABELS[step - 1]}</span>
          </div>
          <div className="flex gap-1.5">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
                  n <= step ? "bg-tracoli-500" : "bg-ink-200"
                }`}
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 1 && (
              <div>
                <h3 className="text-xl font-extrabold tracking-tight text-ink-900 sm:text-2xl">
                  Quel mode d&apos;expédition ?
                </h3>
                <p className="mt-2 text-[13.5px] text-ink-500">
                  Sélectionnez le mode pour votre envoi. Vous pourrez affiner les détails à l&apos;étape suivante.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {(Object.keys(FREIGHT_RATES) as ShippingMode[]).map((m) => {
                    const opt = FREIGHT_RATES[m];
                    const active = mode === m;
                    const isSea = m === "sea";
                    const Icon = m === "air" ? Plane : Ship;

                    return (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMode(m)}
                        className={`group relative flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all active:scale-[0.98] ${
                          active
                            ? "border-tracoli-500 bg-tracoli-50 shadow-[var(--shadow-red)]"
                            : "border-ink-200 bg-white hover:border-ink-300"
                        }`}
                      >
                        {isSea && (
                          <span className="absolute -top-2.5 right-3 rounded-full bg-tracoli-500 px-2 py-0.5 text-[9px] font-bold tracking-wide text-white uppercase">
                            Recommandé
                          </span>
                        )}

                        <span
                          className={`grid size-11 shrink-0 place-items-center rounded-xl transition-colors ${
                            active
                              ? "bg-tracoli-500 text-white"
                              : "bg-ink-100 text-ink-500"
                          }`}
                        >
                          <Icon className="size-5" />
                        </span>

                        <div className="min-w-0 flex-1">
                          <p
                            className={`text-[14px] font-extrabold tracking-tight ${
                              active ? "text-tracoli-600" : "text-ink-900"
                            }`}
                          >
                            {opt.label}
                          </p>
                        </div>

                        {active && (
                          <span className="grid size-5 shrink-0 place-items-center rounded-full bg-tracoli-500 text-white">
                            <Check className="size-3" strokeWidth={3} />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <p className="mt-4 text-center text-[11.5px] text-ink-400">
                  Tarifs et délais détaillés affichés dans la section « Deux modes d&apos;expédition » ci-dessus.
                </p>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="text-xl font-extrabold tracking-tight text-ink-900 sm:text-2xl">
                  Qui gère le dédouanement ?
                </h3>
                <p className="mt-2 text-[13.5px] text-ink-500">
                  Nous recommandons notre service de dédouanement clé en main.
                </p>

                <div className="mt-6 space-y-3">
                  <button
                    type="button"
                    onClick={() => setCustomsManagedByTracoli(true)}
                    className={`flex w-full items-start gap-4 rounded-2xl border-2 p-5 text-left transition-all active:scale-[0.99] ${
                      customsManagedByTracoli
                        ? "border-tracoli-500 bg-tracoli-50 shadow-[var(--shadow-red)]"
                        : "border-ink-200 bg-white hover:border-ink-300"
                    }`}
                  >
                    <span
                      className={`mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl ${
                        customsManagedByTracoli
                          ? "bg-tracoli-500 text-white"
                          : "bg-ink-100 text-ink-600"
                      }`}
                    >
                      <ShieldCheck className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p
                          className={`text-[14px] font-extrabold ${
                            customsManagedByTracoli
                              ? "text-tracoli-600"
                              : "text-ink-900"
                          }`}
                        >
                          TRACOLI s&apos;occupe de tout
                        </p>
                        <span className="rounded-full bg-tracoli-500 px-2 py-0.5 text-[9.5px] font-bold tracking-wide text-white uppercase">
                          Recommandé
                        </span>
                      </div>
                      <p className="mt-1 text-[12px] leading-relaxed text-ink-500">
                        Nous gérons les documents, les taxes et le retrait douanier jusqu&apos;à la destination finale.
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCustomsManagedByTracoli(false)}
                    className={`flex w-full items-start gap-4 rounded-2xl border-2 p-5 text-left transition-all active:scale-[0.99] ${
                      !customsManagedByTracoli
                        ? "border-tracoli-500 bg-tracoli-50 shadow-[var(--shadow-red)]"
                        : "border-ink-200 bg-white hover:border-ink-300"
                    }`}
                  >
                    <span
                      className={`mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl ${
                        !customsManagedByTracoli
                          ? "bg-tracoli-500 text-white"
                          : "bg-ink-100 text-ink-600"
                      }`}
                    >
                      <UserCheck className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-[14px] font-extrabold ${
                          !customsManagedByTracoli
                            ? "text-tracoli-600"
                            : "text-ink-900"
                        }`}
                      >
                        Je gère la douane moi-même
                      </p>
                      <p className="mt-1 text-[12px] leading-relaxed text-ink-500">
                        Vous avez votre propre transitaire. Nous livrons au port, vous prenez le relais.
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="text-xl font-extrabold tracking-tight text-ink-900 sm:text-2xl">
                  Détails de votre expédition
                </h3>
                <p className="mt-2 text-[13.5px] text-ink-500">
                  Estimation automatique. Cotation ferme confirmée après contrôle en entrepôt.
                </p>

                <div className="mt-6 space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-[11px] font-bold tracking-wide text-ink-500 uppercase">
                        Ville de départ
                      </label>
                      <select
                        value={departure}
                        onChange={(e) => setDeparture(e.target.value)}
                        className={`${inputCls} appearance-none`}
                      >
                        {DEPARTURE_HUBS.map((hub) => (
                          <option key={hub} value={hub}>
                            {hub}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-[11px] font-bold tracking-wide text-ink-500 uppercase">
                        Ville d&apos;arrivée
                      </label>
                      <select
                        value={destinationId}
                        onChange={(e) => setDestinationId(e.target.value)}
                        className={`${inputCls} appearance-none`}
                      >
                        {FLAT_DESTINATIONS.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.city} — {d.country} ({d.code})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-[11px] font-bold tracking-wide text-ink-500 uppercase">
                      {mode === "air" ? "Poids total (KG)" : "Volume total (CBM)"}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min={rate.minQty}
                        step={rate.step}
                        inputMode="decimal"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className={`${inputCls} pr-20`}
                      />
                      <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[12px] font-bold text-ink-400">
                        {rate.unit}
                      </span>
                    </div>
                  </div>

                  {qty >= rate.minQty && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-2xl border border-tracoli-200 bg-tracoli-50 p-5"
                    >
                      <p className="text-[11px] font-bold tracking-wide text-tracoli-600 uppercase">
                        Estimation instantanée
                      </p>
                      <p className="mt-2 text-2xl font-extrabold text-ink-900">
                        {nf.format(low)} USD{" "}
                        <span className="text-ink-400">-</span>{" "}
                        {nf.format(high)} USD
                      </p>
                      <p className="mt-1 text-[12px] text-ink-500">
                        {qty} {rate.unit} · {destination.city}
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between gap-3 border-t border-ink-200 pt-6">
          <button
            type="button"
            onClick={back}
            disabled={step === 1}
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl px-3 py-2.5 text-[13px] font-semibold text-ink-500 transition-colors hover:text-ink-900 disabled:pointer-events-none disabled:opacity-0"
          >
            <ArrowLeft className="size-3.5" />
            Retour
          </button>

          {step < 3 ? (
            <button
              type="button"
              onClick={next}
              className="inline-flex min-h-[52px] items-center gap-2 rounded-xl bg-tracoli-500 px-5 py-3 text-[13px] font-bold text-white shadow-[var(--shadow-red)] transition-all hover:bg-tracoli-600 active:scale-[0.98]"
            >
              Continuer
              <ArrowRight className="size-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={submitting || qty < rate.minQty}
              className="inline-flex min-h-[52px] items-center gap-2 rounded-xl bg-tracoli-500 px-5 py-3 text-[13px] font-bold text-white shadow-[var(--shadow-red)] transition-all hover:bg-tracoli-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  Calcul...
                </>
              ) : (
                <>
                  Obtenir mon tarif de fret
                  <ArrowRight className="size-3.5" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return (
    <section className="bg-white py-12 pb-24 lg:py-20 lg:pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center lg:mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-tracoli-50 px-3.5 py-1.5 text-[11px] font-bold tracking-wide text-tracoli-600 uppercase">
            Formulaire de fret
          </span>
          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-3xl lg:text-4xl">
            Estimez votre fret en 3 étapes
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[13.5px] text-ink-500 lg:text-[14.5px]">
            Mode, dédouanement, destination. Vous obtenez un tarif indicatif immédiat.
          </p>
        </div>
        {children}
      </div>
    </section>
  );
}
