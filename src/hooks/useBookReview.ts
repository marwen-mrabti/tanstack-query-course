import { getBookReviews } from "@/lib/query-fns";
import { useQuery } from "@tanstack/react-query";

export const getBookReviewsQueryOptions = (bookId?: string) => {
  return {
    queryKey: ["reviews", { bookId }],
    queryFn: async () => getBookReviews(bookId),
    enabled: Boolean(bookId),
    gcTime: 1000 * 30,
  };
};

export const useBookReviews = ({ bookId }: { bookId?: string }) => {
  return useQuery(getBookReviewsQueryOptions(bookId));
};
