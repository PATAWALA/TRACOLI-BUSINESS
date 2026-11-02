"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Users, CheckCircle, Loader2 } from "lucide-react";

export default function HomeAboutCTA() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setError("");
    setLoading(true);

    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source: "homepage" }),
    });

    if (res.status === 409) {
      setDone(true);
    } else if (res.ok) {
      setDone(true);
    } else {
      setError("Une erreur est survenue. Réessayez.");
    }
    setLoading(false);
  }

  return (
    <section className="border-t border-tracoli-100/50 bg-gradient-to-b from-tracoli-50 via-tracoli-100/30 to-tracoli-50 py-20 pb-28 lg:py-32 lg:pb-24">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-white/80 px-4 py-2 text-xs font-bold tracking-wider text-tracoli-500 uppercase shadow-sm backdrop-blur-sm">
            <Users className="size-3.5" />
            Qui sommes-nous
          </span>

          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl lg:text-5xl">
            TRACOLI Business connecte les entrepreneurs africains aux meilleurs
            fournisseurs d&apos;Asie
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-500 lg:text-lg">
            Nous accompagnons les commerçants et entrepreneurs dans
            leurs opérations de sourcing, d&apos;expédition et de
            coordination douanière sur le corridor Chine–Afrique.
          </p>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-8 inline-block">
            <Link
              href="/a-propos"
              className="group inline-flex items-center gap-2.5 rounded-2xl border-2 border-tracoli-200 bg-white/80 px-7 py-4 text-sm font-bold text-tracoli-600 backdrop-blur-sm transition-all duration-300 hover:border-tracoli-400 hover:shadow-md"
            >
              Découvrir notre histoire
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mt-16 max-w-md"
        >
          <p className="text-sm font-bold text-ink-700">
            Recevez nos conseils import &amp; les offres de groupage
          </p>

          {done ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 inline-flex items-center gap-2.5 rounded-2xl bg-emerald-50 px-6 py-4 text-sm font-bold text-emerald-700"
            >
              <CheckCircle className="size-5" />
              Inscription confirmée !
            </motion.div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="mt-4 flex gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-ink-400" />
                  <input
                    type="email"
                    required
                    placeholder="Votre email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl border-2 border-ink-200 bg-white py-3.5 pr-4 pl-11 text-sm text-ink-900 placeholder:text-ink-400 transition-all duration-300 focus:border-tracoli-500 focus:ring-2 focus:ring-tracoli-500/20 focus:outline-none"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={loading}
                  className="shrink-0 rounded-2xl bg-tracoli-500 px-6 py-3.5 text-sm font-bold text-white shadow-[var(--shadow-red)] transition-all duration-300 hover:bg-tracoli-600 hover:shadow-lg disabled:opacity-60"
                >
                  {loading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    "S'inscrire"
                  )}
                </motion.button>
              </form>
              {error && (
                <p className="mt-2 text-sm font-medium text-red-600">
                  {error}
                </p>
              )}
              <p className="mt-3 text-xs text-ink-400">
                Gratuit &middot; Pas de spam &middot; Désinscription en un clic
              </p>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
