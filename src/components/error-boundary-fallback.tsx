type T_ErrorBoundaryFallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

export function ErrorBoundaryFallback({
  error,
  resetErrorBoundary,
}: T_ErrorBoundaryFallbackProps) {
  return (
    <div role="alert">
      <div className="text-destructive-foreground bg-destructive/80 rounded-lg p-4 text-center">
        <h2 className="text-2xl font-bold">Something went wrong.</h2>
        <p className="my-4 text-lg font-medium">
          <span className="font-bold text-zinc-300">Error :</span>{" "}
          <span className="font-semibold text-zinc-100">{error.message}</span>
        </p>
        <p className="text-base font-medium">Please try again later.</p>
        <button
          onClick={resetErrorBoundary}
          className="cursor-pointer rounded bg-lime-300 px-4 py-2 font-semibold text-black hover:bg-lime-400"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
