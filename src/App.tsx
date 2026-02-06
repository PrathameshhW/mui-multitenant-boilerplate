import { RouterProvider } from "react-router-dom";
import { RouterConfig } from "./config/router.config";
import { AppTheme } from "./clients";

const App = () => {
  return (
    <>
      <AppTheme>
        <RouterProvider router={RouterConfig} />
      </AppTheme>
    </>
  );
};

export default App;
