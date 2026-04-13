import path from "path";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

declare global {
  var __prisma: PrismaClient | undefined;
}

const databaseUrl =
  process.env.DATABASE_URL ??
  `file:${path.join(process.cwd(), "dev.db").replace(/\\/g, "/")}`;

export const prisma: PrismaClient =
  global.__prisma ??
  new PrismaClient({
    adapter: new PrismaBetterSqlite3({ url: databaseUrl }),
  });

if (process.env.NODE_ENV !== "production") {
  global.__prisma = prisma;
}
