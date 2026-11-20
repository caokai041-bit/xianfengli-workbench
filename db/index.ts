import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const globalForDb = globalThis as unknown as { xianfengPool?: Pool };

export function getDb() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is not configured");
  const pool = globalForDb.xianfengPool ?? new Pool({
    connectionString,
    max: 8,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
  });
  if (process.env.NODE_ENV !== "production") globalForDb.xianfengPool = pool;
  return drizzle(pool, { schema });
}
