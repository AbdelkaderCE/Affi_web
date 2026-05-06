import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import NotFound from "@/pages/not-found";
import Homepage from "@/pages/Homepage";
import ProductDetail from "@/pages/ProductDetail";
import BlogList from "@/pages/BlogList";
import BlogPost from "@/pages/BlogPost";
import { AdminLayout } from "@/components/admin/AdminLayout";
import Login from "@/pages/admin/Login";
import Dashboard from "@/pages/admin/Dashboard";
import Products from "@/pages/admin/Products";
import ProductForm from "@/pages/admin/ProductForm";
import Posts from "@/pages/admin/Posts";
import PostForm from "@/pages/admin/PostForm";
import Categories from "@/pages/admin/Categories";
import { ContentProvider } from "@/context/ContentContext";
import { AdminProvider } from "@/context/AdminContext";
import { AuthProvider } from "@/context/AuthContext";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Homepage} />
      <Route path="/products/:slug" component={ProductDetail} />
      <Route path="/blog" component={BlogList} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/admin/login" component={Login} />
      <Route path="/admin/products/new">
        <AdminLayout><ProductForm /></AdminLayout>
      </Route>
      <Route path="/admin/products/:id">
        <AdminLayout><ProductForm /></AdminLayout>
      </Route>
      <Route path="/admin/products">
        <AdminLayout><Products /></AdminLayout>
      </Route>
      <Route path="/admin/posts/new">
        <AdminLayout><PostForm /></AdminLayout>
      </Route>
      <Route path="/admin/posts/:id">
        <AdminLayout><PostForm /></AdminLayout>
      </Route>
      <Route path="/admin/posts">
        <AdminLayout><Posts /></AdminLayout>
      </Route>
      <Route path="/admin/categories">
        <AdminLayout><Categories /></AdminLayout>
      </Route>
      <Route path="/admin">
        <AdminLayout><Dashboard /></AdminLayout>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <AuthProvider>
            <ContentProvider>
              <AdminProvider>
                <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
                  <Router />
                </WouterRouter>
                <Toaster />
              </AdminProvider>
            </ContentProvider>
          </AuthProvider>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
