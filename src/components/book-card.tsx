import { useBookDetails } from "@/hooks/useBookDetails";
import { useBooksByAuthor } from "@/hooks/useBooksByAuthor";

import { cn } from "@/lib/utils";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";
import RefreshButton from "./refresh-btn";

export default function BookCard() {
  const [selectedBookId, setSelectedBookId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [authors, setAuthors] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const debouncedAuthors = useDebounce(authors, 500);

  const {
    data: book,
    isLoading,
    isError,
    error,
    isStale,
    refetch,
    isRefetching,
  } = useBookDetails({
    bookId: selectedBookId,
    searchTerm: debouncedSearchTerm,
  });

  const { data: books, isPending: isPendingBooks } = useBooksByAuthor({
    authors: debouncedAuthors.split(","),
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAuthorsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthors(e.target.value);
  };

  return (
    <div className="bg-net container grid min-h-[50dvh] w-full grid-cols-1 place-items-center gap-4 border border-amber-200 py-2">
      <div className="flex flex-wrap items-center justify-around gap-4">
        <div className="rounded-lg outline-1 outline-blue-200">
          <select
            value={selectedBookId}
            onChange={(e) => setSelectedBookId(e.target.value)}
            className="rounded-lg bg-slate-800 px-4 py-2 text-slate-100"
          >
            <option value="">select a book</option>
            <option value="pD6arNyKyi8C">The Hobbit</option>
            <option value="aWZzLPhY4o0C">The Fellowship Of The Ring</option>
            <option value="12e8PJ2T7sQC">The Two Towers</option>
            <option value="WZ0f_yUgc0UC">The Return Of The King</option>
          </select>
        </div>

        <input
          id="book title"
          name="book title"
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          className="rounded-lg bg-slate-800 px-4 py-2 text-slate-100 ring-slate-300"
        />

        <RefreshButton
          isStale={isStale}
          isRefetching={isRefetching}
          onRefetch={refetch}
          className="shrink-0"
        />

        <input
          id="authors"
          name="authors"
          type="text"
          placeholder="authors (comma separated : e.g. J.R.R. Tolkien, C.S. Lewis)"
          value={authors}
          onChange={handleAuthorsChange}
          className="rounded-lg bg-slate-800 px-4 py-2 text-slate-100 ring-slate-300"
        />
      </div>

      <div className="relative w-fit space-y-4 overflow-clip rounded-lg bg-transparent px-8 py-4 text-slate-100 shadow-lg">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-2">
            <div className="h-48 w-48 animate-pulse rounded bg-slate-400"></div>
            <div className="h-4 w-48 animate-pulse rounded bg-slate-400"></div>
            <div className="h-2 w-24 animate-pulse place-self-end rounded bg-slate-400"></div>
          </div>
        ) : isError ? (
          <h2 className="text-center text-lg text-red-500">
            Error: {error.message}
          </h2>
        ) : (
          <div
            className={cn(
              "bg-secondary flex min-h-64 w-64 flex-col gap-2 rounded-lg py-2",
            )}
          >
            <img
              src={book?.thumbnail}
              alt={book?.title}
              loading="lazy"
              className="h-52 w-full object-contain"
            />
            <h1 className="shrink-0 text-2xl font-semibold">{book?.title}</h1>
            <p className="shrink-0 text-right">{book?.authors.join(", ")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
