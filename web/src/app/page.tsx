import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { Hero } from "@/components/home/Hero";
import { SymptomTiles } from "@/components/home/SymptomTiles";
import { HowItWorks } from "@/components/home/HowItWorks";
import { TreatmentsGrid } from "@/components/home/TreatmentsGrid";
import { PatientStories } from "@/components/home/PatientStories";
import { ClinicsGrid } from "@/components/home/ClinicsGrid";
import { BlogPreview } from "@/components/home/BlogPreview";

export default function HomePage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <SymptomTiles />
        <HowItWorks />
        <TreatmentsGrid />
        <PatientStories />
        <ClinicsGrid />
        <BlogPreview />
      </main>
      <Footer />
      <MobileActionBar />
    </>
  );
}
