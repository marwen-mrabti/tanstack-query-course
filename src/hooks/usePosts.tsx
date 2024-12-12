import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "./query-fns";

export const usePosts = () => {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: async ({ pageParam }) => getPosts({ page: pageParam }),
    initialPageParam: 1,
    maxPages: 3,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
    },
    staleTime: 5000,
    gcTime: 1000 * 10,
  });
};
