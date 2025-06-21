import React from "react";
import fs from "fs";
import path from "path";

interface NewsItem {
  id: number;
  title: string;
  date: string;
  image: string;
  summary: string;
  content: string;
}

// Carga estática del JSON de noticias
function getNewsData(): NewsItem[] {
  const filePath = path.join(process.cwd(), "src/data/news.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
}

export default function NewsPage(): JSX.Element {
  const news: NewsItem[] = getNewsData();

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-primary/5 to-soft-blue/10 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-gradient bg-gradient-to-r from-primary via-soft-blue to-warm-orange bg-clip-text text-transparent mb-8 text-center tracking-tight">Noticias</h1>
        <div className="flex flex-col gap-8">
          {news.map((item) => (
            <article
              key={item.id}
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
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                      {item.title}
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">{new Date(item.date).toLocaleDateString("es-ES", { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p className="text-zinc-700 dark:text-zinc-200 mb-3">{item.summary}</p>
                  </div>
                  <details className="mt-2">
                    <summary className="cursor-pointer text-zinc-600 dark:text-zinc-300 hover:underline">Leer más</summary>
                    <p className="mt-2 text-zinc-700 dark:text-zinc-200 text-sm">{item.content}</p>
                  </details>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
