import DynamicNewsList from "@/components/DynamicNewsList";

export default function NewsPage(): JSX.Element {
  return (
    <main className="flex min-h-screen w-full flex-col bg-gradient-to-br from-white via-primary/5 to-soft-blue/10 px-4 py-12 pb-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-16 space-y-6 text-center">
          <h1 className="text-gradient bg-gradient-to-r from-primary via-soft-blue to-warm-orange bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-6xl">
            Noticias
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground">
            Aquí compartimos noticias, historias y logros que reflejan nuestro trabajo diario y el
            impacto en la vida de los animales.
          </p>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-primary to-warm-orange"></div>
        </div>
        {/* Lista dinámica de noticias */}
        <DynamicNewsList initialNews={[]} />
      </div>
    </main>
  );
}
