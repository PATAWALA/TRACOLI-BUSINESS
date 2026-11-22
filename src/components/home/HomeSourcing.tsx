import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

/** Offre principale : la recherche de produit (grande carte verticale). */
export default function HomeSourcing() {
  return (
    <article className="reveal-up relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-3xl bg-ink-900 lg:row-span-2 lg:min-h-0">
      <Image
        src="/images/warehouse.webp"
        alt="Entrepôt logistique : des opérateurs préparent des colis sur un tapis roulant"
        fill
        sizes="(max-width: 1024px) 100vw, 33vw"
        className="-z-10 object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-900 via-ink-900/70 to-transparent"
      />

      <div className="p-6 pt-40 sm:p-8 sm:pt-48">
        <h3 className="text-2xl leading-tight font-extrabold tracking-tight text-white text-balance sm:text-3xl">
          Vous cherchez un produit en Chine&nbsp;?
        </h3>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/85">
          Nous identifions les meilleurs fournisseurs, négocions les prix et
          coordonnons toute la chaîne pour vous.
        </p>
        <Link
          href="/sourcer"
          className="group mt-6 inline-flex min-h-[56px] items-center gap-2.5 rounded-2xl bg-tracoli-500 px-7 py-4 text-[15px] font-bold text-white shadow-[var(--shadow-red)] transition-colors duration-200 hover:bg-tracoli-600 active:scale-[0.98]"
        >
          Trouver un produit
          <ArrowRight
            className="size-4 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      </div>
    </article>
  );
}
