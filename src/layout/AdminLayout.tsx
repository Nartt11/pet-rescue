import React from "react";

import { Breadcrumb, Layout, theme } from "antd";
import AdminSidebar from "../components/common/AdminSidebar";
import AdminHeader from "../components/common/AdminHeader";
import { Outlet } from "react-router-dom";

const { Content, Footer } = Layout;

export default function AdminLayout() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AdminSidebar />
      <Layout>
        <AdminHeader
          style={{ padding: "0 16px", background: colorBgContainer }}
        />

        <Content style={{ margin: "0 16px" }}>
          {/* note */}
          <Breadcrumb
            style={{ margin: "16px 0" }}
            items={[{ title: "Dashboard" }, { title: "Bill" }]}
          />
          {/* content */}
          <Outlet />
          <div>Bill is a cat.</div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
