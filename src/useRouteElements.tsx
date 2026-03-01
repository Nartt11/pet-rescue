import { useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ClientLayout from "./layout/ClientLayout";
import AdminLayout from "./layout/AdminLayout";

export default function useRouteElements() {
  const element = useRoutes([
    {
      path: "/",
      element: (
        <ClientLayout>
          <Home />
        </ClientLayout>
      ),
      //   children: [
      //     {
      //       path: "messages",
      //       element: <DashboardMessages />,
      //     },
      //     { path: "tasks", element: <DashboardTasks /> },
      //   ],
    },
    {
      path: "/admin/",
      element: (
        <AdminLayout>
          <AdminDashboard />
        </AdminLayout>
      ),
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ]);

  return element;
}
