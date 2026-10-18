import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/login"],
      },
      // Bing indexes the /?utm_* and /?ref= marketing variants. Letting those
      // through creates duplicate pages that compete with the clean URL for the
      // same keywords; the canonical tag handles most of it, but excluding them
      // here removes the problem rather than papering over it.
      {
        userAgent: "*",
        disallow: ["/?utm_", "/?ref="],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
