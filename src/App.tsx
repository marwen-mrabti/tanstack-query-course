import MoonFace from "./assets/moon-face";
import SunFace from "./assets/sun-face";
import BookCard from "./components/book-card";
import BooksList from "./components/books-list";
import InfiniteQueries from "./components/infinite-queries";
import Pagination from "./components/pagination";

function App() {
  return (
    <main className="border-app-border bg-background min-h-dvh w-full border-12">
      <div className="flex w-full translate-y-[-5px] flex-wrap items-center justify-between gap-4">
        <SunFace className="fill-app-border h-32 w-32 bg-transparent" />
        <MoonFace className="fill-app-border h-32 w-32 border-none bg-transparent outline-none" />
      </div>
      <div className="grid w-full max-w-7xl grid-cols-1 place-items-center gap-4 px-4 py-2">
        <h1 className="text-primary text-4xl">tanstack query</h1>
        <hr className="h-1 w-full bg-indigo-500" />

        <BooksList />
        <hr className="h-1 w-full bg-indigo-500" />
        <BookCard />

        <hr className="h-1 w-full bg-indigo-500" />
        <Pagination />

        <hr className="h-1 w-full bg-indigo-500" />
        <InfiniteQueries />
      </div>
    </main>
  );
}

export default App;
