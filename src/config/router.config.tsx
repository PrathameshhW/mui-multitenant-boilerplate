import { createBrowserRouter } from "react-router-dom";
import AuthWrapper from "../components/AuthWrapper";
import LoginPage from "../pages/login/login.page";
import MainPage from "../pages/main/Main.page";

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
    element: <LoginPage />,
  },
]);
