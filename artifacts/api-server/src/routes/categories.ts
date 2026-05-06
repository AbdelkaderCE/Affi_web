import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, categoriesTable } from "@workspace/db";
import { requireAuth } from "../middlewares/requireAuth";
import { slugify } from "../lib/slugify";

const router: IRouter = Router();

router.get("/categories", async (_req, res): Promise<void> => {
  const cats = await db.select().from(categoriesTable).orderBy(categoriesTable.name);
  res.json(cats);
});

router.post("/categories", requireAuth, async (req, res): Promise<void> => {
  const { name } = req.body as { name?: string };
  if (!name) {
    res.status(400).json({ error: "Name is required" });
    return;
  }
  const slug = slugify(name);
  const [cat] = await db.insert(categoriesTable).values({ name, slug }).returning();
  res.status(201).json(cat);
});

router.delete("/categories/:id", requireAuth, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const [cat] = await db.delete(categoriesTable).where(eq(categoriesTable.id, id)).returning();
  if (!cat) { res.status(404).json({ error: "Not found" }); return; }
  res.sendStatus(204);
});

export default router;
