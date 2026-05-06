import { Search, Menu } from "lucide-react";
import { Link } from "wouter";
import { useContent } from "@/context/ContentContext";
import { useAdmin } from "@/context/AdminContext";

export function GlobalNav() {
  const { content } = useContent();
  const { openAdmin } = useAdmin();

  return (
    <nav className="sticky top-0 z-50 w-full h-[44px] bg-[#000000] text-white flex items-center px-4 md:px-8">
      <div className="flex-1 flex items-center">
        <Link href="/" className="font-semibold text-[12px] tracking-tight hover:opacity-80 transition-opacity" data-testid="nav-logo">
          {content.siteName}
        </Link>
      </div>

      <div className="hidden md:flex items-center justify-center gap-8 text-[12px] font-normal tracking-[-0.12px]">
        <Link href="#products" className="hover:opacity-80 transition-opacity" data-testid="nav-link-products">Products</Link>
        <Link href="#tech" className="hover:opacity-80 transition-opacity" data-testid="nav-link-tech">Tech</Link>
        <Link href="#home" className="hover:opacity-80 transition-opacity" data-testid="nav-link-home">Home</Link>
        <Link href="#style" className="hover:opacity-80 transition-opacity" data-testid="nav-link-style">Style</Link>
        <Link href="#deals" className="hover:opacity-80 transition-opacity" data-testid="nav-link-deals">Deals</Link>
      </div>

      <div className="flex-1 flex items-center justify-end gap-4">
        <button aria-label="Search" className="hover:opacity-80 transition-opacity" data-testid="nav-search-button">
          <Search className="w-4 h-4" />
        </button>
        <button
          onClick={openAdmin}
          className="hidden md:flex items-center gap-1.5 text-[11px] font-medium bg-white/10 hover:bg-white/20 transition-colors px-3 py-1 rounded-full"
          data-testid="nav-edit-button"
        >
          Edit Site
        </button>
        <button className="md:hidden hover:opacity-80 transition-opacity" aria-label="Menu" data-testid="nav-menu-button">
          <Menu className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
}
