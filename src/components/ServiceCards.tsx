import { Check, ArrowRight } from "lucide-react";
import { FREIGHT_SERVICES, waLink, CONTACT, type ServiceAccent } from "@/data/content";
import Reveal from "@/components/ui/Reveal";

const ACCENT: Record<
  ServiceAccent,
  { icon: string; badge: string; ring: string; cta: string }
> = {
  amber: {
    icon: "bg-gold-500/15 text-gold-400",
    badge: "bg-gold-500/15 text-gold-400 border-gold-500/25",
    ring: "hover:border-gold-500/40 hover:shadow-glow-gold",
    cta: "text-gold-400 group-hover:text-gold-300",
  },
  navy: {
    icon: "bg-sky-500/15 text-sky-400",
    badge: "bg-sky-500/15 text-sky-300 border-sky-500/25",
    ring: "hover:border-sky-500/40",
    cta: "text-sky-400 group-hover:text-sky-300",
  },
  crimson: {
    icon: "bg-crimson-600/15 text-crimson-500",
    badge: "bg-crimson-600/15 text-red-300 border-crimson-600/25",
    ring: "hover:border-crimson-600/40",
    cta: "text-crimson-500 group-hover:text-red-400",
  },
};

export default function ServiceCards() {
  return (
    <section id="services" className="relative scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Titre */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[11px] font-semibold text-slate-300">
            Nos prestations
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white text-balance sm:text-4xl">
            Trois solutions, un seul partenaire logistique
          </h2>
          <p className="mt-3 text-[15px] text-slate-400">
            Du sourcing à la livraison finale à Kinshasa, Goma ou Bujumbura — nous couvrons toute
            la chaîne.
          </p>
        </div>

        {/* Grille */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {FREIGHT_SERVICES.map((service, i) => {
            const a = ACCENT[service.accent];
            const Icon = service.icon;

            return (
              <Reveal key={service.id} delay={i * 0.08} className="h-full">
                <article
                  className={`group flex h-full flex-col rounded-3xl border border-white/8 bg-navy-800/40 p-6 backdrop-blur transition-all duration-300 lg:p-7 ${a.ring}`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={`grid size-12 place-items-center rounded-2xl ${a.icon}`}
                    >
                      <Icon className="size-5.5" strokeWidth={2} />
                    </span>
                    {service.badge && (
                      <span
                        className={`rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase ${a.badge}`}
                      >
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Titre */}
                  <h3 className="mt-5 text-lg font-extrabold tracking-tight text-white">
                    {service.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-slate-400">
                    {service.subtitle}
                  </p>

                  <p className="mt-3 inline-flex w-fit rounded-lg bg-white/[0.04] px-2.5 py-1 text-[11px] font-semibold text-slate-400">
                    {service.route}
                  </p>

                  {/* Prix */}
                  <div className="mt-5 flex items-end gap-1.5 border-t border-white/8 pt-5">
                    <span className="text-2xl font-extrabold tracking-tight text-white">
                      {service.priceLabel}
                    </span>
                    <span className="pb-0.5 text-[12px] font-semibold text-slate-500">
                      {service.priceUnit}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500">{service.priceNote}</p>

                  {/* Délai */}
                  <p className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-lg bg-gold-500/8 px-2.5 py-1 text-[11px] font-bold text-gold-400">
                    ⏱ {service.delay}
                  </p>

                  {/* Inclus */}
                  <ul className="mt-5 space-y-2.5">
                    {service.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-emerald-500/15">
                          <Check className="size-2.5 text-emerald-400" strokeWidth={3} />
                        </span>
                        <span className="text-[12.5px] leading-snug text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href={waLink(
                      `Bonjour ${CONTACT.manager}, je suis intéressé par votre service : ${service.title}. Pouvez-vous m'en dire plus ?`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-7 inline-flex items-center gap-2 pt-1 text-[13px] font-bold transition-colors ${a.cta}`}
                  >
                    {service.cta}
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}