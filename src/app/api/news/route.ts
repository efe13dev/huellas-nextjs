import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getNews } from '@/lib/actions';

// Configurar como dinámico para evitar caché
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Agregar headers para evitar caché
    const headers = new Headers();
    headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    headers.set('Pragma', 'no-cache');
    headers.set('Expires', '0');
    headers.set('Content-Type', 'application/json');
    
    // Obtener noticias frescas
    const news = await getNews();
    
    return NextResponse.json(
      { 
        news, 
        timestamp: new Date().toISOString(),
        count: news.length 
      },
      { 
        status: 200,
        headers 
      }
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[API /news] Error:', error);
    return NextResponse.json(
      { error: 'Error al obtener noticias' },
      { status: 500 }
    );
  }
}
