import { useQuery } from "@tanstack/react-query";
import { getPostById } from "../lib/query-fns";

export const usePost = ({ postId }: { postId: number | null }) => {
  return useQuery({
    queryKey: ["post", { postId }],
    queryFn: async () => getPostById(postId),
    enabled: Boolean(postId),
    gcTime: 1000 * 60 * 5,
  });
};
