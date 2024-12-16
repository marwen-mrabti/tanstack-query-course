import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryCache, QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: 1000,
      staleTime: 5000, // 5 seconds : the data will be considered stale after 5 seconds
      gcTime: 1000 * 60 * 10, // 10 minute : the cache will be cleared after 1 minute of inactivity
      throwOnError: (_error, query) => {
        return typeof query.state.data === "undefined";
      },
      networkMode: "offlineFirst",
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (typeof query.state.data !== "undefined") {
        console.log(query);
        alert(`Query ${query.queryKey[0]} failed with error : ${error}`);
        // do something with the error: eg. show a toast with error message
        //toast.error(error.message)
      }
    },
  }),
});

export const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
});
