import news from "@/data/news.json";
import AnimatedNewsList from "@/components/AnimatedNewsList";

export default function NewsPage(): JSX.Element {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-primary/5 to-soft-blue/10 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-gradient bg-gradient-to-r from-primary via-soft-blue to-warm-orange bg-clip-text text-transparent mb-8 text-center tracking-tight">
          Noticias
        </h1>
        <AnimatedNewsList news={news} />
      </div>
    </main>
  );
}
