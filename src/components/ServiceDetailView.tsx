"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  HelpCircle,
  Target,
  TrendingUp,
} from "lucide-react";
import { CONTACT, waLink, type ServiceDetail } from "@/data/content";
import { useLocale } from "@/hooks/useLocale";

export default function ServiceDetailView({ service }: { service: ServiceDetail }) {
  const { locale } = useLocale();
  const Icon = service.icon;

  return (
    <main className="pt-16 lg:pt-20">
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden border-b border-ink-200 bg-gradient-to-b from-white via-ink-50 to-white py-16 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.3]" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/#services"
            className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-ink-500 transition-colors hover:text-tracoli-500"
          >
            <ArrowLeft className="size-3.5" />
            {locale === "fr" ? "Tous les services" : "All services"}
          </Link>

          <div className="mt-6 max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-white px-3.5 py-1.5 text-[11px] font-bold tracking-wide text-tracoli-600 uppercase">
              <Icon className="size-3" />
              {locale === "fr" ? "Service" : "Service"}
            </span>

            <h1 className="mt-5 text-3xl leading-tight font-extrabold tracking-tight text-ink-900 text-balance sm:text-5xl lg:text-[3rem]">
              {service.title[locale]}
            </h1>

            <p className="mt-4 text-[16px] font-semibold text-ink-700">
              {service.subtitle[locale]}
            </p>

            <p className="mt-5 text-[14.5px] leading-relaxed text-ink-500">
              {service.hero[locale]}
            </p>
          </div>

          {/* Stat */}
          <div className="mt-10 inline-flex items-center gap-4 rounded-2xl border border-ink-200 bg-white px-6 py-5 shadow-card">
            <span className="grid size-12 place-items-center rounded-xl bg-tracoli-50 text-tracoli-500">
              <TrendingUp className="size-5" />
            </span>
            <div>
              <p className="text-2xl font-extrabold tracking-tight text-tracoli-500">
                {service.stat.value}
              </p>
              <p className="text-[12.5px] font-semibold text-ink-600">
                {service.stat.label[locale]}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- PROCESSUS ---------- */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
            {locale === "fr" ? "Notre processus" : "Our process"}
          </h2>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {service.processSteps.map((step) => (
              <div
                key={step.step}
                className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card transition-all hover:border-tracoli-500/40 hover:shadow-card-lg"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-tracoli-500 text-[13px] font-extrabold text-white">
                  {step.step}
                </span>
                <h3 className="mt-4 text-[15px] font-extrabold tracking-tight text-ink-900">
                  {step.title[locale]}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-500">
                  {step.description[locale]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- INCLUS + BÉNÉFICES ---------- */}
      <section className="bg-ink-50 py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Inclus */}
            <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card lg:p-8">
              <h3 className="text-[15px] font-extrabold tracking-wide text-ink-900 uppercase">
                {locale === "fr" ? "Ce qui est inclus" : "What's included"}
              </h3>
              <ul className="mt-5 space-y-3">
                {service.includes[locale].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-tracoli-50 text-tracoli-500">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    <span className="text-[13.5px] leading-relaxed text-ink-700">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bénéfices */}
            <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card lg:p-8">
              <h3 className="flex items-center gap-2 text-[15px] font-extrabold tracking-wide text-ink-900 uppercase">
                <Target className="size-4 text-tracoli-500" />
                {locale === "fr" ? "Vos bénéfices" : "Your benefits"}
              </h3>
              <ul className="mt-5 space-y-3">
                {service.benefits[locale].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-1.5 size-1 shrink-0 rounded-full bg-tracoli-500" />
                    <span className="text-[13.5px] leading-relaxed text-ink-700">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
            <HelpCircle className="size-6 text-tracoli-500" />
            {locale === "fr" ? "Questions fréquentes" : "Frequently asked questions"}
          </h2>

          <div className="mt-8 space-y-4">
            {service.faq.map((item, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-ink-200 bg-white p-5 shadow-card transition-all open:border-tracoli-500/40 open:shadow-card-lg"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-3 list-none">
                  <span className="text-[14px] font-bold text-ink-900">
                    {item.question[locale]}
                  </span>
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-tracoli-50 text-tracoli-500 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[13.5px] leading-relaxed text-ink-500">
                  {item.answer[locale]}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA FINAL → retour #devis ---------- */}
      <section className="bg-gradient-to-b from-white to-ink-50 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-tracoli-200 bg-white p-8 text-center shadow-card-lg sm:p-12">
            <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-tracoli-500/10 blur-3xl" />

            <div className="relative">
              <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-3xl">
                {locale === "fr"
                  ? "Prêt à lancer votre projet ?"
                  : "Ready to launch your project?"}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-ink-500">
                {locale === "fr"
                  ? "Envoyez-nous votre projet et recevez une proposition personnalisée sous 2 heures ouvrées."
                  : "Send us your project and receive a personalized proposal within 2 business hours."}
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/#devis"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-tracoli-500 px-6 py-3.5 text-[13px] font-bold text-white shadow-[var(--shadow-red)] transition-all hover:bg-tracoli-600 active:scale-[0.98]"
                >
                  {locale === "fr" ? "Envoyer mon projet" : "Send my project"}
                  <ArrowRight className="size-3.5" />
                </Link>
                <a
                  href={waLink(
                    `${locale === "fr" ? "Bonjour" : "Hello"} ${CONTACT.manager}, ${locale === "fr" ? "je souhaite discuter du service" : "I'd like to discuss the service"} : ${service.title[locale]}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-ink-200 bg-white px-6 py-3.5 text-[13px] font-bold text-ink-800 transition-colors hover:border-ink-300"
                >
                  {locale === "fr" ? "Discuter sur WhatsApp" : "Chat on WhatsApp"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}