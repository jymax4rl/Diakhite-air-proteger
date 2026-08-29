import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/services",
    "/realisations",
    "/contact",
    "/mentions-legales",
  ];

  return [
    ...routes.map((route, index) => ({
      url: `${site.url}${route === "/" ? "" : route}`,
      changeFrequency: "monthly" as const,
      priority: index === 0 ? 1 : index === 1 ? 0.9 : 0.6,
    })),
    ...services.map((service) => ({
      url: `${site.url}${service.href}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
