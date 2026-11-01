"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Upload,
  CheckCircle,
  User,
  Phone,
  Mail,
  MessageSquare,
  Package,
  X,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { supabase } from "@/lib/supabase/client";
import { CONTACT } from "@/data/config/contact";
import { waLink } from "@/data/shared/helpers";

export default function DemandePage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    productType: "",
    message: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ reference: string } | null>(null);
  const [error, setError] = useState("");

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    if (f.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(f));
    }
  }

  function removeFile() {
    setFile(null);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    let imageUrl: string | undefined;

    if (file) {
      const ext = file.name.split(".").pop();
      const path = `leads/${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("files")
        .upload(path, file);

      if (!uploadError) {
        const { data: urlData } = supabase.storage
          .from("files")
          .getPublicUrl(path);
        imageUrl = urlData.publicUrl;
      }
    }

    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        imageUrl,
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

  if (result) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white via-tracoli-50/30 to-white px-4 pt-20 pb-28">
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
          <p className="mt-3 text-sm text-ink-500">
            Votre référence est :
          </p>
          <div className="mx-auto mt-3 inline-block rounded-2xl border-2 border-tracoli-200 bg-tracoli-50 px-8 py-4">
            <span className="text-2xl font-extrabold tracking-widest text-tracoli-500">
              {result.reference}
            </span>
          </div>
          <p className="mt-6 text-sm text-ink-500">
            Notre équipe vous contactera sous 24h. Vous pouvez aussi nous écrire directement :
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
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-tracoli-50/20 to-white px-4 pt-24 pb-28">
      <div className="mx-auto max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-white/80 px-4 py-2 text-xs font-bold tracking-wider text-tracoli-500 uppercase backdrop-blur-sm">
            <Send className="size-3.5" />
            Demande de cotation
          </span>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            Envoyez votre projet
          </h1>
          <p className="mt-3 text-sm text-ink-500">
            Décrivez votre besoin et recevez une cotation sous 24h.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="mt-10 space-y-5"
        >
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div>
            <label className="flex items-center gap-2 text-xs font-bold tracking-wider text-ink-500 uppercase">
              <User className="size-3.5" /> Nom complet *
            </label>
            <input
              type="text"
              required
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="mt-1.5 w-full rounded-xl border-2 border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-2 focus:ring-tracoli-500/20 focus:outline-none"
              placeholder="Ex: Jean Ndayisaba"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-bold tracking-wider text-ink-500 uppercase">
              <Phone className="size-3.5" /> Téléphone (WhatsApp) *
            </label>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="mt-1.5 w-full rounded-xl border-2 border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-2 focus:ring-tracoli-500/20 focus:outline-none"
              placeholder="+257 69 XX XX XX"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-bold tracking-wider text-ink-500 uppercase">
              <Mail className="size-3.5" /> Email (optionnel)
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1.5 w-full rounded-xl border-2 border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-2 focus:ring-tracoli-500/20 focus:outline-none"
              placeholder="votre@email.com"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-bold tracking-wider text-ink-500 uppercase">
              <Package className="size-3.5" /> Type de produit
            </label>
            <input
              type="text"
              value={form.productType}
              onChange={(e) => setForm({ ...form, productType: e.target.value })}
              className="mt-1.5 w-full rounded-xl border-2 border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-2 focus:ring-tracoli-500/20 focus:outline-none"
              placeholder="Ex: Chaussures, Électronique, Textile…"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-bold tracking-wider text-ink-500 uppercase">
              <MessageSquare className="size-3.5" /> Votre message *
            </label>
            <textarea
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-1.5 w-full rounded-xl border-2 border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-2 focus:ring-tracoli-500/20 focus:outline-none"
              placeholder="Décrivez le produit, la quantité souhaitée, la destination…"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-bold tracking-wider text-ink-500 uppercase">
              <Upload className="size-3.5" /> Photo du produit (optionnel)
            </label>
            {file ? (
              <div className="mt-1.5 flex items-center gap-3 rounded-xl border-2 border-tracoli-200 bg-tracoli-50/50 px-4 py-3">
                {preview && (
                  <img
                    src={preview}
                    alt="Aperçu"
                    className="size-12 rounded-lg object-cover"
                  />
                )}
                <span className="flex-1 truncate text-sm text-ink-700">{file.name}</span>
                <button type="button" onClick={removeFile}>
                  <X className="size-4 text-ink-400 hover:text-red-500" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="mt-1.5 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-ink-200 bg-white px-4 py-6 text-sm text-ink-500 transition-all hover:border-tracoli-300 hover:bg-tracoli-50/30"
              >
                <Upload className="size-4" />
                Cliquez pour ajouter une image
              </button>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-tracoli-500 py-4 text-sm font-bold text-white shadow-[var(--shadow-red)] transition-all hover:bg-tracoli-600 hover:shadow-lg disabled:opacity-60"
          >
            {loading ? "Envoi en cours…" : "Envoyer ma demande"}
          </motion.button>

          <p className="text-center text-xs text-ink-400">
            Ou contactez-nous directement sur{" "}
            <a
              href={waLink(`Bonjour ${CONTACT.manager}, j'ai un projet à vous soumettre.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-emerald-600 hover:underline"
            >
              WhatsApp
            </a>
          </p>
        </motion.form>
      </div>
    </main>
  );
}
