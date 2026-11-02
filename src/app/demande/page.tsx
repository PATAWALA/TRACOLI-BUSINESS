"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Send,
  Upload,
  CheckCircle,
  User,
  Phone,
  Mail,
  Package,
  MapPin,
  Link as LinkIcon,
  X,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Users,
  Copy,
  Check,
  ShieldCheck,
  Zap,
  Globe,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { supabase } from "@/lib/supabase/client";
import { CONTACT } from "@/data/config/contact";
import { waLink } from "@/data/shared/helpers";

interface FilePreview {
  file: File;
  url: string;
}

export default function DemandePage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    name: "",
    whatsapp: "",
    email: "",
    productName: "",
    productUrl: "",
    destinationCity: "",
    message: "",
  });
  const [files, setFiles] = useState<FilePreview[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ reference: string } | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const [nlEmail, setNlEmail] = useState("");
  const [nlLoading, setNlLoading] = useState(false);
  const [nlDone, setNlDone] = useState(false);

  function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files;
    if (!selected) return;
    const newFiles: FilePreview[] = [];
    for (let i = 0; i < selected.length; i++) {
      const f = selected[i];
      if (f.type.startsWith("image/")) {
        newFiles.push({ file: f, url: URL.createObjectURL(f) });
      }
    }
    setFiles((prev) => [...prev, ...newFiles]);
    if (fileRef.current) fileRef.current.value = "";
  }

  function removeFile(idx: number) {
    setFiles((prev) => {
      URL.revokeObjectURL(prev[idx].url);
      return prev.filter((_, i) => i !== idx);
    });
  }

  async function copyRef() {
    if (!result) return;
    await navigator.clipboard.writeText(result.reference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const imageUrls: string[] = [];

    for (const fp of files) {
      const ext = fp.file.name.split(".").pop();
      const path = `leads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("files")
        .upload(path, fp.file);

      if (!uploadError) {
        const { data: urlData } = supabase.storage
          .from("files")
          .getPublicUrl(path);
        imageUrls.push(urlData.publicUrl);
      }
    }

    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        whatsapp: form.whatsapp,
        email: form.email || undefined,
        productName: form.productName || undefined,
        productUrl: form.productUrl || undefined,
        destinationCity: form.destinationCity || undefined,
        message: form.message || undefined,
        imageUrls: imageUrls.length > 0 ? imageUrls : undefined,
        source: "site",
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Une erreur est survenue.");
      setLoading(false);
      return;
    }

    setResult({ reference: data.reference });
    setLoading(false);
  }

  async function handleNewsletter(e: React.FormEvent) {
    e.preventDefault();
    setNlLoading(true);
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: nlEmail, source: "demande_page" }),
    });
    if (res.status === 409) {
      setNlDone(true);
    } else if (res.ok) {
      setNlDone(true);
    }
    setNlLoading(false);
  }

  /* ─── Écran de confirmation ─── */
  if (result) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white via-tracoli-50/30 to-white px-5 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg text-center"
        >
          <div className="mx-auto grid size-20 place-items-center rounded-full bg-emerald-100">
            <CheckCircle className="size-10 text-emerald-600" />
          </div>

          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            Commande envoyée !
          </h1>

          <p className="mt-4 text-base leading-relaxed text-ink-600">
            Votre demande a bien été enregistrée. Voici votre code de suivi :
          </p>

          {/* Reference copiable */}
          <div className="mx-auto mt-5 max-w-xs rounded-2xl border-2 border-tracoli-200 bg-tracoli-50 px-6 py-5">
            <p className="text-3xl font-extrabold tracking-[0.15em] text-tracoli-500">
              {result.reference}
            </p>
            <button
              onClick={copyRef}
              className="mt-3 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-ink-700 shadow-sm ring-1 ring-ink-200 transition-all hover:bg-ink-50 active:scale-[0.97]"
            >
              {copied ? (
                <>
                  <Check className="size-4 text-emerald-500" />
                  Copié !
                </>
              ) : (
                <>
                  <Copy className="size-4" />
                  Copier le code
                </>
              )}
            </button>
          </div>

          <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-left">
            <p className="text-sm font-bold text-amber-800">
              Conservez bien ce code !
            </p>
            <p className="mt-1 text-sm leading-relaxed text-amber-700">
              Il vous permet de suivre votre commande en temps réel sur notre page de
              suivi. Notre équipe vous contactera sous 24h via WhatsApp.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href={waLink(
                `Bonjour, j'ai soumis une demande (${result.reference}). Je souhaite avoir plus d'informations.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3.5 text-base font-bold text-white transition-all hover:bg-emerald-700"
            >
              <FaWhatsapp className="size-5" />
              Contacter sur WhatsApp
            </a>
            <Link
              href="/suivre"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-ink-200 bg-white px-6 py-3.5 text-base font-bold text-ink-700 transition-all hover:bg-ink-50"
            >
              Suivre ma commande
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-8">
            <Link
              href="/"
              className="text-base font-semibold text-tracoli-500 hover:underline"
            >
              Visiter notre site &rarr;
            </Link>
          </div>
        </motion.div>
      </main>
    );
  }

  /* ─── Page formulaire ─── */
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-ink-50/40 to-white">
      {/* Mini header */}
      <div className="flex items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-xl border border-ink-200 bg-white shadow-sm">
            <Image
              src="/logo.jpg"
              alt="TRACOLI"
              width={80}
              height={80}
              className="size-full object-cover"
            />
          </span>
          <span className="text-base font-extrabold tracking-tight text-tracoli-500">
            TRACOLI
          </span>
        </Link>
        <Link
          href="/"
          className="text-sm font-semibold text-ink-500 hover:text-ink-700"
        >
          Voir le site &rarr;
        </Link>
      </div>

      {/* Hero */}
      <div className="mx-auto max-w-3xl px-5 pt-6 pb-2 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-white/80 px-4 py-2 text-sm font-bold tracking-wider text-tracoli-500 uppercase backdrop-blur-sm">
            <Send className="size-4" />
            Commande
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl">
            Passez votre commande
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-ink-500">
            Décrivez votre besoin, on s&apos;occupe du reste.
            Seuls le <strong className="text-ink-700">nom</strong> et le{" "}
            <strong className="text-ink-700">WhatsApp</strong> sont obligatoires.
          </p>
        </motion.div>

        {/* Trust badges */}
        <div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {[
            { icon: Zap, text: "Réponse sous 24h" },
            { icon: ShieldCheck, text: "Paiement sécurisé" },
            { icon: Globe, text: "Livraison Afrique" },
          ].map((b) => (
            <span
              key={b.text}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500"
            >
              <b.icon className="size-4 text-tracoli-500" />
              {b.text}
            </span>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="mx-auto max-w-3xl px-5 pb-10 pt-8 sm:px-8">
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-base text-red-700">
              {error}
            </div>
          )}

          {/* Champs obligatoires */}
          <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-xs font-bold tracking-widest text-tracoli-500 uppercase">
              Informations obligatoires
            </p>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-ink-700">
                  <User className="size-4 text-ink-400" /> Nom complet
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-2 w-full rounded-xl border-2 border-ink-200 bg-white px-4 py-3.5 text-base text-ink-900 transition-all focus:border-tracoli-500 focus:ring-2 focus:ring-tracoli-500/20 focus:outline-none"
                  placeholder="Ex: Jean Ndayisaba"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-ink-700">
                  <Phone className="size-4 text-ink-400" /> Numéro WhatsApp
                </label>
                <input
                  type="tel"
                  required
                  value={form.whatsapp}
                  onChange={(e) =>
                    setForm({ ...form, whatsapp: e.target.value })
                  }
                  className="mt-2 w-full rounded-xl border-2 border-ink-200 bg-white px-4 py-3.5 text-base text-ink-900 transition-all focus:border-tracoli-500 focus:ring-2 focus:ring-tracoli-500/20 focus:outline-none"
                  placeholder="+257 69 XX XX XX"
                />
              </div>
            </div>
          </div>

          {/* Champs optionnels */}
          <div className="rounded-2xl border border-dashed border-ink-300 bg-white/60 p-6 sm:p-8">
            <p className="text-xs font-bold tracking-widest text-ink-400 uppercase">
              Informations optionnelles
            </p>
            <p className="mt-1 text-sm text-ink-400">
              Plus vous nous donnez de détails, plus notre devis sera précis.
            </p>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-ink-600">
                  <Mail className="size-4 text-ink-400" /> Email
                  <span className="text-xs font-normal text-ink-400">— optionnel</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="mt-2 w-full rounded-xl border-2 border-ink-200 bg-white px-4 py-3.5 text-base text-ink-900 transition-all focus:border-tracoli-500 focus:ring-2 focus:ring-tracoli-500/20 focus:outline-none"
                  placeholder="votre@email.com"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-ink-600">
                  <Package className="size-4 text-ink-400" /> Produit recherché
                  <span className="text-xs font-normal text-ink-400">— optionnel</span>
                </label>
                <input
                  type="text"
                  value={form.productName}
                  onChange={(e) =>
                    setForm({ ...form, productName: e.target.value })
                  }
                  className="mt-2 w-full rounded-xl border-2 border-ink-200 bg-white px-4 py-3.5 text-base text-ink-900 transition-all focus:border-tracoli-500 focus:ring-2 focus:ring-tracoli-500/20 focus:outline-none"
                  placeholder="Ex: Chaussures, Électronique…"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-ink-600">
                  <LinkIcon className="size-4 text-ink-400" /> Lien du produit
                  <span className="text-xs font-normal text-ink-400">— optionnel</span>
                </label>
                <input
                  type="url"
                  value={form.productUrl}
                  onChange={(e) =>
                    setForm({ ...form, productUrl: e.target.value })
                  }
                  className="mt-2 w-full rounded-xl border-2 border-ink-200 bg-white px-4 py-3.5 text-base text-ink-900 transition-all focus:border-tracoli-500 focus:ring-2 focus:ring-tracoli-500/20 focus:outline-none"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-ink-600">
                  <MapPin className="size-4 text-ink-400" /> Ville de destination
                  <span className="text-xs font-normal text-ink-400">— optionnel</span>
                </label>
                <input
                  type="text"
                  value={form.destinationCity}
                  onChange={(e) =>
                    setForm({ ...form, destinationCity: e.target.value })
                  }
                  className="mt-2 w-full rounded-xl border-2 border-ink-200 bg-white px-4 py-3.5 text-base text-ink-900 transition-all focus:border-tracoli-500 focus:ring-2 focus:ring-tracoli-500/20 focus:outline-none"
                  placeholder="Ex: Bujumbura, Kinshasa, Goma…"
                />
              </div>
            </div>

            {/* Photos multiples */}
            <div className="mt-5">
              <label className="flex items-center gap-2 text-sm font-bold text-ink-600">
                <Upload className="size-4 text-ink-400" /> Photos du produit
                <span className="text-xs font-normal text-ink-400">— optionnel</span>
              </label>
              {files.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-3">
                  {files.map((fp, i) => (
                    <div key={i} className="group relative">
                      <img
                        src={fp.url}
                        alt={`Photo ${i + 1}`}
                        className="size-24 rounded-xl border-2 border-ink-200 object-cover sm:size-28"
                      />
                      <button
                        type="button"
                        onClick={() => removeFile(i)}
                        className="absolute -top-2 -right-2 grid size-6 place-items-center rounded-full bg-red-500 text-white shadow-sm transition-opacity sm:opacity-0 sm:group-hover:opacity-100"
                      >
                        <X className="size-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-ink-300 bg-white px-4 py-6 text-base text-ink-500 transition-all hover:border-tracoli-400 hover:bg-tracoli-50/30"
              >
                <Upload className="size-5" />
                {files.length > 0
                  ? "Ajouter d'autres photos"
                  : "Cliquez pour ajouter des photos"}
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFiles}
                className="hidden"
              />
            </div>

            {/* Message */}
            <div className="mt-5">
              <label className="flex items-center gap-2 text-sm font-bold text-ink-600">
                <MessageSquare className="size-4 text-ink-400" /> Message
                <span className="text-xs font-normal text-ink-400">— optionnel</span>
              </label>
              <textarea
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-2 w-full rounded-xl border-2 border-ink-200 bg-white px-4 py-3.5 text-base text-ink-900 transition-all focus:border-tracoli-500 focus:ring-2 focus:ring-tracoli-500/20 focus:outline-none"
                placeholder="Quantité souhaitée, précisions, questions…"
              />
            </div>
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-tracoli-500 py-5 text-lg font-bold text-white shadow-[var(--shadow-red)] transition-all hover:bg-tracoli-600 hover:shadow-lg disabled:opacity-60"
          >
            {loading ? "Envoi en cours…" : "Envoyer ma commande"}
          </motion.button>

          <p className="text-center text-base text-ink-400">
            Ou contactez-nous directement sur{" "}
            <a
              href={waLink(
                `Bonjour ${CONTACT.manager}, j'ai un projet à vous soumettre.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-emerald-600 hover:underline"
            >
              WhatsApp
            </a>
          </p>
        </motion.form>
      </div>

      {/* ─── Newsletter section ─── */}
      <section className="border-t border-ink-200 bg-gradient-to-b from-ink-50 to-white px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-tracoli-500 shadow-lg">
            <Sparkles className="size-6 text-white" />
          </div>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-bold text-emerald-700">
            <Users className="size-4" />
            Rejoignez les 500+ abonnés
          </div>
          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
            Recevez les meilleures opportunités
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink-500">
            Inscrivez-vous gratuitement pour recevoir les offres de groupage, les
            bons plans fournisseurs et les conseils import/export.
          </p>

          {nlDone ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-emerald-50 px-6 py-4 text-base font-semibold text-emerald-700"
            >
              <CheckCircle className="size-5" />
              Inscription confirmée !
            </motion.div>
          ) : (
            <form
              onSubmit={handleNewsletter}
              className="mt-6 flex flex-col gap-3 sm:flex-row"
            >
              <div className="relative flex-1">
                <Mail className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink-400" />
                <input
                  type="email"
                  required
                  value={nlEmail}
                  onChange={(e) => setNlEmail(e.target.value)}
                  placeholder="Votre adresse email"
                  className="w-full rounded-xl border-2 border-ink-200 bg-white py-3.5 pr-4 pl-12 text-base text-ink-900 transition-all focus:border-tracoli-500 focus:ring-2 focus:ring-tracoli-500/20 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={nlLoading}
                className="rounded-xl bg-tracoli-500 px-6 py-3.5 text-base font-bold text-white shadow-[var(--shadow-red)] transition-all hover:bg-tracoli-600 disabled:opacity-60"
              >
                {nlLoading ? "…" : "S'inscrire gratuitement"}
              </button>
            </form>
          )}
          <p className="mt-3 text-sm text-ink-400">
            Gratuit. Pas de spam. Désinscription en un clic.
          </p>
        </div>
      </section>

      {/* Footer link */}
      <div className="border-t border-ink-100 px-5 py-10 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-base font-semibold text-tracoli-500 transition-colors hover:text-tracoli-600"
        >
          Découvrir TRACOLI Business
          <ArrowRight className="size-5" />
        </Link>
        <p className="mt-3 text-sm text-ink-400">
          &copy; {new Date().getFullYear()} TRACOLI Business — Tous droits
          réservés.
        </p>
      </div>
    </main>
  );
}
