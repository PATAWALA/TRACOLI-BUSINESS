"use client";

import { MapPin } from "lucide-react";
import { DESTINATIONS } from "@/data/logistics/destinations";
import { useLocale } from "@/hooks/useLocale";

export default function DestinationsGrid() {
  const { locale } = useLocale();

  return (
    <section className="bg-ink-50 py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-white px-3 py-1.5 text-[10.5px] font-bold tracking-wide text-tracoli-600 uppercase">
            <MapPin className="size-3" />
            {locale === "fr" ? "Zones desservies" : "Regions served"}
          </span>
          <h2 className="mt-3 text-xl font-extrabold tracking-tight text-ink-900 sm:text-2xl lg:text-3xl">
            {locale === "fr" ? "5 pays, 14 villes desservies" : "5 countries, 14 cities served"}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {DESTINATIONS.map((c) => (
            <div
              key={c.id}
              className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-[14px] font-extrabold tracking-tight text-ink-900">
                  {c.country[locale]}
                </h3>
                <span className="rounded-md bg-ink-100 px-2 py-0.5 text-[10.5px] font-bold tracking-wide text-ink-600">
                  {c.code}
                </span>
              </div>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {c.cities.map((city) => (
                  <li
                    key={city.id}
                    className="rounded-md border border-ink-200 bg-ink-50 px-2 py-0.5 text-[11px] font-medium text-ink-600"
                  >
                    {city.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}