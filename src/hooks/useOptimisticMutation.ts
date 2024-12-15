import {
  useMutation,
  useQueryClient,
  type QueryKey,
} from "@tanstack/react-query";

type OptimisticConfig<TData, TVariables> = {
  // The mutation function
  mutationFn: (variables: TVariables) => Promise<unknown>;
  // Function to generate the query key based on variables
  queryKey: (variables: TVariables) => QueryKey;
  // Function to update the data optimistically
  updater: (
    oldData: TData | undefined,
    variables: TVariables,
  ) => TData | undefined;
  // Function to generate invalidation keys based on variables
  invalidates?: (variables: TVariables) => QueryKey;
};

export function useOptimisticMutation<TData, TVariables>({
  mutationFn,
  queryKey,
  updater,
  invalidates = queryKey, // Default to same keys as queryKey
}: OptimisticConfig<TData, TVariables>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onMutate: async (variables) => {
      const keys = queryKey(variables);

      await queryClient.cancelQueries({
        queryKey: keys,
      });

      const snapshot = queryClient.getQueryData<TData>(keys);

      queryClient.setQueryData<TData | undefined>(keys, (oldData) =>
        updater(oldData, variables),
      );

      return () => {
        queryClient.setQueryData(keys, snapshot);
      };
    },
    onError: (_err, _variables, rollback) => {
      rollback?.();
    },
    onSettled: (_, __, variables) => {
      const invalidateKeys = invalidates(variables);
      return queryClient.invalidateQueries({
        queryKey: invalidateKeys,
      });
    },
  });
}
