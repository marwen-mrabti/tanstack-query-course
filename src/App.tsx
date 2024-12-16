import { ErrorBoundary } from "react-error-boundary";
import { tsQueryLogo } from "./assets";
import MoonFace from "./assets/moon-face";
import SunFace from "./assets/sun-face";
import BookCard from "./components/book-card";
import BooksList from "./components/books-list";
import { ErrorBoundaryFallback } from "./components/error-boundary-fallback";
import InfiniteQueries from "./components/infinite-queries";
import Mutations from "./components/mutations";
import Pagination from "./components/pagination";
import { useTheme } from "./hooks/use-theme";
import { cn } from "./lib/utils";

function App() {
  const { theme, setTheme } = useTheme();

  return (
    <main className="border-foreground bg-background min-h-dvh w-full border-16">
      <div className="flex w-full translate-y-[-5px] flex-wrap items-center justify-between gap-4">
        <SunFace
          aria-label="Toggle light mode"
          aria-disabled={theme === "light"}
          className={cn(
            "fill-foreground h-32 w-32 cursor-pointer bg-transparent",
            {
              "cursor-not-allowed": theme === "light",
            },
          )}
          onClick={() => setTheme("light")}
        />
        <MoonFace
          aria-label="Toggle dark mode"
          aria-disabled={theme === "dark"}
          className={cn(
            "fill-foreground h-32 w-32 cursor-pointer border-none bg-transparent outline-none",
            {
              "cursor-not-allowed": theme === "dark",
            },
          )}
          onClick={() => setTheme("dark")}
        />
      </div>
      <div className="bg-background mx-auto grid w-full max-w-7xl grid-cols-1 place-items-center gap-4 px-4 py-2">
        <div className="flex w-full items-center justify-center gap-4">
          <img
            src={tsQueryLogo}
            alt="tanstack query logo"
            className="shrink-1 md:size-20"
          />
          <h1 className="text-primary shrink-0 text-xl sm:text-2xl lg:text-4xl">
            tanstack query
          </h1>
          <img
            src={tsQueryLogo}
            alt="tanstack query logo"
            className="shrink-1 md:size-20"
          />
        </div>

        <hr className="via-secondary h-1 w-full border-none bg-gradient-to-r from-transparent to-transparent" />
        <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
          <BookCard />
        </ErrorBoundary>

        <hr className="via-secondary h-1 w-full border-none bg-gradient-to-r from-transparent to-transparent" />
        <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
          <Pagination />
        </ErrorBoundary>

        <hr className="via-secondary h-1 w-full border-none bg-gradient-to-r from-transparent to-transparent" />
        <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
          <InfiniteQueries />
        </ErrorBoundary>

        <hr className="via-secondary h-1 w-full border-none bg-gradient-to-r from-transparent to-transparent" />
        <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
          <BooksList />
        </ErrorBoundary>

        <hr className="via-secondary h-1 w-full border-none bg-gradient-to-r from-transparent to-transparent" />
        <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
          <Mutations />
        </ErrorBoundary>
      </div>
    </main>
  );
}

export default App;
