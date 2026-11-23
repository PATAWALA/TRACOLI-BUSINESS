"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, CheckCircle, ArrowRight, Check } from "lucide-react";

const BENEFITS = [
  {
    title: "Offres groupage",
    desc: "Les prochains conteneurs avec places disponibles.",
  },
  {
    title: "Prix négociés",
    desc: "Nos meilleurs tarifs fournisseurs de la semaine.",
  },
  {
    title: "Retours clients",
    desc: "Success stories d'importateurs comme vous.",
  },
  {
    title: "Conseils import",
    desc: "Douanes, réglementations, astuces logistiques.",
  },
];

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
    <main className="pt-header bg-white">
      <section className="py-12 pb-28 sm:py-16 lg:py-24 lg:pb-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-20 lg:px-8">
          <div>
            <h1 className="text-4xl leading-[1.08] font-extrabold tracking-tight text-ink-900 text-balance sm:text-5xl lg:text-6xl">
              Les bons plans import,{" "}
              <span className="text-tracoli-500">
                directement dans votre boîte
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-700 lg:text-lg">
              Rejoignez les entrepreneurs africains qui reçoivent chaque semaine
              nos offres de groupage, nos trouvailles fournisseurs et nos
              conseils pour importer malin depuis la Chine.
            </p>

            <ul className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {BENEFITS.map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <Check
                    className="mt-0.5 size-5 shrink-0 text-tracoli-500"
                    strokeWidth={3}
                    aria-hidden
                  />
                  <div>
                    <p className="text-base font-bold text-ink-900">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-[15px] leading-relaxed text-ink-700">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-ink-200 bg-white p-6 sm:p-10">
            {success ? (
              <div className="text-center" role="status">
                <CheckCircle
                  className="mx-auto size-14 text-emerald-600"
                  aria-hidden
                />
                <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-ink-900">
                  Bienvenue dans la communauté !
                </h2>
                <p className="mt-3 text-base leading-relaxed text-ink-700">
                  Votre inscription est confirmée. Vous recevrez notre prochaine
                  newsletter avec les meilleures offres du moment.
                </p>
                <div className="mt-8 flex flex-col gap-3">
                  <Link
                    href="/demande"
                    className="inline-flex min-h-[56px] items-center justify-center gap-2.5 rounded-2xl bg-tracoli-500 px-8 py-4 text-[15px] font-bold text-white shadow-[var(--shadow-red)] transition-colors hover:bg-tracoli-600 active:scale-[0.98]"
                  >
                    Passer commande
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex min-h-[56px] items-center justify-center rounded-2xl border-2 border-ink-200 bg-white px-8 py-4 text-[15px] font-bold text-ink-800 transition-colors hover:border-tracoli-300 active:scale-[0.98]"
                  >
                    Découvrir TRACOLI
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-extrabold tracking-tight text-ink-900">
                  Inscrivez-vous gratuitement
                </h2>
                <p className="mt-2 text-base text-ink-700">
                  Un email par semaine, zéro spam.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  {error && (
                    <div
                      role="alert"
                      className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                    >
                      {error}
                    </div>
                  )}

                  <div className="relative">
                    <label htmlFor="newsletter-email" className="sr-only">
                      Votre adresse email
                    </label>
                    <Mail
                      className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink-500"
                      aria-hidden
                    />
                    <input
                      id="newsletter-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Votre adresse email"
                      className="min-h-[56px] w-full rounded-2xl border-2 border-ink-200 bg-white py-4 pr-4 pl-12 text-base text-ink-900 transition-colors placeholder:text-ink-500 focus:border-tracoli-500 focus:ring-4 focus:ring-tracoli-500/10 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="min-h-[56px] w-full rounded-2xl bg-tracoli-500 px-8 py-4 text-[15px] font-bold text-white shadow-[var(--shadow-red)] transition-colors hover:bg-tracoli-600 active:scale-[0.98] disabled:opacity-60"
                  >
                    {loading ? "Inscription en cours…" : "S'inscrire gratuitement"}
                  </button>

                  <p className="text-center text-sm text-ink-700">
                    Gratuit &middot; Pas de spam &middot; Désinscription en un
                    clic
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
