import { Router, type IRouter } from "express";
import { eq, asc } from "drizzle-orm";
import { db, productsTable, categoriesTable } from "@workspace/db";
import { requireAuth } from "../middlewares/requireAuth";
import { slugify } from "../lib/slugify";

const router: IRouter = Router();

router.get("/products", async (req, res): Promise<void> => {
  const { status } = req.query as { status?: string };
  let rows = await db
    .select({ product: productsTable, category: categoriesTable })
    .from(productsTable)
    .leftJoin(categoriesTable, eq(productsTable.categoryId, categoriesTable.id))
    .orderBy(asc(productsTable.sortOrder), asc(productsTable.createdAt));

  if (!status || status === "published") {
    rows = rows.filter(r => r.product.status === "published");
  }

  res.json(rows.map(r => ({ ...r.product, category: r.category ?? null })));
});

router.get("/products/:slug", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
  const [row] = await db
    .select({ product: productsTable, category: categoriesTable })
    .from(productsTable)
    .leftJoin(categoriesTable, eq(productsTable.categoryId, categoriesTable.id))
    .where(eq(productsTable.slug, raw));
  if (!row) { res.status(404).json({ error: "Product not found" }); return; }
  res.json({ ...row.product, category: row.category ?? null });
});

router.post("/products", requireAuth, async (req, res): Promise<void> => {
  const body = req.body as Record<string, unknown>;
  const { title, description, images, affiliateLink, categoryId, status, featured, sortOrder, metaTitle, metaDescription } = body as {
    title?: string; description?: string; images?: string[]; affiliateLink?: string;
    categoryId?: number; status?: string; featured?: boolean; sortOrder?: number;
    metaTitle?: string; metaDescription?: string;
  };
  if (!title) { res.status(400).json({ error: "Title is required" }); return; }
  const slug = slugify(title);
  const [product] = await db.insert(productsTable).values({
    title, slug, description: description ?? "", images: images ?? [],
    affiliateLink: affiliateLink ?? "#", categoryId: categoryId ?? null,
    status: status ?? "draft", featured: featured ?? false,
    sortOrder: sortOrder ?? 0, metaTitle: metaTitle ?? "", metaDescription: metaDescription ?? "",
  }).returning();
  res.status(201).json(product);
});

router.put("/products/:id", requireAuth, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const { title, description, images, affiliateLink, categoryId, status, featured, sortOrder, metaTitle, metaDescription, slug } = req.body as {
    title?: string; description?: string; images?: string[]; affiliateLink?: string;
    categoryId?: number | null; status?: string; featured?: boolean; sortOrder?: number;
    metaTitle?: string; metaDescription?: string; slug?: string;
  };
  const updates: Record<string, unknown> = {};
  if (title != null) { updates.title = title; updates.slug = slug ?? slugify(title); }
  if (description != null) updates.description = description;
  if (images != null) updates.images = images;
  if (affiliateLink != null) updates.affiliateLink = affiliateLink;
  if (categoryId !== undefined) updates.categoryId = categoryId;
  if (status != null) updates.status = status;
  if (featured != null) updates.featured = featured;
  if (sortOrder != null) updates.sortOrder = sortOrder;
  if (metaTitle != null) updates.metaTitle = metaTitle;
  if (metaDescription != null) updates.metaDescription = metaDescription;
  const [product] = await db.update(productsTable).set(updates).where(eq(productsTable.id, id)).returning();
  if (!product) { res.status(404).json({ error: "Not found" }); return; }
  res.json(product);
});

router.delete("/products/:id", requireAuth, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const [p] = await db.delete(productsTable).where(eq(productsTable.id, id)).returning();
  if (!p) { res.status(404).json({ error: "Not found" }); return; }
  res.sendStatus(204);
});

router.patch("/products/reorder", requireAuth, async (req, res): Promise<void> => {
  const { items } = req.body as { items?: { id: number; sort_order: number }[] };
  if (!Array.isArray(items)) { res.status(400).json({ error: "Items array required" }); return; }
  await Promise.all(items.map(item =>
    db.update(productsTable).set({ sortOrder: item.sort_order }).where(eq(productsTable.id, item.id))
  ));
  res.json({ ok: true });
});

export default router;
