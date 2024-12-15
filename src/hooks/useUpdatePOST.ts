import { updatePost } from "@/lib/mutation-fns";
import { T_Post } from "@/types/query-types";
import { useOptimisticMutation } from "./useOptimisticMutation";

export const useUpdatePost = () => {
  return useOptimisticMutation<
    T_Post,
    { postId: number; updateData: Partial<T_Post> }
  >({
    mutationFn: updatePost,
    // Dynamic query key based on postId
    queryKey: (variables) => ["post", { postId: variables.postId }],
    updater: (previousData, variables) => {
      if (!previousData) return undefined;
      return {
        ...previousData,
        ...variables.updateData,
      };
    },
    // Optionally invalidate different queries
    invalidates: (variables) => [["post", { postId: variables.postId }]],
  });
};
