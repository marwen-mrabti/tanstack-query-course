import { getBookDetails } from "@/lib/query-fns";
import { T_Book } from "@/types/query-types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useBookDetails = ({
  bookId,
  searchTerm,
}: {
  bookId?: string;
  searchTerm?: string;
}): UseQueryResult<T_Book> => {
  return useQuery({
    queryKey: ["book", { bookId, searchTerm }],
    queryFn: async () => getBookDetails({ bookId, searchTerm }),
    enabled: Boolean(bookId || searchTerm),
    staleTime: 5000, // 5 seconds
    gcTime: 1000 * 60, // 1 minute : the cache will be cleared after 1 minute of inactivity

    //refetchInterval: 1000 * 60, // poll data every minute
    refetchInterval: (query) => {
      if (query.state.data?.id) {
        return false;
      }
      return 10000; // 1 minute : poll data every minute if the book is not found
    },
  });
};
