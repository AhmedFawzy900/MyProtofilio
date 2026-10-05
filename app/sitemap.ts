import type { MetadataRoute } from "next";
import { experiences, projects } from "@/data/profile";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({
      url: absoluteUrl(`/projects/${p.slug}`),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: p.live ? 0.8 : 0.6,
    })),
    ...experiences.map((e) => ({
      url: absoluteUrl(`/experience/${e.slug}`),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
