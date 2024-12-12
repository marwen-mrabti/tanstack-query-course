import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { scan } from "react-scan";

// if (typeof window !== "undefined") {
//   scan({
//     enabled: true,
//     log: true, // logs render info to console (default: false)
//   });
// }

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000, // 5 seconds : the data will be considered stale after 5 seconds
      gcTime: 1000 * 60, // 1 minute : the cache will be cleared after 1 minute of inactivity
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
    </QueryClientProvider>
  </StrictMode>,
);
