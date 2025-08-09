import React from "react";

export default function NewsSkeleton(): JSX.Element {
  return (
    <div className="flex animate-pulse flex-col gap-6 rounded-2xl border border-white/20 bg-white/50 p-6 shadow-xl backdrop-blur dark:border-zinc-700/40 dark:bg-zinc-900/40 md:flex-row">
      <div className="flex-shrink-0 md:w-1/3">
        <div className="aspect-[4/3] animate-pulse overflow-hidden rounded-xl border border-white/10 bg-zinc-200 dark:bg-zinc-800" />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-4">
        <div className="h-6 w-2/3 animate-pulse rounded bg-zinc-300 dark:bg-zinc-700" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>
    </div>
  );
}
