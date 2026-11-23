"use client";

import { ArrowRight } from "lucide-react";
import { DESTINATIONS } from "@/data/logistics/destinations";

export default function DestinationsGrid() {
  const scrollToWizard = () => {
    const el = document.getElementById("logistique");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <h2 className="max-w-2xl text-3xl leading-[1.15] font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl">
        5 pays, 14 villes desservies
      </h2>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-700 lg:text-lg">
        Choisissez votre ville dans le formulaire d&apos;estimation pour obtenir
        un tarif adapté.
      </p>

      <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {DESTINATIONS.map((country) => (
          <li key={country.id}>
            <button
              type="button"
              onClick={scrollToWizard}
              className="group flex h-full min-h-[56px] w-full flex-col rounded-2xl border border-ink-200 bg-white p-5 text-left transition-colors hover:border-tracoli-500/40 active:scale-[0.99]"
            >
              <span className="flex items-center justify-between gap-3">
                <span className="text-lg font-extrabold tracking-tight text-ink-900">
                  {country.country}
                </span>
                <ArrowRight
                  className="size-4 shrink-0 text-ink-400 transition-colors group-hover:text-tracoli-500"
                  aria-hidden
                />
              </span>
              <span className="mt-2 text-[15px] leading-relaxed text-ink-700">
                {country.cities.map((c) => c.name).join(" · ")}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
