import { updateBook } from "@/lib/mutation-fns";
import { T_MockBook } from "@/types/query-types";
import { useOptimisticMutation } from "./useOptimisticMutation";

export const useUpdateBook = () => {
  return useOptimisticMutation<
    T_MockBook,
    { bookId: number; updateData: Partial<T_MockBook> }
  >({
    mutationFn: updateBook,
    // Dynamic query key based on bookId
    queryKey: (variables) => ["mock_book", { bookId: variables.bookId }],
    updater: (previousData, variables) => {
      if (!previousData) return undefined;
      return {
        ...previousData,
        ...variables.updateData,
      };
    },
    // Optionally invalidate different queries
    invalidates: (variables) => [["mock_book", { bookId: variables.bookId }]],
  });
};
