"use client";
import type { NewsItem } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
  });
}

export default function AnimatedNewsList({
  news,
}: {
  news: NewsItem[];
}): JSX.Element {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [contentHeights, setContentHeights] = useState<Record<string, number>>(
    {}
  );
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageDirection, setPageDirection] = useState<1 | -1>(1); // 1: siguiente, -1: anterior
  const itemsPerPage = 3;
  const totalPages = Math.ceil(news.length / itemsPerPage);
  const contentRefs = useRef<Record<string, HTMLParagraphElement>>({});

  // --- NUEVO: refs y estado para altura dinámica ---
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number | undefined>(undefined);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Medir altura al montar, al cambiar de página y al expandir/contraer
  useEffect(() => {
    const updateHeight = (): void => {
      if (containerRef.current != null && !isTransitioning) {
        // Medir altura natural del contenido
        const tempHeight = containerRef.current.style.height;
        containerRef.current.style.height = 'auto';
        const currentHeight = containerRef.current.offsetHeight;
        containerRef.current.style.height = tempHeight;
        
        setContainerHeight(currentHeight);
      }
    };

    // Usar timeout para asegurar que el DOM se haya actualizado
    const timeoutId = setTimeout(() => {
      updateHeight();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [currentPage, news, expandedItems, isTransitioning]);

  // Para accesibilidad: mover foco al principio de la lista al cambiar de página
  useEffect(() => {
    if (containerRef.current != null) {
      containerRef.current.focus();
    }
  }, [currentPage]);

  const toggleExpanded = (itemId: string): void => {
    setIsTransitioning(true);
    
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      
      // Actualizar altura después de cambiar el estado
      setTimeout(() => {
        if (containerRef.current != null) {
          const tempHeight = containerRef.current.style.height;
          containerRef.current.style.height = 'auto';
          const newHeight = containerRef.current.offsetHeight;
          containerRef.current.style.height = tempHeight;
          
          setContainerHeight(newHeight);
          
          // Finalizar transición
          setTimeout(() => {
            setIsTransitioning(false);
          }, 400);
        }
      }, 50); // Tiempo mínimo para que se aplique el cambio de estado
      
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

  // Función para medir altura dinámicamente cuando se asigna el ref
  const measureContentHeight = (el: HTMLParagraphElement | null, itemId: string): void => {
    if (el !== null) {
      contentRefs.current[itemId] = el;
      
      // Medir altura si no existe ya
      if (contentHeights[itemId] == null) {
        // Temporalmente remover line-clamp para medir altura completa
        const originalDisplay = el.style.display;
        const originalLineClamp = el.style.webkitLineClamp;
        
        el.style.display = "-webkit-box";
        el.style.webkitLineClamp = "unset";
        const height = el.scrollHeight;
        
        // Restaurar estilos originales
        el.style.display = originalDisplay;
        el.style.webkitLineClamp = originalLineClamp;
        
        setContentHeights(prev => ({
          ...prev,
          [itemId]: height
        }));
      }
    }
  };

  return (
    <>
      <div
        ref={containerRef}
        tabIndex={-1}
        className="flex flex-col gap-4 sm:gap-8 outline-none pb-6 sm:pb-8"
        style={{
          height: containerHeight ?? 280,
          transition: 'height 0.4s cubic-bezier(0.4, 0.1, 0.2, 1)',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: pageDirection > 0 ? 60 : -60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: pageDirection > 0 ? -60 : 60 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col gap-4 sm:gap-8"
          >
            {news
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((item, idx) => {
                const expanded = isExpanded(item.id.toString());
                const isLongContent = item.content.length > 200;
                const itemId = item.id.toString();
                const fullHeight = contentHeights[itemId] ?? "auto";

                return (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: idx * 0.15,
                    }}
                    className="rounded-xl sm:rounded-2xl bg-white/60 dark:bg-zinc-900/60 shadow-xl backdrop-blur border border-white/20 dark:border-zinc-700/40 p-4 sm:p-6 transition-all duration-300 hover:shadow-2xl"
                  >
                    <div className="flex flex-col gap-4 sm:gap-6 md:flex-row">
                      <div className="w-full md:w-1/3 flex-shrink-0">
                        <motion.div
                          className="aspect-[16/9] sm:aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden bg-zinc-200 dark:bg-zinc-800 border border-white/10 cursor-pointer group relative"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            openImageModal(item.image, item.title);
                          }}
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="object-cover w-full h-full transition-transform duration-300"
                            loading="lazy"
                          />
                          {/* Overlay de hover */}
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              whileHover={{ scale: 1, opacity: 1 }}
                              className="bg-white/90 dark:bg-zinc-800/90 rounded-full p-2 sm:p-3 backdrop-blur-sm"
                            >
                              <svg
                                className="w-4 h-4 sm:w-6 sm:h-6 text-zinc-700 dark:text-zinc-300"
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
                      <div className="flex-1 flex flex-col gap-2 justify-center">
                        <h2
                          className={`text-lg sm:text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-1 sm:mb-2 transition-all duration-300 ${expanded ? 'whitespace-normal' : 'line-clamp-2'}`}
                        >
                          {item.title}
                        </h2>
                        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mb-1 sm:mb-2">
                          {formatDate(item.date)}
                        </p>

                        <motion.div
                          className="overflow-hidden"
                          animate={{
                            height: expanded
                              ? fullHeight
                              : isLongContent
                                ? 72
                                : (contentHeights[itemId] != null && contentHeights[itemId] > 0) ? contentHeights[itemId] : 72, // Usar altura calculada en lugar de "auto"
                          }}
                          transition={{
                            duration: 0.6, // Aumentar duración para mejor percepción
                            ease: [0.25, 0.46, 0.45, 0.94], // Curva suave y natural
                          }}
                        >
                          <p
                            ref={(el) => {
                              measureContentHeight(el, itemId);
                            }}
                            className="text-sm sm:text-base text-zinc-700 dark:text-zinc-200 leading-5 sm:leading-6"
                            style={{
                              display: "-webkit-box",
                              WebkitBoxOrient: "vertical",
                              WebkitLineClamp: expanded ? "unset" : isLongContent ? 3 : "unset",
                              overflow: "hidden",
                              transition: "all 0.3s ease-out", // Transición suave para cambios de estilo
                            }}
                          >
                            {item.content}
                          </p>
                        </motion.div>

                        {isLongContent && (
                          <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                            whileHover={{
                              scale: 1.02,
                              y: -1,
                            }}
                            whileTap={{
                              scale: 0.98,
                            }}
                            transition={{
                              delay: 0.2,
                              type: "spring",
                              stiffness: 400,
                              damping: 25,
                            }}
                            onClick={() => {
                              toggleExpanded(item.id.toString());
                            }}
                            className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-3 text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors self-start group"
                          >
                            <motion.span
                              animate={{
                                x: expanded ? 2 : 0,
                              }}
                              transition={{
                                duration: 0.2,
                                ease: "easeOut",
                              }}
                            >
                              {expanded ? "Leer menos" : "Leer más"}
                            </motion.span>
                            <motion.div
                              animate={{
                                rotate: expanded ? 180 : 0,
                                scale: expanded ? 1.1 : 1,
                              }}
                              transition={{
                                duration: 0.3,
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                              }}
                            >
                              <motion.svg
                                className="w-4 h-4 group-hover:scale-110 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                whileHover={{
                                  y: expanded ? 1 : -1,
                                }}
                                transition={{
                                  duration: 0.2,
                                }}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </motion.svg>
                            </motion.div>
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controles de paginación */}
      {totalPages > 1 && (
        <nav
          className="flex justify-center items-center gap-2 mt-6 sm:mt-12 mb-12 sm:mb-16 select-none"
          aria-label="Paginación de noticias"
        >
          <button
            aria-label="Anterior"
            onClick={() => {
              setPageDirection(-1);
              setCurrentPage((p) => Math.max(1, p - 1));
            }}
            disabled={currentPage === 1}
            className={`rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium border border-white/20 dark:border-zinc-700/40 bg-white/50 dark:bg-zinc-900/50 shadow-sm backdrop-blur transition-colors duration-200 hover:bg-white/80 dark:hover:bg-zinc-900/70 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400/50`}
          >
            ←
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              aria-label={`Ir a la página ${i + 1}`}
              onClick={() => {
                setPageDirection(i + 1 > currentPage ? 1 : -1);
                setCurrentPage(i + 1);
              }}
              className={`rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm font-semibold border border-white/20 dark:border-zinc-700/40 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400/50
                ${
                  currentPage === i + 1
                    ? "bg-zinc-900/80 dark:bg-zinc-100/80 text-white dark:text-zinc-900 shadow"
                    : "bg-white/50 dark:bg-zinc-900/50 text-zinc-700 dark:text-zinc-200 hover:bg-white/80 dark:hover:bg-zinc-900/70"
                }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            aria-label="Siguiente"
            onClick={() => {
              setPageDirection(1);
              setCurrentPage((p) => Math.min(totalPages, p + 1));
            }}
            disabled={currentPage === totalPages}
            className={`rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium border border-white/20 dark:border-zinc-700/40 bg-white/50 dark:bg-zinc-900/50 shadow-sm backdrop-blur transition-colors duration-200 hover:bg-white/80 dark:hover:bg-zinc-900/70 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400/50`}
          >
            →
          </button>
        </nav>
      )}

      {/* Modal de imagen */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={closeImageModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                duration: 0.4,
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              className="relative max-w-4xl max-h-[90vh] w-full"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {/* Botón de cerrar */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.2 }}
                onClick={closeImageModal}
                className="absolute -top-4 -right-4 z-10 bg-white/90 dark:bg-zinc-800/90 hover:bg-white dark:hover:bg-zinc-800 rounded-full p-2 shadow-lg backdrop-blur-sm transition-colors group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  className="w-6 h-6 text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>

              {/* Imagen */}
              <motion.img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-full object-contain rounded-2xl shadow-2xl"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
              />

              {/* Título de la imagen */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 rounded-b-2xl"
              >
                <h3 className="text-white text-lg font-semibold">
                  {selectedImage.alt}
                </h3>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
