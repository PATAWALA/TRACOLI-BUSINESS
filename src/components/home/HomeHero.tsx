"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, Plane } from "lucide-react";
import { IDENTITY } from "@/data/config/identity";
import { STATS } from "@/data/home/proof";
import { useLocale } from "@/hooks/useLocale";

export default function HomeHero() {
  const { locale } = useLocale();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-ink-50 to-white pt-20 pb-12 sm:pt-24 lg:pt-32 lg:pb-20">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.3]" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-tracoli-500/8 blur-[100px] sm:h-80 sm:w-80 lg:h-[420px] lg:w-[420px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Texte */}
          <div className="text-center lg:text-left">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-white px-3 py-1.5 text-[10.5px] font-bold tracking-wide text-tracoli-600 uppercase shadow-sm sm:text-[11px]"
            >
              <span className="size-1.5 rounded-full bg-tracoli-500" />
              {IDENTITY.positioning[locale]}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mt-5 text-[1.75rem] leading-[1.1] font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl lg:text-5xl"
            >
              Votre sourcing <span className="text-tracoli-500">Chine → Afrique</span>,
              simplement.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-ink-500 sm:text-[15.5px] lg:mx-0 lg:text-base"
            >
              Nous trouvons vos fournisseurs, sécurisons vos achats et organisons
              votre livraison jusqu&apos;à destination.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:justify-center lg:justify-start"
            >
              <Link
                href="/sourcer"
                className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-tracoli-500 px-6 py-3.5 text-[14px] font-bold text-white shadow-[var(--shadow-red)] transition-all hover:bg-tracoli-600 active:scale-[0.98]"
              >
                <Search className="size-4" />
                {locale === "fr" ? "Trouver un produit" : "Find a product"}
              </Link>
              <Link
                href="/expedier"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-ink-200 bg-white px-6 py-3.5 text-[14px] font-bold text-ink-800 transition-all hover:border-ink-300 active:scale-[0.98]"
              >
                <Plane className="size-4 text-tracoli-500" />
                {locale === "fr" ? "Estimer mon fret" : "Estimate my freight"}
              </Link>
            </motion.div>

            {/* Mini stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="mt-8 grid grid-cols-3 gap-3 border-t border-ink-200 pt-6 lg:max-w-md"
            >
              {STATS.slice(0, 3).map((s) => (
                <div key={s.label.fr} className="text-center lg:text-left">
                  <p className="text-lg font-extrabold tracking-tight text-tracoli-500 sm:text-xl">
                    {s.value}
                  </p>
                  <p className="mt-0.5 text-[10px] leading-tight font-semibold text-ink-600 sm:text-[11px]">
                    {s.label[locale]}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Visuel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-ink-200 shadow-card-lg sm:aspect-[4/3] lg:aspect-[4/5]">
              <Image
                src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=900&h=1100&fit=crop&q=80"
                alt="Fret international Chine–Afrique"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-transparent" />

              <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/20 bg-white/95 p-3.5 shadow-card backdrop-blur-sm">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[9.5px] font-bold tracking-wide text-ink-500 uppercase">
                      Guangzhou → Kinshasa
                    </p>
                    <p className="text-[12.5px] font-extrabold text-ink-900">
                      CTN-2041 · En transit
                    </p>
                  </div>
                  <span className="relative flex size-2 shrink-0">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}