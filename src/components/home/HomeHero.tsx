"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, MapPin } from "lucide-react";
import { IDENTITY } from "@/data/config/identity";

export default function HomeHero() {
  return (
    <section className="bg-white pt-20 pb-12 sm:pt-24 lg:pt-32 lg:pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-left">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-white px-3 py-1.5 text-[10.5px] font-bold tracking-wide text-tracoli-600 uppercase shadow-sm sm:text-[11px]"
            >
              <span className="size-1.5 rounded-full bg-tracoli-500" />
              {IDENTITY.positioning}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mt-5 text-[1.75rem] leading-[1.1] font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl lg:text-5xl"
            >
              Votre sourcing{" "}
              <span className="text-tracoli-500">Chine → Afrique</span>,
              simplement.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-ink-500 sm:text-[15.5px] lg:mx-0 lg:text-base"
            >
              Nous trouvons vos fournisseurs, sécurisons vos achats et
              organisons votre livraison jusqu&apos;à destination.
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
                Trouver un produit
              </Link>
              <Link
                href="/suivre"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-ink-200 bg-white px-6 py-3.5 text-[14px] font-bold text-ink-800 transition-all hover:border-ink-300 active:scale-[0.98]"
              >
                <MapPin className="size-4 text-tracoli-500" />
                Suivre ma commande
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[4/3] lg:aspect-[4/5]">
              <Image
                src="/images/hero-delivery.jpeg"
                alt="Livreur souriant TRACOLI avec des colis"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
