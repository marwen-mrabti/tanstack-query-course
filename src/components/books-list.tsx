import { useBooksByAuthor } from "@/hooks/useBooksByAuthor";
import { useDebounce } from "@uidotdev/usehooks";
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
    <div className="grid w-full grid-cols-1 content-start justify-items-center gap-4">
      <input
        id="authors"
        name="authors"
        type="text"
        placeholder="authors (comma separated : e.g. J.R.R. Tolkien, C.S. Lewis)"
        value={authors ?? ""}
        onChange={handleAuthorsChange}
        className="w-2/3 rounded-lg bg-slate-800 px-4 py-2 text-slate-100 ring-1 ring-slate-600 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-400"
      />

      {booksQuery.isLoading ? <p>Loading...</p> : null}
      {booksQuery.isError ? <p>Error: {booksQuery.error.message}</p> : null}

      {booksQuery.isSuccess ? (
        <ul className="w-2/3 border border-dashed border-amber-200">
          {booksQuery.data.map((book) => (
            <li
              key={book.id}
              className="w-full overflow-ellipsis text-slate-100"
            >
              {book.title}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
