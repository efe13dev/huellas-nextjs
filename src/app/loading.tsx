import React from "react";

function Loading(): React.JSX.Element {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 animate-ping rounded-full bg-primary/20"></div>
        <div className="absolute inset-0 animate-pulse rounded-full bg-primary/40"></div>
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <p className="text-sm font-medium text-muted-foreground">Cargando...</p>
    </div>
  );
}

export default Loading;
