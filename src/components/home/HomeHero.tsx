import Link from "next/link";
import Image from "next/image";
import { Search, MapPin } from "lucide-react";

export default function HomeHero() {
  return (
    <section className="bg-white pt-28 pb-16 sm:pt-32 lg:pt-44 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="text-center lg:text-left">

            <h1 className="text-4xl leading-[1.08] font-extrabold tracking-tight text-ink-900 text-balance sm:text-5xl lg:text-6xl">
              Votre sourcing{" "}
              <span className="text-tracoli-500">Chine → Afrique</span>,
              simplement.
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-500 lg:mx-0 lg:text-lg">
              Nous trouvons vos fournisseurs, sécurisons vos achats et
              organisons votre livraison jusqu&apos;à destination.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                  href="/sourcer"
                  className="group inline-flex min-h-[56px] items-center justify-center gap-2.5 rounded-2xl bg-tracoli-500 px-8 py-4 text-sm font-bold text-white shadow-[var(--shadow-red)] transition-colors duration-200 hover:bg-tracoli-600 active:scale-[0.98]"
                >
                  <Search className="size-4" />
                  Trouver un produit
                </Link>
              <Link
                  href="/suivre"
                  className="inline-flex min-h-[56px] items-center justify-center gap-2.5 rounded-2xl border-2 border-ink-200 bg-white px-8 py-4 text-sm font-bold text-ink-800 transition-colors duration-200 hover:border-tracoli-300 active:scale-[0.98]"
                >
                  <MapPin className="size-4 text-tracoli-500" />
                  Suivre ma commande
                </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-[4/5]">
              <Image
                src="/images/hero-delivery.webp"
                alt="Livreur souriant TRACOLI avec des colis"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
