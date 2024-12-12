import { useBookDetails } from "@/hooks/useBookDetails";
import { useBookReviews } from "@/hooks/useBookReview";

import { cn } from "@/lib/utils";
import { useDebounce } from "@uidotdev/usehooks";
import React, { useState } from "react";

import CustomSelect from "./custom-select";
import RefreshButton from "./refresh-btn";

function BookCard() {
  const [selectedBookId, setSelectedBookId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const {
    isLoading,
    isError,
    isSuccess,
    data: book,
    error,
    isStale,
    refetch,
    isRefetching,
  } = useBookDetails({
    bookId: selectedBookId,
    searchTerm: debouncedSearchTerm,
  });

  const reviewsQuery = useBookReviews({ bookId: selectedBookId });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="bg-grid container grid min-h-[50dvh] w-full max-w-7xl grid-cols-1 content-start justify-center gap-4 border border-amber-200 py-2">
      <div className="flex w-full flex-wrap items-center justify-around gap-4 px-4">
        <CustomSelect
          selectedBookId={selectedBookId}
          setSelectedBookId={setSelectedBookId}
          className="shrink-0 grow-1 basis-[33%]"
        />

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
      </div>

      <div className="relative w-full space-y-4 overflow-clip rounded-lg bg-transparent px-4 py-4 text-slate-100 shadow-lg">
        {isLoading ? (
          <div
            className={cn(
              "bg-secondary mx-auto grid w-full grid-cols-1 place-items-start gap-2 overflow-clip rounded-lg sm:grid-cols-[auto_1fr] lg:w-2/3",
            )}
          >
            <div className="aspect-[3/4] w-full min-w-[200px] animate-pulse rounded bg-slate-400"></div>
            <div className="flex w-full flex-col gap-2">
              <div className="h-4 w-48 animate-pulse rounded bg-slate-400"></div>
              <div className="h-2 w-24 animate-pulse rounded bg-slate-400"></div>
              <div className="h-2 w-full animate-pulse rounded bg-slate-400"></div>
              <div className="h-2 w-full animate-pulse rounded bg-slate-400"></div>
              <div className="h-2 w-full animate-pulse rounded bg-slate-400"></div>
            </div>
          </div>
        ) : null}

        {isError ? (
          <h2 className="text-center text-lg text-red-500">
            Error: {error.message}
          </h2>
        ) : null}

        {isSuccess ? (
          <div
            className={cn(
              "bg-secondary mx-auto grid w-full grid-cols-1 place-items-start gap-2 overflow-clip rounded-lg sm:grid-cols-[auto_1fr] lg:w-2/3",
            )}
          >
            <img
              src={book?.thumbnail}
              alt={book?.title}
              loading="lazy"
              className="aspect-[3/4] w-full min-w-[200px] object-cover"
            />
            <div className="flex flex-col gap-2">
              <h1 className="shrink-0 text-2xl font-semibold">{book?.title}</h1>
              <p className="shrink-0 text-sm">{book?.authors.join(", ")}</p>
              <p className="shrink-0 text-sm">
                {reviewsQuery.isSuccess ? reviewsQuery?.data[0]?.text : null}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default BookCard;
