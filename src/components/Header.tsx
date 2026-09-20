"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { CONTACT, NAV_LINKS } from "@/data/content";
import { useLocale } from "@/hooks/useLocale";
import LocaleSwitcher from "@/components/LocaleSwitcher";

export default function Header() {
  const { locale } = useLocale();
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
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-ink-200 bg-white/90 backdrop-blur-xl"
          : "border-b border-transparent bg-white/60 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        {/* ---------- Logo → Accueil ---------- */}
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label={CONTACT.brandFull}
        >
          <span className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-xl border border-ink-200 bg-white shadow-sm transition-all group-hover:border-tracoli-500/40 lg:size-11">
            <Image
              src="/logo.jpg"
              alt={`Logo ${CONTACT.brand}`}
              width={88}
              height={88}
              priority
              className="size-full object-cover"
            />
          </span>
          <span className="hidden leading-none sm:block">
            <span className="block text-[14px] font-extrabold tracking-tight text-ink-900">
              TRACOLI BUSINESS
            </span>
            <span className="mt-0.5 block text-[9.5px] font-semibold tracking-[0.14em] text-tracoli-500 uppercase">
              Trade Connectors Logistics International
            </span>
          </span>
        </Link>

        {/* ---------- Nav desktop ---------- */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-3.5 py-2 text-[13.5px] font-medium text-ink-700 transition-colors hover:bg-ink-100 hover:text-ink-900"
            >
              {l.label[locale]}
            </Link>
          ))}
        </nav>

        {/* ---------- Actions desktop ---------- */}
        <div className="hidden items-center gap-3 lg:flex">
          <LocaleSwitcher />

          {/* CTA → section #devis (hub de conversion) */}
          <Link
            href="/#devis"
            className="rounded-xl bg-tracoli-500 px-4 py-2.5 text-[13px] font-bold text-white shadow-[var(--shadow-red)] transition-all hover:bg-tracoli-600 active:scale-[0.98]"
          >
            {locale === "fr" ? "Demander une cotation" : "Request a quote"}
          </Link>
        </div>

        {/* ---------- Burger + Locale mobile ---------- */}
        <div className="flex items-center gap-2 lg:hidden">
          <LocaleSwitcher />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fermer" : "Ouvrir le menu"}
            className="grid size-10 place-items-center rounded-xl border border-ink-200 bg-white text-ink-900"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* ---------- Drawer mobile ---------- */}
      <div
        className={`overflow-hidden border-t border-ink-200 bg-white transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? "max-h-[440px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-1 px-4 py-4">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-3.5 py-3 text-[15px] font-medium text-ink-800 transition-colors hover:bg-ink-100"
            >
              {l.label[locale]}
            </Link>
          ))}

          <div className="pt-3">
            {/* CTA mobile → section #devis */}
            <Link
              href="/#devis"
              onClick={() => setOpen(false)}
              className="block rounded-xl bg-tracoli-500 px-4 py-3 text-center text-sm font-bold text-white"
            >
              {locale === "fr" ? "Demander une cotation" : "Request a quote"}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}