import MoonFace from "./assets/moon-face";
import SunFace from "./assets/sun-face";
import BookCard from "./components/book-card";
import BooksList from "./components/books-list";
import InfiniteQueries from "./components/infinite-queries";
import Pagination from "./components/pagination";
import { useTheme } from "./hooks/use-theme";
import { cn } from "./lib/utils";

function App() {
  const { theme, setTheme } = useTheme();

  return (
    <main className="border-app-border bg-background min-h-dvh w-full border-16">
      <div className="flex w-full translate-y-[-5px] flex-wrap items-center justify-between gap-4">
        <SunFace
          aria-disabled={theme === "light"}
          className={cn(
            "fill-app-border h-32 w-32 cursor-pointer bg-transparent",
            {
              "cursor-not-allowed": theme === "light",
            },
          )}
          onClick={() => setTheme("light")}
        />
        <MoonFace
          aria-disabled={theme === "dark"}
          className={cn(
            "fill-app-border h-32 w-32 cursor-pointer border-none bg-transparent outline-none",
            {
              "cursor-not-allowed": theme === "dark",
            },
          )}
          onClick={() => setTheme("dark")}
        />
      </div>
      <div className="bg-background/90 mx-auto grid w-full max-w-7xl grid-cols-1 place-items-center gap-4 px-4 py-2">
        <h1 className="text-primary text-4xl">tanstack query</h1>
        <hr className="h-1 w-full bg-indigo-500" />

        <BooksList />
        <hr className="h-1 w-full bg-indigo-500" />
        <BookCard />

        <hr className="h-1 w-full bg-indigo-500" />
        <Pagination />

        <hr className="h-1 w-full bg-indigo-500" />
        <InfiniteQueries />

        <hr className="h-1 w-full bg-indigo-500" />
      </div>
    </main>
  );
}

export default App;
