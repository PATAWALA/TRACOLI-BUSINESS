import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import ResourceCover from "@/components/shop/ResourceCover";
import ResourceActionButton from "@/components/shop/ResourceActionButton";
import { CONTACT, type Resource } from "@/data/content";
import { TYPE_LABELS, getResourceQuestionLink } from "@/lib/resource-actions";

export default function ResourceDetail({
  resource,
  related,
}: {
  resource: Resource;
  related: Resource[];
}) {
  const isPremium = resource.access === "premium";
  const seller = resource.sellerName || CONTACT.brand;
  const meta = [resource.meta, resource.format].filter(Boolean).join(" · ");

  return (
    <main className="pt-header">
      <section className="border-b border-ink-200 bg-white py-10 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/ressources"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-ink-700 transition-colors hover:text-tracoli-600"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Retour à la boutique
          </Link>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-14">
            <div>
              <p className="text-sm font-semibold text-ink-700">
                {TYPE_LABELS[resource.type]} · {resource.level} · {isPremium ? "Payant" : "Gratuit"}
              </p>

              <h1 className="mt-3 text-4xl leading-[1.08] font-extrabold tracking-tight text-ink-900 text-balance sm:text-5xl">
                {resource.title}
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed whitespace-pre-line text-ink-700 lg:text-lg">
                {resource.longDescription}
              </p>

              {meta && <p className="mt-5 text-sm text-ink-700">{meta}</p>}

              <div className="mt-7 rounded-3xl bg-ink-50 p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-5">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-ink-700">{isPremium ? "Prix" : "Accès gratuit"}</p>
                    <p className="mt-0.5 text-3xl font-extrabold tracking-tight text-ink-900">
                      {isPremium ? resource.price : "0 USD"}
                    </p>
                  </div>

                  <ResourceActionButton
                    resource={resource}
                    className="inline-flex min-h-[56px] items-center justify-center gap-2.5 rounded-2xl bg-tracoli-500 px-8 py-4 text-[15px] font-bold text-white shadow-[var(--shadow-red)] transition-colors duration-200 hover:bg-tracoli-600 active:scale-[0.98]"
                  />
                </div>

                <p className="mt-4 border-t border-ink-200 pt-4 text-sm leading-relaxed text-ink-700">
                  {isPremium
                    ? `Entrez votre e-mail, puis WhatsApp s'ouvre avec ce livre déjà écrit dans le message pour ${seller}. Le paiement et l'envoi du PDF se font directement avec le vendeur.`
                    : resource.downloadUrl
                      ? "Entrez votre e-mail, le fichier s'ouvre ensuite dans un nouvel onglet. Aucun compte nécessaire."
                      : `Entrez votre e-mail, puis demandez ce guide à ${seller} sur WhatsApp : il vous l'envoie gratuitement.`}
                </p>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-ink-100">
              <ResourceCover resource={resource} sizes="(max-width: 1024px) 100vw, 45vw" priority />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:px-8">
          <div className="space-y-14">
            {resource.outcomes.length > 0 && (
              <div>
                <h2 className="text-3xl leading-[1.15] font-extrabold tracking-tight text-ink-900 sm:text-4xl">
                  Ce que vous allez apprendre
                </h2>
                <ul className="mt-6 space-y-3.5">
                  {resource.outcomes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="mt-0.5 size-5 shrink-0 text-tracoli-500" strokeWidth={3} aria-hidden />
                      <span className="text-base leading-relaxed text-ink-800">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {resource.chapters.length > 0 && (
              <div>
                <h2 className="text-3xl leading-[1.15] font-extrabold tracking-tight text-ink-900 sm:text-4xl">
                  Contenu détaillé
                </h2>
                <ol className="mt-6 divide-y divide-ink-200 border-y border-ink-200">
                  {resource.chapters.map((chapter, i) => (
                    <li key={i} className="py-6">
                      <h3 className="flex items-baseline gap-3 text-lg font-extrabold tracking-tight text-ink-900">
                        <span className="text-tracoli-600 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                        {chapter.title}
                      </h3>
                      <ul className="mt-3 space-y-2 pl-9">
                        {chapter.items.map((item) => (
                          <li key={item} className="list-disc text-base leading-relaxed text-ink-700">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            {resource.audience.length > 0 && (
              <div className="rounded-3xl bg-ink-50 p-6 sm:p-7">
                <h3 className="text-lg font-extrabold tracking-tight text-ink-900">Pour qui ?</h3>
                <ul className="mt-4 space-y-3">
                  {resource.audience.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-base leading-relaxed text-ink-800">
                      <Check className="mt-0.5 size-5 shrink-0 text-tracoli-500" strokeWidth={3} aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="rounded-3xl border border-ink-200 bg-white p-6 sm:p-7">
              <h3 className="text-lg font-extrabold tracking-tight text-ink-900">Une question ?</h3>
              <p className="mt-2 text-base leading-relaxed text-ink-700">
                Écrivez à {resource.sellerName ? resource.sellerName : CONTACT.manager} avant de commander : la réponse
                arrive sur WhatsApp.
              </p>
              <a
                href={getResourceQuestionLink(resource)}
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
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/ressources/${r.slug}`}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-ink-200 bg-white transition-colors hover:border-tracoli-500/40"
                >
                  <div className="relative aspect-video overflow-hidden bg-ink-100">
                    <ResourceCover resource={r} sizes="(max-width: 640px) 100vw, 33vw" />
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <p className="text-sm font-semibold text-ink-700">
                      {[TYPE_LABELS[r.type], r.meta].filter(Boolean).join(" · ")}
                    </p>
                    <h3 className="mt-2 text-lg leading-snug font-extrabold tracking-tight text-ink-900 group-hover:text-tracoli-600">
                      {r.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-ink-700">{r.description}</p>
                    <p className="mt-auto pt-4 text-base font-extrabold text-ink-900">
                      {r.access === "premium" ? r.price : "Gratuit"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
