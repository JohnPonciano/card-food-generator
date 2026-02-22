import { createClient } from "@libsql/client";

if (!process.env.TURSO_AUTH_TOKEN) {
    throw new Error("TURSO_AUTH_TOKEN is not defined");
}

export const db = createClient({
    url: "libsql://novotel-food-cards-haeritos.aws-us-east-2.turso.io",
    authToken: process.env.TURSO_AUTH_TOKEN,
});

export async function initDatabase() {
    await db.execute(`
    CREATE TABLE IF NOT EXISTS cards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name_pt TEXT NOT NULL,
      name_en TEXT,
      badges TEXT NOT NULL DEFAULT '[]',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

// Initialize database on module load
initDatabase().catch(console.error);
