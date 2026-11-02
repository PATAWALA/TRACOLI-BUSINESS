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
    await supabase
      .from("email_captures")
      .insert({ email: nlEmail, source: "demande_page" });
    setNlDone(true);
    setNlLoading(false);
  }

  if (result) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white via-tracoli-50/30 to-white px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md text-center"
        >
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-100">
            <CheckCircle className="size-8 text-emerald-600" />
          </div>
          <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-ink-900">
            Demande envoyée !
          </h1>
          <p className="mt-3 text-sm text-ink-500">Votre référence est :</p>
          <div className="mx-auto mt-3 inline-block rounded-2xl border-2 border-tracoli-200 bg-tracoli-50 px-8 py-4">
            <span className="text-2xl font-extrabold tracking-widest text-tracoli-500">
              {result.reference}
            </span>
          </div>
          <p className="mt-6 text-sm text-ink-500">
            Notre équipe vous contactera sous 24h. Vous pouvez aussi nous
            écrire directement :
          </p>
          <a
            href={waLink(
              `Bonjour, j'ai soumis une demande (${result.reference}). Je souhaite avoir plus d'informations.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-emerald-700"
          >
            <FaWhatsapp className="size-5" />
            Contacter sur WhatsApp
          </a>
          <div className="mt-6">
            <Link
              href="/"
              className="text-sm font-semibold text-tracoli-500 hover:underline"
            >
              Visiter notre site &rarr;
            </Link>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-ink-50/40 to-white">
      {/* Header logo only */}
      <div className="flex items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-lg border border-ink-200 bg-white shadow-sm">
            <Image
              src="/logo.jpg"
              alt="TRACOLI"
              width={72}
              height={72}
              className="size-full object-cover"
            />
          </span>
          <span className="text-[13px] font-extrabold tracking-tight text-tracoli-500">
            TRACOLI
          </span>
        </Link>
        <Link
          href="/"
          className="text-xs font-semibold text-ink-500 hover:text-ink-700"
        >
          Voir le site
        </Link>
      </div>

      {/* Form section */}
      <div className="mx-auto max-w-lg px-5 pb-6 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-white/80 px-4 py-2 text-xs font-bold tracking-wider text-tracoli-500 uppercase backdrop-blur-sm">
            <Send className="size-3.5" />
            Commande
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            Passez votre commande
          </h1>
          <p className="mt-2 text-sm text-ink-500">
            Décrivez votre besoin, on s&apos;occupe du reste. Seuls le nom et
            le WhatsApp sont obligatoires.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="mt-8 space-y-4"
        >
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Nom * */}
          <div>
            <label className="flex items-center gap-2 text-xs font-bold tracking-wider text-ink-500 uppercase">
              <User className="size-3.5" /> Nom complet *
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1.5 w-full rounded-xl border-2 border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-2 focus:ring-tracoli-500/20 focus:outline-none"
              placeholder="Ex: Jean Ndayisaba"
            />
          </div>

          {/* WhatsApp * */}
          <div>
            <label className="flex items-center gap-2 text-xs font-bold tracking-wider text-ink-500 uppercase">
              <Phone className="size-3.5" /> WhatsApp *
            </label>
            <input
              type="tel"
              required
              value={form.whatsapp}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              className="mt-1.5 w-full rounded-xl border-2 border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-2 focus:ring-tracoli-500/20 focus:outline-none"
              placeholder="+257 69 XX XX XX"
            />
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center gap-2 text-xs font-bold tracking-wider text-ink-500 uppercase">
              <Mail className="size-3.5" /> Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1.5 w-full rounded-xl border-2 border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-2 focus:ring-tracoli-500/20 focus:outline-none"
              placeholder="votre@email.com"
            />
          </div>

          {/* Produit */}
          <div>
            <label className="flex items-center gap-2 text-xs font-bold tracking-wider text-ink-500 uppercase">
              <Package className="size-3.5" /> Produit recherché
            </label>
            <input
              type="text"
              value={form.productName}
              onChange={(e) =>
                setForm({ ...form, productName: e.target.value })
              }
              className="mt-1.5 w-full rounded-xl border-2 border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-2 focus:ring-tracoli-500/20 focus:outline-none"
              placeholder="Ex: Chaussures, Électronique, Textile…"
            />
          </div>

          {/* Lien produit */}
          <div>
            <label className="flex items-center gap-2 text-xs font-bold tracking-wider text-ink-500 uppercase">
              <LinkIcon className="size-3.5" /> Lien du produit
            </label>
            <input
              type="url"
              value={form.productUrl}
              onChange={(e) =>
                setForm({ ...form, productUrl: e.target.value })
              }
              className="mt-1.5 w-full rounded-xl border-2 border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-2 focus:ring-tracoli-500/20 focus:outline-none"
              placeholder="https://..."
            />
          </div>

          {/* Destination */}
          <div>
            <label className="flex items-center gap-2 text-xs font-bold tracking-wider text-ink-500 uppercase">
              <MapPin className="size-3.5" /> Ville de destination
            </label>
            <input
              type="text"
              value={form.destinationCity}
              onChange={(e) =>
                setForm({ ...form, destinationCity: e.target.value })
              }
              className="mt-1.5 w-full rounded-xl border-2 border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-2 focus:ring-tracoli-500/20 focus:outline-none"
              placeholder="Ex: Bujumbura, Kinshasa, Goma…"
            />
          </div>

          {/* Photos multiples */}
          <div>
            <label className="flex items-center gap-2 text-xs font-bold tracking-wider text-ink-500 uppercase">
              <Upload className="size-3.5" /> Photos du produit
            </label>
            {files.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {files.map((fp, i) => (
                  <div key={i} className="group relative">
                    <img
                      src={fp.url}
                      alt={`Photo ${i + 1}`}
                      className="size-20 rounded-xl border-2 border-ink-200 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      className="absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-ink-200 bg-white px-4 py-5 text-sm text-ink-500 transition-all hover:border-tracoli-300 hover:bg-tracoli-50/30"
            >
              <Upload className="size-4" />
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
          <div>
            <label className="flex items-center gap-2 text-xs font-bold tracking-wider text-ink-500 uppercase">
              <MessageSquare className="size-3.5" /> Message
            </label>
            <textarea
              rows={3}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-1.5 w-full rounded-xl border-2 border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-2 focus:ring-tracoli-500/20 focus:outline-none"
              placeholder="Quantité souhaitée, précisions, questions…"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-tracoli-500 py-4 text-sm font-bold text-white shadow-[var(--shadow-red)] transition-all hover:bg-tracoli-600 hover:shadow-lg disabled:opacity-60"
          >
            {loading ? "Envoi en cours…" : "Envoyer ma commande"}
          </motion.button>

          <p className="text-center text-xs text-ink-400">
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

      {/* Newsletter section */}
      <section className="border-t border-ink-200 bg-gradient-to-b from-ink-50 to-white px-5 py-14">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-tracoli-500 shadow-lg">
            <Sparkles className="size-5 text-white" />
          </div>
          <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-ink-500">
            <Users className="size-3.5" />
            Rejoignez les 500+ abonnés
          </div>
          <h2 className="mt-2 text-xl font-extrabold tracking-tight text-ink-900">
            Recevez les meilleures opportunités
          </h2>
          <p className="mt-2 text-sm text-ink-500">
            Inscrivez-vous gratuitement pour recevoir les offres de groupage, les
            bons plans fournisseurs et les conseils import/export.
          </p>

          {nlDone ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-700"
            >
              <CheckCircle className="size-4" />
              Inscription confirmée !
            </motion.div>
          ) : (
            <form
              onSubmit={handleNewsletter}
              className="mt-5 flex flex-col gap-2 sm:flex-row"
            >
              <div className="relative flex-1">
                <Mail className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-ink-400" />
                <input
                  type="email"
                  required
                  value={nlEmail}
                  onChange={(e) => setNlEmail(e.target.value)}
                  placeholder="Votre adresse email"
                  className="w-full rounded-xl border-2 border-ink-200 bg-white py-3 pr-4 pl-10 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-2 focus:ring-tracoli-500/20 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={nlLoading}
                className="rounded-xl bg-tracoli-500 px-5 py-3 text-sm font-bold text-white shadow-[var(--shadow-red)] transition-all hover:bg-tracoli-600 disabled:opacity-60"
              >
                {nlLoading ? "…" : "S'inscrire"}
              </button>
            </form>
          )}
          <p className="mt-3 text-[11px] text-ink-400">
            Gratuit. Pas de spam. Désinscription en un clic.
          </p>
        </div>
      </section>

      {/* Link to main site */}
      <div className="border-t border-ink-100 px-5 py-8 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-tracoli-500 transition-colors hover:text-tracoli-600"
        >
          Découvrir TRACOLI Business
          <ArrowRight className="size-4" />
        </Link>
        <p className="mt-2 text-xs text-ink-400">
          &copy; {new Date().getFullYear()} TRACOLI Business — Tous droits
          réservés.
        </p>
      </div>
    </main>
  );
}
