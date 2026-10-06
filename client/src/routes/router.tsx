import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { Dashboard } from "../pages/Dashboard";
import { AdminRoute } from "./AdminRoute";
import { Welcome } from "../pages/Welcome";
import { GuestRoute } from "./GuestRoute";
import { AdminPage } from "../pages/AdminPage";

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        element: <AdminRoute />,
        children: [
          {
            path: "/admin",
            element: <AdminPage />,
          },
        ],
      },
    ],
  },
  {
    element: <AdminRoute />,
    children: [],
  },
  {
    element: <GuestRoute />,
    children: [
      { path: "/register", element: <Welcome current="register" /> },
      { path: "/login", element: <Welcome current="login" /> },
    ],
  },
]);
