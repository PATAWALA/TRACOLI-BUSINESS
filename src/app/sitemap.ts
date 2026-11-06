import type { MetadataRoute } from "next";
import { RESOURCES } from "@/data/resources/items";
import { SERVICE_DETAILS } from "@/data/services/details";

const BASE_URL = "https://www.tracolibusiness.com";

export default function sitemap(): MetadataRoute.Sitemap {
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

  /* Pages ressources */
  const resourcePages: MetadataRoute.Sitemap = RESOURCES.map((r) => ({
    url: `${BASE_URL}/ressources/${r.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...resourcePages];
}