"use client";
import { useState, useEffect, useCallback } from "react";

import type { NewsItem } from "@/types";
// import { getNews } from "@/lib/actions";

interface UseNewsReturn {
  news: NewsItem[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  lastUpdated: Date | null;
}

export function useNews(initialNews: NewsItem[] = []): UseNewsReturn {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchNews = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      // TEMPORAL: Noticias hardcodeadas para mostrar los tipos
      const sampleNews: NewsItem[] = [
        {
          id: "sample-urgente",
          title: "¡URGENTE! Perro herido necesita cirugía inmediata",
          content:
            "Un perro mestizo fue encontrado con heridas graves en la zona norte de la ciudad. Necesita cirugía urgente para salvar su vida. Los veterinarios estiman que el costo será de 800€. Cualquier donación es bienvenida para ayudar a este pequeño luchador.",
          date: "2024-01-15T10:30:00Z",
          image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=800&h=600&fit=crop",
          type: "Urgente",
        },
        {
          id: "sample-perdido",
          title: "Se busca: Luna, Golden Retriever perdida en el parque central",
          content:
            "Luna es una Golden Retriever de 3 años que se perdió el pasado sábado en el parque central. Lleva collar azul con su nombre y número de teléfono. Es muy cariñosa y responde a su nombre. Si la has visto, por favor contacta inmediatamente.",
          date: "2024-01-14T16:45:00Z",
          image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&h=600&fit=crop",
          type: "Perdido",
        },
        {
          id: "sample-encontrado",
          title: "¡Buenas noticias! Max ha sido encontrado y reunido con su familia",
          content:
            "Después de 5 días de búsqueda intensiva, Max, el pastor alemán que se había perdido, fue encontrado sano y salvo. Una familia lo encontró refugiándose bajo un puente y reconoció las fotos que habíamos compartido.",
          date: "2024-01-13T14:20:00Z",
          image:
            "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=800&h=600&fit=crop",
          type: "Encontrado",
        },
        {
          id: "sample-adopcion",
          title: "Historia de éxito: Bella encuentra su hogar para siempre",
          content:
            "Bella, la gata que rescatamos hace 3 meses, finalmente ha encontrado su familia perfecta. Después de un proceso de adopción cuidadoso, ahora vive feliz con una pareja joven que le da todo el amor que merece.",
          date: "2024-01-12T11:15:00Z",
          image:
            "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=600&fit=crop",
          type: "Adopción",
        },
        {
          id: "sample-evento",
          title: "Jornada de adopción este sábado en el centro comercial",
          content:
            "Este sábado 20 de enero estaremos en el centro comercial Plaza Norte de 10:00 a 18:00 con varios perritos y gatitos buscando hogar. Ven a conocerlos, tal vez encuentres a tu nuevo mejor amigo.",
          date: "2024-01-11T09:00:00Z",
          image:
            "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=600&fit=crop",
          type: "Evento",
        },
        {
          id: "sample-salud",
          title: "Campaña de vacunación gratuita para mascotas de bajos recursos",
          content:
            "En colaboración con la clínica veterinaria municipal, ofrecemos vacunación gratuita para mascotas de familias con recursos limitados. La campaña incluye vacunas básicas, desparasitación y revisión general.",
          date: "2024-01-10T13:30:00Z",
          image:
            "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800&h=600&fit=crop",
          type: "Salud",
        },
        {
          id: "sample-noticia",
          title: "Nuevo refugio temporal abre sus puertas en el distrito sur",
          content:
            "Gracias a las donaciones recibidas el mes pasado, hemos podido abrir un nuevo refugio temporal en el distrito sur de la ciudad. Este espacio nos permitirá albergar hasta 20 animales adicionales mientras encuentran hogar.",
          date: "2024-01-09T15:45:00Z",
          image:
            "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=600&fit=crop",
          type: "Noticia",
        },
      ];

      // Usar noticias de ejemplo en lugar de la base de datos
      setNews(sampleNews);
      setLastUpdated(new Date());
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido";

      setError(errorMessage);

      console.error("[useNews] Error fetching news:", err);
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

    // Siempre hacer fetch inicial para obtener datos frescos
    void fetchNews();

    const startPolling = (): void => {
      if (interval !== null) clearInterval(interval);

      interval = setInterval(() => {
        // Solo hacer petición si la pestaña está visible y hay conexión
        if (!document.hidden && navigator.onLine) {
          const previousCount = news.length;

          void fetchNews()
            .then(() => {
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
            })
            .catch(() => {
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
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("online", handleOnlineChange);
    window.addEventListener("offline", handleOnlineChange);

    return () => {
      if (interval !== null) clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("online", handleOnlineChange);
      window.removeEventListener("offline", handleOnlineChange);
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
