"use client";

import { useState, type FormEvent } from "react";
import {
  Send,
  CheckCircle2,
  MessageCircle,
  Loader2,
  ShieldCheck,
  Clock3,
  Headphones,
} from "lucide-react";
import {
  GOODS_TYPES,
  URGENCY_LEVELS,
  DESTINATIONS,
  CONTACT,
  waLink,
} from "@/data/content";

type FormState = {
  goodsType: string;
  urgency: string;
  shippingMode: string;
  weight: string;
  name: string;
  city: string;
  whatsapp: string;
  notes: string;
};

const INITIAL: FormState = {
  goodsType: "general",
  urgency: "standard",
  shippingMode: "air",
  weight: "",
  name: "",
  city: "kinshasa",
  whatsapp: "",
  notes: "",
};

const inputCls =
  "w-full rounded-xl border border-white/10 bg-navy-900/70 px-4 py-3.5 text-[14px] text-white outline-none transition-colors placeholder:text-slate-600 focus:border-gold-500/60 focus:ring-2 focus:ring-gold-500/20";

const labelCls =
  "mb-2 block text-[11px] font-bold tracking-[0.12em] text-slate-500 uppercase";

export default function QuoteForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const destination =
    DESTINATIONS.find((d) => d.id === form.city) ?? DESTINATIONS[0];
  const goodsLabel =
    GOODS_TYPES.find((g) => g.value === form.goodsType)?.label ?? form.goodsType;
  const urgencyLabel =
    URGENCY_LEVELS.find((u) => u.value === form.urgency)?.label ?? form.urgency;

  const summary =
    `Bonjour ${CONTACT.manager} 👋\n\n` +
    `📦 NOUVELLE DEMANDE DE COTATION — TRACOLI BUSINESS\n\n` +
    `• Nom : ${form.name || "—"}\n` +
    `• Type de marchandises : ${goodsLabel}\n` +
    `• Mode souhaité : ${form.shippingMode === "air" ? "Aérien Express" : "Maritime LCL/FCL"}\n` +
    `• Poids / Volume estimé : ${form.weight || "—"}\n` +
    `• Destination : ${destination.city} (${destination.country})\n` +
    `• Urgence : ${urgencyLabel}\n` +
    `• WhatsApp : ${form.whatsapp || "—"}\n` +
    (form.notes ? `• Précisions : ${form.notes}\n` : "") +
    `\nMerci de me transmettre la cotation détaillée.`;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("done");
  };

  /* ------------------- Vue succès ------------------- */
  if (status === "done") {
    return (
      <section id="devis" className="scroll-mt-24 py-20 lg:py-28">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-navy-800/50 p-8 text-center backdrop-blur sm:p-12">
            <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-500/12 blur-[90px]" />

            <span className="relative mx-auto grid size-16 place-items-center rounded-2xl bg-emerald-500/15">
              <CheckCircle2 className="size-8 text-emerald-400" />
            </span>

            <h3 className="relative mt-6 text-2xl font-extrabold tracking-tight text-white">
              Demande transmise à l&apos;équipe TRACOLI
            </h3>
            <p className="relative mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-slate-400">
              Merci <span className="font-semibold text-white">{form.name || "cher client"}</span>.
              Votre dossier est qualifié. Pour accélérer la cotation, envoyez-le maintenant à{" "}
              {CONTACT.manager} sur WhatsApp — réponse sous 2h ouvrées.
            </p>

            <div className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href={waLink(summary)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-emerald-500 to-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition-all hover:brightness-110 active:scale-[0.98]"
              >
                <MessageCircle className="size-4" />
                Envoyer sur WhatsApp
              </a>
              <button
                type="button"
                onClick={() => {
                  setForm(INITIAL);
                  setStatus("idle");
                }}
                className="rounded-xl border border-white/15 px-6 py-3.5 text-sm font-semibold text-slate-300 transition-colors hover:bg-white/5"
              >
                Nouvelle demande
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ------------------- Vue formulaire ------------------- */
  return (
    <section id="devis" className="relative scroll-mt-24 py-20 lg:py-28">
      <div className="pointer-events-none absolute top-1/4 right-0 h-96 w-96 rounded-full bg-gold-600/8 blur-[130px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* ---------- Colonne argumentaire ---------- */}
          <div className="lg:pt-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/25 bg-gold-500/8 px-3.5 py-1.5 text-[11px] font-semibold text-gold-400">
              Demande de cotation
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white text-balance sm:text-4xl">
              Recevez votre cotation personnalisée
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-slate-400">
              Remplissez ce formulaire de qualification. Nos transitaires analysent votre demande
              et vous renvoient un tarif ferme — pas une fourchette.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                {
                  icon: Clock3,
                  title: "Réponse sous 2h ouvrées",
                  desc: "Votre dossier est routé directement vers un transitaire dédié.",
                },
                {
                  icon: ShieldCheck,
                  title: "Tarif ferme, sans frais cachés",
                  desc: "Dédouanement, entreposage et documentation inclus dans l'offre.",
                },
                {
                  icon: Headphones,
                  title: "Un interlocuteur unique",
                  desc: `${CONTACT.manager} suit votre dossier de bout en bout sur WhatsApp.`,
                },
              ].map((item) => (
                <li key={item.title} className="flex gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-gold-500/20 bg-gold-500/8 text-gold-400">
                    <item.icon className="size-4" />
                  </span>
                  <div>
                    <p className="text-[13.5px] font-bold text-white">{item.title}</p>
                    <p className="mt-0.5 text-[12.5px] leading-relaxed text-slate-500">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- Formulaire ---------- */}
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white/8 bg-navy-800/50 p-6 backdrop-blur sm:p-8"
          >
            <div className="space-y-6">
              {/* Type de marchandises */}
              <div>
                <label htmlFor="goodsType" className={labelCls}>
                  Type de marchandises
                </label>
                <select
                  id="goodsType"
                  value={form.goodsType}
                  onChange={(e) => update("goodsType", e.target.value)}
                  className={`${inputCls} appearance-none`}
                >
                  {GOODS_TYPES.map((g) => (
                    <option key={g.value} value={g.value} className="bg-navy-800">
                      {g.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mode + Urgence */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="shippingMode" className={labelCls}>
                    Mode d&apos;expédition
                  </label>
                  <select
                    id="shippingMode"
                    value={form.shippingMode}
                    onChange={(e) => update("shippingMode", e.target.value)}
                    className={`${inputCls} appearance-none`}
                  >
                    <option value="air" className="bg-navy-800">
                      ✈️ Aérien Express (5–8j)
                    </option>
                    <option value="sea" className="bg-navy-800">
                      🚢 Maritime LCL / FCL (35–45j)
                    </option>
                    <option value="sourcing" className="bg-navy-800">
                      🔍 Sourcing / Inspection usine
                    </option>
                  </select>
                </div>

                <div>
                  <label htmlFor="urgency" className={labelCls}>
                    Niveau d&apos;urgence
                  </label>
                  <select
                    id="urgency"
                    value={form.urgency}
                    onChange={(e) => update("urgency", e.target.value)}
                    className={`${inputCls} appearance-none`}
                  >
                    {URGENCY_LEVELS.map((u) => (
                      <option key={u.value} value={u.value} className="bg-navy-800">
                        {u.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Poids/Volume + Destination */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="weight" className={labelCls}>
                    Estimation poids / volume
                  </label>
                  <input
                    id="weight"
                    type="text"
                    required
                    value={form.weight}
                    onChange={(e) => update("weight", e.target.value)}
                    placeholder="ex : 120 KG ou 3 CBM"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label htmlFor="city" className={labelCls}>
                    Ville de destination
                  </label>
                  <select
                    id="city"
                    value={form.city}
                    onChange={(e) => update("city", e.target.value)}
                    className={`${inputCls} appearance-none`}
                  >
                    {DESTINATIONS.map((d) => (
                      <option key={d.id} value={d.id} className="bg-navy-800">
                        {d.flag} {d.city} — {d.country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Nom + WhatsApp */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelCls}>
                    Nom complet
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="ex : Jean Mukendi"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label htmlFor="whatsapp" className={labelCls}>
                    Numéro WhatsApp
                  </label>
                  <input
                    id="whatsapp"
                    type="tel"
                    required
                    value={form.whatsapp}
                    onChange={(e) => update("whatsapp", e.target.value)}
                    placeholder="+243 ... / +257 ..."
                    className={inputCls}
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="notes" className={labelCls}>
                  Précisions <span className="text-slate-600 normal-case">(optionnel)</span>
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  placeholder="Références produits, lien fournisseur, contraintes particulières…"
                  className={`${inputCls} resize-none`}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-gold-500 to-gold-600 px-6 py-4 text-sm font-bold text-navy-950 shadow-lg shadow-gold-600/25 transition-all hover:shadow-glow-gold hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Transmission en cours…
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    Transmettre ma demande à l&apos;équipe TRACOLI
                  </>
                )}
              </button>

              <p className="text-center text-[11px] text-slate-500">
                🔒 Vos données restent confidentielles. Aucun spam, jamais.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}