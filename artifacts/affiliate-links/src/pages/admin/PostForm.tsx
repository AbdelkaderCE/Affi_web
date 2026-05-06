import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, Post } from "@/lib/api";
import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/ImageUpload";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import MDEditor from '@uiw/react-md-editor';

export default function PostForm() {
  const { id } = useParams();
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const isEdit = id && id !== "new";

  const [formData, setFormData] = useState<Partial<Post>>({
    title: "",
    excerpt: "",
    content: "",
    coverImage: "",
    status: "draft",
    metaTitle: "",
    metaDescription: "",
  });

  const { data: post, isLoading: postLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: () => api.posts.get(id!),
    enabled: !!isEdit,
  });

  useEffect(() => {
    if (post) {
      setFormData(post);
    }
  }, [post]);

  const mutation = useMutation({
    mutationFn: (data: Partial<Post>) => 
      isEdit ? api.posts.update(Number(id), data) : api.posts.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast({ title: `Post ${isEdit ? "updated" : "created"}` });
      navigate("/admin/posts");
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  if (isEdit && postLoading) return <div className="p-8">Loading...</div>;

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEdit ? "Edit Post" : "New Post"}
          </h1>
          <p className="text-muted-foreground">
            {isEdit ? `Editing ${post?.title}` : "Share your thoughts and reviews"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-[18px] border shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="title">Title</Label>
            <Input 
              id="title" 
              value={formData.title} 
              onChange={e => setFormData(p => ({ ...p, title: e.target.value }))}
              required 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug (Auto-generated)</Label>
            <Input id="slug" value={formData.slug} readOnly className="bg-muted" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select 
              value={formData.status} 
              onValueChange={(val: any) => setFormData(p => ({ ...p, status: val }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea 
              id="excerpt" 
              value={formData.excerpt}
              onChange={e => setFormData(p => ({ ...p, excerpt: e.target.value }))}
              rows={3} 
              required
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label>Cover Image</Label>
            <ImageUpload 
              value={formData.coverImage || ""} 
              onChange={(url) => setFormData(p => ({ ...p, coverImage: url }))} 
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label>Content</Label>
            <div data-color-mode="light">
              <MDEditor
                value={formData.content}
                onChange={(val) => setFormData(p => ({ ...p, content: val ?? "" }))}
                height={400}
                preview="edit"
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-8 space-y-6">
          <h3 className="font-semibold">SEO Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="metaTitle">Meta Title</Label>
              <Input 
                id="metaTitle" 
                value={formData.metaTitle}
                onChange={e => setFormData(p => ({ ...p, metaTitle: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="metaDescription">Meta Description</Label>
              <Textarea 
                id="metaDescription" 
                value={formData.metaDescription}
                onChange={e => setFormData(p => ({ ...p, metaDescription: e.target.value }))}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" variant="outline" onClick={() => navigate("/admin/posts")}>
            Cancel
          </Button>
          <Button type="submit" className="bg-[#0066cc]" disabled={mutation.isPending}>
            {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEdit ? "Update Post" : "Create Post"}
          </Button>
        </div>
      </form>
    </div>
  );
}
