"use client";
import { useNews } from "@/hooks/useNews";
import AnimatedNewsList from "./AnimatedNewsList";
import type { NewsItem } from "@/types";

interface DynamicNewsListProps {
  initialNews: NewsItem[];
}

export default function DynamicNewsList({
  initialNews,
}: DynamicNewsListProps): JSX.Element {
  const { news, loading, error, refresh, lastUpdated } = useNews(initialNews);

  if (error !== null && error.length > 0) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <h3 className="text-red-800 font-semibold mb-2">
            Error al cargar noticias
          </h3>
          <p className="text-red-600 text-sm mb-4">{error}</p>
          <button
            onClick={() => {
              void refresh();
            }}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            {loading ? "Reintentando..." : "Reintentar"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Indicador de estado */}
      <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
        <div
          className={`w-2 h-2 rounded-full ${loading ? "bg-yellow-400 animate-pulse" : "bg-green-400"}`}
        />
        <span>
          {loading ? "Actualizando..." : "Actualizado"}
          {lastUpdated !== null && !loading && (
            <span className="ml-1">
              {lastUpdated.toLocaleTimeString("es-ES", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )}
        </span>
      </div>

      {/* Lista de noticias */}
      <AnimatedNewsList news={news} />
    </div>
  );
}
