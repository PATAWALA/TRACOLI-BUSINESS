import type { ParcelMode } from "@/types/database.types";

export interface ImportRow {
  name: string;
  city: string | null;
  country: string | null;
  /** Nombre de colis */
  count: number;
  /** "mixte" = maritime + aérien, à répartir ensuite dans la fiche client */
  mode: "maritime" | "aerien" | "mixte";
}

/** Liste des clients en attente d'expédition — avis du 15 novembre 2026 (21 clients, 80 colis). */
export const WAITING_CLIENTS_2026_11: ImportRow[] = [
  { name: "Nad Business", city: null, country: "Burundi", count: 1, mode: "maritime" },
  { name: "Grady", city: "Uvira", country: "RDC", count: 1, mode: "maritime" },
  { name: "Marie G", city: null, country: "Burundi", count: 1, mode: "maritime" },
  { name: "Chance", city: null, country: "RDC", count: 4, mode: "mixte" },
  { name: "Dav Business", city: "Bukavu", country: "RDC", count: 2, mode: "maritime" },
  { name: "Malipo", city: "Kalemie", country: "RDC", count: 3, mode: "aerien" },
  { name: "Maman Justine", city: "Kinshasa", country: "RDC", count: 4, mode: "mixte" },
  { name: "Antoinette Eliya", city: "Bujumbura", country: "Burundi", count: 1, mode: "maritime" },
  { name: "Fraternité M", city: "Bujumbura", country: "Burundi", count: 1, mode: "maritime" },
  { name: "Espoir S", city: "Uvira", country: "RDC", count: 2, mode: "maritime" },
  { name: "Michel MB", city: "Bujumbura", country: "Burundi", count: 1, mode: "maritime" },
  { name: "Bwessa Divine", city: "Kinshasa", country: "RDC", count: 2, mode: "mixte" },
  { name: "Richard", city: "Goma", country: "RDC", count: 2, mode: "maritime" },
  { name: "Da Safi", city: "Uvira", country: "RDC", count: 3, mode: "maritime" },
  { name: "Jospin", city: "Kolwezi", country: "RDC", count: 7, mode: "aerien" },
  { name: "Masoka", city: "Butembo", country: "RDC", count: 2, mode: "maritime" },
  { name: "Jacques", city: "Butembo", country: "RDC", count: 11, mode: "maritime" },
  { name: "Daplogistic", city: "Kinshasa", country: "RDC", count: 23, mode: "maritime" },
  { name: "AKC Logistics", city: "Kinshasa", country: "RDC", count: 5, mode: "aerien" },
  { name: "Da Francine", city: "Lubumbashi", country: "RDC", count: 3, mode: "aerien" },
  { name: "Gracy Business", city: "Goma", country: "RDC", count: 1, mode: "maritime" },
];

export const rowToParcels = (r: ImportRow): { mode: ParcelMode }[] =>
  Array.from({ length: r.count }, () => ({
    mode: r.mode === "mixte" ? "a_preciser" : r.mode,
  }));
