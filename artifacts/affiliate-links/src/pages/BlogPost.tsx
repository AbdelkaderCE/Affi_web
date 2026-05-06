import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useParams, Link } from "wouter";
import { GlobalNav } from "@/components/GlobalNav";
import { SiteFooter } from "@/components/SiteFooter";
import { SEOHead } from "@/components/SEOHead";
import { format } from "date-fns";
import MDEditor from '@uiw/react-md-editor';
import { ArrowLeft } from "lucide-react";

export default function BlogPost() {
  const { slug } = useParams();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => api.posts.get(slug!),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <GlobalNav />
        <div className="max-w-4xl mx-auto px-4 py-20 animate-pulse">
          <div className="h-4 w-24 bg-gray-200 rounded mb-6" />
          <div className="h-12 w-3/4 bg-gray-200 rounded mb-8" />
          <div className="aspect-video bg-gray-200 rounded-[28px] mb-12" />
          <div className="space-y-4">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-3/4 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white">
        <GlobalNav />
        <div className="max-w-4xl mx-auto px-4 py-40 text-center">
          <h1 className="text-4xl font-bold mb-4">Post not found</h1>
          <Link href="/blog" className="text-[#0066cc] hover:underline">Back to blog</Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <SEOHead 
        title={post.metaTitle || post.title} 
        description={post.metaDescription || post.excerpt}
        image={post.coverImage}
      />
      
      <GlobalNav />

      <main>
        {/* Post Header */}
        <section className="pt-20 pb-12">
          <div className="max-w-4xl mx-auto px-4">
            <Link href="/blog" className="inline-flex items-center gap-2 text-[#86868b] hover:text-[#0066cc] transition-colors mb-8 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to blog
            </Link>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-[#f5f5f7] rounded-full text-[12px] font-semibold text-[#0066cc] uppercase tracking-wider">
                {/* @ts-ignore - backend includes category object */}
                {post.category?.name || "Review"}
              </span>
              <span className="text-[14px] text-[#86868b]">
                {format(new Date(post.createdAt), "MMMM d, yyyy")}
              </span>
            </div>

            <h1 className="text-[40px] md:text-[56px] font-semibold tracking-tight leading-[1.1] text-[#1d1d1f] mb-12">
              {post.title}
            </h1>

            {post.coverImage && (
              <div className="aspect-[21/9] rounded-[28px] overflow-hidden mb-12 bg-[#f5f5f7]">
                <img 
                  src={post.coverImage} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </section>

        {/* Post Content */}
        <section className="pb-20">
          <div className="max-w-3xl mx-auto px-4">
            <div data-color-mode="light" className="markdown-content">
              <MDEditor.Markdown 
                source={post.content} 
                className="bg-transparent text-[#1d1d1f] prose prose-lg prose-slate max-w-none"
              />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
