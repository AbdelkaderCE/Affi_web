import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Link } from "wouter";
import { GlobalNav } from "@/components/GlobalNav";
import { SiteFooter } from "@/components/SiteFooter";
import { SEOHead } from "@/components/SEOHead";
import { format } from "date-fns";

export default function BlogList() {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["posts", "published"],
    queryFn: () => api.posts.list({ status: "published" }),
  });

  return (
    <div className="min-h-screen bg-white font-sans">
      <SEOHead 
        title="Blog" 
        description="Deep dives, reviews, and stories about the products that shape my life." 
      />
      
      <GlobalNav />

      <main>
        {/* Blog Hero */}
        <section className="pt-20 pb-12 md:pt-32 md:pb-20 border-b border-[#e0e0e0]">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-[48px] md:text-[64px] font-semibold tracking-tight leading-[1.1] text-[#1d1d1f] mb-6">
              From the blog.
            </h1>
            <p className="text-[19px] md:text-[21px] text-[#86868b] max-w-2xl mx-auto">
              Reviews, setups, and deep dives into the tools I use every day.
            </p>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-20 bg-[#f5f5f7]">
          <div className="max-w-6xl mx-auto px-4">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array(6).fill(0).map((_, i) => (
                  <div key={i} className="bg-white rounded-[28px] aspect-[4/5] animate-pulse" />
                ))}
              </div>
            ) : posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <article className="bg-white rounded-[28px] overflow-hidden hover-scale transition-all duration-500 shadow-sm hover:shadow-xl group cursor-pointer flex flex-col h-full">
                      <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                        {post.coverImage ? (
                          <img 
                            src={post.coverImage} 
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#86868b]">No Image</div>
                        )}
                      </div>
                      <div className="p-8 flex flex-col flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-[12px] font-semibold text-[#0066cc] uppercase tracking-wider">
                            {/* @ts-ignore - backend includes category object */}
                            {post.category?.name || "Review"}
                          </span>
                          <span className="text-[12px] text-[#86868b]">
                            {format(new Date(post.createdAt), "MMMM d, yyyy")}
                          </span>
                        </div>
                        <h2 className="text-[24px] font-semibold text-[#1d1d1f] mb-4 leading-tight group-hover:text-[#0066cc] transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-[16px] text-[#86868b] line-clamp-3 leading-relaxed mb-6">
                          {post.excerpt}
                        </p>
                        <div className="mt-auto flex items-center text-[#0066cc] text-[15px] font-medium">
                          Read more <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-[#86868b]">No blog posts found.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
