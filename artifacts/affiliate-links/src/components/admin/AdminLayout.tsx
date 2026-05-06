import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  Tag, 
  LogOut, 
  ExternalLink,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { user, isLoading, logout } = useAuth();
  const [location] = useLocation();

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#1d1d1f]">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }

  if (!user) {
    window.location.href = "/admin/login";
    return null;
  }

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/posts", label: "Blog Posts", icon: FileText },
    { href: "/admin/categories", label: "Categories", icon: Tag },
  ];

  return (
    <div className="flex h-screen bg-[#f5f5f7]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1d1d1f] text-white flex flex-col p-4">
        <div className="mb-8 px-2">
          <h1 className="text-xl font-semibold tracking-tight">curated.</h1>
          <p className="text-[12px] text-white/50">Admin Panel</p>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-[8px] transition-colors cursor-pointer text-[14px]",
                  isActive 
                    ? "bg-white/10 text-white" 
                    : "text-white/70 hover:text-white hover:bg-white/5"
                )}>
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto space-y-1 border-t border-white/10 pt-4">
          <Link href="/">
            <div className="flex items-center gap-3 px-3 py-2 rounded-[8px] transition-colors cursor-pointer text-[14px] text-white/70 hover:text-white hover:bg-white/5">
              <ExternalLink className="w-4 h-4" />
              Back to Site
            </div>
          </Link>
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-[8px] transition-colors cursor-pointer text-[14px] text-white/70 hover:text-red-400 hover:bg-red-400/10"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-white">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
