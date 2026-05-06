import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, Product } from "@/lib/api";
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
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { Loader2, X } from "lucide-react";

export default function ProductForm() {
  const { id } = useParams();
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const isEdit = id && id !== "new";
  const productId = isEdit ? Number(id) : null;

  const [formData, setFormData] = useState<Partial<Product>>({
    title: "",
    description: "",
    images: [],
    affiliateLink: "",
    categoryId: null,
    status: "draft",
    featured: false,
    sortOrder: 0,
    metaTitle: "",
    metaDescription: "",
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () => api.categories.list(),
  });

  const { data: products = [] } = useQuery({
    queryKey: ["products", "all"],
    queryFn: () => api.products.list({ status: "all" }),
  });

  const product = isEdit ? products.find((item) => item.id === productId) ?? null : null;
  const productLoading = isEdit && !product && products.length === 0;

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const mutation = useMutation({
    mutationFn: (data: Partial<Product>) => 
      isEdit ? api.products.update(Number(id), data) : api.products.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({ title: `Product ${isEdit ? "updated" : "created"}` });
      navigate("/admin/products");
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  });

  const handleImageChange = (url: string) => {
    if (!url) return;
    setFormData(prev => ({
      ...prev,
      images: [...(prev.images || []), url]
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  if (isEdit && productLoading) return <div className="p-8">Loading...</div>;

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEdit ? "Edit Product" : "New Product"}
          </h1>
          <p className="text-muted-foreground">
            {isEdit ? `Editing ${product?.title}` : "Fill in the details below"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-[18px] border shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
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

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              value={formData.description}
              onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
              rows={4} 
              required
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label>Images</Label>
            <div className="grid grid-cols-2 gap-4">
              {formData.images?.map((img, idx) => (
                <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border">
                  <img src={img} className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <ImageUpload value="" onChange={handleImageChange} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="affiliateLink">Affiliate Link</Label>
              <Input 
                id="affiliateLink" 
                value={formData.affiliateLink}
                onChange={e => setFormData(p => ({ ...p, affiliateLink: e.target.value }))}
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={String(formData.categoryId || "")} 
                onValueChange={(val) => setFormData(p => ({ ...p, categoryId: Number(val) }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(c => (
                    <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-8">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(val: any) => setFormData(p => ({ ...p, status: val }))}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sortOrder">Sort Order</Label>
                <Input 
                  id="sortOrder" 
                  type="number" 
                  className="w-[100px]"
                  value={formData.sortOrder}
                  onChange={e => setFormData(p => ({ ...p, sortOrder: Number(e.target.value) }))}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="featured" 
                checked={formData.featured}
                onCheckedChange={(val) => setFormData(p => ({ ...p, featured: !!val }))}
              />
              <Label htmlFor="featured" className="text-sm font-medium leading-none cursor-pointer">
                Featured on homepage
              </Label>
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
          <Button type="button" variant="outline" onClick={() => navigate("/admin/products")}>
            Cancel
          </Button>
          <Button type="submit" className="bg-[#0066cc]" disabled={mutation.isPending}>
            {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEdit ? "Update Product" : "Create Product"}
          </Button>
        </div>
      </form>
    </div>
  );
}
