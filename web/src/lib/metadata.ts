import type { Metadata } from "next";
import { doctor } from "@/lib/data/doctor";
import { siteConfig } from "@/lib/site-config";

/**
 * Canonical origin. NEXT_PUBLIC_SITE_URL is read at build time, so anything it
 * feeds must be a static route or a server component; never expose it to
 * client code. Kept in one place so titles, canonicals, the sitemap and the
 * robots file all agree on the same origin.
 */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dr-gautams-physio.in";

export const brand = "Dr. Gautam's Physio & Rehab Centre";
export const shortBrand = "Dr. Gautam's Physio";
export const twitterHandle = "@drgautamphysiotherapy";

/**
 * Absolute canonicals, not path-relative. Google prefers absolute canonical
 * URLs, and a path-only value resolves against whatever origin the crawler
 * happened to come from — harmless on one domain, wrong on a preview host.
 */
export function absoluteUrl(path: string): string {
  return `${siteUrl.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Share-card defaults. `siteName`, `locale` and `type` can't be set per page
 * without repeating them, so pages only need to supply title/description/url
 * and inherit the rest by merging in { ...baseOpenGraph, ...pageOg }.
 */
export function baseOpenGraph(path: string) {
  return {
    url: absoluteUrl(path),
    siteName: brand,
    locale: "en_IN",
    type: "website",
    alternateLocale: "en",
  };
}

export function baseTwitter(path: string, title: string, description: string) {
  return {
    card: "summary_large_image" as const,
    title,
    description,
    creator: twitterHandle,
    site: twitterHandle,
  };
}

export type MetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  /** Set for /admin and /login: staff-only pages that must not be indexed. */
  noindex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  keywords,
  noindex,
}: MetadataInput): Metadata {
  return {
    title,
    description,
    keywords,
    robots: noindex
      ? { index: false, follow: false, noarchive: true, nosnippet: true }
      : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      ...baseOpenGraph(path),
      title,
      description,
    },
    twitter: baseTwitter(path, title, description),
  };
}

/**
 * JSON-LD for every page: the clinic as a MedicalBusiness plus the founding
 * clinician as a Person. Written as plain JSON strings and injected into the
 * root layout rather than assembled here, because the layout already holds the
 * fonts and the document element.
 */
export function schemaOrg(): Record<string, unknown>[] {
  return [
    {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      name: brand,
      description:
        "Physiotherapy, chiropractic, osteopathy and manual therapy practice founded by Dr. S.K. " +
        "Gautam, with 18+ years of clinical practice in Lucknow, Uttar Pradesh.",
      url: siteUrl,
      telephone: "+919415206444",
      email: siteConfig.clinicEmail,
      founder: {
        "@type": "Person",
        name: `${doctor.fullName} ${doctor.suffix}`,
        jobTitle: doctor.title,
        worksFor: { "@type": "MedicalBusiness", name: brand },
        hasCredential: doctor.academics.map((a) => ({ "@type": "EducationalOccupationalCredential", name: a })),
      },
      medicalSpecialty: "Physical Therapy",
      areaServed: "Lucknow, Uttar Pradesh, India",
      address: {
        "@type": "PostalAddress",
        streetAddress: "98-89, Subhash Marg, Jawahar Nagar, Yahiyaganj",
        addressLocality: "Lucknow",
        addressRegion: "Uttar Pradesh",
        postalCode: "226003",
        addressCountry: "IN",
      },
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "21:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "09:00", closes: "14:00" },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: siteConfig.googleRating,
        bestRating: 5,
        ratingCount: siteConfig.googleReviewCount,
      },
    },
  ];
}
