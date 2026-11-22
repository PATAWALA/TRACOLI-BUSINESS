import Link from "next/link";
import { ArrowRight } from "lucide-react";
import NewsletterForm from "@/components/home/NewsletterForm";

export default function HomeAboutCTA() {
  return (
    <section className="bg-white py-20 pb-28 lg:py-32 lg:pb-24">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <div className="reveal-up">

          <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl lg:text-5xl">
            TRACOLI Business connecte les entrepreneurs africains aux meilleurs
            fournisseurs d&apos;Asie
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-500 lg:text-lg">
            Nous accompagnons les commerçants et entrepreneurs dans
            leurs opérations de sourcing, d&apos;expédition et de
            coordination douanière sur le corridor Chine–Afrique.
          </p>

          <div className="mt-8"><Link
              href="/a-propos"
              className="group inline-flex min-h-[56px] items-center gap-2.5 rounded-2xl border-2 border-ink-200 bg-white px-7 py-4 text-sm font-bold text-ink-800 transition-colors duration-200 hover:border-tracoli-300 active:scale-[0.98]"
            >
              Découvrir notre histoire
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link></div>
        </div>

        <div className="reveal-up mx-auto mt-16 max-w-md">
          <p className="text-sm font-bold text-ink-700">
            Recevez nos conseils import &amp; les offres de groupage
          </p>
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
