// Server action para obtener noticias desde Turso
'use server';
import { createClient } from '@libsql/client';
import type { NewsItem } from '@/types';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL ?? "",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export async function getNews(): Promise<NewsItem[]> {
  const result = await client.execute('SELECT * FROM news ORDER BY date DESC');
  
  // Serializar los datos para convertirlos en objetos planos
  return result.rows.map((row: any) => ({
    id: String(row.id),
    title: String(row.title),
    content: String(row.content),
    date: String(row.date),
    image: row.image !== null && row.image !== undefined ? String(row.image) : undefined,
  }));
}
