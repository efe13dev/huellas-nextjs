// Server action para obtener noticias desde Turso
'use server';
import { createClient } from '@libsql/client';
import type { NewsItem } from '@/types';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL ?? "",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export async function getNews(): Promise<NewsItem[]> {
  try {
    // Agregar timestamp para evitar caché
    const timestamp = Date.now();
    console.log(`[${new Date().toISOString()}] Fetching news from database - ${timestamp}`);
    
    const result = await client.execute('SELECT * FROM news ORDER BY date DESC');
    
    console.log(`[${new Date().toISOString()}] Found ${result.rows.length} news items`);
    
    // Serializar los datos para convertirlos en objetos planos
    const newsItems = result.rows.map((row: any) => ({
      id: String(row.id),
      title: String(row.title),
      content: String(row.content),
      date: String(row.date),
      image: row.image !== null && row.image !== undefined ? String(row.image) : undefined,
    }));
    
    return newsItems;
  } catch (error) {
    console.error('[getNews] Error fetching news:', error);
    throw error;
  }
}
