import type { MetadataRoute } from "next";
import { SERVICE_DETAILS } from "@/data/services/details";
import { getShopResources } from "@/lib/resources";

const BASE_URL = "https://www.tracolibusiness.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  /* Pages statiques */
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                          lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE_URL}/sourcer`,             lastModified: now, changeFrequency: "weekly",  priority: 0.95 },
    { url: `${BASE_URL}/expedier`,            lastModified: now, changeFrequency: "weekly",  priority: 0.95 },
    { url: `${BASE_URL}/suivre`,              lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/demande`,             lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/a-propos`,            lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/ressources`,          lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE_URL}/newsletter`,          lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  /* Pages services */
  const servicePages: MetadataRoute.Sitemap = SERVICE_DETAILS.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  /* Fiches de la boutique (venant de la base) */
  const resourcePages: MetadataRoute.Sitemap = (await getShopResources()).map((r) => ({
    url: `${BASE_URL}/ressources/${r.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...resourcePages];
}
