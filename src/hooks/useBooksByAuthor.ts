import { getBooksByAuthor } from "@/lib/query-fns";
import { T_Books } from "@/types/query-types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useBooksByAuthor = ({
  authors,
}: {
  authors?: string;
}): UseQueryResult<T_Books> => {
  return useQuery({
    queryKey: ["books", { authors }],
    queryFn: async ({ signal }) => getBooksByAuthor({ authors, signal }),
    staleTime: 5000, // 5 seconds
    gcTime: 1000 * 60, // 1 minute : the cache will be cleared after 1 minute of inactivity
    enabled: Boolean(authors?.length),
  });
};
