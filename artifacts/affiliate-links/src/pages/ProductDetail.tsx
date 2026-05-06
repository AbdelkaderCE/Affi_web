import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useParams, Link } from "wouter";
import { GlobalNav } from "@/components/GlobalNav";
import { SiteFooter } from "@/components/SiteFooter";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, ShoppingCart } from "lucide-react";

export default function ProductDetail() {
  const { slug } = useParams();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => api.products.get(slug!),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <GlobalNav />
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Skeleton className="aspect-square rounded-[28px]" />
            <div className="space-y-6">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-48" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white">
        <GlobalNav />
        <div className="max-w-6xl mx-auto px-4 py-40 text-center">
          <h1 className="text-4xl font-bold mb-4">Product not found</h1>
          <Link href="/">
            <Button variant="link" className="text-[#0066cc]">Back to home</Button>
          </Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <SEOHead 
        title={product.metaTitle || product.title} 
        description={product.metaDescription || product.description}
        image={product.images[0]}
      />
      
      <GlobalNav />

      <main>
        {/* Product Hero */}
        <section className="pt-20 pb-12 md:pt-32 md:pb-24">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                {product.category && (
                  <span className="inline-block text-[14px] font-semibold text-[#0066cc] uppercase tracking-wider mb-4">
                    {product.category.name}
                  </span>
                )}
                <h1 className="text-[48px] md:text-[56px] font-semibold tracking-tight leading-[1.1] text-[#1d1d1f] mb-6">
                  {product.title}
                </h1>
                <p className="text-[19px] md:text-[21px] text-[#424245] leading-relaxed mb-10">
                  {product.description}
                </p>
                
                <div className="flex flex-col gap-4">
                  <a 
                    href={product.affiliateLink} 
                    target="_blank" 
                    rel="noopener noreferrer sponsored"
                  >
                    <Button 
                      className="bg-[#0066cc] hover:bg-[#0071e3] text-white px-8 py-6 rounded-full text-[17px] font-medium transition-all hover:scale-[1.02] active:scale-[0.98] h-auto flex items-center gap-2"
                    >
                      Shop Now <ShoppingCart className="w-5 h-5" />
                    </Button>
                  </a>
                  <p className="text-[12px] text-[#86868b] italic">
                    Affiliate link — I earn a small commission at no cost to you.
                  </p>
                </div>
              </div>

              <div className="order-1 md:order-2">
                <div className="relative aspect-square rounded-[32px] overflow-hidden bg-[#f5f5f7] flex items-center justify-center p-8 group">
                  <img 
                    src={product.images[0] || "/placeholder.png"} 
                    alt={product.title}
                    className="max-w-full max-h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* More Images if any */}
        {product.images.length > 1 && (
          <section className="py-20 bg-[#f5f5f7]">
            <div className="max-w-6xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {product.images.slice(1).map((img, idx) => (
                  <div key={idx} className="aspect-square rounded-[24px] overflow-hidden bg-white p-4">
                    <img src={img} alt={`${product.title} ${idx + 2}`} className="w-full h-full object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Footer Navigation */}
        <section className="py-20 bg-[#f5f5f7] border-t border-[#e0e0e0]">
          <div className="max-w-6xl mx-auto px-4 flex justify-center">
            <Link href="/" className="flex items-center gap-2 text-[#0066cc] font-medium hover:underline transition-all">
              <ArrowLeft className="w-4 h-4" /> Back to all products
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
