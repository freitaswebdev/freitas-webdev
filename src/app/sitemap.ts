import type { MetadataRoute } from "next";
import { projects } from "@/data/content";
import { siteUrl } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/servicos",
    "/projetos",
    "/processo",
    "/sobre",
    "/contato",
    "/solicitar-projeto",
    "/privacidade",
    ...projects.map((p) => `/projetos/${p.slug}`),
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: path.includes("/projetos/") ? "monthly" : "weekly",
    priority: path === "" ? 1 : path === "/privacidade" ? 0.3 : 0.8,
  }));
}
