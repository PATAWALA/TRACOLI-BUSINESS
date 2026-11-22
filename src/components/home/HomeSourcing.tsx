import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function HomeSourcing() {
  return (
    <section className="bg-white py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl reveal-l">
            <Image
              src="/images/warehouse.webp"
              alt="Entrepôt logistique TRACOLI"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>

          <div className="reveal-r">

            <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl lg:text-5xl">
              Vous cherchez un produit en Chine ?
            </h2>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-500 lg:text-lg">
              Nous identifions les meilleurs fournisseurs, négocions les prix et
              coordonnons l&apos;ensemble de la chaîne d&apos;approvisionnement
              pour vous.
            </p>

            <div className="mt-8"><Link
                href="/sourcer"
                className="group inline-flex min-h-[56px] items-center gap-2.5 rounded-2xl bg-tracoli-500 px-7 py-4 text-sm font-bold text-white shadow-[var(--shadow-red)] transition-colors duration-200 hover:bg-tracoli-600 active:scale-[0.98]"
              >
                Trouver un produit
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link></div>
          </div>
        </div>
      </div>
    </section>
  );
}
