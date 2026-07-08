import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.viasegcorretora.com.br";
  const routes = [
    "",
    "/sobre",
    "/fale-conosco",
    "/parceiros",
    "/cotacao",
    "/seguros/auto",
    "/seguros/vida",
    "/seguros/residencial",
    "/seguros/empresarial",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
