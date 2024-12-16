import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import "./index.css";

import {
  localStoragePersister,
  queryClient,
} from "@/lib/query-client.config.ts";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import ThemeProvider from "./context/theme-context-provider.tsx";

/*
//? enable react-scan
import { scan } from "react-scan";

if (typeof window !== "undefined") {
  scan({
    enabled: true,
    log: true, // logs render info to console (default: false)
  });
}*/

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{
          persister: localStoragePersister,
          dehydrateOptions: {
            shouldDehydrateQuery: (query) => {
              if (query.queryKey[0] === "photos") {
                return true;
              }
              return false;
            },
          },
        }}
      >
        <App />
        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      </PersistQueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
