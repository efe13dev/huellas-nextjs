import React, { type JSX } from "react";

function Footer(): JSX.Element {
  return (
    <footer className="relative bg-gradient-to-t from-slate-100 via-white to-primary/5 border-t border-border/50 ">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-warm-orange/5 opacity-30"></div>
      <div className="relative container mx-auto px-6 py-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <svg
              className="w-5 h-5 text-primary"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            <p className="font-medium">
              {new Date().getFullYear()} Protectora Huellas. Creando hogares con
              amor.
            </p>
            <svg
              className="w-5 h-5 text-primary"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className="text-sm text-muted-foreground/80">
            Cada animal merece una segunda oportunidad
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
