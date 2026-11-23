import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

/** Offre : l'expédition (carte large, texte à gauche, photo à droite). */
export default function HomeShipping() {
  return (
    <article className="reveal-up grid overflow-hidden rounded-3xl border border-ink-200 bg-ink-50 sm:grid-cols-[1.3fr_1fr] lg:col-span-2">
      <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
        <h3 className="text-2xl leading-tight font-extrabold tracking-tight text-ink-900 text-balance sm:text-3xl">
          Vous devez expédier vers l&apos;Afrique&nbsp;?
        </h3>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-700">
          Fret aérien ou maritime, groupage ou conteneur complet, douane comprise.
        </p>
        <div>
          <Link
            href="/expedier"
            className="group mt-6 inline-flex min-h-[56px] items-center gap-2.5 rounded-2xl bg-tracoli-500 px-7 py-4 text-[15px] font-bold text-white shadow-[var(--shadow-red)] transition-colors duration-200 hover:bg-tracoli-600 active:scale-[0.98]"
          >
            Estimer mon fret
            <ArrowRight
              className="size-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </div>
      </div>

      <div className="relative order-first aspect-[3/2] sm:order-none sm:aspect-auto sm:min-h-64">
        <Image
          src="/images/box-handover.webp"
          alt="Remise de colis entre deux personnes"
          fill
          sizes="(max-width: 640px) 100vw, 28vw"
          className="object-cover mix-blend-multiply"
        />
      </div>
    </article>
  );
}
