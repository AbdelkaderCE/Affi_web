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
import { Plus, Edit, Trash2, Star, GripVertical } from "lucide-react";
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

export default function Products() {
  const queryClient = useQueryClient();
  const [, navigate] = useLocation();
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", "all"],
    queryFn: () => api.products.list({ status: "all" }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.products.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({ title: "Product deleted" });
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
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your affiliate products.</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="bg-[#0066cc]">
            <Plus className="w-4 h-4 mr-2" /> New Product
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-[18px] border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Featured</TableHead>
              <TableHead className="text-center">Order</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow 
                key={product.id} 
                className="cursor-pointer"
                onClick={() => navigate(`/admin/products/${product.id}`)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <div className="w-12 h-12 rounded bg-muted overflow-hidden">
                    {product.images?.[0] && (
                      <img src={product.images[0]} className="w-full h-full object-cover" />
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{product.title}</TableCell>
                <TableCell>{product.category?.name || "-"}</TableCell>
                <TableCell>
                  <Badge variant={product.status === "published" ? "default" : "secondary"} className={
                    product.status === "published" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""
                  }>
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
                  {product.featured && <Star className="w-4 h-4 mx-auto text-yellow-500 fill-yellow-500" />}
                </TableCell>
                <TableCell className="text-center">{product.sortOrder}</TableCell>
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => navigate(`/admin/products/${product.id}`)}>
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
                            This will permanently delete "{product.title}".
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => deleteMutation.mutate(product.id)}
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
            {products.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                  No products found. Add your first product to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
