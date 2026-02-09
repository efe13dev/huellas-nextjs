import Image from "next/image";
import Link from "next/link";
import { type JSX } from "react";

function Footer(): JSX.Element {
  return (
    <footer className="relative border-t border-border/30 bg-gradient-to-b from-background via-cream/30 to-sand/40">
      <div className="absolute inset-0 bg-dots opacity-30"></div>
      <div className="container relative mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center gap-4 md:items-start">
            <div className="flex items-center gap-3">
              <Image
                src="/logo-huellas-opt.png"
                alt="Logo Protectora Huellas"
                width={40}
                height={40}
                className="-rotate-12"
              />
              <div>
                <p className="text-lg font-bold text-foreground">
                  Protectora Huellas
                </p>
                <p className="text-xs text-muted-foreground">
                  Creando hogares con amor
                </p>
              </div>
            </div>
            <p className="max-w-xs text-center text-sm leading-relaxed text-muted-foreground md:text-left">
              Rescatamos, cuidamos y encontramos hogares amorosos para animales
              abandonados en Murcia.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center gap-3 md:items-start">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground/70">
              Navegación
            </h4>
            <nav className="flex flex-col items-center gap-2 md:items-start">
              <Link
                href="/"
                className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
              >
                Noticias
              </Link>
              <Link
                href="/adoptions"
                className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
              >
                Adopciones
              </Link>
              <Link
                href="/about"
                className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
              >
                Quiénes somos
              </Link>
              <Link
                href="/contact"
                className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
              >
                Contacto
              </Link>
            </nav>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center gap-4 md:items-start">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground/70">
              Colabora
            </h4>
            <p className="max-w-xs text-center text-sm text-muted-foreground md:text-left">
              Tu ayuda marca la diferencia. Cada donación nos permite seguir
              salvando vidas.
            </p>
            <Link
              href="#"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-warm-orange px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/15 transition-all duration-300 hover:shadow-lg hover:brightness-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              Hacer una donación
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center gap-3 border-t border-border/30 pt-8 md:flex-row md:justify-between">
          <p className="text-xs text-muted-foreground/70">
            &copy; {new Date().getFullYear()} Protectora Huellas. Todos los
            derechos reservados.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground/70">
            Hecho con
            <svg
              className="h-3.5 w-3.5 text-primary"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            para los animales
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
