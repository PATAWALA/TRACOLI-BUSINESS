import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { RESOURCES, getResourceBySlug } from "@/data/content";
import ResourceDetail from "@/components/ResourceDetail";

/* ------------------------------------------------------------------ */
/*  Génération des 6 pages statiques au build                          */
/* ------------------------------------------------------------------ */

export function generateStaticParams() {
  return RESOURCES.map((r) => ({ slug: r.slug }));
}

/* ------------------------------------------------------------------ */
/*  Metadata SEO dynamique par ressource                               */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);

  if (!resource) {
    return { title: "Ressource introuvable — TRACOLI BUSINESS" };
  }

  return {
    title: `${resource.title.fr} — TRACOLI BUSINESS`,
    description: resource.description.fr,
    openGraph: {
      title: resource.title.fr,
      description: resource.description.fr,
      images: [{ url: resource.image }],
      type: "article",
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);

  if (!resource) notFound();

  return <ResourceDetail resource={resource} />;
}