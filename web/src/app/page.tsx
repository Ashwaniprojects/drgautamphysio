import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { Hero } from "@/components/home/Hero";
import { DoctorAuthority } from "@/components/home/DoctorAuthority";
import { SymptomTiles } from "@/components/home/SymptomTiles";
import { HowItWorks } from "@/components/home/HowItWorks";
import { TreatmentsGrid } from "@/components/home/TreatmentsGrid";
import { ClinicalScope } from "@/components/home/ClinicalScope";
import { PatientStories } from "@/components/home/PatientStories";
import { ClinicsGrid } from "@/components/home/ClinicsGrid";
import { BlogPreview } from "@/components/home/BlogPreview";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <DoctorAuthority />
        <SymptomTiles />
        <HowItWorks />
        <TreatmentsGrid />
        <ClinicalScope />
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
