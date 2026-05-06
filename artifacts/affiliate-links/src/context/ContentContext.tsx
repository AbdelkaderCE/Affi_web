import { createContext, useContext, useState, useCallback, useEffect } from "react";

import tech1 from "@/assets/tech-1.png";
import tech2 from "@/assets/tech-2.png";
import home1 from "@/assets/home-1.png";
import home2 from "@/assets/home-2.png";
import hero1 from "@/assets/hero-1.png";
import hero2 from "@/assets/hero-2.png";
import hero3 from "@/assets/hero-3.png";
import hero4 from "@/assets/hero-4.png";
import editorial1 from "@/assets/editorial-1.png";
import review1 from "@/assets/review-1.png";

export interface HeroProduct {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  affiliateLink: string;
  visible: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  affiliateLink: string;
  visible: boolean;
}

export interface CategorySection {
  id: string;
  type: "category";
  visible: boolean;
  title: string;
  subtitle: string;
  bgColor: string;
  products: Product[];
}

export interface EditorialSection {
  id: string;
  type: "editorial";
  visible: boolean;
  badge: string;
  headline: string;
  body: string;
  image: string;
  primaryCtaLabel: string;
  primaryCtaLink: string;
  secondaryCtaLabel: string;
  secondaryCtaLink: string;
  disclaimer: string;
}

export interface TrustItem {
  id: string;
  title: string;
  body: string;
  visible: boolean;
}

export interface TrustSectionData {
  id: string;
  type: "trust";
  visible: boolean;
  headline: string;
  items: TrustItem[];
}

export interface ReviewItem {
  id: string;
  image: string;
  category: string;
  title: string;
  excerpt: string;
  link: string;
  visible: boolean;
}

export interface ReviewsSection {
  id: string;
  type: "reviews";
  visible: boolean;
  headline: string;
  items: ReviewItem[];
}

export type Section = CategorySection | EditorialSection | TrustSectionData | ReviewsSection;

export interface SiteContent {
  siteName: string;
  hero: {
    visible: boolean;
    overline: string;
    headline: string;
    subtitle: string;
    primaryCtaLabel: string;
    primaryCtaLink: string;
    secondaryCtaLabel: string;
    secondaryCtaLink: string;
    products: HeroProduct[];
  };
  sections: Section[];
}

const DEFAULT_CONTENT: SiteContent = {
  siteName: "curated.",
  hero: {
    visible: true,
    overline: "CURATED PICKS",
    headline: "The products I actually use.",
    subtitle: "Honestly reviewed. Carefully chosen. All affiliate links disclose clearly.",
    primaryCtaLabel: "Browse Picks",
    primaryCtaLink: "#",
    secondaryCtaLabel: "About Me",
    secondaryCtaLink: "#",
    products: [
      { id: "h1", name: "Premium Laptop", category: "Tech", price: "From $1299", image: hero1, affiliateLink: "#", visible: true },
      { id: "h2", name: "Studio Headphones", category: "Audio", price: "From $399", image: hero2, affiliateLink: "#", visible: true },
      { id: "h3", name: "Smart Watch", category: "Wearables", price: "From $299", image: hero3, affiliateLink: "#", visible: true },
    ],
  },
  sections: [
    {
      id: "tech",
      type: "category",
      visible: true,
      title: "Tech & Productivity",
      subtitle: "The tools that make every hour count.",
      bgColor: "#272729",
      products: [
        { id: "t1", name: "Pro Tablet", description: "My daily driver for digital notes.", price: "From $799", image: tech1, affiliateLink: "#", visible: true },
        { id: "t2", name: "Ergonomic Mouse", description: "Saved my wrist during long sessions.", price: "$99.99", image: tech2, affiliateLink: "#", visible: true },
        { id: "t3", name: "Mechanical Keyboard", description: "Incredible tactile feel and aesthetic.", price: "$149.99", image: hero4, affiliateLink: "#", visible: true },
        { id: "t4", name: "Desk Mat", description: "Premium leather mat for a clean look.", price: "$45.00", image: tech1, affiliateLink: "#", visible: true },
      ],
    } as CategorySection,
    {
      id: "editorial",
      type: "editorial",
      visible: true,
      badge: "#1 Pick",
      headline: "The one bag I take everywhere.",
      body: "I've tested dozens of backpacks, and this is the only one that balances rugged durability with a clean, professional aesthetic perfectly. It holds my entire setup effortlessly.",
      image: editorial1,
      primaryCtaLabel: "Read Review",
      primaryCtaLink: "#",
      secondaryCtaLabel: "Shop Now",
      secondaryCtaLink: "#",
      disclaimer: "Affiliate link — I earn a small commission at no cost to you.",
    } as EditorialSection,
    {
      id: "home",
      type: "category",
      visible: true,
      title: "Style & Home",
      subtitle: "",
      bgColor: "#2a2a2c",
      products: [
        { id: "ho1", name: "Espresso Machine", description: "Cafe-quality coffee at home.", price: "From $599", image: home1, affiliateLink: "#", visible: true },
        { id: "ho2", name: "Smart LED Lamp", description: "Perfect task lighting with app control.", price: "$129.00", image: home2, affiliateLink: "#", visible: true },
        { id: "ho3", name: "Ceramic Mug", description: "Beautifully crafted, holds heat well.", price: "$28.00", image: home1, affiliateLink: "#", visible: true },
        { id: "ho4", name: "Air Purifier", description: "Silent operation, clean aesthetic.", price: "$249.00", image: home2, affiliateLink: "#", visible: true },
        { id: "ho5", name: "Desk Organizer", description: "Keep cables and pens out of sight.", price: "$35.00", image: home1, affiliateLink: "#", visible: true },
        { id: "ho6", name: "Linen Throw", description: "Soft, breathable, and looks great.", price: "$85.00", image: home2, affiliateLink: "#", visible: true },
      ],
    } as CategorySection,
    {
      id: "trust",
      type: "trust",
      visible: true,
      headline: "Why these picks?",
      items: [
        { id: "tr1", title: "Tested First", body: "I only share products that I have personally used, integrated into my workflow, and loved.", visible: true },
        { id: "tr2", title: "No Sponsored Posts", body: "No brand pays me to be on this list. All opinions are entirely my own.", visible: true },
        { id: "tr3", title: "Full Disclosure", body: "If you buy through these links, I earn a small commission that supports my work.", visible: true },
      ],
    } as TrustSectionData,
    {
      id: "reviews",
      type: "reviews",
      visible: true,
      headline: "Fresh from the blog",
      items: [
        { id: "r1", image: review1, category: "Tech", title: "The Ultimate Desk Setup for 2025", excerpt: "Rebuilding my workspace around focus and ergonomics.", link: "#", visible: true },
        { id: "r2", image: review1, category: "Audio", title: "Why I switched to these studio monitors", excerpt: "Finding the perfect balance of flat response and daily enjoyment.", link: "#", visible: true },
        { id: "r3", image: review1, category: "Travel", title: "Minimalist Packing: 7 Days in Tokyo", excerpt: "Everything I brought in a single 25L backpack.", link: "#", visible: true },
      ],
    } as ReviewsSection,
  ],
};

const STORAGE_KEY = "curated_content_v1";

function loadContent(): SiteContent {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as SiteContent;
  } catch {}
  return DEFAULT_CONTENT;
}

function saveContent(c: SiteContent) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
  } catch {}
}

interface ContentContextValue {
  content: SiteContent;
  updateContent: (c: SiteContent) => void;
  resetContent: () => void;
}

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(loadContent);

  const updateContent = useCallback((c: SiteContent) => {
    setContent(c);
    saveContent(c);
  }, []);

  const resetContent = useCallback(() => {
    setContent(DEFAULT_CONTENT);
    saveContent(DEFAULT_CONTENT);
  }, []);

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within ContentProvider");
  return ctx;
}

export function uid() {
  return Math.random().toString(36).slice(2, 10);
}
