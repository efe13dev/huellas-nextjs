import DynamicNewsList from "@/components/DynamicNewsList";

export default function NewsPage(): JSX.Element {
  return (
    <main className="min-h-screen pb-24 w-full bg-gradient-to-br from-white via-primary/5 to-soft-blue/10 py-12 px-4 flex flex-col">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-gradient bg-gradient-to-r from-primary via-soft-blue to-warm-orange bg-clip-text text-transparent tracking-tight">
            Noticias
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Aquí compartimos noticias, historias y logros que reflejan nuestro
            trabajo diario y el impacto en la vida de los animales.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-warm-orange mx-auto rounded-full"></div>
        </div>
        {/* Lista dinámica de noticias */}
        <DynamicNewsList initialNews={[]} />
      </div>
    </main>
  );
}
