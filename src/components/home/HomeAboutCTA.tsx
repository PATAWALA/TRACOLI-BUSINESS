import Link from "next/link";
import { ArrowRight } from "lucide-react";
import NewsletterForm from "@/components/home/NewsletterForm";

export default function HomeAboutCTA() {
  return (
    <section className="bg-white py-16 pb-28 lg:py-24 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-tracoli-500 px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <h2 className="max-w-3xl text-3xl leading-[1.15] font-extrabold tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
            TRACOLI Business connecte les entrepreneurs africains aux meilleurs
            fournisseurs d&apos;Asie.
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white lg:text-lg">
            Nous accompagnons les commerçants et entrepreneurs dans leurs
            opérations de sourcing, d&apos;expédition et de coordination
            douanière sur le corridor Chine–Afrique.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/demande"
              className="group inline-flex min-h-[56px] items-center justify-center gap-2.5 rounded-2xl bg-white px-8 py-4 text-[15px] font-bold text-tracoli-600 transition-colors duration-200 hover:bg-tracoli-50 active:scale-[0.98]"
            >
              Passer commande
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
            <Link
              href="/a-propos"
              className="inline-flex min-h-[56px] items-center justify-center rounded-2xl border-2 border-white px-8 py-4 text-[15px] font-bold text-white transition-colors duration-200 hover:bg-white/10 active:scale-[0.98]"
            >
              Découvrir notre histoire
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-md text-center">
          <p className="text-sm font-bold text-ink-700">
            Recevez nos conseils import &amp; les offres de groupage
          </p>
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
