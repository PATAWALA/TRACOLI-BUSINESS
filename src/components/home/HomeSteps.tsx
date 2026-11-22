import Link from "next/link";
import { ArrowRight } from "lucide-react";

const STEPS = [
  {
    n: "1",
    title: "Décrivez ce que vous cherchez",
    body: "Un nom, une photo ou un lien : dites-nous quel produit vous voulez importer.",
  },
  {
    n: "2",
    title: "Recevez votre devis",
    body: "Nous cherchons les fournisseurs et nous vous envoyons une cotation.",
  },
  {
    n: "3",
    title: "Suivez votre colis",
    body: "Nous organisons le transport. Avec le code de votre colis, vous suivez son avancement sur le site.",
  },
];

export default function HomeSteps() {
  return (
    <section className="bg-ink-50 py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="mx-auto max-w-2xl text-center text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl">
          De votre idée à votre colis, en trois étapes
        </h2>

        <ol className="relative mt-12 grid gap-4 md:grid-cols-3 md:gap-6">
          <div
            aria-hidden="true"
            className="absolute inset-x-[16%] top-[2.1rem] hidden h-px bg-ink-200 md:block"
          />
          {STEPS.map((step) => (
            <li
              key={step.n}
              className="relative flex flex-col rounded-2xl border border-ink-200 bg-white p-6 shadow-card"
            >
              <span className="grid size-10 place-items-center rounded-full border border-tracoli-500 bg-white text-base font-extrabold text-tracoli-500 tabular-nums">
                {step.n}
              </span>
              <h3 className="mt-5 text-lg leading-snug font-extrabold tracking-tight text-ink-900">
                {step.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-ink-500">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex justify-center">
          <Link
            href="/sourcer"
            className="group inline-flex min-h-[56px] items-center justify-center gap-2.5 rounded-2xl bg-tracoli-500 px-8 py-4 text-sm font-bold text-white shadow-[var(--shadow-red)] transition-colors duration-200 hover:bg-tracoli-600 active:scale-[0.98]"
          >
            Trouver un produit
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
