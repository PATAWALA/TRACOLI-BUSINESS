"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { CONTACT } from "@/data/config/contact";
import { waLink } from "@/data/shared/helpers";
import { useLocale } from "@/hooks/useLocale";

export default function HomeCTA() {
  const { locale } = useLocale();

  return (
    <section className="bg-white py-12 pb-24 lg:py-16 lg:pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-tracoli-200 bg-gradient-to-br from-tracoli-50 via-white to-white p-8 text-center shadow-card-lg sm:p-12">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-tracoli-500/10 blur-3xl" />

          <div className="relative">
            <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-3xl">
              {locale === "fr"
                ? "Prêt à lancer votre projet ?"
                : "Ready to launch your project?"}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-ink-500">
              {locale === "fr"
                ? "Contactez notre équipe pour une cotation personnalisée sous 2 heures ouvrées."
                : "Contact our team for a personalized quote within 2 business hours."}
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/sourcer"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-tracoli-500 px-6 py-3.5 text-[13px] font-bold text-white shadow-[var(--shadow-red)] transition-all hover:bg-tracoli-600 active:scale-[0.98]"
              >
                {locale === "fr" ? "Lancer une recherche" : "Start a search"}
                <ArrowRight className="size-3.5" />
              </Link>
              <a
                href={waLink(
                  `${locale === "fr" ? "Bonjour" : "Hello"} ${CONTACT.manager}, ${locale === "fr" ? "je souhaite discuter de mon projet." : "I'd like to discuss my project."}`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-ink-200 bg-white px-6 py-3.5 text-[13px] font-bold text-ink-800 transition-colors hover:border-ink-300"
              >
                <MessageCircle className="size-3.5 text-emerald-500" />
                {locale === "fr" ? "WhatsApp direct" : "Direct WhatsApp"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}