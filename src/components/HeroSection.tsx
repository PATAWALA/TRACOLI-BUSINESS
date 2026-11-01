"use client";

import { motion } from "framer-motion";
import { ArrowRight, Search, Plane, MapPin } from "lucide-react";
import { HERO, IDENTITY, STATS, CONTACT } from "@/data/content";

const QUICK_ACTION_ICONS = [Search, Plane, MapPin] as const;
const QUICK_ACTION_ANCHORS = ["#sourcing", "#logistique", "#tracking"] as const;

export default function HeroSection() {
  const quickActions = [
    {
      title: "Sourcing & Achat",
      description: "Identification de fournisseurs qualifiés en Chine et négociation des meilleurs prix.",
      cta: "Trouver un produit",
    },
    {
      title: "Fret & Logistique",
      description: "Solutions de transport aérien et maritime adaptées à vos volumes.",
      cta: "Estimer mon expédition",
    },
    {
      title: "Suivi de Colis",
      description: "Suivi en temps réel depuis nos entrepôts en Chine jusqu'à la livraison finale.",
      cta: "Tracer ma marchandise",
    },
  ];

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-white via-ink-50 to-white pt-28 pb-16 lg:pt-40 lg:pb-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.35]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold text-ink-700 shadow-sm">
            <span className="size-1.5 rounded-full bg-tracoli-500" />
            {HERO.eyebrow}
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }} className="mt-6 text-[2rem] leading-[1.1] font-extrabold tracking-tight text-ink-900 text-balance sm:text-5xl lg:text-[3.25rem]">
            {HERO.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.16 }} className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-500 sm:text-base">
            {HERO.subtitle}
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.24 }} className="mx-auto mt-6 max-w-xl text-[13px] font-semibold tracking-wide text-tracoli-500">
            {IDENTITY.motto}
          </motion.p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {quickActions.map((action, i) => {
            const Icon = QUICK_ACTION_ICONS[i];
            const isPrimary = i === 0;
            const isDark = i === 1;
            return (
              <motion.a key={action.title} href={QUICK_ACTION_ANCHORS[i]} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.3 + i * 0.08 }} className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-300 active:scale-[0.985] ${isPrimary ? "border-tracoli-500 bg-tracoli-500 text-white shadow-[var(--shadow-red)] hover:bg-tracoli-600" : isDark ? "border-ink-900 bg-ink-900 text-white shadow-card-lg hover:bg-ink-800" : "border-ink-200 bg-white text-ink-900 shadow-card hover:border-ink-300 hover:shadow-card-lg"}`}>
                <div className="flex items-start justify-between">
                  <span className={`grid size-12 place-items-center rounded-xl ${isPrimary ? "bg-white/15 text-white" : isDark ? "bg-white/10 text-white" : "bg-tracoli-50 text-tracoli-500"}`}>
                    <Icon className="size-5" />
                  </span>
                  <span className="grid size-8 place-items-center rounded-full border border-current/15 opacity-50 transition-all group-hover:translate-x-0.5 group-hover:opacity-100">
                    <ArrowRight className="size-4" />
                  </span>
                </div>
                <h3 className="mt-6 text-[17px] font-extrabold tracking-tight">{action.title}</h3>
                <p className={`mt-2 text-[13px] leading-relaxed ${isPrimary ? "text-white/85" : isDark ? "text-white/70" : "text-ink-500"}`}>{action.description}</p>
                <span className="mt-auto flex items-center gap-1.5 pt-6 text-[13px] font-bold">
                  {action.cta}
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </motion.a>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.65 }} className="mt-14 grid grid-cols-1 overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-card sm:grid-cols-3">
          {STATS.map((s, i) => (
            <div key={s.label} className={`border-ink-200 px-6 py-6 text-center sm:text-left ${i < STATS.length - 1 ? "border-b sm:border-b-0 sm:border-r" : ""}`}>
              <p className="text-2xl font-extrabold tracking-tight text-tracoli-500">{s.value}</p>
              <p className="mt-1 text-[13px] font-semibold text-ink-800">{s.label}</p>
              <p className="mt-0.5 text-[11.5px] text-ink-500">{s.sublabel}</p>
            </div>
          ))}
        </motion.div>

        <p className="mt-6 text-center text-[12px] text-ink-400">
          Contact direct · {CONTACT.manager} · {CONTACT.phoneDisplay}
        </p>
      </div>
    </section>
  );
}
