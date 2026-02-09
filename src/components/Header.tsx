"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type JSX, useEffect, useState } from "react";

function Header(): JSX.Element {
  const pathname = usePathname();
  const [animatedTitle, setAnimatedTitle] = useState<string[]>([]);
  const [animatedSubtitle, setAnimatedSubtitle] = useState<string[]>([]);
  const [showLogo, setShowLogo] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const titleText = "Protectora Huellas";
  const subtitleText = "Creando hogares con amor";

  const navLinks = [
    { href: "/", label: "Noticias" },
    { href: "/adoptions", label: "Adopciones" },
    { href: "/about", label: "Quiénes somos" },
    { href: "/contact", label: "Contacto" },
  ];

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Animar título primero
    const titleLetters = titleText.split("");
    const titleTotalLetters = titleLetters.length;

    // Reiniciar animaciones
    setAnimatedTitle([]);
    setAnimatedSubtitle([]);
    setShowLogo(false);

    // Animar cada letra del título con retraso
    titleLetters.forEach((letter, index) => {
      const delay = index * 12;

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
    const titleAnimationDuration = titleTotalLetters * 20;

    subtitleLetters.forEach((letter, index) => {
      const delay = titleAnimationDuration + 100 + index * 20;

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
    const totalTextAnimationDuration =
      titleAnimationDuration + 100 + subtitleAnimationDuration;

    setTimeout(() => {
      setShowLogo(true);
    }, totalTextAnimationDuration + 1500);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/40 bg-background/80 shadow-lg shadow-primary/5 backdrop-blur-xl"
          : "border-b border-border/20 bg-background/60 backdrop-blur-md"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-transparent to-warm-orange/3"></div>
      <div className="container relative mx-auto px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
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
                    width={52}
                    height={52}
                    className="-rotate-12 cursor-pointer transition-transform duration-200 hover:scale-110"
                    priority
                  />
                </motion.div>
              </Link>
            </div>
            <div className="text-left">
              <h1 className="flex h-7 items-center text-xl font-bold text-foreground sm:h-8 sm:text-2xl md:text-3xl">
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
              <p className="hidden h-5 items-center text-xs font-medium text-muted-foreground sm:flex sm:text-sm">
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

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {isActive ? (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-primary"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  ) : null}
                </Link>
              );
            })}
            <Link
              href="#"
              className="ml-2 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-warm-orange px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:brightness-110"
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
              Donar
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-primary/10 md:hidden"
            aria-label="Menú de navegación"
          >
            <div className="flex w-5 flex-col gap-1.5">
              <span
                className={`h-0.5 w-full rounded-full bg-foreground transition-all duration-300 ${
                  mobileMenuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full rounded-full bg-foreground transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full rounded-full bg-foreground transition-all duration-300 ${
                  mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        <motion.div
          initial={false}
          animate={{
            height: mobileMenuOpen ? "auto" : 0,
            opacity: mobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden md:hidden"
        >
          <nav className="flex flex-col gap-1 pb-4 pt-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setMobileMenuOpen(false);
                  }}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="#"
              onClick={() => {
                setMobileMenuOpen(false);
              }}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-warm-orange px-5 py-3 text-sm font-semibold text-white shadow-md"
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
              Donar
            </Link>
          </nav>
        </motion.div>
      </div>
    </header>
  );
}

export default Header;
