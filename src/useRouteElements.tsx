import { useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ClientLayout from "./layout/ClientLayout";
import AdminLayout from "./layout/AdminLayout";
import ManagePetsPage from "./pages/admin/ManagePetsPage";
import ManageOrganizationsPage from "./pages/admin/ManageOrganizationsPage";

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
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          index: true, // route mặc định khi vào /admin
          element: <AdminDashboard />,
        },
        {
          path: "pets",
          element: <ManagePetsPage />,
        },
        {
          path: "organizations",
          element: <ManageOrganizationsPage />,
        },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ]);

  return element;
}
