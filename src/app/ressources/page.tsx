import { ArrowRight, Check } from "lucide-react";
import ResourcesBrowser from "@/components/shop/ResourcesBrowser";
import { RESOURCES_HERO, SHOP_STEPS, CONTACT, waLink } from "@/data/content";
import { getShopResources } from "@/lib/resources";

// Les livres viennent de la base : la page se rafraîchit toutes les 5 minutes
// (et tout de suite quand un livre est publié ou modifié depuis l'admin).
export const revalidate = 300;

export default async function ResourcesPage() {
  const resources = await getShopResources();

  return (
    <main className="pt-header">
      <section className="border-b border-ink-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="max-w-3xl text-4xl leading-[1.08] font-extrabold tracking-tight text-ink-900 text-balance sm:text-5xl lg:text-6xl">
            {RESOURCES_HERO.title}
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-700 lg:text-lg">
            {RESOURCES_HERO.subtitle}
          </p>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ResourcesBrowser resources={resources} />
        </div>
      </section>

      <section className="border-y border-ink-200 bg-ink-50 py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="max-w-2xl text-3xl leading-[1.15] font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl">
            Comment commander un livre
          </h2>
          <ol className="mt-8 grid gap-5 md:grid-cols-3 lg:gap-6">
            {SHOP_STEPS.map((step, i) => (
              <li key={step.title} className="rounded-3xl border border-ink-200 bg-white p-6 sm:p-7">
                <span className="grid size-10 place-items-center rounded-full bg-tracoli-500 text-base font-extrabold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-extrabold tracking-tight text-ink-900">{step.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-ink-700">{step.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-600">
            Le paiement et l&apos;envoi du PDF se font directement entre vous et le vendeur, sur WhatsApp. Aucun
            paiement n&apos;est demandé sur ce site.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-16 lg:px-8">
          <div>
            <h2 className="max-w-xl text-3xl leading-[1.15] font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl">
              Vous avez un livre ou un guide à vendre ?
            </h2>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-700 lg:text-lg">
              Publiez-le dans la boutique TRACOLI et touchez des importateurs partout en Afrique. Les commandes
              arrivent directement sur votre WhatsApp.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "Gratuit ou payant, c'est vous qui choisissez",
                "Chaque commande arrive sur votre WhatsApp",
                "Vous échangez directement avec vos acheteurs",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-base text-ink-800">
                  <Check className="mt-0.5 size-5 shrink-0 text-tracoli-500" strokeWidth={3} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-ink-200 bg-white p-6 sm:p-8">
            <p className="text-lg font-extrabold tracking-tight text-ink-900">Publier mon livre</p>
            <p className="mt-2 text-base leading-relaxed text-ink-700">
              Envoyez-nous le titre, la description, la couverture et votre PDF sur WhatsApp : nous le mettons en ligne.
            </p>

            <a
              href={waLink(
                `Bonjour ${CONTACT.manager}, je souhaite publier mon livre dans la boutique TRACOLI. Voici le titre, la description, le prix et mon PDF.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex min-h-[56px] w-full items-center justify-center gap-2.5 rounded-2xl bg-tracoli-500 px-8 py-4 text-[15px] font-bold text-white shadow-[var(--shadow-red)] transition-colors duration-200 hover:bg-tracoli-600 active:scale-[0.98]"
            >
              Publier mon livre
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white pb-28 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-tracoli-500 px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
            <h2 className="max-w-2xl text-3xl leading-[1.15] font-extrabold tracking-tight text-white text-balance sm:text-4xl">
              Envie d&apos;aller plus loin et d&apos;en faire votre métier ?
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white lg:text-lg">
              Nos formations vous accompagnent pas à pas, avec un mentorat individuel et des sessions en direct avec
              nos équipes en Chine.
            </p>

            <a
              href={waLink(
                `Bonjour ${CONTACT.manager}, je souhaite en savoir plus sur vos formations en sourcing et importation.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex min-h-[56px] items-center justify-center gap-2.5 rounded-2xl bg-white px-8 py-4 text-[15px] font-bold text-tracoli-600 transition-colors duration-200 hover:bg-tracoli-50 active:scale-[0.98]"
            >
              Demander le programme
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
