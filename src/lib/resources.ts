import { createServerClient } from "@/lib/supabase/server";
import { RESOURCES } from "@/data/resources/items";
import type { Resource, ResourceAccess, ResourceType } from "@/data/shared/types";

/** Ligne de la table `resources` (Admin > Boutique). */
export interface ResourceRow {
  id: string;
  slug: string;
  title: string;
  description: string;
  long_description: string;
  type: ResourceType;
  access: ResourceAccess;
  price: string | null;
  level: string;
  meta: string | null;
  cover_url: string | null;
  file_url: string | null;
  link_url: string | null;
  outcomes: string[];
  audience: string[];
  seller_name: string | null;
  seller_whatsapp: string | null;
  position: number;
  published: boolean;
  created_at: string;
}

/** Garde uniquement les chiffres d'un numéro (« +257 69 03 27 65 » → « 25769032765 »). */
export const digitsOnly = (v: string) => v.replace(/\D/g, "");

function toResource(r: ResourceRow): Resource {
  const free = r.access === "free";
  return {
    id: r.id,
    slug: r.slug,
    type: r.type,
    access: r.access,
    image: r.cover_url ?? "",
    imageAlt: `Couverture : ${r.title}`,
    title: r.title,
    description: r.description,
    longDescription: r.long_description || r.description,
    level: r.level,
    meta: r.meta ?? "",
    format: free ? "Téléchargement gratuit" : "PDF livré sur WhatsApp après paiement",
    price: r.price ?? undefined,
    outcomes: r.outcomes ?? [],
    audience: r.audience ?? [],
    chapters: [],
    sellerName: r.seller_name ?? undefined,
    sellerWhatsapp: r.seller_whatsapp ? digitsOnly(r.seller_whatsapp) : undefined,
    // Le lien de téléchargement n'existe que pour un guide gratuit : un PDF payant ne sort jamais du serveur.
    downloadUrl: free ? (r.file_url ?? r.link_url ?? undefined) : undefined,
  };
}

/**
 * Livres de la boutique.
 * • Table absente ou VIDE → exemples intégrés au site.
 * • Au moins une ligne (même masquée) → uniquement les vrais livres publiés, les exemples disparaissent.
 */
export async function getShopResources(): Promise<Resource[]> {
  try {
    const { data, error } = await createServerClient()
      .from("resources")
      .select("*")
      .order("position", { ascending: true })
      .order("created_at", { ascending: false });
    if (error || !data) return RESOURCES;
    if (data.length === 0) return RESOURCES;
    return (data as ResourceRow[]).filter((r) => r.published).map(toResource);
  } catch {
    return RESOURCES;
  }
}

export async function getShopResource(slug: string): Promise<Resource | undefined> {
  return (await getShopResources()).find((r) => r.slug === slug);
}
