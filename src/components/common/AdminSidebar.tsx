import React, { useState } from "react";
import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
): MenuItem {
  return {
    key,
    icon,
    label,
  } as MenuItem;
}

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const items: MenuItem[] = [
    getItem("Dashboard", "/admin", <PieChartOutlined />),
    getItem("Pet", "/admin/pets", <PieChartOutlined />),
    getItem("Organization", "/admin/organizations", <DesktopOutlined />),
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <h1>Logo</h1>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]} // 👈 auto highlight
        onClick={({ key }) => navigate(key)} // 👈 đổi route
        items={items}
      />
    </Sider>
  );
}
