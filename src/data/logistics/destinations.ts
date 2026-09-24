import type { DestinationCountry, FlatDestination } from "../shared/types";

export const DESTINATIONS: DestinationCountry[] = [
  { id: "burundi",  country: { fr: "Burundi", en: "Burundi" }, code: "BI", cities: [{ id: "bujumbura", name: "Bujumbura" }, { id: "gitega", name: "Gitega" }], airFactor: 1.12, seaFactor: 1.15 },
  { id: "drc",      country: { fr: "République Démocratique du Congo", en: "Democratic Republic of Congo" }, code: "CD", cities: [{ id: "kinshasa", name: "Kinshasa" }, { id: "lubumbashi", name: "Lubumbashi" }, { id: "goma", name: "Goma" }, { id: "bukavu", name: "Bukavu" }, { id: "kolwezi", name: "Kolwezi" }, { id: "kalemie", name: "Kalemie" }, { id: "uvira", name: "Uvira" }], airFactor: 1.0, seaFactor: 1.0 },
  { id: "uganda",   country: { fr: "Ouganda", en: "Uganda" }, code: "UG", cities: [{ id: "kampala", name: "Kampala" }], airFactor: 1.08, seaFactor: 1.10 },
  { id: "tanzania", country: { fr: "Tanzanie", en: "Tanzania" }, code: "TZ", cities: [{ id: "kigoma", name: "Kigoma" }, { id: "dar-es-salaam", name: "Dar es Salaam" }], airFactor: 1.05, seaFactor: 0.92 },
  { id: "kenya",    country: { fr: "Kenya", en: "Kenya" }, code: "KE", cities: [{ id: "mombasa", name: "Mombasa" }, { id: "nairobi", name: "Nairobi" }], airFactor: 1.06, seaFactor: 0.95 },
];

export const FLAT_DESTINATIONS: FlatDestination[] = DESTINATIONS.flatMap((c) =>
  c.cities.map((city) => ({
    id: city.id,
    city: city.name,
    countryFr: c.country.fr,
    countryEn: c.country.en,
    code: c.code,
    airFactor: c.airFactor,
    seaFactor: c.seaFactor,
  }))
);