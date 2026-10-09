import { SiteHeader } from "@/components/sites/soup/home/SiteHeader";
import { HeroSection } from "@/components/sites/soup/home/HeroSection";
import { CustomersMarquee } from "@/components/sites/soup/home/CustomersMarquee";
import { SolutionSection } from "@/components/sites/soup/home/SolutionSection";
import { TerminalSection } from "@/components/sites/soup/home/TerminalSection";
import { FeaturesSection } from "@/components/sites/soup/home/FeaturesSection";
import { MigrationSection } from "@/components/sites/soup/home/MigrationSection";
import { EcosystemSection } from "@/components/sites/soup/home/EcosystemSection";
import { PricingSection } from "@/components/sites/soup/home/PricingSection";
import { TestimonialsSection } from "@/components/sites/soup/home/TestimonialsSection";
import { FaqSection } from "@/components/sites/soup/home/FaqSection";
import { BookCallSection } from "@/components/sites/soup/home/BookCallSection";
import { SiteFooter } from "@/components/sites/soup/home/SiteFooter";

export default function Home() {
  return (
    <div className="relative w-full bg-[#FDFDFD]">
      {/* Page-wide vertical border lines at the 1180px content column edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-1/2 z-[100] hidden w-[1180px] -translate-x-1/2 border-x border-[#DEDEDE] min-[810px]:block"
      />
      <div className="relative z-10 flex w-full flex-col">
        <SiteHeader />
        <main className="flex flex-col items-center">
          <HeroSection />
          <CustomersMarquee />
          <SolutionSection />
          <TerminalSection />
          <FeaturesSection />
          <MigrationSection />
          <EcosystemSection />
          <PricingSection />
          <TestimonialsSection />
          <FaqSection />
          <BookCallSection />
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
