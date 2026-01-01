import { createClient } from "@libsql/client";

export const db = createClient({
    url: "file:./local.db",
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
