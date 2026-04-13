import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

declare global {
  var __prisma: PrismaClient | undefined;
}

export const prisma: PrismaClient =
  global.__prisma ??
  (() => {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error("Missing DATABASE_URL environment variable");
    }

    const pool = new Pool({ connectionString: databaseUrl });
    return new PrismaClient({
      adapter: new PrismaPg(pool),
    });
  })();

if (process.env.NODE_ENV !== "production") {
  global.__prisma = prisma;
}
