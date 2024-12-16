import { useQuery } from "@tanstack/react-query";
import { getBookById } from "../lib/query-fns";

export const useMockBook = ({ bookId }: { bookId: number | null }) => {
  return useQuery({
    queryKey: ["mock_book", { bookId }],
    queryFn: async () => getBookById(bookId),
    enabled: Boolean(bookId),
    gcTime: 1000 * 60 * 5,
  });
};
