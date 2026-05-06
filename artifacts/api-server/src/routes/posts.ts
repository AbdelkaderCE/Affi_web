import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, postsTable } from "@workspace/db";
import { requireAuth } from "../middlewares/requireAuth";
import { slugify } from "../lib/slugify";

const router: IRouter = Router();

router.get("/posts", async (req, res): Promise<void> => {
  const { status } = req.query as { status?: string };
  let rows = await db.select().from(postsTable).orderBy(desc(postsTable.createdAt));
  if (!status || status === "published") {
    rows = rows.filter(r => r.status === "published");
  }
  res.json(rows);
});

router.get("/posts/:slug", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
  const [post] = await db.select().from(postsTable).where(eq(postsTable.slug, raw));
  if (!post) { res.status(404).json({ error: "Post not found" }); return; }
  res.json(post);
});

router.post("/posts", requireAuth, async (req, res): Promise<void> => {
  const { title, content, excerpt, coverImage, categoryId, status, metaTitle, metaDescription } = req.body as {
    title?: string; content?: string; excerpt?: string; coverImage?: string;
    categoryId?: string; status?: string; metaTitle?: string; metaDescription?: string;
  };
  if (!title) { res.status(400).json({ error: "Title is required" }); return; }
  const slug = slugify(title);
  const [post] = await db.insert(postsTable).values({
    title, slug, content: content ?? "", excerpt: excerpt ?? "",
    coverImage: coverImage ?? "", categoryId: categoryId ?? null,
    status: status ?? "draft", metaTitle: metaTitle ?? "", metaDescription: metaDescription ?? "",
  }).returning();
  res.status(201).json(post);
});

router.put("/posts/:id", requireAuth, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const { title, content, excerpt, coverImage, categoryId, status, metaTitle, metaDescription, slug } = req.body as {
    title?: string; content?: string; excerpt?: string; coverImage?: string;
    categoryId?: string | null; status?: string; metaTitle?: string; metaDescription?: string; slug?: string;
  };
  const updates: Record<string, unknown> = {};
  if (title != null) { updates.title = title; updates.slug = slug ?? slugify(title); }
  if (content != null) updates.content = content;
  if (excerpt != null) updates.excerpt = excerpt;
  if (coverImage != null) updates.coverImage = coverImage;
  if (categoryId !== undefined) updates.categoryId = categoryId;
  if (status != null) updates.status = status;
  if (metaTitle != null) updates.metaTitle = metaTitle;
  if (metaDescription != null) updates.metaDescription = metaDescription;
  const [post] = await db.update(postsTable).set(updates).where(eq(postsTable.id, id)).returning();
  if (!post) { res.status(404).json({ error: "Not found" }); return; }
  res.json(post);
});

router.delete("/posts/:id", requireAuth, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const [p] = await db.delete(postsTable).where(eq(postsTable.id, id)).returning();
  if (!p) { res.status(404).json({ error: "Not found" }); return; }
  res.sendStatus(204);
});

export default router;
