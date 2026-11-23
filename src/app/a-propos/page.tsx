import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import {
  ABOUT_HERO,
  ABOUT_VALUES,
  ABOUT_TIMELINE,
  ABOUT_TEAM,
  CONTACT,
  IDENTITY,
  STATS,
  DESTINATIONS,
  waLink,
} from "@/data/content";

export default function AboutPage() {
  return (
    <main className="pt-header">
      <section className="border-b border-ink-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.25fr_1fr] lg:px-8">
          <div>
            <h1 className="text-4xl leading-[1.08] font-extrabold tracking-tight text-ink-900 text-balance sm:text-5xl lg:text-6xl">
              {ABOUT_HERO.title}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-700 lg:text-lg">
              {ABOUT_HERO.subtitle}
            </p>

            <p className="mt-5 text-base font-bold text-tracoli-600">
              {IDENTITY.motto}
            </p>
          </div>

          <div className="relative hidden aspect-[4/5] overflow-hidden rounded-3xl bg-ink-100 lg:block">
            <Image
              src="/about1.jpg"
              alt="Membre de l'équipe TRACOLI Business en polo rouge à l'effigie de la marque"
              fill
              priority
              sizes="40vw"
              className="object-cover object-top"
            />
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-ink-200 bg-ink-200 sm:grid-cols-3">
            {STATS.map((s) => (
              <div key={s.label} className="bg-white px-6 py-6">
                <dd className="text-3xl leading-none font-extrabold tracking-tight text-ink-900">
                  {s.value}
                </dd>
                <dt className="mt-2 text-base font-bold text-ink-900">
                  {s.label}
                </dt>
                <dd className="mt-0.5 text-sm text-ink-700">{s.sublabel}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-3xl leading-[1.15] font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl">
              Six années à bâtir un corridor fiable
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink-700 lg:text-lg">
              De nos premiers colis groupés à Bujumbura jusqu&apos;à notre
              couverture actuelle de 5 pays, chaque étape a été guidée par une
              seule obsession : rendre l&apos;importation accessible et sûre
              pour les entrepreneurs africains.
            </p>
          </div>

          <ol className="divide-y divide-ink-200 border-y border-ink-200">
            {ABOUT_TIMELINE.map((item) => (
              <li
                key={item.year}
                className="grid gap-2 py-6 sm:grid-cols-[5.5rem_1fr] sm:gap-6"
              >
                <span className="text-2xl font-extrabold tracking-tight text-tracoli-600 tabular-nums">
                  {item.year}
                </span>
                <div>
                  <h3 className="text-lg font-extrabold tracking-tight text-ink-900">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-base leading-relaxed text-ink-700">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-ink-50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="max-w-2xl text-3xl leading-[1.15] font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl">
            Ce qui guide chacune de nos décisions
          </h2>

          <dl className="mt-10 grid gap-x-12 gap-y-0 md:grid-cols-2">
            {ABOUT_VALUES.map((v) => (
              <div key={v.id} className="border-t border-ink-300 py-7">
                <dt className="text-xl font-extrabold tracking-tight text-ink-900">
                  {v.title}
                </dt>
                <dd className="mt-2 max-w-md text-base leading-relaxed text-ink-700">
                  {v.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="max-w-2xl text-3xl leading-[1.15] font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl">
            Des femmes et des hommes sur le terrain
          </h2>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {ABOUT_TEAM.map((member) => (
              <article
                key={member.id}
                className={`flex flex-col rounded-3xl bg-white p-6 sm:p-8 ${
                  member.featured
                    ? "border-2 border-tracoli-500"
                    : "border border-ink-200"
                }`}
              >
                {member.featured && (
                  <p className="mb-3 w-fit rounded-full bg-tracoli-500 px-3 py-1 text-xs font-bold text-white">
                    Contact principal
                  </p>
                )}
                <h3 className="text-xl font-extrabold tracking-tight text-ink-900">
                  {member.name}
                </h3>
                <p className="mt-1 text-[15px] font-semibold text-tracoli-600">
                  {member.role}
                </p>
                <p className="mt-4 text-base leading-relaxed text-ink-700">
                  {member.bio}
                </p>
                <p className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold text-ink-700">
                  <MapPin className="size-4" aria-hidden />
                  {member.location}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink-50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="max-w-2xl text-3xl leading-[1.15] font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl">
            5 pays, 14 villes desservies
          </h2>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {DESTINATIONS.map((c) => (
              <li
                key={c.id}
                className="rounded-2xl border border-ink-200 bg-white p-5"
              >
                <h3 className="text-lg font-extrabold tracking-tight text-ink-900">
                  {c.country}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-700">
                  {c.cities.map((city) => city.name).join(" · ")}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-12 pb-28 lg:py-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-tracoli-500 px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
            <h2 className="max-w-2xl text-3xl leading-[1.15] font-extrabold tracking-tight text-white text-balance sm:text-4xl">
              Discutons de votre projet d&apos;importation
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white lg:text-lg">
              Que vous soyez débutant ou importateur confirmé, notre équipe est
              là pour vous accompagner à chaque étape.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={waLink(
                  `Bonjour ${CONTACT.manager}, je souhaite discuter de mon projet d'importation.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-[56px] items-center justify-center gap-2.5 rounded-2xl bg-white px-8 py-4 text-[15px] font-bold text-tracoli-600 transition-colors duration-200 hover:bg-tracoli-50 active:scale-[0.98]"
              >
                Contacter {CONTACT.manager}
                <ArrowRight
                  className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden
                />
              </a>
              <Link
                href="/ressources"
                className="inline-flex min-h-[56px] items-center justify-center rounded-2xl border-2 border-white px-8 py-4 text-[15px] font-bold text-white transition-colors duration-200 hover:bg-white/10 active:scale-[0.98]"
              >
                Voir nos ressources
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
