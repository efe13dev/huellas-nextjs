import React from "react";

export default function NewsSkeleton(): JSX.Element {
  return (
    <div className="rounded-2xl bg-white/50 dark:bg-zinc-900/40 shadow-xl backdrop-blur border border-white/20 dark:border-zinc-700/40 p-6 animate-pulse flex flex-col md:flex-row gap-6">
      <div className="md:w-1/3 flex-shrink-0">
        <div className="aspect-[4/3] rounded-xl overflow-hidden bg-zinc-200 dark:bg-zinc-800 border border-white/10 animate-pulse" />
      </div>
      <div className="flex-1 flex flex-col gap-4 justify-center">
        <div className="h-6 w-2/3 bg-zinc-300 dark:bg-zinc-700 rounded animate-pulse" />
        <div className="h-4 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
        <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
        <div className="h-4 w-5/6 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
      </div>
    </div>
  );
}
