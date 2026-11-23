import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { SERVICE_DETAILS } from "@/data/services/details";
import { CONTACT } from "@/data/config/contact";
import { waLink } from "@/data/shared/helpers";

export default function ServiceDetailView({ slug }: { slug: string }) {
  const service = SERVICE_DETAILS.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <main className="pt-header">
      <section className="border-b border-ink-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="max-w-3xl text-4xl leading-[1.08] font-extrabold tracking-tight text-ink-900 text-balance sm:text-5xl lg:text-6xl">
            {service.title}
          </h1>
          <p className="mt-5 max-w-2xl text-xl font-bold text-ink-800">
            {service.subtitle}
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-700 lg:text-lg">
            {service.hero}
          </p>

          <div className="mt-8 inline-block rounded-2xl bg-ink-50 px-6 py-5">
            <p className="text-3xl font-extrabold tracking-tight text-ink-900">
              {service.stat.value}
            </p>
            <p className="mt-1 text-sm font-semibold text-ink-700">
              {service.stat.label}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl leading-[1.15] font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            Notre processus
          </h2>

          <ol className="mt-10 grid gap-x-12 md:grid-cols-2">
            {service.processSteps.map((step) => (
              <li
                key={step.step}
                className="flex gap-5 border-t border-ink-200 py-7"
              >
                <span className="text-3xl leading-none font-extrabold text-tracoli-600 tabular-nums">
                  {step.step}
                </span>
                <div>
                  <h3 className="text-lg font-extrabold tracking-tight text-ink-900">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-base leading-relaxed text-ink-700">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-ink-50 py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
              Ce qui est inclus
            </h2>
            <ul className="mt-6 space-y-3.5">
              {service.includes.map((item) => (
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
            <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
              Vos bénéfices
            </h2>
            <ul className="mt-6 space-y-3.5">
              {service.benefits.map((item) => (
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
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl leading-[1.15] font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            Questions fréquentes
          </h2>
          <div className="mt-8 divide-y divide-ink-200 border-y border-ink-200">
            {service.faq.map((item, i) => (
              <details key={i} className="group py-1">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3">
                  <span className="text-base font-bold text-ink-900">
                    {item.question}
                  </span>
                  <span
                    aria-hidden
                    className="grid size-8 shrink-0 place-items-center rounded-full bg-ink-100 text-lg font-bold text-ink-800 transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-4 text-base leading-relaxed text-ink-700">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 pb-28 lg:py-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-ink-900 px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
            <h2 className="max-w-2xl text-3xl leading-[1.15] font-extrabold tracking-tight text-white text-balance sm:text-4xl">
              Prêt à lancer votre projet ?
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 lg:text-lg">
              Envoyez-nous votre projet et recevez une proposition
              personnalisée sous 2 heures ouvrées.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/demande"
                className="group inline-flex min-h-[56px] items-center justify-center gap-2.5 rounded-2xl bg-tracoli-500 px-8 py-4 text-[15px] font-bold text-white shadow-[var(--shadow-red)] transition-colors duration-200 hover:bg-tracoli-600 active:scale-[0.98]"
              >
                Envoyer mon projet
                <ArrowRight
                  className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
              <a
                href={waLink(
                  `Bonjour ${CONTACT.manager}, je souhaite discuter du service : ${service.title}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[56px] items-center justify-center rounded-2xl border-2 border-white/30 px-8 py-4 text-[15px] font-bold text-white transition-colors duration-200 hover:border-white active:scale-[0.98]"
              >
                Discuter sur WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
