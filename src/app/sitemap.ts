import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: "https://signaturesend.uz",
      lastModified: new Date(),
    },
    {
        url: "https://signaturesend.uz/cookie",
        lastModified: new Date(),
    },
    {
        url: "https://signaturesend.uz/beverage",
        lastModified: new Date(),
    },
    {
        url: "https://signaturesend.uz/hygiene",
        lastModified: new Date(),
    },
    {
        url: "https://signaturesend.uz/stationary",
        lastModified: new Date(),
    },
    {
      url: "https://signaturesend.uz/coffee",
      lastModified: new Date(),
  },
  ];
}