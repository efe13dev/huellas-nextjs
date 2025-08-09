"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

import type { NewsItem } from "@/types";

import { formatDate } from "@/lib/utils";
import NewsTypeTag from "@/components/NewsTypeTag";

// Función para formatear el contenido separando párrafos con líneas en blanco
const formatNewsContent = (content: string): JSX.Element => {
  // Dividir por puntos seguidos de espacio y agregar doble salto de línea
  const paragraphs = content
    .split(/\. /)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 0)
    .map((sentence, index, array) => {
      // Agregar el punto de vuelta excepto en la última oración si ya lo tiene
      const needsPeriod =
        !sentence.endsWith(".") && !sentence.endsWith("!") && !sentence.endsWith("?");

      return needsPeriod && index < array.length - 1 ? sentence + "." : sentence;
    });

  return (
    <div className="space-y-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-base">
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="mb-4 last:mb-0">
          {paragraph}
        </p>
      ))}
    </div>
  );
};

// Icono elegante para el botón (chevron up)
const ChevronUpIcon = (): JSX.Element => (
  <svg
    className="h-5 w-5 sm:h-6 sm:w-6"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 15l-7-7-7 7" />
  </svg>
);

export default function AnimatedNewsList({ news }: { news: NewsItem[] }): JSX.Element {
  // Estado para alturas medidas de cada noticia
  const [measuredHeights, setMeasuredHeights] = useState<Record<string, number>>({});
  // Estados para scroll infinito
  const INITIAL_COUNT = 5;
  const LOAD_MORE_COUNT = 5;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  // Estados para funcionalidad
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  // Estado para mostrar el botón de scroll to top
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Detectar scroll para mostrar/ocultar el botón
  useEffect(() => {
    const handleScroll = (): void => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll suave al inicio
  const handleScrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleExpanded = (itemId: string): void => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }

      return newSet;
    });
  };

  const isExpanded = (itemId: string): boolean => expandedItems.has(itemId);

  const openImageModal = (src: string, alt: string): void => {
    setSelectedImage({ src, alt });
  };

  const closeImageModal = (): void => {
    setSelectedImage(null);
  };

  // Cerrar modal con tecla Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape" && selectedImage !== null) {
        closeImageModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);

  const handleLoadMore = (): void => {
    setVisibleCount((prev) => Math.min(prev + LOAD_MORE_COUNT, news.length));
  };

  // Calcular qué noticias mostrar
  const visibleNews = news.slice(0, visibleCount);
  const hasMoreNews = visibleCount < news.length;

  return (
    <>
      <div className="flex flex-col gap-4 pb-6 sm:gap-8 sm:pb-8">
        <AnimatePresence>
          <motion.div
            key="news-container"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col gap-4 sm:gap-8"
          >
            {visibleNews.map((item, idx) => {
              const expanded = isExpanded(item.id.toString());
              const isLongContent = item.content.length > 175;
              // Animar elementos nuevos (últimos cargados) o si es la carga inicial
              const shouldAnimate =
                visibleCount <= INITIAL_COUNT || idx >= visibleCount - LOAD_MORE_COUNT;

              return (
                <motion.article
                  key={item.id}
                  initial={
                    shouldAnimate
                      ? {
                          opacity: 0,
                          y: 48,
                          scale: 0.94,
                        }
                      : false
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  transition={
                    shouldAnimate
                      ? {
                          type: "spring",
                          stiffness: 110,
                          damping: 20,
                          delay: (idx % LOAD_MORE_COUNT) * 0.13,
                        }
                      : {}
                  }
                  className="relative rounded-xl border border-white/20 bg-white/60 p-4 shadow-xl backdrop-blur transition-all duration-300 hover:shadow-2xl dark:border-zinc-700/40 dark:bg-zinc-900/60 sm:rounded-2xl sm:p-6"
                >
                  {/* Tipo de noticia - Esquina superior derecha */}
                  {item.type != null && item.type.trim() !== "" && (
                    <div className="absolute -right-2 -top-2 z-10 sm:-right-6 md:-right-10">
                      <NewsTypeTag type={item.type} />
                    </div>
                  )}

                  <div className="flex flex-col gap-4 sm:gap-6 md:flex-row">
                    {/* Imagen */}
                    <div className="w-full flex-shrink-0 md:w-1/3">
                      <motion.div
                        className="group relative aspect-[16/9] cursor-pointer overflow-hidden rounded-lg border border-white/10 bg-zinc-200 dark:bg-zinc-800 sm:aspect-[4/3] sm:rounded-xl"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          const imageUrl = item.image ?? "";

                          if (imageUrl.trim() !== "") {
                            openImageModal(imageUrl, item.title);
                          }
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileHover={{ scale: 1, opacity: 1 }}
                            className="rounded-full bg-white/90 p-2 backdrop-blur-sm dark:bg-zinc-800/90 sm:p-3"
                          >
                            <svg
                              className="h-4 w-4 text-zinc-700 dark:text-zinc-300 sm:h-6 sm:w-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                              />
                            </svg>
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Contenido */}
                    <div className="flex flex-1 flex-col justify-center gap-2">
                      <h2 className="mb-1 line-clamp-2 text-lg font-semibold text-zinc-900 transition-all duration-300 dark:text-zinc-100 sm:mb-2 sm:text-2xl">
                        {item.title}
                      </h2>

                      <p className="mb-2 text-xs text-zinc-500 dark:text-zinc-400 sm:mb-4 sm:text-sm">
                        {formatDate(item.date)}
                      </p>

                      <motion.div
                        initial={false}
                        animate={{
                          height: expanded
                            ? measuredHeights?.[item.id] != null
                              ? measuredHeights[item.id]
                              : "auto"
                            : "calc(1.5em * 3)", // 3 líneas de alto, line-height: 1.5
                        }}
                        transition={{
                          height: { duration: 0.5, ease: "easeInOut" },
                        }}
                        style={{
                          overflow: "hidden",
                          maskImage: !expanded
                            ? "linear-gradient(180deg, #000 90%, transparent 100%)"
                            : undefined,
                          WebkitMaskImage: !expanded
                            ? "linear-gradient(180deg, #000 90%, transparent 100%)"
                            : undefined,
                        }}
                      >
                        <p
                          ref={(el) => {
                            if (el != null && expanded) {
                              setTimeout(() => {
                                const height = el.scrollHeight;

                                if (!isNaN(height)) {
                                  setMeasuredHeights((prev) => ({
                                    ...prev,
                                    [item.id]: height,
                                  }));
                                }
                              }, 10);
                            }
                          }}
                          className={`text-sm text-zinc-700 dark:text-zinc-300 sm:text-base leading-relaxed${expanded ? "" : "line-clamp-3 pb-2"}`}
                          style={{ margin: 0 }}
                        >
                          {expanded
                            ? formatNewsContent(item.content)
                            : item.content.length > 200
                              ? `${item.content.substring(0, 200)}...`
                              : item.content}
                        </p>
                      </motion.div>

                      {isLongContent && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            toggleExpanded(item.id.toString());
                          }}
                          className="mt-2 flex items-center gap-1 self-start text-xs font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 sm:mt-3 sm:text-sm"
                        >
                          <span>{expanded ? "Leer menos" : "Leer más"}</span>
                          <motion.svg
                            animate={{ rotate: expanded ? 180 : 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="h-3 w-3 sm:h-4 sm:w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </motion.svg>
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Botón Cargar más */}
        {hasMoreNews && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mb-12 mt-8 flex justify-center sm:mb-16 sm:mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLoadMore}
              className="flex items-center gap-2 rounded-lg border border-blue-200 bg-white/60 px-4 py-2 text-sm font-medium text-blue-600 backdrop-blur transition-all duration-300 hover:bg-white/80 hover:text-blue-700 dark:border-blue-800 dark:bg-zinc-900/60 dark:text-blue-400 dark:hover:bg-zinc-900/80 dark:hover:text-blue-300 sm:px-6 sm:py-3 sm:text-base"
            >
              <span>Cargar más noticias</span>
              <motion.svg
                animate={{ y: [0, 2, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </motion.svg>
            </motion.button>
          </motion.div>
        )}

        {/* Botón flotante scroll to top */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              key="scroll-top"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              aria-label="Volver arriba"
              onClick={handleScrollToTop}
              className="group fixed bottom-6 right-6 z-40 flex items-center justify-center rounded-full border border-white/30 bg-white/80 p-3 shadow-xl backdrop-blur transition-all duration-300 hover:bg-white dark:border-zinc-700/40 dark:bg-zinc-900/80 dark:hover:bg-zinc-900 sm:bottom-8 sm:right-8 sm:p-4"
            >
              <ChevronUpIcon />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Modal de imagen */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={closeImageModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative flex max-h-[90vh] w-full max-w-4xl items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-h-full max-w-full rounded-lg object-contain"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeImageModal}
                className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-zinc-700 backdrop-blur-sm dark:bg-zinc-800/90 dark:text-zinc-300"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
