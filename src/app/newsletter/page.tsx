"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: dbError } = await supabase
      .from("email_captures")
      .insert({ email, source: "newsletter" });

    if (dbError) {
      if (dbError.code === "23505") {
        setError("Cet email est déjà inscrit.");
      } else {
        setError("Une erreur est survenue. Réessayez.");
      }
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white via-tracoli-50/30 to-white px-4">
      <div className="w-full max-w-md text-center">
        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-100">
              <CheckCircle className="size-8 text-emerald-600" />
            </div>
            <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-ink-900">
              Inscription confirmée !
            </h1>
            <p className="mt-3 text-sm text-ink-500">
              Vous recevrez nos conseils import et les offres de groupage directement dans votre boîte mail.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-tracoli-500 shadow-lg">
              <Sparkles className="size-6 text-white" />
            </div>
            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
              Restez informé
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-ink-500">
              Recevez nos conseils pour importer depuis la Chine, les offres de groupage
              et les actualités de TRACOLI Business.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-3">
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="relative">
                <Mail className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-ink-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email"
                  className="w-full rounded-2xl border-2 border-ink-200 bg-white py-3.5 pr-4 pl-11 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-2 focus:ring-tracoli-500/20 focus:outline-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-tracoli-500 py-3.5 text-sm font-bold text-white shadow-[var(--shadow-red)] transition-all hover:bg-tracoli-600 hover:shadow-lg disabled:opacity-60"
              >
                {loading ? "Inscription…" : "S'inscrire à la newsletter"}
              </motion.button>

              <p className="text-xs text-ink-400">
                Pas de spam. Désinscription possible à tout moment.
              </p>
            </form>
          </motion.div>
        )}
      </div>
    </main>
  );
}
