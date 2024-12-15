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
    <section className="bg-grid w-full grid-cols-1 place-items-center">
      <div className="border-border container grid min-h-[70dvh] w-full max-w-7xl grid-cols-1 content-start justify-center gap-4 border border-dashed bg-transparent px-2 py-2 lg:w-2/3 lg:px-6">
        <div className="grid w-full grid-cols-1 place-items-center gap-4 sm:grid-cols-8">
          <CustomSelect
            selectedBookId={selectedBookId}
            setSelectedBookId={setSelectedBookId}
            className="w-full sm:col-span-3"
          />
          <input
            id="book title"
            name="book title"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            className={cn(
              "focus-visible:ring-ring bg-input text-foreground placeholder:text-foreground-muted rounded-lg border-none px-4 py-2 focus-visible:ring-1 focus-visible:outline-none",
              "w-full sm:col-span-3",
            )}
          />
          <RefreshButton
            isStale={isStale}
            isRefetching={isRefetching}
            onRefetch={refetch}
            className="w-full sm:col-span-2"
          />
        </div>
        <div className="relative w-full space-y-4 overflow-clip rounded-lg bg-transparent px-4 py-4">
          {isLoading ? (
            <div
              className={cn(
                "bg-card text-card-foreground mx-auto grid w-full grid-cols-1 place-items-start gap-2 overflow-clip rounded-lg shadow-lg sm:grid-cols-[auto_1fr]",
              )}
            >
              <div className="bg-foreground-muted aspect-[3/4] w-full min-w-[200px] animate-pulse rounded" />
              <div className="flex w-full flex-col gap-2">
                <h3 className="bg-foreground-muted mt-1 h-6 w-48 animate-pulse rounded" />
                <p className="bg-foreground-muted h-2 w-24 animate-pulse rounded" />
                <p className="bg-foreground-muted h-2 w-[95%] animate-pulse rounded" />
                <p className="bg-foreground-muted h-2 w-[95%] animate-pulse rounded" />
                <p className="bg-foreground-muted h-2 w-[95%] animate-pulse rounded" />
              </div>
            </div>
          ) : null}
          {isError ? (
            <h2 className="bg-destructive text-destructive-foreground text-md rounded-lg px-4 py-2 text-center">
              Error: {error.message}
            </h2>
          ) : null}
          {isSuccess ? (
            <div
              className={cn(
                "bg-card text-card-foreground mx-auto grid w-full grid-cols-1 place-items-start gap-2 overflow-clip rounded-lg shadow-lg sm:grid-cols-[auto_1fr]",
              )}
            >
              <img
                src={book?.thumbnail}
                alt={book?.title}
                loading="lazy"
                className="aspect-[3/4] w-full min-w-[200px] object-cover"
              />
              <div className="flex flex-col gap-2">
                <h3 className="shrink-0 text-2xl font-semibold">
                  {book?.title}
                </h3>
                <p className="shrink-0 text-sm">{book?.authors.join(", ")}</p>
                <p className="shrink-0 text-sm">
                  {reviewsQuery.isSuccess && reviewsQuery?.data.length ? (
                    reviewsQuery?.data[0]?.text
                  ) : (
                    <span>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Earum, quibusdam beatae nulla et inventore vero eos
                      tenetur ex dignissimos recusandae incidunt quae dolorem
                      cumque nobis itaque dolores. Numquam, temporibus
                      doloribus?
                    </span>
                  )}
                </p>
              </div>
            </div>
          ) : null}
          {!isLoading && !isError && !isSuccess && selectedBookId === "" ? (
            <h2 className="text-foreground text-center text-2xl">
              No book selected
            </h2>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default BookCard;
