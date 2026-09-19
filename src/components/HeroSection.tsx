"use client";

import { motion } from "framer-motion";
import { ArrowRight, Search, Plane, MapPin, ShieldCheck, Package, FileCheck2 } from "lucide-react";
import { HERO, IDENTITY, STATS, SERVICES, CONTACT, waLink } from "@/data/content";
import { useLocale } from "@/hooks/useLocale";

const QUICK_ACTION_ICONS = [Search, Plane, MapPin] as const;
const QUICK_ACTION_ANCHORS = ["#sourcing", "#logistique", "#tracking"] as const;

export default function HeroSection() {
  const { locale } = useLocale();

  const quickActions = [
    {
      title: locale === "fr" ? "Sourcing & Achat" : "Sourcing & Purchasing",
      description:
        locale === "fr"
          ? "Identification de fournisseurs qualifiés en Chine et négociation des meilleurs prix."
          : "Identification of qualified suppliers in China and negotiation of the best prices.",
      cta: locale === "fr" ? "Trouver un produit" : "Find a product",
    },
    {
      title: locale === "fr" ? "Fret & Logistique" : "Freight & Logistics",
      description:
        locale === "fr"
          ? "Solutions de transport aérien et maritime adaptées à vos volumes."
          : "Air and sea transport solutions tailored to your volumes.",
      cta: locale === "fr" ? "Estimer mon expédition" : "Estimate my shipment",
    },
    {
      title: locale === "fr" ? "Suivi de Colis" : "Parcel Tracking",
      description:
        locale === "fr"
          ? "Suivi en temps réel depuis nos entrepôts en Chine jusqu'à la livraison finale."
          : "Real-time tracking from our warehouses in China to final delivery.",
      cta: locale === "fr" ? "Tracer ma marchandise" : "Track my shipment",
    },
  ];

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-white via-ink-50 to-white pt-28 pb-16 lg:pt-40 lg:pb-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.35]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Bloc titre */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold text-ink-700 shadow-sm"
          >
            <span className="size-1.5 rounded-full bg-tracoli-500" />
            {HERO.eyebrow[locale]}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-6 text-[2rem] leading-[1.1] font-extrabold tracking-tight text-ink-900 text-balance sm:text-5xl lg:text-[3.25rem]"
          >
            {HERO.title[locale]}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-500 sm:text-base"
          >
            {HERO.subtitle[locale]}
          </motion.p>

          {/* Devise */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mx-auto mt-6 max-w-xl text-[13px] font-semibold tracking-wide text-tracoli-500"
          >
            {IDENTITY.motto[locale]}
          </motion.p>
        </div>

        {/* 3 Quick Action Cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {quickActions.map((action, i) => {
            const Icon = QUICK_ACTION_ICONS[i];
            const isPrimary = i === 0;
            const isDark = i === 1;

            return (
              <motion.a
                key={action.title}
                href={QUICK_ACTION_ANCHORS[i]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.3 + i * 0.08 }}
                className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-300 active:scale-[0.985] ${
                  isPrimary
                    ? "border-tracoli-500 bg-tracoli-500 text-white shadow-[var(--shadow-red)] hover:bg-tracoli-600"
                    : isDark
                    ? "border-ink-900 bg-ink-900 text-white shadow-card-lg hover:bg-ink-800"
                    : "border-ink-200 bg-white text-ink-900 shadow-card hover:border-ink-300 hover:shadow-card-lg"
                }`}
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`grid size-12 place-items-center rounded-xl ${
                      isPrimary
                        ? "bg-white/15 text-white"
                        : isDark
                        ? "bg-white/10 text-white"
                        : "bg-tracoli-50 text-tracoli-500"
                    }`}
                  >
                    <Icon className="size-5" />
                  </span>
                  <span className="grid size-8 place-items-center rounded-full border border-current/15 opacity-50 transition-all group-hover:translate-x-0.5 group-hover:opacity-100">
                    <ArrowRight className="size-4" />
                  </span>
                </div>

                <h3 className="mt-6 text-[17px] font-extrabold tracking-tight">
                  {action.title}
                </h3>
                <p
                  className={`mt-2 text-[13px] leading-relaxed ${
                    isPrimary ? "text-white/85" : isDark ? "text-white/70" : "text-ink-500"
                  }`}
                >
                  {action.description}
                </p>

                <span className="mt-auto flex items-center gap-1.5 pt-6 text-[13px] font-bold">
                  {action.cta}
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </motion.a>
            );
          })}
        </div>

        {/* Bandeau stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-14 grid grid-cols-1 overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-card sm:grid-cols-3"
        >
          {STATS.map((s, i) => (
            <div
              key={s.label.fr}
              className={`border-ink-200 px-6 py-6 text-center sm:text-left ${
                i < STATS.length - 1 ? "border-b sm:border-b-0 sm:border-r" : ""
              }`}
            >
              <p className="text-2xl font-extrabold tracking-tight text-tracoli-500">
                {s.value}
              </p>
              <p className="mt-1 text-[13px] font-semibold text-ink-800">{s.label[locale]}</p>
              <p className="mt-0.5 text-[11.5px] text-ink-500">{s.sublabel[locale]}</p>
            </div>
          ))}
        </motion.div>

        <p className="mt-6 text-center text-[12px] text-ink-400">
          {locale === "fr" ? "Contact direct" : "Direct contact"} · {CONTACT.manager} · {CONTACT.phoneDisplay}
        </p>
      </div>
    </section>
  );
}