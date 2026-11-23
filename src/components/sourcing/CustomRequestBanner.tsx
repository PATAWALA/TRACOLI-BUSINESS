import { ArrowRight } from "lucide-react";

export default function CustomRequestBanner() {
  return (
    <div className="grid gap-6 rounded-3xl bg-ink-50 p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10 lg:p-12">
      <div>
        <h3 className="text-2xl leading-tight font-extrabold tracking-tight text-ink-900 text-balance sm:text-3xl">
          Vous ne trouvez pas votre produit&nbsp;?
        </h3>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-700">
          Envoyez-nous simplement une photo, un lien ou une description. Nos
          acheteurs en Chine trouvent le fournisseur idéal et vous envoient une
          cotation sous 24h.
        </p>
      </div>

      <a
        href="#sourcing"
        className="group inline-flex min-h-[56px] items-center justify-center gap-2.5 rounded-2xl bg-tracoli-500 px-8 py-4 text-[15px] font-bold text-white shadow-[var(--shadow-red)] transition-colors duration-200 hover:bg-tracoli-600 active:scale-[0.98]"
      >
        Lancer une recherche
        <ArrowRight
          className="size-4 transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden
        />
      </a>
    </div>
  );
}
