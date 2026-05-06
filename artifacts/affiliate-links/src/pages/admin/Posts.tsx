import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Link, useLocation } from "wouter";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";

export default function Posts() {
  const queryClient = useQueryClient();
  const [, navigate] = useLocation();
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["posts", "all"],
    queryFn: () => api.posts.list({ status: "all" }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.posts.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast({ title: "Post deleted" });
    },
    onError: (err: any) => {
      toast({ title: "Failed to delete", description: err.message, variant: "destructive" });
    }
  });

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-muted-foreground">Write and manage your reviews.</p>
        </div>
        <Link href="/admin/posts/new">
          <Button className="bg-[#0066cc]">
            <Plus className="w-4 h-4 mr-2" /> New Post
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-[18px] border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Cover</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow 
                key={post.id} 
                className="cursor-pointer"
                onClick={() => navigate(`/admin/posts/${post.id}`)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <div className="w-12 h-12 rounded bg-muted overflow-hidden">
                    {post.coverImage && (
                      <img src={post.coverImage} className="w-full h-full object-cover" />
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>
                  <Badge variant={post.status === "published" ? "default" : "secondary"} className={
                    post.status === "published" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""
                  }>
                    {post.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {format(new Date(post.createdAt), "MMM d, yyyy")}
                </TableCell>
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => navigate(`/admin/posts/${post.id}`)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete "{post.title}".
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => deleteMutation.mutate(post.id)}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {posts.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                  No posts found. Create your first post to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
