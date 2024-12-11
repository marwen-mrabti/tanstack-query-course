import { useBooksByAuthor } from "@/hooks/useBooksByAuthor";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";

export default function BooksList() {
  const [authors, setAuthors] = useState<string | null>(null);
  const debouncedAuthors = useDebounce(authors, 500);

  const booksQuery = useBooksByAuthor({
    authors: debouncedAuthors?.split(","),
  });

  const handleAuthorsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthors(e.target.value);
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        id="authors"
        name="authors"
        type="text"
        placeholder="authors (comma separated : e.g. J.R.R. Tolkien, C.S. Lewis)"
        value={authors ?? ""}
        onChange={handleAuthorsChange}
        className="rounded-lg bg-slate-800 px-4 py-2 text-slate-100 ring-1 ring-slate-600 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-400"
      />

      {booksQuery.isLoading ? <p>Loading...</p> : null}
      {booksQuery.isError ? <p>Error: {booksQuery.error.message}</p> : null}

      {booksQuery.isSuccess ? (
        <ul>
          {booksQuery.data.map((book) => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
