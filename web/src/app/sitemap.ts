import type { MetadataRoute } from "next";
import { conditions } from "@/lib/data/conditions";
import { articles } from "@/lib/data/blog";
import { absoluteUrl } from "@/lib/metadata";

/**
 * Public, marketable pages only. /admin and /login are staff-only, so they
 * carry noindex in their metadata and must not appear here — listing a page in
 * the sitemap while telling Google not to index it is a conflicting signal that
 * Google reads as sloppiness rather than intent.
 *
 * `priority` is relative, not absolute: Google mostly ignores the exact values
 * and uses them for tie-breaking between similarly relevant pages. The clinic
 * home and the condition pages are what we actually want ranking, so they lead.
 *
 * No lastmod: there is no per-page edit date tracked anywhere in the project,
 * and inventing one here would be a date that is never updated — a stale lastmod
 * is worse than none at all.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1.0 },
    { url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.9 },
    ...conditions.map((c) => ({
      url: absoluteUrl(`/conditions/${c.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: absoluteUrl("/conditions"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/treatments"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/clinics"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/awards"), changeFrequency: "yearly", priority: 0.6 },
    { url: absoluteUrl("/stories"), changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/blog"), changeFrequency: "weekly", priority: 0.7 },
    ...articles.map((a) => ({
      url: absoluteUrl(`/blog/${a.slug}`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.6 },
    { url: absoluteUrl("/book"), changeFrequency: "yearly", priority: 0.7 },
  ];
}
