import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/login/login.page";
import MainPage from "../pages/main/Main.page";
import AuthWrapper from "../wrappers/AuthWrapper";
import PublicWrapper from "../wrappers/PublicWrapper";

export const RouterConfig = createBrowserRouter([
  {
    path: "/",
    element: <AuthWrapper />,
    children: [
      {
        path: "/",
        element: <MainPage />,
        children: [
          {
            path: "",
            element: <div>Dashboard</div>,
          },
        ],
      },
    ],
  },

  {
    path: "login",
    element: <PublicWrapper />,
    children: [
      {
        path: "",
        element: <LoginPage />,
      },
    ],
  },
]);
