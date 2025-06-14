import React, { type JSX } from "react";
import Link from "next/link";
import Image from "next/image";

function Header(): JSX.Element {
  return (
    <header className="relative bg-gradient-to-r from-white via-primary/5 to-white border-b border-border/30 shadow-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-transparent to-primary/3 opacity-50"></div>
      <div className="relative container mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Image
                src="/logo-huellas-opt.png"
                alt="Logo de Protectora Huellas"
                width={65}
                height={65}
                className="-rotate-12"
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground animate-slide-in">
                Protectora <span className="text-primary">Huellas</span>
              </h1>
              <p className="text-sm text-muted-foreground font-medium">
                Creando hogares con amor
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium"
            >
              Inicio
            </Link>
            <Link
              href="/adoptions"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium"
            >
              Adopciones
            </Link>
            <Link
              href="/contact"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium"
            >
              Contacto
            </Link>
            <Link
              href="#"
              className="group relative inline-flex items-center justify-center overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover-lift shadow-lg hover:shadow-xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                Donar
              </span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
