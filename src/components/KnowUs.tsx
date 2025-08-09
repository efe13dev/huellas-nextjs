import React, { type JSX } from "react";
import Link from "next/link";
import Image from "next/image";

function KnowUs(): JSX.Element {
  return (
    <section className="animate-slide-in relative overflow-hidden rounded-2xl border border-border/30 bg-card/50 shadow-lg backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-60"></div>
      <div className="relative flex flex-col md:flex-row">
        <div className="animate-slide-from-left order-2 flex flex-col justify-center space-y-6 p-6 sm:space-y-8 sm:p-8 md:order-1 md:w-1/2 md:p-12 lg:p-16">
          <h2 className="text-2xl font-bold leading-tight text-foreground sm:text-3xl lg:text-4xl">
            Conoce nuestra <span className="text-primary">misión</span>
          </h2>

          <div className="space-y-6 leading-relaxed text-muted-foreground">
            <p className="text-base sm:text-lg">
              En{" "}
              <span className="rounded-md bg-primary/10 px-2 py-1 font-semibold text-foreground">
                Protectora Huellas
              </span>
              , nos dedicamos a rescatar, cuidar y encontrar hogares amorosos para animales
              abandonados y maltratados. Cada animal que llega a nosotros recibe atención
              veterinaria, amor y la oportunidad de una nueva vida.
            </p>

            <p className="text-base sm:text-lg">
              Nuestro equipo de voluntarios trabaja incansablemente para asegurar que cada{" "}
              <span className="rounded-md bg-primary/10 px-2 py-1 font-semibold text-foreground">
                adopción sea exitosa
              </span>{" "}
              y que tanto las familias como los animales encuentren la felicidad que merecen.
            </p>

            <p className="text-base sm:text-lg">
              Creemos que cada animal merece una segunda oportunidad y trabajamos para crear un
              mundo donde ningún animal sufra abandono o maltrato.
            </p>
          </div>

          <div className="flex flex-col gap-4 pt-4 sm:flex-row">
            <Link
              href="/adoptions"
              className="hover-lift group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-xl"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                Ver adopciones
              </span>
            </Link>

            <Link
              href="/contact"
              className="hover-lift group relative inline-flex items-center justify-center overflow-hidden rounded-xl border-2 border-primary px-6 py-3 font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Contáctanos
              </span>
            </Link>
          </div>
        </div>

        <div className="animate-slide-from-right order-1 md:order-2 md:w-1/2">
          <div className="relative h-64 overflow-hidden sm:h-80 md:h-full md:min-h-[400px]">
            <Image
              src="/know-us-image-optimized.webp"
              alt="Animales felices en la protectora"
              width={600}
              height={400}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-card/20"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default KnowUs;
