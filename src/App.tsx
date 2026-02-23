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
