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
  return useQuery(getBookDetailsQueryOptions({ bookId, searchTerm }));
};

export const getBookDetailsQueryOptions = ({
  bookId,
  searchTerm,
}: {
  bookId?: string;
  searchTerm?: string;
}) => {
  return {
    queryKey: ["book", { bookId, searchTerm }],
    queryFn: async () => getBookDetails({ bookId, searchTerm }),
    enabled: Boolean(bookId || searchTerm),
    staleTime: 1000 * 30, // 30 seconds
    gcTime: 1000 * 60 * 5, // 5 minute : the cache will be cleared after 1 minute of inactivity
    refetchInterval: 1000 * 60, // poll data every minute
  };
};
