import Image from "next/image";
import Link from "next/link";
import { type JSX } from "react";

function HelpUs(): JSX.Element {
  return (
    <section className="animate-slide-in relative overflow-hidden rounded-3xl bg-foreground shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-warm-orange/10"></div>
      <div className="bg-dots absolute inset-0 opacity-10"></div>
      <div className="relative flex flex-col md:flex-row">
        <div className="animate-slide-from-left order-1 md:order-1 md:w-1/2">
          <div className="relative h-64 overflow-hidden sm:h-80 md:h-full md:min-h-[450px]">
            <Image
              src="/help-us-image-optimized.webp"
              alt="Un perro esperando ayuda con mirada tierna"
              width={600}
              height={450}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/40 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent"></div>
          </div>
        </div>

        <div className="animate-slide-from-right order-2 flex flex-col justify-center space-y-6 p-6 sm:space-y-8 sm:p-8 md:order-2 md:w-1/2 md:p-12 lg:p-16">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-warm-orange/30 bg-warm-orange/10 px-3 py-1 text-xs font-medium text-warm-orange">
            Tu ayuda importa
          </div>
          <h3 className="text-2xl font-bold leading-tight text-background sm:text-3xl lg:text-4xl">
            Ayúdanos a hacer la{" "}
            <span className="bg-gradient-to-r from-warm-orange to-primary bg-clip-text text-transparent">
              diferencia
            </span>
          </h3>

          <div className="space-y-4 leading-relaxed text-background/75">
            <p className="text-base sm:text-lg">
              Cada día luchamos por dar una segunda oportunidad a animales
              abandonados. Sin recibir ningún tipo de subvención, dependemos
              completamente de la generosidad de personas como tú.
            </p>

            <p className="text-base sm:text-lg">
              Tu apoyo es crucial para proporcionarles alimento, atención
              veterinaria y un hogar temporal mientras encuentran una familia
              para siempre.
            </p>
          </div>

          {/* What your donation covers */}
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
                label: "Cuidado veterinario",
              },
              {
                icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
                label: "Refugio seguro",
              },
              {
                icon: "M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A1.75 1.75 0 013 15.546",
                label: "Alimentación",
              },
              {
                icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
                label: "Mucho amor",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 rounded-lg bg-background/5 px-3 py-2"
              >
                <svg
                  className="h-4 w-4 flex-shrink-0 text-warm-orange"
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
                <span className="text-xs font-medium text-background/80">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="#"
              className="hover-lift inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-warm-orange to-primary px-8 py-4 font-semibold text-white shadow-xl shadow-warm-orange/20 transition-all duration-300 hover:shadow-2xl hover:brightness-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              Ayúdanos con una donación
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HelpUs;
