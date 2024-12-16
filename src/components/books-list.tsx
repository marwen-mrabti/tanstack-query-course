import { useBooksByAuthor } from "@/hooks/useBooksByAuthor";
import { cn } from "@/lib/utils";
import { useDebounce } from "@uidotdev/usehooks";
import { X } from "lucide-react";
import { useState } from "react";

export default function BooksList() {
  const [authors, setAuthors] = useState<string | null>(null);
  const debouncedAuthors = useDebounce(authors, 500);

  const booksQuery = useBooksByAuthor({
    authors: debouncedAuthors ?? "",
  });

  const handleAuthorsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthors(e.target.value);
  };

  return (
    <section className="justify-content-center grid min-h-[50dvh] w-full grid-cols-1 justify-items-start">
      <div className="grid w-full grid-cols-1 content-start justify-items-center gap-4">
        <div className="relative mx-auto w-full md:w-2/3">
          <input
            id="authors"
            name="authors"
            type="text"
            placeholder="authors (comma separated : e.g. J.R.R, J.k, ect..)"
            value={authors ?? ""}
            onChange={handleAuthorsChange}
            className="focus-visible:ring-ring bg-input text-foreground placeholder:text-foreground-muted w-full rounded-lg border-none px-6 py-2 overflow-ellipsis focus-visible:ring-1 focus-visible:outline-none"
          />
          <X
            className={cn(
              "text-destructive invisible absolute top-2 right-2 scale-0 cursor-pointer",
              "transition-all duration-300 ease-in-out",
              {
                "visible scale-100": Boolean(authors),
              },
            )}
            onClick={() => setAuthors(null)}
          />
        </div>
        {!authors && (
          <h3 className="text-foreground-muted text-center text-lg font-semibold">
            enter authors to search for books
          </h3>
        )}
        {booksQuery.fetchStatus === "paused" ? (
          <p>
            <span className="bg-destructive text-destructive-foreground rounded-lg px-8 py-2 text-center text-lg">
              device offline, try to reconnect, we are serving cached data
            </span>
          </p>
        ) : null}
        {booksQuery.isPending && booksQuery.fetchStatus === "fetching" ? (
          <p>Loading...</p>
        ) : null}
        {booksQuery.isError ? <p>Error: {booksQuery.error.message}</p> : null}
        {booksQuery.isSuccess ? (
          <ul className="border-border bg-background-muted flex w-2/3 flex-col gap-2 rounded-lg border border-dashed px-4 py-2">
            {booksQuery.data.map((book) => (
              <li
                key={book.id}
                className="text-foreground border-secondary/70 w-full border-b text-sm overflow-ellipsis"
              >
                {book.title}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
