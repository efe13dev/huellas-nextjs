"use client";
import React, { type JSX, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

function Header(): JSX.Element {
  const [animatedTitle, setAnimatedTitle] = useState<string[]>([]);
  const [animatedSubtitle, setAnimatedSubtitle] = useState<string[]>([]);
  const [showLogo, setShowLogo] = useState(false);
  const titleText = "Protectora Huellas";
  const subtitleText = "Creando hogares con amor";

  useEffect(() => {
    // Animar título primero
    const titleLetters = titleText.split("");
    const titleTotalLetters = titleLetters.length;

    // Reiniciar animaciones
    setAnimatedTitle([]);
    setAnimatedSubtitle([]);
    setShowLogo(false);

    // Animar cada letra del título con retraso, empezando desde la izquierda (P primero)
    titleLetters.forEach((letter, index) => {
      const delay = index * 12; // Muy rápido: 12ms entre letras del título

      setTimeout(() => {
        setAnimatedTitle((prev) => {
          const newArray = [...prev];

          newArray[index] = letter;

          return newArray;
        });
      }, delay);
    });

    // Animar subtítulo después del título
    const subtitleLetters = subtitleText.split("");
    const titleAnimationDuration = titleTotalLetters * 20; // ~216ms para el título

    subtitleLetters.forEach((letter, index) => {
      const delay = titleAnimationDuration + 100 + index * 20; // Pausa de 50ms, luego 10ms entre letras del subtítulo

      setTimeout(() => {
        setAnimatedSubtitle((prev) => {
          const newArray = [...prev];

          newArray[index] = letter;

          return newArray;
        });
      }, delay);
    });

    // Animar logo después de que termine todo el texto
    const subtitleAnimationDuration = subtitleLetters.length * 20;
    const totalTextAnimationDuration = titleAnimationDuration + 100 + subtitleAnimationDuration;

    setTimeout(() => {
      setShowLogo(true);
    }, totalTextAnimationDuration + 1500); // 150ms de pausa adicional
  }, []);

  return (
    <header className="relative border-b border-border/30 bg-gradient-to-r from-white via-primary/5 to-white shadow-sm">
      <div className="from-primary/3 to-primary/3 absolute inset-0 bg-gradient-to-r via-transparent opacity-50"></div>
      <div className="container relative mx-auto px-6 py-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-4">
            <div
              className={`relative transition-all duration-500 ease-out ${
                showLogo
                  ? "translate-y-0 transform opacity-100 blur-0"
                  : "translate-y-8 transform opacity-0 blur-md"
              }`}
            >
              <Link href="/" aria-label="Ir a inicio">
                <motion.div
                  whileTap={{ scale: 0.88, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="inline-block"
                >
                  <Image
                    src="/logo-huellas-opt.png"
                    alt="Logo de Protectora Huellas"
                    width={65}
                    height={65}
                    className="-rotate-12 cursor-pointer transition-transform duration-200 hover:scale-105"
                    priority
                  />
                </motion.div>
              </Link>
            </div>
            <div className="text-center md:text-left">
              <h1 className="flex h-8 items-center text-2xl font-bold text-foreground md:text-3xl">
                {titleText.split("").map((letter, index) => (
                  <span
                    key={index}
                    className={`inline-block transition-all duration-300 ease-out ${
                      animatedTitle[index] !== undefined
                        ? "translate-x-0 transform opacity-100 blur-0"
                        : "translate-x-8 transform opacity-0 blur-md"
                    } ${letter === "H" ? "text-primary" : ""}`}
                    style={{
                      transitionDelay: `${index * 12}ms`,
                    }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </span>
                ))}
              </h1>
              <p className="flex h-6 items-center text-sm font-medium text-muted-foreground">
                {subtitleText.split("").map((letter, index) => (
                  <span
                    key={index}
                    className={`inline-block transition-all duration-300 ease-out ${
                      animatedSubtitle[index] !== undefined
                        ? "translate-x-0 transform opacity-100 blur-0"
                        : "translate-x-6 transform opacity-0 blur-md"
                    }`}
                    style={{
                      transitionDelay: `${titleText.length * 12 + 50 + index * 10}ms`,
                    }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </span>
                ))}
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            <Link
              href="/"
              className="font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              Noticias
            </Link>
            <Link
              href="/adoptions"
              className="font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              Adopciones
            </Link>
            <Link
              href="/about"
              className="font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              Quiénes somos
            </Link>
            <Link
              href="#"
              className="hover-lift group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
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
