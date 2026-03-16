import React from "react";
import ClientHeader from "../components/common/ClientHeader";
import Footer from "../components/common/Footer";
import { Outlet } from "react-router-dom";

// interface ClientLayoutProps {
//   children?: React.ReactNode;
// }
export default function ClientLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ClientHeader />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
