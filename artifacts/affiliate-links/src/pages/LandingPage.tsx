import { GlobalNav } from "@/components/GlobalNav";
import { HeroSection } from "@/components/HeroSection";
import { CategoryTileDark } from "@/components/CategoryTileDark";
import { EditorialSpotlight } from "@/components/EditorialSpotlight";
import { TrustSection } from "@/components/TrustSection";
import { LatestReviews } from "@/components/LatestReviews";
import { SiteFooter } from "@/components/SiteFooter";

import tech1 from "@/assets/tech-1.png";
import tech2 from "@/assets/tech-2.png";
import home1 from "@/assets/home-1.png";
import home2 from "@/assets/home-2.png";
import hero4 from "@/assets/hero-4.png";

export default function LandingPage() {
  const techProducts = [
    {
      name: "Pro Tablet",
      description: "My daily driver for digital notes.",
      price: "From $799",
      image: tech1
    },
    {
      name: "Ergonomic Mouse",
      description: "Saved my wrist during long sessions.",
      price: "$99.99",
      image: tech2
    },
    {
      name: "Mechanical Keyboard",
      description: "Incredible tactile feel and aesthetic.",
      price: "$149.99",
      image: hero4
    },
    {
      name: "Desk Mat",
      description: "Premium leather mat for a clean look.",
      price: "$45.00",
      image: tech1 // Reusing image to fill grid
    }
  ];

  const homeProducts = [
    {
      name: "Espresso Machine",
      description: "Cafe-quality coffee at home.",
      price: "From $599",
      image: home1
    },
    {
      name: "Smart LED Lamp",
      description: "Perfect task lighting with app control.",
      price: "$129.00",
      image: home2
    },
    {
      name: "Ceramic Mug",
      description: "Beautifully crafted, holds heat well.",
      price: "$28.00",
      image: home1 // Reusing image
    },
    {
      name: "Air Purifier",
      description: "Silent operation, clean aesthetic.",
      price: "$249.00",
      image: home2 // Reusing image
    },
    {
      name: "Desk Organizer",
      description: "Keep cables and pens out of sight.",
      price: "$35.00",
      image: home1 // Reusing image
    },
    {
      name: "Linen Throw",
      description: "Soft, breathable, and looks great.",
      price: "$85.00",
      image: home2 // Reusing image
    }
  ];

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#ffffff]">
      <GlobalNav />
      
      <main className="flex-1">
        <HeroSection />
        
        <CategoryTileDark 
          title="Tech & Productivity" 
          subtitle="The tools that make every hour count."
          products={techProducts}
          bgColor="#272729"
        />

        <EditorialSpotlight />

        <CategoryTileDark 
          title="Style & Home"
          products={homeProducts}
          bgColor="#2a2a2c"
        />

        <TrustSection />

        <LatestReviews />
      </main>

      <SiteFooter />
    </div>
  );
}
