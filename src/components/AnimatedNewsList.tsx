"use client";
import type { NewsItem } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

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
  return (
    <div className="flex flex-col gap-8">
      <AnimatePresence>
        {news.map((item, idx) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{
              duration: 0.5,
              delay: idx * 0.13,
              type: "spring",
              stiffness: 60,
            }}
            className="rounded-2xl bg-white/60 dark:bg-zinc-900/60 shadow-xl backdrop-blur border border-white/20 dark:border-zinc-700/40 p-6 transition hover:scale-[1.015] hover:shadow-2xl"
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3 flex-shrink-0">
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-zinc-200 dark:bg-zinc-800 border border-white/10">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-full h-full transition duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-2 justify-center">
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  {item.title}
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">
                  {formatDate(item.date)}
                </p>
                <p className="text-base text-zinc-700 dark:text-zinc-200 line-clamp-3">
                  {item.content}
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </AnimatePresence>
    </div>
  );
}
