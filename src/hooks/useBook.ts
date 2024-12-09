import { getBook } from "@/lib/query-fns";
import { T_Book } from "@/types/query-types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useBook = ({
  bookId,
}: {
  bookId?: string;
}): UseQueryResult<T_Book> => {
  const bookQuery = useQuery({
    queryKey: ["book", { bookId }],
    queryFn: () => getBook({ bookId }),
  });
  return bookQuery;
};
