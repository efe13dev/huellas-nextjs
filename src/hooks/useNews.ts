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

  // Polling inteligente con detección de visibilidad y conexión
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    const baseInterval = 30000; // 30 segundos base
    let currentInterval = baseInterval;
    let consecutiveNoChanges = 0;

    // Solo refrescar si no hay noticias iniciales (evitar fetch doble en mount)
    if (initialNews.length === 0) {
      void fetchNews();
    }

    const startPolling = (): void => {
      if (interval !== null) clearInterval(interval);
      
      interval = setInterval(() => {
        // Solo hacer petición si la pestaña está visible y hay conexión
        if (!document.hidden && navigator.onLine) {
          const previousCount = news.length;
          void fetchNews().then(() => {
            // Polling adaptativo: si no hay cambios, reducir frecuencia
            if (news.length === previousCount) {
              consecutiveNoChanges++;
              if (consecutiveNoChanges >= 3) {
                // Después de 3 intentos sin cambios, duplicar intervalo (máximo 2 minutos)
                currentInterval = Math.min(currentInterval * 1.5, 120000);
                startPolling(); // Reiniciar con nuevo intervalo
              }
            } else {
              // Si hay cambios, volver a frecuencia normal
              consecutiveNoChanges = 0;
              if (currentInterval !== baseInterval) {
                currentInterval = baseInterval;
                startPolling(); // Reiniciar con intervalo normal
              }
            }
          }).catch(() => {
            // En caso de error, aumentar ligeramente el intervalo
            currentInterval = Math.min(currentInterval * 1.2, 60000);
          });
        }
      }, currentInterval);
    };

    const handleVisibilityChange = (): void => {
      if (document.hidden) {
        // Pausar polling cuando la pestaña no está visible
        if (interval !== null) {
          clearInterval(interval);
          interval = null;
        }
      } else {
        // Reanudar polling y hacer petición inmediata al volver
        void fetchNews();
        consecutiveNoChanges = 0; // Reset contador al volver
        currentInterval = baseInterval; // Reset intervalo al volver
        startPolling();
      }
    };

    const handleOnlineChange = (): void => {
      if (navigator.onLine) {
        // Cuando se recupera la conexión, hacer petición inmediata
        void fetchNews();
        if (!document.hidden && interval === null) {
          startPolling();
        }
      } else {
        // Pausar polling cuando no hay conexión
        if (interval !== null) {
          clearInterval(interval);
          interval = null;
        }
      }
    };

    // Iniciar polling solo si la pestaña está visible y hay conexión
    if (!document.hidden && navigator.onLine) {
      startPolling();
    }
    
    // Escuchar eventos del navegador
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('online', handleOnlineChange);
    window.addEventListener('offline', handleOnlineChange);
    
    return () => {
      if (interval !== null) clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('online', handleOnlineChange);
      window.removeEventListener('offline', handleOnlineChange);
    };
  }, [fetchNews, initialNews.length, news.length]);

  return {
    news,
    loading,
    error,
    refresh: fetchNews,
    lastUpdated,
  };
}
