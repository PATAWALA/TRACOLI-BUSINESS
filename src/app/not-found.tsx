"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white via-tracoli-50/20 to-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md text-center"
      >
        <p className="text-8xl font-extrabold tracking-tight text-tracoli-500">
          404
        </p>
        <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-ink-900">
          Page introuvable
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-500">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl bg-tracoli-500 px-6 py-3.5 text-sm font-bold text-white shadow-[var(--shadow-red)] transition-all hover:bg-tracoli-600 hover:shadow-lg"
          >
            <Home className="size-4" />
            Retour à l&apos;accueil
          </Link>
          <button
            onClick={() => history.back()}
            className="inline-flex items-center gap-2 rounded-2xl border-2 border-ink-200 bg-white px-6 py-3.5 text-sm font-bold text-ink-700 transition-all hover:border-ink-300 hover:shadow-md"
          >
            <ArrowLeft className="size-4" />
            Page précédente
          </button>
        </div>
      </motion.div>
    </main>
  );
}
