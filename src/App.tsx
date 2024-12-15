import MoonFace from "./assets/moon-face";
import SunFace from "./assets/sun-face";
import BookCard from "./components/book-card";
import BooksList from "./components/books-list";
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
        <h1 className="text-primary text-4xl">tanstack query</h1>

        <hr className="via-secondary h-1 w-full border-none bg-gradient-to-r from-transparent to-transparent" />
        <BookCard />

        <hr className="via-secondary h-1 w-full border-none bg-gradient-to-r from-transparent to-transparent" />
        <Pagination />

        <hr className="via-secondary h-1 w-full border-none bg-gradient-to-r from-transparent to-transparent" />
        <InfiniteQueries />

        <hr className="via-secondary h-1 w-full border-none bg-gradient-to-r from-transparent to-transparent" />
        <BooksList />

        <hr className="via-secondary h-1 w-full border-none bg-gradient-to-r from-transparent to-transparent" />
        <Mutations />
      </div>
    </main>
  );
}

export default App;
