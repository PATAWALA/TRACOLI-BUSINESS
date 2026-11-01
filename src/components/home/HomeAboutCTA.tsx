"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Users } from "lucide-react";

export default function HomeAboutCTA() {
  const [email, setEmail] = useState("");

  return (
    <section className="border-t border-tracoli-100/50 bg-tracoli-50 py-20 pb-28 lg:py-32 lg:pb-24">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-white px-4 py-2 text-xs font-bold tracking-wider text-tracoli-500 uppercase shadow-sm">
            <Users className="size-3.5" />
            Qui sommes-nous
          </span>

          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl lg:text-5xl">
            TRACOLI Business connecte les entrepreneurs africains aux meilleurs
            fournisseurs d&apos;Asie
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-500 lg:text-lg">
            Nous accompagnons les commerçants et entrepreneurs dans
            leurs opérations de sourcing, d&apos;expédition et de
            coordination douanière sur le corridor Chine–Afrique.
          </p>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-8 inline-block">
            <Link
              href="/a-propos"
              className="group inline-flex items-center gap-2.5 rounded-2xl border-2 border-tracoli-200 bg-white px-7 py-4 text-sm font-bold text-tracoli-600 transition-all duration-300 hover:border-tracoli-400 hover:shadow-md"
            >
              Découvrir notre histoire
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mt-16 max-w-md"
        >
          <p className="text-sm font-bold text-ink-700">
            Recevez nos conseils import &amp; les offres de groupage
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setEmail("");
            }}
            className="mt-4 flex gap-3"
          >
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
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="shrink-0 rounded-2xl bg-tracoli-500 px-6 py-3.5 text-sm font-bold text-white shadow-[var(--shadow-red)] transition-all duration-300 hover:bg-tracoli-600 hover:shadow-lg"
            >
              S&apos;inscrire
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
