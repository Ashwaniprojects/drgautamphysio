import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { Hero } from "@/components/home/Hero";
import { CredentialsStrip } from "@/components/home/CredentialsStrip";
import { DoctorAuthority } from "@/components/home/DoctorAuthority";
import { SymptomTiles } from "@/components/home/SymptomTiles";
import { HowItWorks } from "@/components/home/HowItWorks";
import { TreatmentsGrid } from "@/components/home/TreatmentsGrid";
import { AwardsShowcase } from "@/components/home/AwardsShowcase";
import { PatientStories } from "@/components/home/PatientStories";
import { ClinicsGrid } from "@/components/home/ClinicsGrid";
import { BlogPreview } from "@/components/home/BlogPreview";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = buildMetadata({
  title: "Best Physiotherapist in Lucknow | Dr. Gautam's Physio & Rehab Centre",
  description:
    "Dr. S.K. Gautam: 18+ years of physiotherapy, chiropractic and manual therapy in Lucknow. Treating slip disc, sciatica, neck pain, sports injuries and post-surgery rehab.",
  path: "/",
  keywords: [
    "best physiotherapist in Lucknow",
    "physiotherapy clinic Lucknow",
    "chiropractor Lucknow",
    "physiotherapist Yahiyaganj Lucknow",
    "back pain treatment Lucknow",
    "sciatica treatment Lucknow",
    "knee pain treatment Lucknow",
    "joint replacement physiotherapy Lucknow",
    "sports injury rehab Lucknow",
    "osteopathy Lucknow",
  ],
});

export default function HomePage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <CredentialsStrip />
        <DoctorAuthority />
        <SymptomTiles />
        <HowItWorks />
        <TreatmentsGrid />
        <AwardsShowcase />
        <PatientStories />
        <ClinicsGrid />
        <BlogPreview />
        <FinalCTA />
      </main>
      <Footer />
      <MobileActionBar />
    </>
  );
}
