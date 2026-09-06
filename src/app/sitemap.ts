import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo/site-url";
import { ROUTES } from "@/constants/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}${ROUTES.confirmacaoAlocacao}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}${ROUTES.termosLocacao}`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${siteUrl}${ROUTES.privacidade}`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${siteUrl}${ROUTES.bio}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
