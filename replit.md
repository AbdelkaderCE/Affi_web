# curated.

A production-ready affiliate marketing platform with a public Apple-inspired storefront and a JWT-secured admin panel backed by PostgreSQL.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — API server (port 8080, rebuilds on start)
- `pnpm --filter @workspace/affiliate-links run dev` — Frontend (Vite, PORT from env)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks/Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL`, `SESSION_SECRET`
- Default admin: `admin@curated.com` / `admin123` (seeded on first start)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS, wouter, TanStack Query, react-helmet-async
- API: Express 5 + pino logger
- DB: PostgreSQL + Drizzle ORM (`lib/db`)
- Auth: JWT (jsonwebtoken), bcryptjs — token in localStorage("admin_token")
- Image uploads: multer → served at `/api/uploads/*`
- Blog editor: @uiw/react-md-editor
- Build: esbuild (CJS bundle for API)

## Where things live

```
artifacts/affiliate-links/src/
  lib/api.ts              — typed fetch wrapper for all API calls
  context/AuthContext.tsx — JWT auth state (login/logout/useAuth)
  pages/Homepage.tsx      — public landing page (fetches from API)
  pages/ProductDetail.tsx — /products/:slug
  pages/BlogList.tsx      — /blog
  pages/BlogPost.tsx      — /blog/:slug
  pages/admin/            — Login, Dashboard, Products, ProductForm, Posts, PostForm, Categories
  components/admin/AdminLayout.tsx — sidebar nav + auth guard
  components/SEOHead.tsx  — react-helmet-async wrapper
  components/ImageUpload.tsx — upload to /api/upload

artifacts/api-server/src/
  routes/                 — auth.ts, products.ts, posts.ts, categories.ts, upload.ts
  middlewares/requireAuth.ts — JWT Bearer verification
  lib/auth.ts             — signToken / verifyToken
  lib/seed.ts             — seeds admin@curated.com on first start
  lib/slugify.ts          — URL-safe slug generator
  uploads/                — stored image files

lib/db/src/schema/        — users, categories, products, posts (Drizzle)
```

## Architecture decisions

- **JWT in localStorage** — simple for an admin-only tool; no CSRF risk since there are no session cookies
- **Flat route registration in App.tsx** — wouter doesn't auto-strip prefix in nested Switches, so all admin routes use full `/admin/*` paths and are individually registered
- **API-first with static fallbacks** — homepage fetches live products/posts; if empty, shows placeholder images so the page never looks broken
- **Uploads served from Express static** — `/api/uploads/*` served directly; files stored in `artifacts/api-server/uploads/`
- **Seed runs on every start** — idempotent; skips if admin user already exists

## Product

- Public: Apple-inspired storefront with product grid, blog, individual product pages with affiliate CTAs, SEO meta tags
- Admin: JWT login → dashboard with stats → full product CRUD (images, categories, SEO, featured) → blog CRUD with markdown editor → category management

## User preferences

- Apple design system for all public pages: black nav (#000), parchment (#f5f5f7), near-black (#272729), action blue (#0066cc)
- Admin panel: dark sidebar (#1d1d1f), white content area — functional, not Apple-styled
- No explicit React imports (JSX transformer)
- No unused imports (strict TS build)

## Gotchas

- Run `pnpm --filter @workspace/db run push` before first API start when schema changes
- Do NOT call `pnpm dev` at workspace root — use individual workflow restarts
- wouter nested routing: inner routes must use FULL paths (e.g. `/admin/products`), not relative paths
- @uiw/react-md-editor: wrap in `<div data-color-mode="light">` to prevent dark mode UI issues
- Uploads directory is created automatically by upload route on first request

## Pointers

- DB schema: `lib/db/src/schema/`
- API routes: `artifacts/api-server/src/routes/`
- pnpm-workspace skill for workspace structure and TypeScript setup
