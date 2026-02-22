import { Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { RouterConfig } from "./config/router.config";
import { AppTheme } from "./clients";

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
      <AppTheme>
        <RouterProvider router={RouterConfig} />
      </AppTheme>
    </Suspense>
  );
};

export default App;
