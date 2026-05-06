import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db, usersTable } from "@workspace/db";
import { logger } from "./logger";

export async function seedAdminUser(): Promise<void> {
  const existing = await db.select().from(usersTable).where(eq(usersTable.email, "admin@curated.com"));
  if (existing.length > 0) {
    logger.info("Admin user already exists, skipping seed");
    return;
  }
  const passwordHash = await bcrypt.hash("admin123", 12);
  await db.insert(usersTable).values({
    email: "admin@curated.com",
    passwordHash,
    role: "admin",
  });
  logger.info("Default admin user created: admin@curated.com / admin123");
}
