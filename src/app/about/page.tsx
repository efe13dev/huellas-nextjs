import { type JSX } from "react";

import HelpUs from "@/components/HelpUs";
import KnowUs from "@/components/KnowUs";

export default function Component(): JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary/5 to-soft-blue/10">
      <main className="container mx-auto space-y-16 px-6 py-12 md:py-24">
        <KnowUs />
        <HelpUs />
      </main>
    </div>
  );
}
