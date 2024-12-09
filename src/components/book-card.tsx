import { useBook } from "@/hooks/useBook";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function BookCard() {
  const [selectedBookId, setSelectedBookId] = useState("pD6arNyKyi8C");
  const {
    data: book,
    isLoading,
    isError,
    error,
  } = useBook({ bookId: selectedBookId });

  console.log(book);

  return (
    <div className="container grid min-h-[50dvh] w-full grid-cols-1 place-items-center gap-4 border border-amber-200 py-2">
      <div className="rounded-lg outline-1 outline-blue-200">
        <select
          value={selectedBookId}
          onChange={(e) => setSelectedBookId(e.target.value)}
          className="rounded-lg bg-slate-800 px-4 py-2 text-slate-100"
        >
          <option value="pD6arNyKyi8C">The Hobbit</option>
          <option value="aWZzLPhY4o0C">The Fellowship Of The Ring</option>
          <option value="12e8PJ2T7sQC">The Two Towers</option>
          <option value="WZ0f_yUgc0UC">The Return Of The King</option>
        </select>
      </div>

      <div className="relative w-fit space-y-4 overflow-clip rounded-lg bg-slate-800 px-8 py-4 text-slate-100 shadow-lg">
        {isLoading ? (
          <>
            <div className="h-48 w-48 animate-pulse rounded bg-slate-400"></div>
            <div className="h-4 w-48 animate-pulse rounded bg-slate-400"></div>
            <div className="flex w-full justify-end">
              <div className="h-2 w-24 animate-pulse rounded bg-slate-400"></div>
            </div>
          </>
        ) : isError ? (
          <h2 className="text-center text-lg text-red-500">
            Error: {error.message}
          </h2>
        ) : (
          <div
            className={cn(
              "flex min-h-64 w-48 flex-col gap-1 mix-blend-difference",
            )}
          >
            <img
              src={book?.thumbnail}
              alt={book?.title}
              className="h-48 w-full object-contain"
            />
            <h1 className="shrink-0 text-2xl font-semibold">{book?.title}</h1>
            <p className="shrink-0 text-right">{book?.authors.join(", ")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
