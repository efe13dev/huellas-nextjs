"use client";
import { useState, useEffect, useCallback } from 'react';
import type { NewsItem } from '@/types';

interface UseNewsReturn {
  news: NewsItem[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  lastUpdated: Date | null;
}

export function useNews(initialNews: NewsItem[] = []): UseNewsReturn {
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchNews = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      // Agregar timestamp para evitar caché del navegador
      const timestamp = Date.now();
      const response = await fetch(`/api/news?t=${timestamp}`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json() as { news: NewsItem[]; count: number; timestamp: string };
      setNews(data.news);
      setLastUpdated(new Date());
      
      // eslint-disable-next-line no-console
      console.log(`[useNews] Updated news: ${data.count} items at ${data.timestamp}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      // eslint-disable-next-line no-console
      console.error('[useNews] Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Refrescar automáticamente cada 30 segundos
  useEffect(() => {
    // Solo refrescar si hay noticias iniciales (evitar fetch doble en mount)
    if (initialNews.length === 0) {
      void fetchNews();
    }

    const interval = setInterval(() => {
      void fetchNews();
    }, 30000); // 30 segundos

    return () => {
      clearInterval(interval);
    };
  }, [fetchNews, initialNews.length]);

  return {
    news,
    loading,
    error,
    refresh: fetchNews,
    lastUpdated,
  };
}
