import { createBrowserRouter } from "react-router-dom";
import AuthWrapper from "../components/AuthWrapper";
import LoginPage from "../pages/login/login.page";

export const RouterConfig = createBrowserRouter([
  {
    path: "/",
    element: <AuthWrapper />,
    children: [
      {
        path: "/",
        element: <h1>Home</h1>,
      },
    ],
  },

  {
    path: "login",
    element: <LoginPage />,
  },
]);
