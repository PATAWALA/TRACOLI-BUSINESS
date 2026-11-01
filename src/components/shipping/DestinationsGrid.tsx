"use client";

import { MapPin, ArrowRight } from "lucide-react";
import { DESTINATIONS } from "@/data/logistics/destinations";

export default function DestinationsGrid() {
  const scrollToWizard = () => {
    const el = document.getElementById("logistique");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <div className="mb-8 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-white px-3 py-1.5 text-[10.5px] font-bold tracking-wide text-tracoli-600 uppercase">
          <MapPin className="size-3" />
          Zones desservies
        </span>
        <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
          5 pays, 14 villes desservies
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-[14px] text-ink-500">
          Sélectionnez votre ville de destination dans le formulaire pour obtenir une estimation adaptée.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
        {DESTINATIONS.map((country) => (
          <button
            key={country.id}
            type="button"
            onClick={scrollToWizard}
            className="group flex flex-col items-center rounded-2xl border border-ink-200 bg-white p-4 text-center shadow-card transition-all hover:border-tracoli-500/40 hover:shadow-card-lg active:scale-[0.98]"
          >
            <span className="rounded-md bg-tracoli-50 px-2.5 py-1 text-[11px] font-bold tracking-wide text-tracoli-600">
              {country.code}
            </span>

            <p className="mt-3 line-clamp-2 text-[12.5px] leading-snug font-extrabold text-ink-900">
              {country.country}
            </p>

            <p className="mt-1 text-[10.5px] font-semibold text-ink-500">
              {country.cities.length}{" "}
              {country.cities.length > 1 ? "villes" : "ville"}
            </p>

            <span className="mt-2 flex items-center gap-1 text-[10px] font-bold text-tracoli-500 opacity-0 transition-opacity group-hover:opacity-100">
              Choisir
              <ArrowRight className="size-2.5" />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
