// Server action para obtener noticias desde Turso
"use server";
import { createClient } from "@libsql/client";
import { unstable_noStore as noStore } from "next/cache";

import type { NewsItem } from "@/types";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL ?? "",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export async function getNews(): Promise<NewsItem[]> {
  // Desactivar caché para obtener datos frescos siempre
  noStore();

  try {
    const result = await client.execute("SELECT * FROM news ORDER BY date DESC");

    const newsItems = result.rows.map((row: any) => ({
      id: String(row.id),
      title: String(row.title),
      content: String(row.content),
      date: String(row.date),
      image: row.image !== null && row.image !== undefined ? String(row.image) : undefined,
      type: row.type !== null && row.type !== undefined ? String(row.type) : undefined,
    }));

    return newsItems;
  } catch (error) {
    console.error("[getNews] Error fetching news:", error);
    throw error;
  }
}
