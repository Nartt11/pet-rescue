import { useRoutes } from "react-router";
import Home from "./pages/client/Home";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ClientLayout from "./layout/ClientLayout";
import AdminLayout from "./layout/AdminLayout";
import ManagePetsPage from "./pages/admin/ManagePetsPage";
import ManageOrganizationsPage from "./pages/admin/ManageOrganizationsPage";
import PetDetailPage from "./pages/admin/PetDetailPage";
import AdoptionPage from "./pages/client/AdoptionPage";
import NewsPage from "./pages/client/NewsPage";
import MapPage from "./pages/client/MapPage";
import { RequireRole } from "./components/RequireRole";
import AuthLayout from "./layout/AuthLayout";

export default function useRouteElements() {
  const element = useRoutes([
    {
      path: "/",
      element: <ClientLayout />,
      children: [
        {
          index: true, // route mặc định khi vào /
          element: <Home />,
        },
        {
          path: "adoption",
          element: <AdoptionPage />,
        },
        {
          path: "maps",
          element: <MapPage />,
        },
        {
          path: "contract",
          element: <AdoptionPage />,
        },
        {
          path: "news",
          element: <NewsPage />,
        },
      ],
    },
    {
      path: "/admin",
      element: (
        <RequireRole role="ADMIN">
          <AdminLayout />
        </RequireRole>
      ),
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
        {
          path: "pets/:id",
          element: <PetDetailPage />, // placeholder, sẽ thay bằng PetDetailPage
        },
      ],
    },
    {
      path: "/login",
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <Login />,
        },
      ],
    },
    { path: "/register", element: <Register /> },
  ]);

  return element;
}
