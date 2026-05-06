import { GlobalNav } from "@/components/GlobalNav";
import { HeroSection } from "@/components/HeroSection";
import { CategoryTileDark } from "@/components/CategoryTileDark";
import { EditorialSpotlight } from "@/components/EditorialSpotlight";
import { TrustSection } from "@/components/TrustSection";
import { LatestReviews } from "@/components/LatestReviews";
import { SiteFooter } from "@/components/SiteFooter";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { AdminToggle } from "@/components/admin/AdminToggle";
import { useContent, CategorySection, EditorialSection, TrustSectionData, ReviewsSection } from "@/context/ContentContext";

export default function LandingPage() {
  const { content } = useContent();

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#ffffff]">
      <GlobalNav />

      <main className="flex-1">
        <HeroSection />

        {content.sections.map(section => {
          if (section.type === "category") {
            return <CategoryTileDark key={section.id} section={section as CategorySection} />;
          }
          if (section.type === "editorial") {
            return <EditorialSpotlight key={section.id} section={section as EditorialSection} />;
          }
          if (section.type === "trust") {
            return <TrustSection key={section.id} section={section as TrustSectionData} />;
          }
          if (section.type === "reviews") {
            return <LatestReviews key={section.id} section={section as ReviewsSection} />;
          }
          return null;
        })}
      </main>

      <SiteFooter />

      <AdminPanel />
      <AdminToggle />
    </div>
  );
}
