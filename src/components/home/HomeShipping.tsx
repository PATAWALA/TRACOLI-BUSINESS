import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function HomeShipping() {
  return (
    <section className="bg-ink-50 py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="order-2 lg:order-1 reveal-l">

            <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl lg:text-5xl">
              Vous devez expédier vers l&apos;Afrique ?
            </h2>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-500 lg:text-lg">
              Fret aérien ou maritime, groupage ou conteneur complet.
              Coordination des formalités douanières incluse. Nous organisons
              votre expédition de bout en bout.
            </p>

            <div className="mt-8"><Link
                href="/expedier"
                className="group inline-flex min-h-[56px] items-center gap-2.5 rounded-2xl bg-tracoli-500 px-7 py-4 text-sm font-bold text-white shadow-[var(--shadow-red)] transition-colors duration-200 hover:bg-tracoli-600 active:scale-[0.98]"
              >
                Estimer mon fret
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link></div>
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
