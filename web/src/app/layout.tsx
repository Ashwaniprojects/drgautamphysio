import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import { brand, buildMetadata, schemaOrg, shortBrand, siteUrl } from "@/lib/metadata";
import "./globals.css";

// Single typeface for the whole site: Roboto. Bold weights drive every heading
// (--font-display), regular drives body copy (--font-body). No other families
// are used anywhere in the project.
const roboto = Roboto({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

// Same family serves the body role; declared separately so both CSS variables
// resolve to the self-hosted Roboto tokens rather than a browser fallback.
const robotoBody = Roboto({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
  display: "swap",
});

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Best Physiotherapist in Lucknow | Dr. Gautam's Physio & Rehab Centre",
    description:
      "Dr. S.K. Gautam offers physiotherapy, chiropractic, osteopathy and manual therapy in Lucknow with 18+ years of clinical practice. 3 clinics, 4.9 Google rating from 729 reviews. Book an appointment online.",
    path: "/",
    keywords: [
      "best physiotherapist in Lucknow",
      "best chiropractor in Lucknow",
      "physiotherapy Lucknow",
      "chiropractor Lucknow",
      "physiotherapy clinic Lucknow",
      "back pain treatment Lucknow",
      "sciatica treatment Lucknow",
      "neck pain relief Lucknow",
      "sports injury physiotherapy Lucknow",
      "osteopathy Lucknow",
      "manual therapy Lucknow",
      "joint replacement rehab Lucknow",
      "knee pain treatment Lucknow",
      "pelvic floor physiotherapy Lucknow",
      "pediatric physiotherapy Lucknow",
      "geriatric rehab Lucknow",
      "spine physiotherapy Lucknow",
      "Dr. S.K. Gautam physiotherapist",
      "Dr. Gautam chiropractor Lucknow",
      "Dr. Gautam's Physio Yahiyaganj Lucknow",
    ],
  }),
  metadataBase: new URL(siteUrl),
  creator: brand,
  publisher: brand,
  category: "Health",
  applicationName: brand,
  appleWebApp: { statusBarStyle: "default", title: shortBrand },
};

/**
 * themeColor lives on Viewport, not Metadata — Next rejects it in the metadata
 * export, so it gets its own const.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f766e",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${roboto.variable} ${robotoBody.variable}`}>
      <body className="min-h-screen flex flex-col font-body antialiased">
        {schemaOrg().map((block) => (
          <script
            key={(block["@type"] as string) ?? "schema"}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
          />
        ))}
        {children}
      </body>
    </html>
  );
}
