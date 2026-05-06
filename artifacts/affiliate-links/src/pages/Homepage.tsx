import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { GlobalNav } from "@/components/GlobalNav";
import { HeroSection } from "@/components/HeroSection";
import { TrustSection } from "@/components/TrustSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SEOHead } from "@/components/SEOHead";
import { AffiliateCard } from "@/components/AffiliateCard";
import { Link } from "wouter";

import tech1 from "@/assets/tech-1.png";
import tech2 from "@/assets/tech-2.png";
import review1 from "@/assets/review-1.png";

export default function Homepage() {
  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ["products", "published"],
    queryFn: () => api.products.list({ status: "published" }),
  });

  const { data: posts = [], isLoading: postsLoading } = useQuery({
    queryKey: ["posts", "published"],
    queryFn: () => api.posts.list({ status: "published" }),
  });

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#0066cc]/20">
      <SEOHead
        title="Home"
        description="The products I actually use. Honestly reviewed. Carefully chosen."
      />

      <GlobalNav />

      <HeroSection />

      {/* Featured Products Section */}
      <section id="products" className="py-20 bg-[#272729] text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-[40px] md:text-[48px] font-semibold tracking-tight leading-tight">
              Featured Picks.
            </h2>
            <p className="text-[19px] md:text-[21px] text-[#a1a1a6] mt-4 max-w-2xl leading-relaxed">
              These are the items that have earned a permanent spot in my daily rotation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productsLoading ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="h-[400px] bg-white/5 animate-pulse rounded-[28px]" />
              ))
            ) : products.length > 0 ? (
              products.slice(0, 4).map((product) => (
                <Link key={product.id} href={`/products/${product.slug}`}>
                  <div className="group cursor-pointer">
                    <AffiliateCard
                      name={product.title}
                      description={product.description}
                      price="Shop Now"
                      image={product.images[0] || tech1}
                      affiliateLink={product.affiliateLink}
                    />
                  </div>
                </Link>
              ))
            ) : (
              [
                { id: "t1", name: "Pro Tablet", description: "My daily driver for digital notes.", price: "From $799", image: tech1, affiliateLink: "#" },
                { id: "t2", name: "Ergonomic Mouse", description: "Saved my wrist during long sessions.", price: "$99.99", image: tech2, affiliateLink: "#" },
                { id: "t3", name: "Mechanical Keyboard", description: "Incredible tactile feel and aesthetic.", price: "$149.99", image: tech1, affiliateLink: "#" },
                { id: "t4", name: "Desk Mat", description: "Premium leather mat for a clean look.", price: "$45.00", image: tech2, affiliateLink: "#" },
              ].map((p) => (
                <AffiliateCard
                  key={p.id}
                  name={p.name}
                  description={p.description}
                  price={p.price}
                  image={p.image}
                  affiliateLink={p.affiliateLink}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section id="blog" className="py-20 bg-[#f5f5f7]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-[40px] md:text-[48px] font-semibold tracking-tight leading-tight text-[#1d1d1f]">
              From the blog.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {postsLoading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="h-[350px] bg-white animate-pulse rounded-[28px]" />
              ))
            ) : posts.length > 0 ? (
              posts.slice(0, 3).map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <div className="bg-white rounded-[28px] overflow-hidden transition-all duration-500 shadow-sm hover:shadow-xl group cursor-pointer">
                    <div className="aspect-[16/9] overflow-hidden bg-[#f5f5f7]">
                      <img
                        src={post.coverImage || review1}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-8">
                      <div className="text-[12px] font-semibold text-[#0066cc] uppercase tracking-wider mb-2">
                        Review
                      </div>
                      <h3 className="text-[21px] font-semibold text-[#1d1d1f] mb-3 leading-tight group-hover:text-[#0066cc] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-[14px] text-[#86868b] line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="mt-6 flex items-center text-[#0066cc] text-[14px] font-medium">
                        Read more <span className="ml-1 group-hover:translate-x-1 transition-transform inline-block">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              [
                { id: "r1", image: review1, title: "The Ultimate Desk Setup for 2025", excerpt: "Rebuilding my workspace around focus and ergonomics." },
                { id: "r2", image: review1, title: "Why I switched to these studio monitors", excerpt: "Finding the perfect balance of flat response and daily enjoyment." },
                { id: "r3", image: review1, title: "Minimalist Packing: 7 Days in Tokyo", excerpt: "Everything I brought in a single 25L backpack." },
              ].map((r) => (
                <div key={r.id} className="bg-white rounded-[28px] overflow-hidden shadow-sm p-8">
                  <div className="text-[12px] font-semibold text-[#0066cc] uppercase tracking-wider mb-2">Review</div>
                  <h3 className="text-[21px] font-semibold text-[#1d1d1f] mb-3">{r.title}</h3>
                  <p className="text-[14px] text-[#86868b]">{r.excerpt}</p>
                </div>
              ))
            )}
          </div>

          {posts.length > 0 && (
            <div className="mt-12 text-center">
              <Link href="/blog">
                <span className="inline-flex items-center text-[#0066cc] text-[17px] font-medium hover:underline cursor-pointer">
                  View all posts →
                </span>
              </Link>
            </div>
          )}
        </div>
      </section>

      <TrustSection
        section={{
          id: "trust",
          type: "trust",
          visible: true,
          headline: "Why these picks?",
          items: [
            { id: "tr1", title: "Tested First", body: "I only share products that I have personally used, integrated into my workflow, and loved.", visible: true },
            { id: "tr2", title: "No Sponsored Posts", body: "No brand pays me to be on this list. All opinions are entirely my own.", visible: true },
            { id: "tr3", title: "Full Disclosure", body: "If you buy through these links, I earn a small commission that supports my work.", visible: true },
          ],
        }}
      />

      <SiteFooter />
    </div>
  );
}
