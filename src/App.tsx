import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { RouterConfig } from "./config/router.config";
import { AppTheme } from "./clients";
import { notifyError } from "./utils/error-snackbar";
import AppSnackbar from "./components/AppSnackbar";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.meta?.suppressGlobalError) {
        return;
      }

      notifyError(error);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (mutation.meta?.suppressGlobalError) {
        return;
      }

      notifyError(error);
    },
  }),
  defaultOptions: {
    queries: {
      retry: 1, // Number of retries on failure
      staleTime: 30 * 1000, // 30 seconds: Time in milliseconds before a query is considered stale
      // gcTime: 5 * 60 * 1000, // default is 5 minutes: Time in milliseconds before a query is garbage collected
      refetchOnWindowFocus: false, // Whether to refetch queries when the window regains focus
      refetchOnReconnect: true, // Whether to refetch queries when the connection is reestablished
    },
    mutations: {
      retry: 0,
    },
  },
});

const App = () => {
  return (
    <Suspense
      fallback={
        <Box
          sx={{
            display: "grid",
            placeItems: "center",
            minHeight: "100vh",
          }}
        >
          <CircularProgress size={28} />
        </Box>
      }
    >
      <QueryClientProvider client={queryClient}>
        <AppTheme>
          <RouterProvider router={RouterConfig} />
          <AppSnackbar />
        </AppTheme>
      </QueryClientProvider>
    </Suspense>
  );
};

export default App;
