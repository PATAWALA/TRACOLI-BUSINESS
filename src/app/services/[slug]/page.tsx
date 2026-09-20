import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SERVICE_DETAILS, getServiceBySlug } from "@/data/content";
import ServiceDetailView from "@/components/ServiceDetailView";

/* ------------------------------------------------------------------ */
/*  Génération statique des 4 pages services                           */
/* ------------------------------------------------------------------ */

export function generateStaticParams() {
  return SERVICE_DETAILS.map((s) => ({ slug: s.slug }));
}

/* ------------------------------------------------------------------ */
/*  Metadata SEO dynamique                                             */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: "Service introuvable — TRACOLI BUSINESS" };
  }

  return {
    title: `${service.title.fr} — TRACOLI BUSINESS`,
    description: service.description.fr,
    openGraph: {
      title: service.title.fr,
      description: service.description.fr,
      type: "website",
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Page — on passe UNIQUEMENT le slug (donnée sérialisable)           */
/* ------------------------------------------------------------------ */

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  return <ServiceDetailView slug={slug} />;
}