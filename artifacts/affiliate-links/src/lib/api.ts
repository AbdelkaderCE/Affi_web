const BASE = (import.meta.env.VITE_API_URL ?? "") + "/api";

function getToken(): string | null {
  return localStorage.getItem("admin_token");
}

interface RequestOptions {
  method?: string;
  body?: unknown;
  auth?: boolean;
}

async function request<T>(path: string, opts: RequestOptions = {}): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (opts.auth !== false) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(`${BASE}${path}`, {
    method: opts.method ?? "GET",
    headers,
    body: opts.body != null ? JSON.stringify(opts.body) : undefined,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error ?? "Request failed");
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

// Auth
export const api = {
  auth: {
    login: (email: string, password: string) =>
      request<{ token: string; user: { id: number; email: string; role: string } }>("/auth/login", { method: "POST", body: { email, password }, auth: false }),
    me: () => request<{ id: number; email: string; role: string }>("/auth/me"),
  },
  products: {
    list: (params?: { status?: string }) =>
      request<Product[]>(`/products${params?.status ? `?status=${params.status}` : ""}`),
    get: (slug: string) => request<Product>(`/products/${slug}`),
    create: (data: Partial<Product>) => request<Product>("/products", { method: "POST", body: data }),
    update: (id: number, data: Partial<Product>) => request<Product>(`/products/${id}`, { method: "PUT", body: data }),
    delete: (id: number) => request<void>(`/products/${id}`, { method: "DELETE" }),
    reorder: (items: { id: number; sort_order: number }[]) =>
      request<void>("/products/reorder", { method: "PATCH", body: { items } }),
  },
  posts: {
    list: (params?: { status?: string }) =>
      request<Post[]>(`/posts${params?.status ? `?status=${params.status}` : ""}`),
    get: (slug: string) => request<Post>(`/posts/${slug}`),
    create: (data: Partial<Post>) => request<Post>("/posts", { method: "POST", body: data }),
    update: (id: number, data: Partial<Post>) => request<Post>(`/posts/${id}`, { method: "PUT", body: data }),
    delete: (id: number) => request<void>(`/posts/${id}`, { method: "DELETE" }),
  },
  categories: {
    list: () => request<Category[]>("/categories"),
    create: (name: string) => request<Category>("/categories", { method: "POST", body: { name } }),
    delete: (id: number) => request<void>(`/categories/${id}`, { method: "DELETE" }),
  },
  upload: async (file: File): Promise<string> => {
    const token = getToken();
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(`${BASE}/upload`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: form,
    });
    if (!res.ok) throw new Error("Upload failed");
    const data = await res.json() as { url: string };
    return data.url;
  },
};

export interface Category {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  images: string[];
  affiliateLink: string;
  categoryId: number | null;
  category?: Category | null;
  status: "published" | "draft";
  featured: boolean;
  sortOrder: number;
  metaTitle: string;
  metaDescription: string;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  categoryId: string | null;
  status: "published" | "draft";
  metaTitle: string;
  metaDescription: string;
  createdAt: string;
  updatedAt: string;
}
