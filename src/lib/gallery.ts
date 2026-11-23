import { createServerClient } from "@/lib/supabase/server";
import { GALLERY_PHOTOS, type GalleryPhoto } from "@/data/home/gallery-photos";

export interface GalleryRow extends GalleryPhoto {
  id: string;
  published: boolean;
}

/**
 * Photos publiées de la galerie, dans l'ordre choisi dans l'admin.
 * Si la table n'existe pas encore (migration 006 non exécutée), on garde les photos du site.
 */
export async function getPublishedGallery(): Promise<GalleryPhoto[]> {
  try {
    const { data, error } = await createServerClient()
      .from("gallery_photos")
      .select("image_url, caption, width, height")
      .eq("published", true)
      .order("position", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) return GALLERY_PHOTOS;
    return (data ?? []).map((r) => ({
      src: r.image_url as string,
      caption: r.caption as string,
      width: r.width as number,
      height: r.height as number,
    }));
  } catch {
    return GALLERY_PHOTOS;
  }
}
