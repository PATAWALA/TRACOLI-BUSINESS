"use client";

import {
  useState,
  useEffect,
  useRef,
  type DragEvent,
  type ChangeEvent,
  type ReactNode,
} from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  UploadCloud,
  X,
  Link2,
  Check,
  Loader2,
  Package,
} from "lucide-react";
import { FLAT_DESTINATIONS } from "@/data/logistics/destinations";
import { CONTACT } from "@/data/config/contact";
import { waLink } from "@/data/shared/helpers";
import { useLocale } from "@/hooks/useLocale";

type Step = 1 | 2 | 3;

const STEP_LABELS = {
  fr: ["Le produit", "Les spécificités", "Votre contact"],
  en: ["The product", "Specifications", "Your contact"],
};

const TAGS = [
  {
    id: "electronics",
    label: { fr: "Électronique", en: "Electronics" },
    hint: { fr: "Appareils, gadgets, téléphonie", en: "Devices, gadgets, telecom" },
  },
  {
    id: "battery",
    label: { fr: "Contient une batterie", en: "Contains a battery" },
    hint: { fr: "Restrictions transport aérien", en: "Air transport restrictions" },
  },
  {
    id: "fragile",
    label: { fr: "Fragile", en: "Fragile" },
    hint: { fr: "Emballage renforcé requis", en: "Reinforced packaging required" },
  },
  {
    id: "standard",
    label: { fr: "Standard", en: "Standard" },
    hint: { fr: "Marchandise générale", en: "General goods" },
  },
] as const;

const inputCls =
  "w-full min-h-[52px] rounded-xl border border-ink-200 bg-white px-4 py-3.5 text-[14px] text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-tracoli-500 focus:ring-4 focus:ring-tracoli-500/10";

export default function SourcingWizard() {
  const { locale } = useLocale();
  const searchParams = useSearchParams();

  const [step, setStep] = useState<Step>(1);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [productUrl, setProductUrl] = useState("");
  const [prefilledProduct, setPrefilledProduct] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const [tags, setTags] = useState<Set<string>>(new Set());

  const [name, setName] = useState("");
  const [destinationId, setDestinationId] = useState(FLAT_DESTINATIONS[0].id);
  const [whatsapp, setWhatsapp] = useState("");

  /* ---------- Pré-remplissage depuis URL params ---------- */
  useEffect(() => {
    const productName = searchParams.get("sourcing-product");
    const productImageUrl = searchParams.get("sourcing-product-url");

    if (productName) setPrefilledProduct(productName);
    if (productImageUrl) setImagePreview(productImageUrl);
  }, [searchParams]);

  const destination =
    FLAT_DESTINATIONS.find((d) => d.id === destinationId) ??
    FLAT_DESTINATIONS[0];

  const handleFile = (file: File | undefined) => {
    if (!file || !file.type.startsWith("image/")) return;
    setImagePreview(URL.createObjectURL(file));
    setPrefilledProduct(null);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) =>
    handleFile(e.target.files?.[0] ?? undefined);

  const toggleTag = (id: string) =>
    setTags((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  const canProceed = () => {
    if (step === 1) return true;
    if (step === 2) return true;
    return name.trim() !== "" && whatsapp.trim() !== "";
  };

  const next = () => setStep((s) => Math.min(3, s + 1) as Step);
  const back = () => setStep((s) => Math.max(1, s - 1) as Step);

  const submit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setDone(true);
  };

  const reset = () => {
    setDone(false);
    setStep(1);
    setImagePreview(null);
    setProductUrl("");
    setPrefilledProduct(null);
    setTags(new Set());
    setName("");
    setWhatsapp("");
  };

  const summary = () => {
    const tagLabels = TAGS.filter((t) => tags.has(t.id))
      .map((t) => t.label[locale])
      .join(", ");
    const country =
      locale === "fr" ? destination.countryFr : destination.countryEn;

    return (
      `${locale === "fr" ? "Bonjour" : "Hello"} ${CONTACT.manager},\n\n` +
      `${locale === "fr" ? "DEMANDE DE SOURCING" : "SOURCING REQUEST"} — ${CONTACT.brand}\n\n` +
      (prefilledProduct
        ? `${locale === "fr" ? "Produit" : "Product"} : ${prefilledProduct}\n`
        : "") +
      `${locale === "fr" ? "Produit (URL)" : "Product (URL)"} : ${productUrl || "-"}\n` +
      `${locale === "fr" ? "Spécificités" : "Specifications"} : ${tagLabels || "-"}\n` +
      `${locale === "fr" ? "Nom" : "Name"} : ${name}\n` +
      `${locale === "fr" ? "Destination" : "Destination"} : ${destination.city} (${country})\n` +
      `WhatsApp : ${whatsapp}\n`
    );
  };

  /* ==================== VUE SUCCÈS ==================== */
  if (done) {
    return (
      <Shell id="sourcing" variant="alt" locale={locale}>
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-8 text-center sm:p-12">
          <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-emerald-100">
            <Check className="size-8 text-emerald-600" strokeWidth={3} />
          </span>
          <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-ink-900">
            {locale === "fr" ? "Demande transmise" : "Request submitted"}
          </h3>
          <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-ink-600">
            {locale === "fr"
              ? "Un acheteur TRACOLI analyse votre demande et revient vers vous sous 24 heures."
              : "A TRACOLI buyer is reviewing your request and will get back to you within 24 hours."}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href={waLink(summary())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-tracoli-500 px-6 py-3.5 text-sm font-bold text-white shadow-[var(--shadow-red)] hover:bg-tracoli-600"
            >
              {locale === "fr" ? "Envoyer sur WhatsApp" : "Send via WhatsApp"}
            </a>
            <button
              onClick={reset}
              className="inline-flex min-h-[52px] items-center justify-center rounded-xl border border-ink-200 bg-white px-6 py-3.5 text-sm font-semibold text-ink-700 hover:bg-ink-50"
            >
              {locale === "fr" ? "Nouvelle demande" : "New request"}
            </button>
          </div>
        </div>
      </Shell>
    );
  }

  /* ==================== VUE WIZARD ==================== */
  return (
    <Shell id="sourcing" variant="alt" locale={locale}>
      <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-card-lg sm:p-8 lg:p-10">
        {/* Progression */}
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-between text-[11px] font-bold tracking-wide uppercase">
            <span className="text-tracoli-500">
              {locale === "fr" ? `Étape ${step} sur 3` : `Step ${step} of 3`}
            </span>
            <span className="text-ink-400">{STEP_LABELS[locale][step - 1]}</span>
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
            {/* ==================== ÉTAPE 1 ==================== */}
            {step === 1 && (
              <div>
                <h3 className="text-xl font-extrabold tracking-tight text-ink-900 sm:text-2xl">
                  {locale === "fr"
                    ? "Quel produit souhaitez-vous sourcer ?"
                    : "Which product do you want to source?"}
                </h3>
                <p className="mt-2 text-[13.5px] text-ink-500">
                  {locale === "fr"
                    ? "Envoyez-nous une photo ou un lien. Plus de contexte, cotation plus précise."
                    : "Send us a photo or a link. The more context, the more precise the quote."}
                </p>

                {/* Bandeau produit pré-rempli */}
                {prefilledProduct && (
                  <div className="mt-5 flex items-center gap-3 rounded-2xl border border-tracoli-200 bg-tracoli-50 p-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-tracoli-500">
                      <Package className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10.5px] font-bold tracking-wide text-tracoli-600 uppercase">
                        {locale === "fr" ? "Produit sélectionné" : "Selected product"}
                      </p>
                      <p className="truncate text-[13.5px] font-extrabold text-ink-900">
                        {prefilledProduct}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setPrefilledProduct(null);
                        setImagePreview(null);
                      }}
                      className="grid size-7 shrink-0 place-items-center rounded-full bg-white text-ink-400 transition-colors hover:text-ink-700"
                      aria-label={locale === "fr" ? "Retirer" : "Remove"}
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                )}

                {/* Drop zone */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={onDrop}
                  onClick={() => fileRef.current?.click()}
                  className={`mt-5 cursor-pointer rounded-2xl border-2 border-dashed p-6 text-center transition-all ${
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
                          setPrefilledProduct(null);
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
                        {locale === "fr" ? "Glissez une photo ici" : "Drop a photo here"}
                      </p>
                      <p className="mt-1 text-[12px] text-ink-500">
                        {locale === "fr"
                          ? "ou cliquez pour parcourir · JPG, PNG jusqu'à 5 Mo"
                          : "or click to browse · JPG, PNG up to 5 MB"}
                      </p>
                    </>
                  )}
                </div>

                {/* URL optionnelle */}
                <div className="mt-5">
                  <label className="mb-2 block text-[11px] font-bold tracking-wide text-ink-500 uppercase">
                    {locale === "fr" ? "Lien du produit" : "Product link"}{" "}
                    <span className="text-ink-400 normal-case">
                      ({locale === "fr" ? "optionnel" : "optional"})
                    </span>
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

            {/* ==================== ÉTAPE 2 ==================== */}
            {step === 2 && (
              <div>
                <h3 className="text-xl font-extrabold tracking-tight text-ink-900 sm:text-2xl">
                  {locale === "fr"
                    ? "Avez-vous des spécificités ?"
                    : "Any specific requirements?"}
                </h3>
                <p className="mt-2 text-[13.5px] text-ink-500">
                  {locale === "fr"
                    ? "Sélectionnez tout ce qui s'applique pour anticiper les contraintes de transport."
                    : "Select all that apply to anticipate transport constraints."}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {TAGS.map((tag) => {
                    const active = tags.has(tag.id);
                    return (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={() => toggleTag(tag.id)}
                        className={`relative flex flex-col items-center gap-2 rounded-2xl border-2 p-4 text-center transition-all active:scale-[0.97] ${
                          active
                            ? "border-tracoli-500 bg-tracoli-50 shadow-[var(--shadow-red)]"
                            : "border-ink-200 bg-white hover:border-ink-300"
                        }`}
                      >
                        <span
                          className={`text-[12.5px] leading-tight font-bold ${
                            active ? "text-tracoli-600" : "text-ink-800"
                          }`}
                        >
                          {tag.label[locale]}
                        </span>
                        <span className="text-[10.5px] leading-tight text-ink-500">
                          {tag.hint[locale]}
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
              </div>
            )}

            {/* ==================== ÉTAPE 3 ==================== */}
            {step === 3 && (
              <div>
                <h3 className="text-xl font-extrabold tracking-tight text-ink-900 sm:text-2xl">
                  {locale === "fr" ? "Comment vous joindre ?" : "How can we reach you?"}
                </h3>
                <p className="mt-2 text-[13.5px] text-ink-500">
                  {locale === "fr"
                    ? "Nous revenons vers vous sous 24 heures avec une cotation sourcing."
                    : "We will get back to you within 24 hours with a sourcing quote."}
                </p>

                <div className="mt-6 space-y-5">
                  <div>
                    <label className="mb-2 block text-[11px] font-bold tracking-wide text-ink-500 uppercase">
                      {locale === "fr" ? "Nom complet" : "Full name"}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={
                        locale === "fr" ? "ex : Jean Mukendi" : "e.g. John Mukendi"
                      }
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[11px] font-bold tracking-wide text-ink-500 uppercase">
                      {locale === "fr" ? "Ville de destination" : "Destination city"}
                    </label>
                    <select
                      value={destinationId}
                      onChange={(e) => setDestinationId(e.target.value)}
                      className={`${inputCls} appearance-none`}
                    >
                      {FLAT_DESTINATIONS.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.city} — {locale === "fr" ? d.countryFr : d.countryEn} (
                          {d.code})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-[11px] font-bold tracking-wide text-ink-500 uppercase">
                      {locale === "fr" ? "Numéro WhatsApp" : "WhatsApp number"}
                    </label>
                    <input
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="+257 69 03 27 65"
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
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl px-3 py-2.5 text-[13px] font-semibold text-ink-500 transition-colors hover:text-ink-900 disabled:pointer-events-none disabled:opacity-0"
          >
            <ArrowLeft className="size-3.5" />
            {locale === "fr" ? "Retour" : "Back"}
          </button>

          {step < 3 ? (
            <button
              type="button"
              onClick={next}
              disabled={!canProceed()}
              className="inline-flex min-h-[52px] items-center gap-2 rounded-xl bg-tracoli-500 px-5 py-3 text-[13px] font-bold text-white shadow-[var(--shadow-red)] transition-all hover:bg-tracoli-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {locale === "fr" ? "Continuer" : "Continue"}
              <ArrowRight className="size-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={!canProceed() || submitting}
              className="inline-flex min-h-[52px] items-center gap-2 rounded-xl bg-tracoli-500 px-5 py-3 text-[13px] font-bold text-white shadow-[var(--shadow-red)] transition-all hover:bg-tracoli-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  {locale === "fr" ? "Envoi..." : "Sending..."}
                </>
              ) : (
                <>
                  {locale === "fr"
                    ? "Demander une cotation Sourcing"
                    : "Request a sourcing quote"}
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
/*  Shell — Conteneur de section                                       */
/* ------------------------------------------------------------------ */

function Shell({
  children,
  id,
  variant,
  locale,
}: {
  children: ReactNode;
  id: string;
  variant: "alt" | "base";
  locale: "fr" | "en";
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 py-12 pb-24 lg:scroll-mt-24 lg:py-20 lg:pb-20 ${
        variant === "alt" ? "bg-ink-50" : "bg-white"
      }`}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center lg:mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-white px-3.5 py-1.5 text-[11px] font-bold tracking-wide text-tracoli-600 uppercase">
            {locale === "fr" ? "Formulaire de sourcing" : "Sourcing form"}
          </span>
          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-3xl lg:text-4xl">
            {locale === "fr"
              ? "Faites sourcer votre produit en 3 étapes"
              : "Source your product in 3 steps"}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[13.5px] text-ink-500 lg:text-[14.5px]">
            {locale === "fr"
              ? "Décrivez votre besoin. Nous identifions le fournisseur, négocions le prix et gérons l'expédition."
              : "Describe your need. We identify the supplier, negotiate the price and manage shipment."}
          </p>
        </div>
        {children}
      </div>
    </section>
  );
}