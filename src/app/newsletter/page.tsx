"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  CheckCircle,
  ArrowRight,
  Package,
  TrendingDown,
  Users,
  ShieldCheck,
} from "lucide-react";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source: "newsletter_page" }),
    });

    if (res.status === 409) {
      setError("Cet email est déjà inscrit.");
      setLoading(false);
      return;
    }

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Une erreur est survenue. Réessayez.");
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

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
      <div className="mx-auto max-w-2xl px-5 pt-12 pb-6 text-center sm:px-8 lg:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-white/80 px-4 py-2 text-sm font-bold tracking-wider text-tracoli-500 uppercase backdrop-blur-sm">
            <Mail className="size-4" />
            Newsletter gratuite
          </span>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-5xl">
            Les bons plans import,
            <br />
            <span className="text-tracoli-500">directement dans votre boîte</span>
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-ink-500">
            Rejoignez les entrepreneurs africains qui reçoivent chaque semaine
            nos offres de groupage, nos trouvailles fournisseurs et nos conseils
            pour importer malin depuis la Chine.
          </p>
        </motion.div>
      </div>

      {/* Form card */}
      <div className="mx-auto max-w-lg px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="rounded-3xl border border-ink-200 bg-white p-8 shadow-card-lg sm:p-10"
        >
          {success ? (
            <div className="text-center">
              <div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-100">
                <CheckCircle className="size-8 text-emerald-600" />
              </div>
              <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-ink-900">
                Bienvenue dans la communauté !
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink-500">
                Votre inscription est confirmée. Vous recevrez notre prochaine
                newsletter avec les meilleures offres du moment.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/demande"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-tracoli-500 px-6 py-3.5 text-base font-bold text-white shadow-[var(--shadow-red)] transition-all hover:bg-tracoli-600"
                >
                  Passer commande
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-ink-200 bg-white px-6 py-3.5 text-base font-bold text-ink-700 transition-all hover:bg-ink-50"
                >
                  Découvrir TRACOLI
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center">
                <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-tracoli-500 shadow-lg">
                  <Mail className="size-6 text-white" />
                </div>
                <h2 className="mt-4 text-xl font-extrabold tracking-tight text-ink-900">
                  Inscrivez-vous gratuitement
                </h2>
                <p className="mt-2 text-base text-ink-500">
                  Un email par semaine, zéro spam.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {error}
                  </div>
                )}

                <div className="relative">
                  <Mail className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre adresse email"
                    className="w-full min-h-[56px] rounded-xl border-2 border-ink-200 bg-white py-4 pr-4 pl-12 text-base text-ink-900 transition-all placeholder:text-ink-400 focus:border-tracoli-500 focus:ring-4 focus:ring-tracoli-500/10 focus:outline-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full min-h-[56px] rounded-xl bg-tracoli-500 py-4 text-base font-bold text-white shadow-[var(--shadow-red)] transition-all hover:bg-tracoli-600 hover:shadow-lg disabled:opacity-60"
                >
                  {loading ? "Inscription en cours…" : "S'inscrire gratuitement"}
                </motion.button>

                <p className="text-center text-sm text-ink-400">
                  Gratuit &middot; Pas de spam &middot; Désinscription en un clic
                </p>
              </form>
            </>
          )}
        </motion.div>
      </div>

      {/* Benefits */}
      <div className="mx-auto max-w-3xl px-5 pt-16 pb-10 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-center text-xs font-bold tracking-widest text-ink-400 uppercase">
            Ce que vous recevrez
          </h3>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Package,
                title: "Offres groupage",
                desc: "Les prochains conteneurs avec places disponibles.",
                color: "bg-blue-50 text-blue-600",
              },
              {
                icon: TrendingDown,
                title: "Prix négociés",
                desc: "Nos meilleurs tarifs fournisseurs de la semaine.",
                color: "bg-emerald-50 text-emerald-600",
              },
              {
                icon: Users,
                title: "Retours clients",
                desc: "Success stories d'importateurs comme vous.",
                color: "bg-amber-50 text-amber-600",
              },
              {
                icon: ShieldCheck,
                title: "Conseils import",
                desc: "Douanes, réglementations, astuces logistiques.",
                color: "bg-purple-50 text-purple-600",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-ink-200 bg-white p-6 text-center shadow-sm"
              >
                <div
                  className={`mx-auto grid size-12 place-items-center rounded-xl ${item.color}`}
                >
                  <item.icon className="size-5" />
                </div>
                <p className="mt-4 text-base font-bold text-ink-800">
                  {item.title}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
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
