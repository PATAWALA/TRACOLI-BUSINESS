import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ResourceDetail from "@/components/ResourceDetail";
import { getShopResource, getShopResources } from "@/lib/resources";
import { isDisplayableImage } from "@/lib/product-image";

// Les livres viennent de la base : chaque fiche se rafraîchit toutes les 5 minutes
// (et tout de suite quand le livre est modifié depuis l'admin).
export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource = await getShopResource(slug);

  if (!resource) {
    return { title: "Livre introuvable — TRACOLI BUSINESS" };
  }

  return {
    title: `${resource.title} — TRACOLI BUSINESS`,
    description: resource.description,
    openGraph: {
      title: resource.title,
      description: resource.description,
      ...(isDisplayableImage(resource.image) ? { images: [{ url: resource.image }] } : {}),
      type: "article",
    },
    alternates: {
      canonical: `https://www.tracolibusiness.com/ressources/${slug}`,
    },
  };
}

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const all = await getShopResources();
  const resource = all.find((r) => r.slug === slug);

  if (!resource) notFound();

  return (
    <ResourceDetail
      resource={resource}
      related={all.filter((r) => r.id !== resource.id).slice(0, 3)}
    />
  );
}
