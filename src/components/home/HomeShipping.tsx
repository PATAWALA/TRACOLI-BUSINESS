import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Plane } from "lucide-react";

export default function HomeShipping() {
  return (
    <section className="border-t border-tracoli-100/50 bg-gradient-to-b from-white via-tracoli-50/30 to-white py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="order-2 lg:order-1 reveal-l">
            <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-white/80 px-4 py-2 text-xs font-bold tracking-wider text-tracoli-500 uppercase shadow-sm backdrop-blur-sm">
              <Plane className="size-3.5" />
              Expédition
            </span>

            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl lg:text-5xl">
              Vous devez expédier vers l&apos;Afrique ?
            </h2>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-500 lg:text-lg">
              Fret aérien ou maritime, groupage ou conteneur complet.
              Coordination des formalités douanières incluse. Nous organisons
              votre expédition de bout en bout.
            </p>

            <div className="mt-8 inline-block transition-transform hover:scale-[1.02] active:scale-[0.98]">
              <Link
                href="/expedier"
                className="group inline-flex items-center gap-2.5 rounded-2xl bg-tracoli-500 px-7 py-4 text-sm font-bold text-white shadow-[var(--shadow-red)] transition-all duration-300 hover:bg-tracoli-600 hover:shadow-lg"
              >
                Estimer mon fret
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="relative order-1 aspect-[4/3] w-full overflow-hidden lg:order-2 reveal-r">
            <Image
              src="/images/box-handover.webp"
              alt="Remise de colis TRACOLI"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
