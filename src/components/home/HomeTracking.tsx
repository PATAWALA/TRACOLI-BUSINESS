"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

export default function HomeTracking() {
  return (
    <section className="border-t border-tracoli-100/50 bg-gradient-to-b from-white to-tracoli-50/40 py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl"
          >
            <Image
              src="/images/scooter.jpeg"
              alt="Coursier moto TRACOLI"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-contain"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-white px-4 py-2 text-xs font-bold tracking-wider text-tracoli-500 uppercase shadow-sm">
              <MapPin className="size-3.5" />
              Suivi
            </span>

            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl lg:text-5xl">
              Suivez votre marchandise en temps réel
            </h2>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-500 lg:text-lg">
              Entrez votre référence de commande et consultez l&apos;avancement
              de votre expédition, de l&apos;entrepôt en Chine jusqu&apos;à
              votre porte.
            </p>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-8 inline-block">
              <Link
                href="/suivre"
                className="group inline-flex items-center gap-2.5 rounded-2xl bg-tracoli-500 px-7 py-4 text-sm font-bold text-white shadow-[var(--shadow-red)] transition-all duration-300 hover:bg-tracoli-600 hover:shadow-lg"
              >
                Suivre ma commande
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
