import { updatePost } from "@/lib/mutation-fns";
import { T_Post } from "@/types/query-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdatePOST = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePost,
    onMutate: async ({ postId, updateData }) => {
      //? steps for optimistic updates
      //!0- make sure that there are no other refetches happening before we manually update the cache
      await queryClient.cancelQueries({ queryKey: ["post", { postId }] });
      //!1- take a snapshot of the current query state
      const snapshot = queryClient.getQueryData(["post", { postId }]);
      //!2- update the query state with the new data
      queryClient.setQueryData(["post", { postId }], (previousData: T_Post) => {
        return {
          ...previousData,
          title: updateData?.title,
          body: updateData?.body,
        };
      });
      //!3- return a rollback function that will reset the cache to the snapshot if the mutation fails
      return () => {
        queryClient.setQueryData(["post", { postId }], snapshot);
      };
    },

    onError: (_error, _variables, rollback) => {
      rollback?.();
    },

    onSettled: (post) => {
      //? invalidate the cache to sync the data with the server
      return queryClient.invalidateQueries({
        queryKey: ["post", { postId: post?.id }],
        refetchType: "all",
      });
    },
  });
};
