"use client";

import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="pt-header bg-white">
      <section className="mx-auto flex min-h-[70vh] max-w-xl flex-col justify-center px-4 py-16 text-center sm:px-6">
        <p className="text-7xl font-extrabold tracking-tight text-tracoli-500 sm:text-8xl">
          404
        </p>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
          Page introuvable
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-ink-700">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
          Retrouvez ce que vous cherchez depuis l&apos;accueil.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex min-h-[56px] items-center justify-center gap-2.5 rounded-2xl bg-tracoli-500 px-8 py-4 text-[15px] font-bold text-white shadow-[var(--shadow-red)] transition-colors hover:bg-tracoli-600 active:scale-[0.98]"
          >
            <Home className="size-[18px]" aria-hidden />
            Retour à l&apos;accueil
          </Link>
          <button
            type="button"
            onClick={() => history.back()}
            className="inline-flex min-h-[56px] items-center justify-center gap-2.5 rounded-2xl border-2 border-ink-200 bg-white px-8 py-4 text-[15px] font-bold text-ink-800 transition-colors hover:border-tracoli-300 active:scale-[0.98]"
          >
            <ArrowLeft className="size-[18px]" aria-hidden />
            Page précédente
          </button>
        </div>
      </section>
    </main>
  );
}
