"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

export default function HomeAboutCTA() {
  const [email, setEmail] = useState("");

  return (
    <section className="bg-tracoli-50 py-16 pb-24 lg:py-24 lg:pb-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-white px-3 py-1.5 text-[10.5px] font-bold tracking-wide text-tracoli-600 uppercase">
            Qui sommes-nous
          </span>

          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-3xl">
            TRACOLI Business connecte les entrepreneurs africains aux meilleurs
            fournisseurs d&apos;Asie
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[14.5px] leading-relaxed text-ink-500 lg:text-base">
            Depuis 2018, nous accompagnons les commerçants et entrepreneurs dans
            leurs opérations de sourcing, d&apos;expédition et de
            dédouanement sur le corridor Chine–Afrique.
          </p>

          <Link
            href="/a-propos"
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-tracoli-200 bg-white px-5 py-3 text-[13px] font-bold text-tracoli-600 transition-colors hover:bg-tracoli-100 active:scale-[0.98]"
          >
            Découvrir notre histoire
            <ArrowRight className="size-4" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mt-12 max-w-md"
        >
          <p className="text-[13px] font-bold text-ink-700">
            Recevez nos conseils import & les offres de groupage
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setEmail("");
            }}
            className="mt-3 flex gap-2"
          >
            <div className="relative flex-1">
              <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-400" />
              <input
                type="email"
                required
                placeholder="Votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-ink-200 bg-white py-3 pr-4 pl-10 text-[13px] text-ink-900 placeholder:text-ink-400 focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="shrink-0 rounded-xl bg-tracoli-500 px-5 py-3 text-[13px] font-bold text-white shadow-[var(--shadow-red)] transition-all hover:bg-tracoli-600 active:scale-[0.98]"
            >
              S&apos;inscrire
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
