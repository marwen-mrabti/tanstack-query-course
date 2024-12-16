import { useMockBook } from "@/hooks/useMockBook";
import { useUpdateBook } from "@/hooks/useUpdateBook";
import { cn } from "@/lib/utils";
import { T_MockBook } from "@/types/query-types";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

export default function Mutations() {
  const [bookId, setBookId] = useState<number | null>(null);
  const debouncedPostId = useDebounce(bookId, 300);
  const [bookContent, setBookContent] = useState<Partial<T_MockBook>>({
    title: "",
    author: "",
  });

  const {
    fetchStatus,
    isPending,
    isSuccess,
    data: book,
    isError,
    error,
  } = useMockBook({ bookId: debouncedPostId });

  useEffect(() => {
    if (isSuccess) {
      setBookContent({
        title: book?.title ?? "",
        author: book?.author ?? "",
      });
    }
  }, [isSuccess, book]);

  const {
    mutateAsync: updateMockBook,
    isPending: isUpdatePending,
    isError: isUpdateError,
    error: updateError,
  } = useUpdateBook();

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!book) {
      alert("Post data not yet available.");
      return;
    }

    await updateMockBook(
      {
        bookId: Number(book.id),
        updateData: {
          title: bookContent.title ?? book?.title,
          author: bookContent.author ?? book?.author,
        },
      },
      {
        onSuccess: () => {
          //toast success
          alert("Book updated successfully");
        },
      },
    );
  };

  return (
    <div className="bg-grid grid min-h-[50dvh] w-full grid-cols-1 content-start justify-items-center gap-4 py-10">
      {isError || isUpdateError ? (
        <p className="text-destructive-foreground bg-destructive text-md px-4 py-2">
          Error: {error?.message || updateError?.message}
        </p>
      ) : null}

      <div className="mx-auto grid w-full grid-rows-2 place-items-start md:w-[clamp(300px,50%,500px)]">
        <label htmlFor="bookId" className="text-foreground row-span-1">
          book ID
        </label>
        <input
          disabled={(isPending && fetchStatus === "paused") || isUpdatePending}
          type="number"
          name="bookId"
          placeholder="enter book ID between 1 and 100"
          min={1}
          max={100}
          value={bookId ?? ""}
          onChange={(e) => setBookId(Number(e.target.value))}
          className="rows-span-1 focus-visible:ring-ring bg-input text-foreground placeholder:text-foreground-muted w-full rounded-lg border-none px-4 py-2 focus-visible:ring-1 focus-visible:outline-none"
        />
      </div>
      <form
        onSubmit={handleOnSubmit}
        className={cn(
          "bg-card text-card-foreground flex min-h-[inherit] w-full flex-col items-center justify-around gap-4 rounded-md px-4 py-2 shadow-xl md:w-[clamp(300px,50%,500px)]",
          {
            "bg-accent/70": isUpdatePending || isPending,
          },
        )}
      >
        <div className="flex w-full flex-col gap-1">
          <label htmlFor="title" className="text-foreground-subtle">
            title
          </label>
          <input
            readOnly={!book || isPending || isUpdatePending}
            disabled={!book || isPending || isUpdatePending}
            value={bookContent?.title ?? ""}
            onChange={(e) =>
              setBookContent({
                ...bookContent,
                title: e.target.value,
              })
            }
            id="title"
            name="title"
            type="text"
            placeholder="title"
            className="focus-visible:ring-ring bg-input text-foreground placeholder:text-muted-foreground w-full rounded-lg border-none px-4 py-2 focus-visible:ring-1 focus-visible:outline-none"
          />
        </div>

        <div className="flex w-full flex-col gap-1">
          <label htmlFor="book" className="text-foreground-subtle">
            book
          </label>
          <textarea
            readOnly={!book || isPending || isUpdatePending}
            disabled={!book || isPending || isUpdatePending}
            value={bookContent?.author ?? ""}
            onChange={(e) =>
              setBookContent({
                ...bookContent,
                author: e.target.value,
              })
            }
            id="book"
            name="text"
            rows={4}
            placeholder="book body"
            className="focus-visible:ring-ring bg-input text-foreground placeholder:text-foreground-muted w-full rounded-lg border-none px-4 py-2 focus-visible:ring-1 focus-visible:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={!book || isPending || isUpdatePending}
          className={cn(
            "bg-primary border-border text-primary-foreground hover:bg-primary/90 cursor-pointer rounded-md border px-4 py-2",
            "disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed",
            "grid place-items-center [grid-template-areas:'stack']",
          )}
        >
          <span
            className={cn("visible", "[grid-area:stack]", {
              invisible: isUpdatePending,
            })}
          >
            Submit
          </span>
          <span
            className={cn("invisible animate-pulse", "[grid-area:stack]", {
              visible: isUpdatePending,
            })}
          >
            submitting
          </span>
        </button>
      </form>
    </div>
  );
}
