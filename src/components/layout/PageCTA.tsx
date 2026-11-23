import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
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
  description = "Notre équipe vous répond avec une proposition concrète.",
  primaryLabel = "Passer commande",
  primaryHref = "/demande",
  waMessage,
}: PageCTAProps) {
  const message =
    waMessage ??
    `Bonjour ${CONTACT.manager}, je souhaite discuter de mon projet.`;

  return (
    <section className="bg-white py-12 pb-28 lg:py-20 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-ink-900 px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
          <h2 className="max-w-2xl text-3xl leading-[1.15] font-extrabold tracking-tight text-white text-balance sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 lg:text-lg">
            {description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={primaryHref}
              className="group inline-flex min-h-[56px] items-center justify-center gap-2.5 rounded-2xl bg-tracoli-500 px-8 py-4 text-[15px] font-bold text-white shadow-[var(--shadow-red)] transition-colors duration-200 hover:bg-tracoli-600 active:scale-[0.98]"
            >
              {primaryLabel}
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
            <a
              href={waLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[56px] items-center justify-center gap-2.5 rounded-2xl border-2 border-white/30 px-8 py-4 text-[15px] font-bold text-white transition-colors duration-200 hover:border-white active:scale-[0.98]"
            >
              <FaWhatsapp className="size-5 text-[#25D366]" aria-hidden />
              Écrire sur WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
