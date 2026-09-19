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
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-ink-200 bg-white/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        {/* Logo */}
        <a href="#top" className="group flex items-center gap-2.5" aria-label="TRACOLI BUSINESS">
          <span className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-xl border border-ink-200 bg-white shadow-sm transition-all group-hover:border-tracoli-500/40 lg:size-11">
            <Image
              src="/logo.jpg"
              alt="Logo TRACOLI BUSINESS"
              width={88}
              height={88}
              priority
              className="size-full object-cover"
            />
          </span>
          <span className="leading-none">
            <span className="block text-[15px] font-extrabold tracking-tight text-ink-900 lg:text-base">
              TRACOLI
            </span>
            <span className="block text-[10px] font-bold tracking-[0.22em] text-tracoli-500 lg:text-[11px]">
              BUSINESS
            </span>
          </span>
        </a>

        {/* Nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-100 hover:text-ink-900"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Actions desktop */}
        <div className="hidden items-center gap-3 lg:flex">
          <span className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-semibold text-emerald-700">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
            </span>
            Hubs Chine Ouverts
          </span>

          <a
            href="#devis"
            className="rounded-xl bg-tracoli-500 px-4 py-2.5 text-sm font-bold text-white shadow-[var(--shadow-red)] transition-all hover:bg-tracoli-600 active:scale-[0.98]"
          >
            Obtenir un devis
          </a>
        </div>

        {/* Burger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fermer" : "Ouvrir le menu"}
          className="grid size-10 place-items-center rounded-xl border border-ink-200 bg-white text-ink-900 lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Drawer mobile */}
      <div
        className={`overflow-hidden border-t border-ink-200 bg-white transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? "max-h-[440px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-1 px-4 py-4">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-3.5 py-3 text-[15px] font-medium text-ink-800 transition-colors hover:bg-ink-100"
            >
              {l.label}
            </a>
          ))}
          <div className="grid grid-cols-1 gap-2 pt-3">
            <a
              href="#devis"
              onClick={() => setOpen(false)}
              className="rounded-xl bg-tracoli-500 px-4 py-3 text-center text-sm font-bold text-white"
            >
              Obtenir un devis
            </a>
            <a
              href={waLink(`Bonjour ${CONTACT.manager}, je viens du site TRACOLI.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-ink-200 px-4 py-3 text-sm font-semibold text-ink-900"
            >
              <FaWhatsapp className="size-4 text-emerald-500" />
              WhatsApp direct
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}