"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HomeSourcing() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/3] w-full overflow-hidden"
          >
            <Image
              src="/images/warehouse.jpeg"
              alt="Entrepôt logistique TRACOLI"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-contain"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-white px-3 py-1.5 text-[10.5px] font-bold tracking-wide text-tracoli-600 uppercase">
              Sourcing
            </span>

            <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-3xl">
              Vous cherchez un produit en Chine ?
            </h2>

            <p className="mt-4 text-[14.5px] leading-relaxed text-ink-500 lg:text-base">
              Nous identifions les meilleurs fournisseurs, négocions les prix et
              coordonnons l&apos;ensemble de la chaîne d&apos;approvisionnement
              pour vous.
            </p>

            <Link
              href="/sourcer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-tracoli-500 px-5 py-3 text-[13px] font-bold text-white shadow-[var(--shadow-red)] transition-all hover:bg-tracoli-600 active:scale-[0.98]"
            >
              Sourcer un produit
              <ArrowRight className="size-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
