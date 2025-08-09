import React, { type JSX } from "react";
import Link from "next/link";
import Image from "next/image";

function HelpUs(): JSX.Element {
  return (
    <section className="animate-slide-in relative overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-warm-orange/10 opacity-60"></div>
      <div className="relative flex flex-col md:flex-row">
        <div className="animate-slide-from-left order-1 md:order-1 md:w-1/2">
          <div className="relative h-64 overflow-hidden sm:h-80 md:h-full md:min-h-[400px]">
            <Image
              src="/help-us-image-optimized.webp"
              alt="Un perro esperando ayuda con mirada tierna"
              width={600}
              height={400}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
          </div>
        </div>

        <div className="animate-slide-from-right order-2 flex flex-col justify-center space-y-6 p-6 sm:space-y-8 sm:p-8 md:order-2 md:w-1/2 md:p-12 lg:p-16">
          <h3 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
            Ayúdanos a hacer la{" "}
            <span className="text-gradient bg-gradient-to-r from-warm-orange to-primary bg-clip-text text-transparent">
              diferencia
            </span>
          </h3>

          <div className="space-y-6 leading-relaxed text-slate-200">
            <p className="text-base sm:text-lg">
              En nuestra protectora, cada día luchamos por dar una{" "}
              <span className="rounded-md bg-warm-orange/20 px-2 py-1 font-semibold text-warm-orange">
                segunda oportunidad
              </span>{" "}
              a animales abandonados y maltratados. Sin recibir ningún tipo de subvención,
              dependemos completamente de la{" "}
              <span className="rounded-md bg-soft-blue/20 px-2 py-1 font-semibold text-soft-blue">
                generosidad de personas como tú
              </span>
              .
            </p>

            <p className="text-base sm:text-lg">
              Tu apoyo es crucial para proporcionarles alimento, atención veterinaria y un hogar
              temporal mientras encuentran una familia para siempre.
            </p>

            <p className="text-base sm:text-lg">
              Con tu donación, no solo estás ayudando a un animal necesitado, sino que también estás
              contribuyendo a mantener nuestra labor independiente y a crear una{" "}
              <span className="rounded-md bg-gentle-purple/20 px-2 py-1 font-semibold text-gentle-purple">
                sociedad más compasiva y responsable
              </span>
              . Cada gesto cuenta, y juntos podemos cambiar vidas, una patita a la vez.
            </p>
          </div>

          <div className="pt-4">
            <Link
              href="#"
              className="hover-lift group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-warm-orange to-primary px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:from-primary hover:to-warm-orange hover:shadow-2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="relative z-10 flex items-center gap-3">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                Ayúdanos con una donación
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-soft-blue opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HelpUs;
