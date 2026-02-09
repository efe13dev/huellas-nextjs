import Link from "next/link";

import DynamicNewsList from "@/components/DynamicNewsList";
import quotes from "@/lib/quotes.json";

export const dynamic = "force-dynamic";

export default function NewsPage(): JSX.Element {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  return (
    <main className="flex min-h-screen w-full flex-col">
      {/* Hero Section */}
      <section className="section-decorated relative overflow-hidden bg-gradient-to-br from-cream via-background to-sand/30 px-4 py-16 md:py-24">
        <div className="bg-dots absolute inset-0 opacity-40"></div>
        <div className="container relative mx-auto max-w-5xl text-center">
          <div className="animate-fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            Protectora de animales en Murcia
          </div>
          <h1 className="animate-slide-in mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Cada huella cuenta,{" "}
            <span className="text-gradient">cada vida importa</span>
          </h1>
          <p className="animate-slide-in delay-1 mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Rescatamos, cuidamos y encontramos hogares amorosos para animales
            abandonados. Juntos podemos darles la segunda oportunidad que
            merecen.
          </p>
          <div className="animate-slide-in delay-2 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/adoptions"
              className="hover-lift inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-warm-orange px-8 py-3.5 font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:brightness-110"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              Ver adopciones
            </Link>
            <Link
              href="/about"
              className="hover-lift inline-flex items-center gap-2 rounded-xl border-2 border-primary/30 bg-background/60 px-8 py-3.5 font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-background/80"
            >
              Conoce nuestra misión
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="container relative mx-auto mt-16 max-w-4xl md:mt-20">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {[
              {
                value: "+200",
                label: "Animales rescatados",
                icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
              },
              {
                value: "+150",
                label: "Adopciones exitosas",
                icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
              },
              {
                value: "+50",
                label: "Voluntarios activos",
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
              },
              {
                value: "24/7",
                label: "Cuidado continuo",
                icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="card-gradient-border animate-scale-in rounded-2xl bg-background/70 p-5 text-center backdrop-blur-sm md:p-6"
              >
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    className="h-5 w-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d={stat.icon}
                    />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-foreground md:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground md:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="section-decorated relative bg-gradient-to-b from-background to-cream/20 px-4 py-16 md:py-20">
        <div className="bg-dots absolute inset-0 opacity-20"></div>
        <div className="container relative mx-auto max-w-6xl">
          <div className="mb-12 space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Últimas noticias
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Historias, logros y novedades que reflejan nuestro trabajo diario
              y el impacto en la vida de los animales.
            </p>
            <div className="mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-primary to-warm-orange"></div>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Noticias - columna principal */}
            <div className="min-w-0 flex-1">
              <DynamicNewsList initialNews={[]} />
            </div>

            {/* Sidebar */}
            <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:w-80 lg:flex-shrink-0 lg:self-start">
              {/* CTA Adopción */}
              <div className="card-gradient-border overflow-hidden rounded-2xl bg-background/80 backdrop-blur-sm">
                <div className="relative h-36 overflow-hidden">
                  <img
                    src="/know-us-image-optimized.webp"
                    alt="Animales esperando adopción"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
                  <div className="absolute bottom-3 left-4 right-4">
                    <p className="text-sm font-bold text-foreground">
                      ¿Buscas compañero?
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                    Decenas de animales esperan encontrar un hogar lleno de
                    amor. Conócelos.
                  </p>
                  <Link
                    href="/adoptions"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-warm-orange px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/15 transition-all duration-300 hover:shadow-lg hover:brightness-110"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Ver adopciones
                  </Link>
                </div>
              </div>

              {/* Cómo ayudar */}
              <div className="card-gradient-border rounded-2xl bg-background/80 p-5 backdrop-blur-sm">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground/70">
                  Cómo ayudar
                </h3>
                <div className="flex flex-col gap-3">
                  {[
                    {
                      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
                      title: "Adopta",
                      desc: "Dale un hogar a quien más lo necesita",
                    },
                    {
                      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
                      title: "Voluntariado",
                      desc: "Únete a nuestro equipo de voluntarios",
                    },
                    {
                      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                      title: "Dona",
                      desc: "Tu aportación salva vidas cada día",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-3 rounded-xl bg-cream/40 p-3 transition-colors duration-200 hover:bg-cream/70"
                    >
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <svg
                          className="h-4 w-4 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d={item.icon}
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {item.title}
                        </p>
                        <p className="text-xs leading-relaxed text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contacto rápido */}
              <div className="card-gradient-border rounded-2xl bg-background/80 p-5 backdrop-blur-sm">
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-foreground/70">
                  Contacto
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  ¿Tienes preguntas? Estamos aquí para ayudarte con cualquier
                  consulta.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-primary/25 px-4 py-2.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/5"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Escríbenos
                </Link>
              </div>

              {/* Frase motivacional */}
              <div className="rounded-2xl bg-foreground p-5">
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-warm-orange/20">
                  <svg
                    className="h-4 w-4 text-warm-orange"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <blockquote className="text-sm italic leading-relaxed text-background/80">
                  &ldquo;{randomQuote.text}&rdquo;
                </blockquote>
                <p className="mt-2 text-xs font-medium text-background/50">
                  &mdash; {randomQuote.author}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
