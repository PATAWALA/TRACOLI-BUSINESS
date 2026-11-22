import Link from "next/link";
import Image from "next/image";
import { Search, MapPin } from "lucide-react";

const DESTINATIONS = ["Bujumbura", "Kinshasa", "Goma", "Kampala", "Mombasa"];

export default function HomeHero() {
  return (
    <section className="bg-white pt-24 pb-14 sm:pt-28 lg:pt-36 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl leading-[1.08] font-extrabold tracking-tight text-ink-900 text-balance sm:text-5xl lg:text-6xl">
              Votre sourcing{" "}
              <span className="whitespace-nowrap text-tracoli-500">
                Chine → Afrique
              </span>
              , simplement.
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-700 lg:mx-0 lg:text-xl">
              Nous trouvons vos fournisseurs, sécurisons vos achats et
              organisons votre livraison jusqu&apos;à destination.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href="/sourcer"
                className="inline-flex min-h-[56px] items-center justify-center gap-2.5 rounded-2xl bg-tracoli-500 px-8 py-4 text-[15px] font-bold text-white shadow-[var(--shadow-red)] transition-colors duration-200 hover:bg-tracoli-600 active:scale-[0.98]"
              >
                <Search className="size-[18px]" aria-hidden />
                Trouver un produit
              </Link>
              <Link
                href="/suivre"
                className="inline-flex min-h-[56px] items-center justify-center gap-2.5 rounded-2xl border-2 border-ink-200 bg-white px-8 py-4 text-[15px] font-bold text-ink-800 transition-colors duration-200 hover:border-tracoli-300 active:scale-[0.98]"
              >
                <MapPin className="size-[18px] text-tracoli-500" aria-hidden />
                Suivre ma commande
              </Link>
            </div>

            <div className="mt-10 border-t border-ink-200 pt-6">
              <p className="text-sm font-semibold text-ink-700">
                Nous livrons à
              </p>
              <ul className="mt-2.5 flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-[15px] font-bold text-ink-900 lg:justify-start">
                {DESTINATIONS.map((city) => (
                  <li key={city}>{city}</li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[20rem] overflow-hidden rounded-3xl bg-tracoli-50 sm:max-w-sm lg:max-w-none">
              <Image
                src="/images/hero-delivery.webp"
                alt="Livreur TRACOLI remettant des colis à une cliente"
                fill
                priority
                sizes="(max-width: 1024px) 384px, 40vw"
                className="object-cover object-center mix-blend-multiply"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
