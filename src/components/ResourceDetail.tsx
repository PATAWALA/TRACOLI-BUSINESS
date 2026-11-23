import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import {
  CONTACT,
  RESOURCES,
  waLink,
  type Resource,
  type ResourceType,
} from "@/data/content";

const TYPE_LABELS: Record<ResourceType, string> = {
  guide: "Guide",
  ebook: "Ebook",
  formation: "Formation",
  template: "Modèle",
};

export default function ResourceDetail({ resource }: { resource: Resource }) {
  const isPremium = resource.access === "premium";

  const ctaMessage = isPremium
    ? `Bonjour ${CONTACT.manager}, je souhaite acheter la ressource : "${resource.title}".`
    : `Bonjour ${CONTACT.manager}, je souhaite recevoir la ressource gratuite : "${resource.title}".`;

  const related = RESOURCES.filter((r) => r.id !== resource.id).slice(0, 3);

  return (
    <main className="pt-header">
      <section className="border-b border-ink-200 bg-white py-10 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/ressources"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-ink-700 transition-colors hover:text-tracoli-600"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Toutes les ressources
          </Link>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-14">
            <div>
              <p className="text-sm font-semibold text-ink-700">
                {TYPE_LABELS[resource.type]} · {resource.level} ·{" "}
                {isPremium ? "Premium" : "Gratuit"}
              </p>

              <h1 className="mt-3 text-4xl leading-[1.08] font-extrabold tracking-tight text-ink-900 text-balance sm:text-5xl">
                {resource.title}
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-700 lg:text-lg">
                {resource.longDescription}
              </p>

              <p className="mt-5 text-sm text-ink-700">
                {resource.meta} · {resource.format}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-5 rounded-3xl bg-ink-50 p-5 sm:p-6">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-ink-700">
                    {isPremium ? "Accès premium" : "Accès gratuit"}
                  </p>
                  <p className="mt-0.5 text-3xl font-extrabold tracking-tight text-ink-900">
                    {isPremium ? resource.price : "0 USD"}
                  </p>
                </div>

                <a
                  href={waLink(ctaMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-[56px] items-center justify-center gap-2.5 rounded-2xl bg-tracoli-500 px-8 py-4 text-[15px] font-bold text-white shadow-[var(--shadow-red)] transition-colors duration-200 hover:bg-tracoli-600 active:scale-[0.98]"
                >
                  {isPremium ? "Acheter maintenant" : "Télécharger gratuitement"}
                  <ArrowRight
                    className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden
                  />
                </a>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-ink-100">
              <Image
                src={resource.image}
                alt={resource.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:px-8">
          <div className="space-y-14">
            <div>
              <h2 className="text-3xl leading-[1.15] font-extrabold tracking-tight text-ink-900 sm:text-4xl">
                Ce que vous allez apprendre
              </h2>
              <ul className="mt-6 space-y-3.5">
                {resource.outcomes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check
                      className="mt-0.5 size-5 shrink-0 text-tracoli-500"
                      strokeWidth={3}
                      aria-hidden
                    />
                    <span className="text-base leading-relaxed text-ink-800">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-3xl leading-[1.15] font-extrabold tracking-tight text-ink-900 sm:text-4xl">
                Contenu détaillé
              </h2>
              <ol className="mt-6 divide-y divide-ink-200 border-y border-ink-200">
                {resource.chapters.map((chapter, i) => (
                  <li key={i} className="py-6">
                    <h3 className="flex items-baseline gap-3 text-lg font-extrabold tracking-tight text-ink-900">
                      <span className="text-tracoli-600 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {chapter.title}
                    </h3>
                    <ul className="mt-3 space-y-2 pl-9">
                      {chapter.items.map((item) => (
                        <li
                          key={item}
                          className="list-disc text-base leading-relaxed text-ink-700"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl bg-ink-50 p-6 sm:p-7">
              <h3 className="text-lg font-extrabold tracking-tight text-ink-900">
                Pour qui ?
              </h3>
              <ul className="mt-4 space-y-3">
                {resource.audience.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-base leading-relaxed text-ink-800"
                  >
                    <Check
                      className="mt-0.5 size-5 shrink-0 text-tracoli-500"
                      strokeWidth={3}
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-ink-200 bg-white p-6 sm:p-7">
              <h3 className="text-lg font-extrabold tracking-tight text-ink-900">
                Besoin d&apos;aide ?
              </h3>
              <p className="mt-2 text-base leading-relaxed text-ink-700">
                Contactez {CONTACT.manager}, notre responsable service client.
                Réponse sous 2 heures ouvrées.
              </p>
              <a
                href={waLink(
                  `Bonjour ${CONTACT.manager}, j'ai une question sur la ressource : "${resource.title}".`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl border-2 border-ink-200 bg-white px-5 text-[15px] font-bold text-ink-800 transition-colors hover:border-ink-300"
              >
                Contacter par WhatsApp
                <ArrowRight className="size-4" aria-hidden />
              </a>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-ink-50 py-16 pb-28 lg:py-20 lg:pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl leading-[1.15] font-extrabold tracking-tight text-ink-900 sm:text-4xl">
              À découvrir également
            </h2>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {related.map((r) => {
                const relPremium = r.access === "premium";
                return (
                  <Link
                    key={r.id}
                    href={`/ressources/${r.slug}`}
                    className="group flex flex-col overflow-hidden rounded-3xl border border-ink-200 bg-white transition-colors hover:border-tracoli-500/40"
                  >
                    <div className="relative aspect-video overflow-hidden bg-ink-100">
                      <Image
                        src={r.image}
                        alt={r.imageAlt}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <p className="text-sm font-semibold text-ink-700">
                        {TYPE_LABELS[r.type]} · {r.meta}
                      </p>
                      <h3 className="mt-2 text-lg leading-snug font-extrabold tracking-tight text-ink-900 group-hover:text-tracoli-600">
                        {r.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-ink-700">
                        {r.description}
                      </p>
                      <p className="mt-auto pt-4 text-base font-extrabold text-ink-900">
                        {relPremium ? r.price : "Gratuit"}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
