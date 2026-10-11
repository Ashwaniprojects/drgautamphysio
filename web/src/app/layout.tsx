import type { Metadata } from "next";
import { Figtree, Noto_Sans } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const notoSans = Noto_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Best Physiotherapist in Lucknow | Dr. Gautam's Physio & Rehab Centre",
  description:
    "Ranked among the best physiotherapists in Lucknow and the best chiropractor in Lucknow — Dr. S.K. Gautam offers physiotherapy, chiropractic, osteopathy and manual therapy across 3 Lucknow clinics. Book an appointment today.",
  keywords: [
    "best physiotherapist in Lucknow",
    "best chiropractor in Lucknow",
    "physiotherapy Lucknow",
    "chiropractor Lucknow",
    "back pain treatment Lucknow",
    "sciatica treatment Lucknow",
    "neck pain relief Lucknow",
    "sports injury physiotherapy Lucknow",
    "osteopathy Lucknow",
    "manual therapy Lucknow",
    "Dr. S.K. Gautam physiotherapist",
    "Dr. Gautam chiropractor Lucknow",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    title: "Best Physiotherapist in Lucknow | Dr. Gautam's Physio & Rehab Centre",
    description:
      "18+ years of expertise. Physiotherapy, chiropractic & osteopathic care in Lucknow. Book an appointment today.",
    url: "/",
    siteName: "Dr. Gautam's Physio & Rehab Centre",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${figtree.variable} ${notoSans.variable}`}>
      <body className="min-h-screen flex flex-col font-body antialiased">
        {children}
      </body>
    </html>
  );
}
