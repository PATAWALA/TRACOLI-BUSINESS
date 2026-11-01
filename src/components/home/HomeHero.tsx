"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, MapPin } from "lucide-react";
import { IDENTITY } from "@/data/config/identity";

export default function HomeHero() {
  return (
    <section className="bg-gradient-to-b from-white via-tracoli-50/30 to-white pt-24 pb-16 sm:pt-28 lg:pt-36 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="text-center lg:text-left">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-white/80 px-4 py-2 text-xs font-bold tracking-wider text-tracoli-500 uppercase shadow-sm backdrop-blur-sm"
            >
              <span className="size-1.5 rounded-full bg-tracoli-500 animate-pulse" />
              {IDENTITY.positioning}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mt-6 text-4xl leading-[1.08] font-extrabold tracking-tight text-ink-900 text-balance sm:text-5xl lg:text-6xl"
            >
              Votre sourcing{" "}
              <span className="text-tracoli-500">Chine → Afrique</span>,
              simplement.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-500 lg:mx-0 lg:text-lg"
            >
              Nous trouvons vos fournisseurs, sécurisons vos achats et
              organisons votre livraison jusqu&apos;à destination.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/sourcer"
                  className="group inline-flex min-h-[56px] items-center justify-center gap-2.5 rounded-2xl bg-tracoli-500 px-8 py-4 text-sm font-bold text-white shadow-[var(--shadow-red)] transition-all duration-300 hover:bg-tracoli-600 hover:shadow-lg"
                >
                  <Search className="size-4 transition-transform duration-300 group-hover:-rotate-12" />
                  Trouver un produit
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/suivre"
                  className="inline-flex min-h-[56px] items-center justify-center gap-2.5 rounded-2xl border-2 border-ink-200 bg-white/80 px-8 py-4 text-sm font-bold text-ink-800 backdrop-blur-sm transition-all duration-300 hover:border-tracoli-300 hover:shadow-md"
                >
                  <MapPin className="size-4 text-tracoli-500" />
                  Suivre ma commande
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-[4/5]">
              <Image
                src="/images/hero-delivery.png"
                alt="Livreur souriant TRACOLI avec des colis"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-contain drop-shadow-xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
