"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { CONTACT } from "@/data/config/contact";
import { waLink } from "@/data/shared/helpers";

type PageCTAProps = {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  waMessage?: string;
};

export default function PageCTA({
  title = "Prêt à lancer votre projet ?",
  description = "Notre équipe vous répond sous 2 heures ouvrées avec une proposition concrète.",
  primaryLabel = "Demander une cotation",
  primaryHref = "/#devis",
  waMessage,
}: PageCTAProps) {
  const message =
    waMessage ??
    `Bonjour ${CONTACT.manager}, je souhaite discuter de mon projet.`;

  return (
    <section className="bg-white py-12 pb-24 lg:py-16 lg:pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-tracoli-200 bg-gradient-to-br from-tracoli-50 via-white to-white p-8 text-center shadow-card-lg sm:p-12">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-tracoli-500/10 blur-3xl" />

          <div className="relative">
            <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-3xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[14px] leading-relaxed text-ink-500 lg:text-[14.5px]">
              {description}
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href={primaryHref}
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-tracoli-500 px-6 py-3.5 text-[13px] font-bold text-white shadow-[var(--shadow-red)] transition-all hover:bg-tracoli-600 active:scale-[0.98]"
              >
                {primaryLabel}
                <ArrowRight className="size-3.5" />
              </Link>
              <a
                href={waLink(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-ink-200 bg-white px-6 py-3.5 text-[13px] font-bold text-ink-800 transition-colors hover:border-ink-300"
              >
                <MessageCircle className="size-3.5 text-emerald-500" />
                WhatsApp direct
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
