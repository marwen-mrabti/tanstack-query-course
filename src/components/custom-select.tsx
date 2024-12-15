import { getBookDetailsQueryOptions } from "@/hooks/useBookDetails";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

type CustomSelectProps = {
  className?: string;
  selectedBookId: string;
  setSelectedBookId: (bookId: string) => void;
};

const CustomSelect = ({
  className,
  selectedBookId,
  setSelectedBookId,
}: CustomSelectProps) => {
  const queryClient = useQueryClient();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const books = [
    { id: "", title: "select a book" },
    { id: "pD6arNyKyi8C", title: "The Hobbit" },
    { id: "aWZzLPhY4o0C", title: "The Fellowship Of The Ring" },
    { id: "12e8PJ2T7sQC", title: "The Two Towers" },
    { id: "WZ0f_yUgc0UC", title: "The Return Of The King" },
  ];

  const handlePrefetch = (bookId: string) => {
    if (bookId) {
      queryClient.prefetchQuery(
        getBookDetailsQueryOptions({ bookId, searchTerm: "" }),
      );
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "bg-popover text-foreground ring-ring ring-1",
          "w-full rounded-lg px-4 py-2 text-left",
        )}
      >
        {books.find((book) => book.id === selectedBookId)?.title ||
          "select a book"}
      </button>

      <div
        className={cn(
          "bg-popover text-popover-foreground ease-spring absolute z-10 mt-1 h-0 w-full overflow-hidden rounded-lg shadow-lg transition-all duration-300",
          {
            "h-auto": isOpen,
          },
        )}
      >
        {books.map((book) => (
          <div
            key={book.id}
            onMouseEnter={() => handlePrefetch(book.id)}
            onClick={() => {
              setSelectedBookId(book.id);
              setIsOpen(false);
            }}
            className="hover:bg-input/80 cursor-pointer px-4 py-2"
          >
            {book.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomSelect;
