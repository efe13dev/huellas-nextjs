import { type JSX } from "react";

import HelpUs from "@/components/HelpUs";
import KnowUs from "@/components/KnowUs";

export default function Component(): JSX.Element {
  return (
    <div className="section-decorated min-h-screen bg-gradient-to-b from-cream/40 via-background to-background">
      <main className="container relative mx-auto space-y-12 px-4 py-12 sm:px-6 md:space-y-16 md:py-20">
        <div className="mb-8 space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            Sobre nosotros
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Quiénes <span className="text-gradient">somos</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Conoce nuestra historia, misión y cómo puedes ser parte del cambio.
          </p>
        </div>
        <KnowUs />
        <HelpUs />
      </main>
    </div>
  );
}
