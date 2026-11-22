import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function HomeTracking() {
  return (
    <section className="bg-white py-20 lg:py-32">
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

            <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl lg:text-5xl">
              Suivez votre marchandise en temps réel
            </h2>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-500 lg:text-lg">
              Entrez le code de votre colis et consultez l&apos;avancement
              de votre expédition, de l&apos;entrepôt en Chine jusqu&apos;à
              votre porte.
            </p>

            <form
              action="/suivre"
              method="get"
              className="mt-8 flex max-w-lg flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="home-track-code" className="sr-only">
                Code de votre colis
              </label>
              <input
                id="home-track-code"
                name="ref"
                type="text"
                required
                autoCapitalize="characters"
                autoComplete="off"
                spellCheck={false}
                placeholder="Code de votre colis"
                className="min-h-[56px] w-full rounded-2xl border-2 border-ink-200 bg-white px-5 py-4 text-base text-ink-900 outline-none transition-colors placeholder:text-ink-500 focus:border-tracoli-500 focus:ring-4 focus:ring-tracoli-500/10"
              />
              <button
                type="submit"
                className="group inline-flex min-h-[56px] shrink-0 items-center justify-center gap-2.5 rounded-2xl border-2 border-ink-200 bg-white px-7 py-4 text-sm font-bold text-ink-800 transition-colors duration-200 hover:border-tracoli-300 active:scale-[0.98]"
              >
                Suivre
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
