"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { QUICK_ACTIONS, CONTACT, STATS } from "@/data/content";

const VARIANT_CLS = {
  primary: {
    card: "bg-tracoli-500 text-white border-tracoli-500 shadow-[var(--shadow-red)] hover:bg-tracoli-600",
    title: "text-white",
    desc: "text-white/85",
    cta: "text-white",
    icon: "bg-white/15 text-white",
  },
  dark: {
    card: "bg-ink-900 text-white border-ink-900 shadow-card-lg hover:bg-ink-800",
    title: "text-white",
    desc: "text-white/70",
    cta: "text-white",
    icon: "bg-white/10 text-white",
  },
  ghost: {
    card: "bg-white text-ink-900 border-ink-200 shadow-card hover:border-ink-300 hover:shadow-card-lg",
    title: "text-ink-900",
    desc: "text-ink-500",
    cta: "text-tracoli-500",
    icon: "bg-ink-100 text-ink-700",
  },
} as const;

export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-white via-ink-50 to-white pt-28 pb-16 lg:pt-40 lg:pb-24"
    >
      {/* Décor discret */}
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.35]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tracoli-500/5 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Bloc titre */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold text-ink-700 shadow-sm sm:text-xs"
          >
            <Sparkles className="size-3.5 text-tracoli-500" />
            TRACOLI BUSINESS · 🇨🇳 ⇄ 🇨🇩 🇧🇮
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-6 text-[2.15rem] leading-[1.05] font-extrabold tracking-tight text-ink-900 text-balance sm:text-5xl lg:text-[3.6rem]"
          >
            Nous recherchons.
            <br className="hidden sm:block" /> Nous expédions.{" "}
            <span className="text-tracoli-500">Vous vendez.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-500 sm:text-base lg:text-lg"
          >
            Le pont logistique entre la Chine et l&apos;Afrique. De la recherche de fournisseur
            jusqu&apos;à la livraison à Kinshasa, Goma ou Bujumbura —{" "}
            <span className="font-semibold text-ink-800">
              vous restez concentré sur votre commerce.
            </span>
          </motion.p>
        </div>

        {/* 3 Quick Action Cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {QUICK_ACTIONS.map((action, i) => {
            const v = VARIANT_CLS[action.variant];
            return (
              <motion.a
                key={action.id}
                href={action.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.25 + i * 0.08 }}
                className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-300 active:scale-[0.985] ${v.card}`}
              >
                {/* Emoji */}
                <div className="flex items-start justify-between">
                  <span className={`grid size-12 place-items-center rounded-xl text-2xl ${v.icon}`}>
                    {action.emoji}
                  </span>
                  <span className="grid size-8 place-items-center rounded-full border border-current/15 opacity-60 transition-all group-hover:translate-x-0.5 group-hover:opacity-100">
                    <ArrowRight className="size-4" />
                  </span>
                </div>

                {/* Contenu */}
                <h3 className={`mt-6 text-lg font-extrabold tracking-tight ${v.title}`}>
                  {action.title}
                </h3>
                <p className={`mt-2 text-[13px] leading-relaxed ${v.desc}`}>
                  {action.description}
                </p>

                {/* CTA ligne */}
                <span
                  className={`mt-auto pt-6 text-[13px] font-bold tracking-tight ${v.cta} flex items-center gap-1.5`}
                >
                  {action.cta}
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </motion.a>
            );
          })}
        </div>

        {/* Bandeau stats compact */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-14 grid grid-cols-3 overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-card"
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              className="border-r border-ink-200 px-4 py-5 text-center last:border-r-0 sm:px-6 sm:text-left"
            >
              <p className="text-xl font-extrabold tracking-tight text-tracoli-500 sm:text-2xl">
                {s.value}
              </p>
              <p className="mt-1 text-[11.5px] leading-snug font-semibold text-ink-800 sm:text-[12.5px]">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Mention contact rapide */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-6 text-center text-[12px] text-ink-400"
        >
          💬 Une question ? Contactez directement {CONTACT.manager} · {CONTACT.phoneDisplay}
        </motion.p>
      </div>
    </section>
  );
}