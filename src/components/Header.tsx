"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { CONTACT, NAV_LINKS, waLink } from "@/data/content";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/5 bg-navy-950/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        {/* ---------- Logo ---------- */}
        <a
          href="#top"
          className="group flex items-center gap-2.5"
          aria-label="TRACOLI BUSINESS — Accueil"
        >
          {/* Logo image */}
          <span className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-xl border border-gold-500/25 bg-navy-900 shadow-[0_0_30px_-10px_rgba(245,158,11,0.5)] transition-all duration-300 group-hover:border-gold-500/60 group-hover:shadow-glow-gold lg:size-11">
            <Image
              src="/logo.jpg"
              alt="Logo TRACOLI BUSINESS"
              width={88}
              height={88}
              priority
              className="size-full object-cover"
            />
          </span>

          {/* Nom texte */}
          <span className="leading-none">
            <span className="block text-[15px] font-extrabold tracking-tight text-white lg:text-base">
              TRACOLI
            </span>
            <span className="block text-[10px] font-semibold tracking-[0.22em] text-gold-500 lg:text-[11px]">
              BUSINESS
            </span>
          </span>
        </a>

        {/* ---------- Nav desktop ---------- */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* ---------- Actions desktop ---------- */}
        <div className="hidden items-center gap-3 lg:flex">
          <span className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-semibold text-emerald-300">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
            </span>
            Hubs Chine Ouverts
          </span>

          <a
            href="#devis"
            className="rounded-xl bg-gradient-to-b from-gold-500 to-gold-600 px-4 py-2.5 text-sm font-bold text-navy-950 shadow-lg shadow-gold-600/20 transition-all hover:shadow-glow-gold hover:brightness-110 active:scale-[0.98]"
          >
            Obtenir un devis
          </a>
        </div>

        {/* ---------- Burger mobile ---------- */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* ---------- Drawer mobile ---------- */}
      <div
        className={`overflow-hidden border-t border-white/5 bg-navy-950/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? "max-h-[460px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-1 px-4 py-4">
          {/* Logo + statut dans le drawer */}
          <div className="mb-3 flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5">
            <span className="relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-lg border border-gold-500/25 bg-navy-900">
              <Image
                src="/logo.jpg"
                alt="Logo TRACOLI BUSINESS"
                width={72}
                height={72}
                className="size-full object-cover"
              />
            </span>
            <div className="min-w-0 leading-none">
              <p className="text-[13px] font-extrabold tracking-tight text-white">
                TRACOLI BUSINESS
              </p>
              <p className="mt-1 inline-flex items-center gap-1.5 text-[10.5px] font-semibold text-emerald-300">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                Hubs Chine Ouverts · Guangzhou · Yiwu
              </p>
            </div>
          </div>

          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-3.5 py-3 text-[15px] font-medium text-slate-200 transition-colors hover:bg-white/5"
            >
              {l.label}
            </a>
          ))}

          <div className="grid grid-cols-1 gap-2 pt-3">
            <a
              href="#devis"
              onClick={() => setOpen(false)}
              className="rounded-xl bg-gradient-to-b from-gold-500 to-gold-600 px-4 py-3 text-center text-sm font-bold text-navy-950"
            >
              Obtenir un devis
            </a>
            <a
              href={waLink(
                `Bonjour ${CONTACT.manager}, je souhaite un renseignement sur le fret Chine–Afrique.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold text-white"
            >
              <FaWhatsapp className="size-4 text-emerald-400" />
              WhatsApp direct
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}