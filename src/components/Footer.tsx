import {
  Anchor,
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { CONTACT, FREIGHT_SERVICES, waLink } from "@/data/content";

const ZONES = [
  "🇨🇩 RD Congo — Kinshasa, Goma, Bukavu, Lubumbashi, Matadi",
  "🇧🇮 Burundi — Bujumbura, Gitega",
  "🇷🇼 Rwanda — Kigali",
  "🇨🇳 Chine — Guangzhou, Yiwu, Foshan, Shenzhen",
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-navy-950">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[620px] -translate-x-1/2 rounded-full bg-gold-600/8 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-16">
          {/* ---------- Marque ---------- */}
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-gold-500 to-gold-700 shadow-glow-gold">
                <Anchor className="size-5 text-navy-950" strokeWidth={2.5} />
              </span>
              <span className="leading-none">
                <span className="block text-base font-extrabold tracking-tight text-white">
                  TRACOLI
                </span>
                <span className="block text-[11px] font-semibold tracking-[0.22em] text-gold-500">
                  BUSINESS
                </span>
              </span>
            </div>

            <p className="mt-5 max-w-sm text-[13px] leading-relaxed text-slate-400">
              {CONTACT.tagline}. Nous accompagnons les commerçants, importateurs et industriels
              d&apos;Afrique Centrale et de l&apos;Est sur toute la chaîne, de l&apos;usine chinoise
              jusqu&apos;à votre entrepôt.
            </p>

            {/* Contact direct */}
            <div className="mt-7 space-y-3">
              <a
                href={`tel:+${CONTACT.phoneRaw}`}
                className="group flex items-center gap-3 text-[13px] font-semibold text-slate-300 transition-colors hover:text-gold-400"
              >
                <span className="grid size-9 place-items-center rounded-xl border border-white/8 bg-white/[0.03] transition-colors group-hover:border-gold-500/30">
                  <Phone className="size-3.5" />
                </span>
                {CONTACT.phoneDisplay}
              </a>

              <a
                href={waLink(`Bonjour ${CONTACT.manager}, je vous contacte depuis le site TRACOLI.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-[13px] font-semibold text-slate-300 transition-colors hover:text-emerald-400"
              >
                <span className="grid size-9 place-items-center rounded-xl border border-white/8 bg-white/[0.03] transition-colors group-hover:border-emerald-500/30">
                  <MessageCircle className="size-3.5" />
                </span>
                WhatsApp — {CONTACT.manager}
              </a>

              <a
                href={`mailto:${CONTACT.email}`}
                className="group flex items-center gap-3 text-[13px] font-semibold text-slate-300 transition-colors hover:text-gold-400"
              >
                <span className="grid size-9 place-items-center rounded-xl border border-white/8 bg-white/[0.03] transition-colors group-hover:border-gold-500/30">
                  <Mail className="size-3.5" />
                </span>
                {CONTACT.email}
              </a>
            </div>

            {/* Réseaux */}
            <div className="mt-7 flex gap-2.5">
              {[
                { icon: FaFacebookF, label: "Facebook", href: "#" },
                { icon: FaLinkedinIn, label: "LinkedIn", href: "#" },
                { icon: MessageCircle, label: "WhatsApp", href: waLink("Bonjour TRACOLI BUSINESS") },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid size-10 place-items-center rounded-xl border border-white/8 bg-white/[0.03] text-slate-400 transition-all hover:border-gold-500/30 hover:text-gold-400"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* ---------- Services ---------- */}
          <div>
            <h3 className="text-[11px] font-bold tracking-[0.16em] text-gold-500 uppercase">
              Nos services
            </h3>
            <ul className="mt-5 space-y-3">
              {FREIGHT_SERVICES.map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    className="group inline-flex items-center gap-1.5 text-[13px] text-slate-400 transition-colors hover:text-white"
                  >
                    {s.title}
                    <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#simulateur"
                  className="group inline-flex items-center gap-1.5 text-[13px] text-slate-400 transition-colors hover:text-white"
                >
                  Simulateur de cotation
                  <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href="#devis"
                  className="group inline-flex items-center gap-1.5 text-[13px] text-slate-400 transition-colors hover:text-white"
                >
                  Demander un devis
                  <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              </li>
            </ul>
          </div>

          {/* ---------- Zones ---------- */}
          <div>
            <h3 className="text-[11px] font-bold tracking-[0.16em] text-gold-500 uppercase">
              Zones desservies
            </h3>
            <ul className="mt-5 space-y-3">
              {ZONES.map((z) => (
                <li key={z} className="flex items-start gap-2.5 text-[13px] text-slate-400">
                  <MapPin className="mt-0.5 size-3.5 shrink-0 text-slate-600" />
                  <span className="leading-snug">{z}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---------- Barre légale ---------- */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/8 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11.5px] text-slate-500">
            © {new Date().getFullYear()} TRACOLI BUSINESS — Tous droits réservés. Mentions légales
            · Politique de confidentialité · CGV Transport.
          </p>
          <p className="text-[11.5px] text-slate-500">
            Développé par{" "}
            <span className="font-semibold text-gold-500">Abdoulaye Patawala</span> — Architecte Web
          </p>
        </div>
      </div>
    </footer>
  );
}