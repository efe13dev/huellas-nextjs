import Image from "next/image";
import Link from "next/link";
import { type JSX } from "react";

function KnowUs(): JSX.Element {
  return (
    <section className="animate-slide-in relative overflow-hidden rounded-3xl bg-background shadow-xl">
      <div className="card-gradient-border relative flex flex-col overflow-hidden rounded-3xl md:flex-row">
        <div className="animate-slide-from-left order-2 flex flex-col justify-center space-y-6 p-6 sm:space-y-8 sm:p-8 md:order-1 md:w-1/2 md:p-12 lg:p-16">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            Nuestra historia
          </div>
          <h2 className="text-2xl font-bold leading-tight text-foreground sm:text-3xl lg:text-4xl">
            Conoce nuestra <span className="text-gradient">misión</span>
          </h2>

          <div className="space-y-4 leading-relaxed text-muted-foreground">
            <p className="text-base sm:text-lg">
              En{" "}
              <span className="font-semibold text-foreground">
                Protectora Huellas
              </span>
              , nos dedicamos a rescatar, cuidar y encontrar hogares amorosos
              para animales abandonados y maltratados. Cada animal que llega a
              nosotros recibe atención veterinaria, amor y la oportunidad de una
              nueva vida.
            </p>

            <p className="text-base sm:text-lg">
              Nuestro equipo de voluntarios trabaja incansablemente para
              asegurar que cada adopción sea exitosa y que tanto las familias
              como los animales encuentren la felicidad que merecen.
            </p>
          </div>

          {/* Mini stats */}
          <div className="grid grid-cols-3 gap-3 py-2">
            {[
              { value: "+200", label: "Rescatados" },
              { value: "+150", label: "Adoptados" },
              { value: "+50", label: "Voluntarios" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-cream/60 p-3 text-center"
              >
                <p className="text-lg font-bold text-primary sm:text-xl">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Link
              href="/adoptions"
              className="hover-lift inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-warm-orange px-6 py-3 font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:brightness-110"
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
              href="/contact"
              className="hover-lift inline-flex items-center justify-center gap-2 rounded-xl border-2 border-primary/30 px-6 py-3 font-semibold text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/5"
            >
              Contáctanos
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

        <div className="animate-slide-from-right order-1 md:order-2 md:w-1/2">
          <div className="relative h-64 overflow-hidden sm:h-80 md:h-full md:min-h-[450px]">
            <Image
              src="/know-us-image-optimized.webp"
              alt="Animales felices en la protectora"
              width={600}
              height={450}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background/10 md:to-background/20"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default KnowUs;
