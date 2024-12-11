import { getBookReviews } from "@/lib/query-fns";
import { useQuery } from "@tanstack/react-query";

export const useBookReviews = ({ bookId }: { bookId?: string }) => {
  return useQuery({
    queryKey: ["reviews", { bookId }],
    queryFn: async () => getBookReviews(bookId),
    enabled: Boolean(bookId),
    gcTime: 1000 * 30,
  });
};
