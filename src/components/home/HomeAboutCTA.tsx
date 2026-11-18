import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import NewsletterForm from "@/components/home/NewsletterForm";

export default function HomeAboutCTA() {
  return (
    <section className="border-t border-tracoli-100/50 bg-gradient-to-b from-tracoli-50 via-tracoli-100/30 to-tracoli-50 py-20 pb-28 lg:py-32 lg:pb-24">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <div className="reveal-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-white/80 px-4 py-2 text-xs font-bold tracking-wider text-tracoli-500 uppercase shadow-sm backdrop-blur-sm">
            <Users className="size-3.5" />
            Qui sommes-nous
          </span>

          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl lg:text-5xl">
            TRACOLI Business connecte les entrepreneurs africains aux meilleurs
            fournisseurs d&apos;Asie
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-500 lg:text-lg">
            Nous accompagnons les commerçants et entrepreneurs dans
            leurs opérations de sourcing, d&apos;expédition et de
            coordination douanière sur le corridor Chine–Afrique.
          </p>

          <div className="mt-8 inline-block transition-transform hover:scale-[1.02] active:scale-[0.98]">
            <Link
              href="/a-propos"
              className="group inline-flex items-center gap-2.5 rounded-2xl border-2 border-tracoli-200 bg-white/80 px-7 py-4 text-sm font-bold text-tracoli-600 backdrop-blur-sm transition-all duration-300 hover:border-tracoli-400 hover:shadow-md"
            >
              Découvrir notre histoire
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
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
