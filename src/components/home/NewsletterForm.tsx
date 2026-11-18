"use client";

import { useState } from "react";
import { Mail, CheckCircle, Loader2 } from "lucide-react";

export default function NewsletterForm() {
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

    if (res.status === 409 || res.ok) {
      setDone(true);
    } else {
      setError("Une erreur est survenue. Réessayez.");
    }
    setLoading(false);
  }

  if (done) {
    return (
      <div className="mt-4 inline-flex items-center gap-2.5 rounded-2xl bg-emerald-50 px-6 py-4 text-sm font-bold text-emerald-700">
        <CheckCircle className="size-5" />
        Inscription confirmée !
      </div>
    );
  }

  return (
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
        <button
          type="submit"
          disabled={loading}
          className="shrink-0 rounded-2xl bg-tracoli-500 px-6 py-3.5 text-sm font-bold text-white shadow-[var(--shadow-red)] transition-all duration-300 hover:bg-tracoli-600 hover:shadow-lg active:scale-[0.97] disabled:opacity-60"
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : "S'inscrire"}
        </button>
      </form>
      {error && <p className="mt-2 text-sm font-medium text-red-600">{error}</p>}
      <p className="mt-3 text-xs text-ink-400">
        Gratuit &middot; Pas de spam &middot; Désinscription en un clic
      </p>
    </>
  );
}
