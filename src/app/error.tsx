"use client";

function ErrorPage({ error, reset }: { error: Error; reset: () => void }): React.JSX.Element {
  console.error(error);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
        <svg className="h-8 w-8 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-bold text-foreground">Algo salió mal</h2>
        <p className="max-w-md text-sm text-muted-foreground">
          Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.
        </p>
      </div>
      <button
        onClick={reset}
        className="hover-lift rounded-xl bg-gradient-to-r from-primary to-warm-orange px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:brightness-110"
      >
        Reintentar
      </button>
    </div>
  );
}

export default ErrorPage;
