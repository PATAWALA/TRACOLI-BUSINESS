import Image from "next/image";
import { ArrowRight } from "lucide-react";

/** Offre : le suivi par code (carte large avec le champ de saisie). */
export default function HomeTracking() {
  return (
    <article className="reveal-up grid overflow-hidden rounded-3xl border border-ink-200 bg-white sm:grid-cols-[1.3fr_1fr] lg:col-span-2">
      <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
        <h3 className="text-2xl leading-tight font-extrabold tracking-tight text-ink-900 text-balance sm:text-3xl">
          Suivez votre marchandise
        </h3>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-700">
          Entrez le code de votre colis et consultez l&apos;avancement de votre
          expédition, de l&apos;entrepôt en Chine jusqu&apos;à votre porte.
        </p>

        <form
          action="/suivre"
          method="get"
          className="mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
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
            className="group inline-flex min-h-[56px] shrink-0 items-center justify-center gap-2.5 rounded-2xl bg-ink-900 px-7 py-4 text-[15px] font-bold text-white transition-colors duration-200 hover:bg-ink-800 active:scale-[0.98]"
          >
            Suivre
            <ArrowRight
              className="size-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden
            />
          </button>
        </form>
      </div>

      <div className="relative order-first aspect-[3/2] sm:order-none sm:aspect-auto sm:min-h-64">
        <Image
          src="/images/scooter.webp"
          alt="Coursier à moto en livraison"
          fill
          sizes="(max-width: 640px) 100vw, 28vw"
          className="object-contain mix-blend-multiply"
        />
      </div>
    </article>
  );
}
