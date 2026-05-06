import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Package, FileText, CheckCircle, Clock } from "lucide-react";
import { Link } from "wouter";
import { format } from "date-fns";

export default function Dashboard() {
  const { data: products = [] } = useQuery({
    queryKey: ["products", "all"],
    queryFn: () => api.products.list({ status: "all" }),
  });

  const { data: posts = [] } = useQuery({
    queryKey: ["posts", "all"],
    queryFn: () => api.posts.list({ status: "all" }),
  });

  const stats = [
    { 
      label: "Total Products", 
      value: products.length, 
      icon: Package, 
      color: "text-blue-500" 
    },
    { 
      label: "Published Products", 
      value: products.filter(p => p.status === "published").length, 
      icon: CheckCircle, 
      color: "text-green-500" 
    },
    { 
      label: "Total Posts", 
      value: posts.length, 
      icon: FileText, 
      color: "text-purple-500" 
    },
    { 
      label: "Published Posts", 
      value: posts.filter(p => p.status === "published").length, 
      icon: CheckCircle, 
      color: "text-emerald-500" 
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to your curated platform.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/admin/products/new">
            <Button className="bg-[#0066cc]">
              <Plus className="w-4 h-4 mr-2" /> New Product
            </Button>
          </Link>
          <Link href="/admin/posts/new">
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" /> New Post
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm rounded-[18px]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Products */}
        <Card className="border-none shadow-sm rounded-[18px]">
          <CardHeader>
            <CardTitle className="text-lg">Recent Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.slice(0, 5).map((product) => (
                <Link key={product.id} href={`/admin/products/${product.id}`}>
                  <div className="flex items-center gap-4 p-2 hover:bg-muted rounded-lg transition-colors cursor-pointer">
                    <div className="w-12 h-12 rounded bg-muted overflow-hidden flex-shrink-0">
                      {product.images?.[0] && (
                        <img src={product.images[0]} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{product.title}</p>
                      <p className="text-xs text-muted-foreground uppercase">{product.status}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {format(new Date(product.createdAt), "MMM d")}
                    </div>
                  </div>
                </Link>
              ))}
              {products.length === 0 && <p className="text-sm text-muted-foreground py-4">No products yet.</p>}
            </div>
          </CardContent>
        </Card>

        {/* Recent Posts */}
        <Card className="border-none shadow-sm rounded-[18px]">
          <CardHeader>
            <CardTitle className="text-lg">Recent Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {posts.slice(0, 5).map((post) => (
                <Link key={post.id} href={`/admin/posts/${post.id}`}>
                  <div className="flex items-center gap-4 p-2 hover:bg-muted rounded-lg transition-colors cursor-pointer">
                    <div className="w-12 h-12 rounded bg-muted overflow-hidden flex-shrink-0">
                      {post.coverImage && (
                        <img src={post.coverImage} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{post.title}</p>
                      <p className="text-xs text-muted-foreground uppercase">{post.status}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {format(new Date(post.createdAt), "MMM d")}
                    </div>
                  </div>
                </Link>
              ))}
              {posts.length === 0 && <p className="text-sm text-muted-foreground py-4">No posts yet.</p>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
