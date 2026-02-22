import { createClient } from "@libsql/client";

export const db = createClient({
    url: "libsql://novotel-food-cards-haeritos.aws-us-east-2.turso.io",
    authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzE3OTUxNjEsImlkIjoiODk0ODFmNjctODY0Mi00Mjg0LWI0MjEtNjZiYzQwNDQ2NDYxIiwicmlkIjoiNmVmMDZjNmItMGY4MC00NDgyLWI1OTMtNGZjZmE0ZTVhM2M3In0.QQRzrDv8WVRqoBOtfFNx4cDDzuIhAFljwP06lyBAh_tahbbGmgZE_QSK43DWAHaRGIjoSSye_PfXFOK7yqwsAw",
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
