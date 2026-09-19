"use client";

import { useState, useRef, type DragEvent, type ChangeEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  UploadCloud,
  X,
  Link2,
  Check,
  Loader2,
  Sparkles,
} from "lucide-react";
import {
  DESTINATIONS,
  PRODUCT_TAGS,
  CONTACT,
  waLink,
} from "@/data/content";

type Step = 1 | 2 | 3;

const STEP_LABELS = ["Le produit", "Les spécificités", "Votre contact"];

const inputCls =
  "w-full rounded-xl border border-ink-200 bg-white px-4 py-3.5 text-[14px] text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-tracoli-500 focus:ring-4 focus:ring-tracoli-500/10";

export default function SourcingWizard() {
  const [step, setStep] = useState<Step>(1);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  // Étape 1
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [productUrl, setProductUrl] = useState("");
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Étape 2
  const [tags, setTags] = useState<Set<string>>(new Set());

  // Étape 3
  const [name, setName] = useState("");
  const [city, setCity] = useState(DESTINATIONS[0].id);
  const [whatsapp, setWhatsapp] = useState("");

  /* -------------------- Handlers image -------------------- */
  const handleFile = (file: File | undefined) => {
    if (!file || !file.type.startsWith("image/")) return;
    setImagePreview(URL.createObjectURL(file));
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0] ?? undefined);
  };

  /* -------------------- Navigation -------------------- */
  const canProceed = () => {
    if (step === 1) return true; // image optionnelle
    if (step === 2) return true; // tags optionnels
    if (step === 3) return name.trim() !== "" && whatsapp.trim() !== "";
    return false;
  };

  const next = () => setStep((s) => Math.min(3, s + 1) as Step);
  const back = () => setStep((s) => Math.max(1, s - 1) as Step);

  /* -------------------- Submit -------------------- */
  const toggleTag = (id: string) =>
    setTags((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  const cityObj = DESTINATIONS.find((d) => d.id === city) ?? DESTINATIONS[0];

  const submit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setDone(true);
  };

  const summary = () => {
    const tagLabels = PRODUCT_TAGS.filter((t) => tags.has(t.id))
      .map((t) => `${t.emoji} ${t.label}`)
      .join(", ");
    return (
      `Bonjour ${CONTACT.manager} 👋\n\n` +
      `📦 DEMANDE DE SOURCING — TRACOLI BUSINESS\n\n` +
      `• Produit (URL) : ${productUrl || "—"}\n` +
      `• Spécificités : ${tagLabels || "Aucune"}\n` +
      `• Nom : ${name}\n` +
      `• Destination : ${cityObj.city} (${cityObj.country})\n` +
      `• WhatsApp : ${whatsapp}\n\n` +
      `Merci de me préparer une cotation sourcing.`
    );
  };

  /* -------------------- Vue succès -------------------- */
  if (done) {
    return (
      <Shell id="sourcing">
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-8 text-center sm:p-12">
          <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-emerald-100">
            <Check className="size-8 text-emerald-600" strokeWidth={3} />
          </span>
          <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-ink-900">
            Demande de sourcing transmise 🎉
          </h3>
          <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-ink-600">
            Merci <span className="font-semibold text-ink-900">{name}</span>. Un acheteur TRACOLI
            analyse votre demande et revient vers vous sous 24h.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href={waLink(summary())}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-tracoli-500 px-6 py-3.5 text-sm font-bold text-white shadow-[var(--shadow-red)] hover:bg-tracoli-600"
            >
              Envoyer sur WhatsApp
            </a>
            <button
              onClick={() => {
                setDone(false);
                setStep(1);
                setImagePreview(null);
                setProductUrl("");
                setTags(new Set());
                setName("");
                setWhatsapp("");
              }}
              className="rounded-xl border border-ink-200 bg-white px-6 py-3.5 text-sm font-semibold text-ink-700 hover:bg-ink-50"
            >
              Nouvelle demande
            </button>
          </div>
        </div>
      </Shell>
    );
  }

  /* -------------------- Wizard -------------------- */
  return (
    <Shell id="sourcing">
      <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-card-lg sm:p-8 lg:p-10">
        {/* Barre de progression */}
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

        {/* Contenu animé */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* ---------- ÉTAPE 1 ---------- */}
            {step === 1 && (
              <div>
                <h3 className="text-xl font-extrabold tracking-tight text-ink-900 sm:text-2xl">
                  Quel produit souhaitez-vous sourcer ?
                </h3>
                <p className="mt-2 text-[13.5px] text-ink-500">
                  Envoyez-nous une photo ou un lien. Plus de contexte = cotation plus précise.
                </p>

                {/* Drop zone */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={onDrop}
                  onClick={() => fileRef.current?.click()}
                  className={`mt-6 cursor-pointer rounded-2xl border-2 border-dashed p-6 text-center transition-all ${
                    dragging
                      ? "border-tracoli-500 bg-tracoli-50"
                      : "border-ink-200 bg-ink-50 hover:border-ink-300 hover:bg-ink-100/60"
                  }`}
                >
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={onFileChange}
                  />

                  {imagePreview ? (
                    <div className="relative mx-auto aspect-square w-full max-w-[200px] overflow-hidden rounded-xl border border-ink-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imagePreview}
                        alt="Aperçu produit"
                        className="size-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setImagePreview(null);
                        }}
                        className="absolute top-2 right-2 grid size-7 place-items-center rounded-full bg-ink-900/80 text-white backdrop-blur"
                      >
                        <X className="size-3.5" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-white text-tracoli-500 shadow-sm">
                        <UploadCloud className="size-5" />
                      </span>
                      <p className="mt-4 text-[14px] font-bold text-ink-900">
                        Glissez une photo ici
                      </p>
                      <p className="mt-1 text-[12px] text-ink-500">
                        ou cliquez pour parcourir · JPG, PNG jusqu&apos;à 5 Mo
                      </p>
                    </>
                  )}
                </div>

                {/* URL optionnelle */}
                <div className="mt-5">
                  <label className="mb-2 block text-[11px] font-bold tracking-wide text-ink-500 uppercase">
                    Lien du produit <span className="text-ink-400 normal-case">(optionnel)</span>
                  </label>
                  <div className="relative">
                    <Link2 className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-400" />
                    <input
                      type="url"
                      value={productUrl}
                      onChange={(e) => setProductUrl(e.target.value)}
                      placeholder="https://www.alibaba.com/..."
                      className={`${inputCls} pl-11`}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ---------- ÉTAPE 2 ---------- */}
            {step === 2 && (
              <div>
                <h3 className="text-xl font-extrabold tracking-tight text-ink-900 sm:text-2xl">
                  Avez-vous des spécificités ?
                </h3>
                <p className="mt-2 text-[13.5px] text-ink-500">
                  Sélectionnez tout ce qui s&apos;applique pour anticiper les contraintes de
                  transport.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {PRODUCT_TAGS.map((tag) => {
                    const active = tags.has(tag.id);
                    return (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={() => toggleTag(tag.id)}
                        className={`group relative flex flex-col items-center gap-2 rounded-2xl border-2 p-4 text-center transition-all active:scale-[0.97] ${
                          active
                            ? "border-tracoli-500 bg-tracoli-50 shadow-[var(--shadow-red)]"
                            : "border-ink-200 bg-white hover:border-ink-300"
                        }`}
                      >
                        <span className="text-2xl">{tag.emoji}</span>
                        <span
                          className={`text-[12.5px] font-bold leading-tight ${
                            active ? "text-tracoli-600" : "text-ink-800"
                          }`}
                        >
                          {tag.label}
                        </span>
                        {active && (
                          <span className="absolute -top-2 -right-2 grid size-5 place-items-center rounded-full bg-tracoli-500 text-white">
                            <Check className="size-3" strokeWidth={3} />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <p className="mt-5 flex items-start gap-2 rounded-xl bg-ink-50 p-3 text-[11.5px] leading-relaxed text-ink-500">
                  <Sparkles className="mt-0.5 size-3.5 shrink-0 text-tracoli-500" />
                  Ces informations nous permettent de choisir le bon mode de transport et
                  d&apos;éviter les surprises douanières.
                </p>
              </div>
            )}

            {/* ---------- ÉTAPE 3 ---------- */}
            {step === 3 && (
              <div>
                <h3 className="text-xl font-extrabold tracking-tight text-ink-900 sm:text-2xl">
                  Comment vous joindre ?
                </h3>
                <p className="mt-2 text-[13.5px] text-ink-500">
                  Nous revenons vers vous sous 24h avec une cotation sourcing.
                </p>

                <div className="mt-6 space-y-5">
                  <div>
                    <label className="mb-2 block text-[11px] font-bold tracking-wide text-ink-500 uppercase">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="ex : Jean Mukendi"
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[11px] font-bold tracking-wide text-ink-500 uppercase">
                      Ville de destination
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className={`${inputCls} appearance-none`}
                    >
                      {DESTINATIONS.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.flag} {d.city} — {d.country}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-[11px] font-bold tracking-wide text-ink-500 uppercase">
                      Numéro WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="+243 ... / +257 ..."
                      className={inputCls}
                    />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between gap-3 border-t border-ink-200 pt-6">
          <button
            type="button"
            onClick={back}
            disabled={step === 1}
            className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-[13px] font-semibold text-ink-500 transition-colors hover:text-ink-900 disabled:pointer-events-none disabled:opacity-0"
          >
            <ArrowLeft className="size-3.5" />
            Retour
          </button>

          {step < 3 ? (
            <button
              type="button"
              onClick={next}
              disabled={!canProceed()}
              className="inline-flex items-center gap-2 rounded-xl bg-tracoli-500 px-5 py-3 text-[13px] font-bold text-white shadow-[var(--shadow-red)] transition-all hover:bg-tracoli-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Continuer
              <ArrowRight className="size-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={!canProceed() || submitting}
              className="inline-flex items-center gap-2 rounded-xl bg-tracoli-500 px-5 py-3 text-[13px] font-bold text-white shadow-[var(--shadow-red)] transition-all hover:bg-tracoli-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  Envoi…
                </>
              ) : (
                <>
                  Demander une cotation Sourcing
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

/* ------------------------------------------------------------------ */
/*  Wrapper de section (titre + centrage)                              */
/* ------------------------------------------------------------------ */

function Shell({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <section id={id} className="scroll-mt-24 bg-ink-50 py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-white px-3.5 py-1.5 text-[11px] font-bold tracking-wide text-tracoli-600 uppercase">
            📦 Sourcing Wizard
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl">
            Faites sourcer votre produit en 3 étapes
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[14.5px] text-ink-500">
            Décrivez votre besoin, nous trouvons le fournisseur, négocions le prix et gérons
            l&apos;expédition.
          </p>
        </div>
        {children}
      </div>
    </section>
  );
}