"use client";

import Image from "next/image";
import { Phone, Mail, MapPin, ArrowUpRight, ExternalLink } from "lucide-react";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import {
  CONTACT,
  IDENTITY,
  SERVICES,
  DESTINATIONS,
  NAV_LINKS,
  FOOTER,
  waLink,
} from "@/data/content";
import { useLocale } from "@/hooks/useLocale";

export default function Footer() {
  const { locale } = useLocale();

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-200 bg-ink-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-10">
          {/* ---------- Marque ---------- */}
          <div>
            <div className="flex items-center gap-3">
              <span className="relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-xl border border-ink-200 bg-white shadow-sm">
                <Image
                  src="/logo.jpg"
                  alt={`Logo ${CONTACT.brand}`}
                  width={88}
                  height={88}
                  className="size-full object-cover"
                />
              </span>
              <span className="leading-none">
                <span className="block text-[14px] font-extrabold tracking-tight text-ink-900">
                  TRACOLI BUSINESS
                </span>
                <span className="mt-0.5 block text-[9.5px] font-semibold tracking-[0.14em] text-tracoli-500 uppercase">
                  {FOOTER.tagline[locale]}
                </span>
              </span>
            </div>

            <p className="mt-5 max-w-sm text-[12.5px] leading-relaxed text-ink-500">
              {locale === "fr"
                ? "Sourcing international, importation et logistique. Nous connectons les entrepreneurs africains aux meilleurs fournisseurs d'Asie."
                : "International sourcing, import and logistics. We connect African entrepreneurs with Asia's leading suppliers."}
            </p>

            <p className="mt-5 max-w-sm text-[12.5px] font-semibold text-tracoli-500">
              {IDENTITY.motto[locale]}
            </p>

            {/* Contact */}
            <div className="mt-7 space-y-2.5">
              <a
                href={`tel:+${CONTACT.phoneRaw}`}
                className="flex items-center gap-3 text-[12.5px] font-semibold text-ink-700 transition-colors hover:text-tracoli-500"
              >
                <span className="grid size-8 place-items-center rounded-lg border border-ink-200 bg-white">
                  <Phone className="size-3.5" />
                </span>
                {CONTACT.phoneDisplay}
              </a>

              <a
                href={waLink(
                  `${locale === "fr" ? "Bonjour" : "Hello"} ${CONTACT.manager}, ${locale === "fr" ? "je vous contacte depuis le site TRACOLI" : "I am contacting you from the TRACOLI website"}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[12.5px] font-semibold text-ink-700 transition-colors hover:text-emerald-600"
              >
                <span className="grid size-8 place-items-center rounded-lg border border-ink-200 bg-white">
                  <FaWhatsapp className="size-3.5" />
                </span>
                WhatsApp — {CONTACT.manager}
              </a>

              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-3 text-[12.5px] font-semibold text-ink-700 transition-colors hover:text-tracoli-500"
              >
                <span className="grid size-8 place-items-center rounded-lg border border-ink-200 bg-white">
                  <Mail className="size-3.5" />
                </span>
                {CONTACT.email}
              </a>
            </div>

            {/* Réseaux */}
            <div className="mt-7 flex gap-2.5">
              <a
                href={CONTACT.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid size-9 place-items-center rounded-lg border border-ink-200 bg-white text-ink-500 transition-all hover:border-tracoli-500/40 hover:text-tracoli-500"
              >
                <FaFacebookF className="size-3.5" />
              </a>
              <a
                href={waLink(
                  `${locale === "fr" ? "Bonjour" : "Hello"} TRACOLI BUSINESS`
                )}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="grid size-9 place-items-center rounded-lg border border-ink-200 bg-white text-ink-500 transition-all hover:border-emerald-500/40 hover:text-emerald-600"
              >
                <FaWhatsapp className="size-3.5" />
              </a>
            </div>
          </div>

          {/* ---------- Services ---------- */}
          <div>
            <h3 className="text-[11px] font-bold tracking-[0.14em] text-tracoli-500 uppercase">
              {locale === "fr" ? "Services" : "Services"}
            </h3>
            <ul className="mt-5 space-y-3">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    className="group inline-flex items-center gap-1.5 text-[12.5px] text-ink-600 transition-colors hover:text-ink-900"
                  >
                    {s.title[locale]}
                    <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#logistique"
                  className="group inline-flex items-center gap-1.5 text-[12.5px] text-ink-600 transition-colors hover:text-ink-900"
                >
                  {locale === "fr" ? "Estimation de fret" : "Freight estimate"}
                  <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href="#tracking"
                  className="group inline-flex items-center gap-1.5 text-[12.5px] text-ink-600 transition-colors hover:text-ink-900"
                >
                  {locale === "fr" ? "Suivi de colis" : "Shipment tracking"}
                  <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              </li>
            </ul>
          </div>

          {/* ---------- Navigation ---------- */}
          <div>
            <h3 className="text-[11px] font-bold tracking-[0.14em] text-tracoli-500 uppercase">
              {locale === "fr" ? "Navigation" : "Navigation"}
            </h3>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="group inline-flex items-center gap-1.5 text-[12.5px] text-ink-600 transition-colors hover:text-ink-900"
                  >
                    {l.label[locale]}
                    <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- Zones desservies ---------- */}
          <div>
            <h3 className="text-[11px] font-bold tracking-[0.14em] text-tracoli-500 uppercase">
              {FOOTER.zonesTitle[locale]}
            </h3>
            <ul className="mt-5 space-y-3">
              {DESTINATIONS.map((c) => (
                <li key={c.id} className="flex items-start gap-2.5 text-[12.5px] text-ink-600">
                  <MapPin className="mt-0.5 size-3.5 shrink-0 text-ink-400" />
                  <span className="leading-snug">
                    <span className="font-semibold text-ink-800">{c.country[locale]}</span>
                    {" — "}
                    {c.cities.map((city) => city.name).join(", ")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---------- Barre légale ---------- */}
        <div className="mt-14 flex flex-col gap-4 border-t border-ink-200 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11.5px] text-ink-500">
            © {year} {IDENTITY.legalName}. {FOOTER.legal[locale]}
          </p>

          <p className="text-[11.5px] text-ink-500">
            {FOOTER.credit[locale]}
          </p>
        </div>
      </div>
    </footer>
  );
}