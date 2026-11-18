import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";

export default function HomeTracking() {
  return (
    <section className="border-t border-tracoli-100/50 bg-gradient-to-b from-white via-tracoli-50/20 to-white py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="relative aspect-[4/3] w-full overflow-hidden reveal-l">
            <Image
              src="/images/scooter.webp"
              alt="Coursier moto TRACOLI"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-contain"
            />
          </div>

          <div className="reveal-r">
            <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-white/80 px-4 py-2 text-xs font-bold tracking-wider text-tracoli-500 uppercase shadow-sm backdrop-blur-sm">
              <MapPin className="size-3.5" />
              Suivi
            </span>

            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl lg:text-5xl">
              Suivez votre marchandise en temps réel
            </h2>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-500 lg:text-lg">
              Entrez votre référence de commande et consultez l&apos;avancement
              de votre expédition, de l&apos;entrepôt en Chine jusqu&apos;à
              votre porte.
            </p>

            <div className="mt-8 inline-block transition-transform hover:scale-[1.02] active:scale-[0.98]">
              <Link
                href="/suivre"
                className="group inline-flex items-center gap-2.5 rounded-2xl bg-tracoli-500 px-7 py-4 text-sm font-bold text-white shadow-[var(--shadow-red)] transition-all duration-300 hover:bg-tracoli-600 hover:shadow-lg"
              >
                Suivre ma commande
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
