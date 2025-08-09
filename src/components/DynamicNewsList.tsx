"use client";
import type { NewsItem } from "@/types";

import AnimatedNewsList from "./AnimatedNewsList";

import { useNews } from "@/hooks/useNews";

interface DynamicNewsListProps {
  initialNews: NewsItem[];
}

export default function DynamicNewsList({ initialNews }: DynamicNewsListProps): JSX.Element {
  const { news, loading, error, refresh, lastUpdated } = useNews(initialNews);

  if (error !== null && error.length > 0) {
    return (
      <div className="py-8 text-center">
        <div className="mx-auto max-w-md rounded-lg border border-red-200 bg-red-50 p-6">
          <h3 className="mb-2 font-semibold text-red-800">Error al cargar noticias</h3>
          <p className="mb-4 text-sm text-red-600">{error}</p>
          <button
            onClick={() => {
              void refresh();
            }}
            disabled={loading}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
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
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <div
          className={`h-2 w-2 rounded-full ${loading ? "animate-pulse bg-yellow-400" : "bg-green-400"}`}
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
