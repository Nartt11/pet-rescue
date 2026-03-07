import React, { useState } from "react";
import {
  DashboardOutlined,
  AppstoreOutlined,
  HeartOutlined,
  HomeOutlined,
  UserOutlined,
  ClusterOutlined,
  AlertOutlined,
  SolutionOutlined,
  FileTextOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const items: MenuItem[] = [
    getItem("Trang chủ", "/admin", <DashboardOutlined />),

    getItem("Quản lý hệ thống", "management", <AppstoreOutlined />, [
      getItem("Quản lý vật nuôi", "/admin/pets", <HeartOutlined />),
      getItem("Quản lý trung tâm", "/admin/organizations", <HomeOutlined />),
      getItem("Quản lý người dùng", "/admin/users", <UserOutlined />),
    ]),

    getItem("Hoạt động cứu trợ", "operations", <ClusterOutlined />, [
      getItem("Quản lý cứu trợ", "/admin/rescues", <AlertOutlined />),
      getItem("Quản lý nhận nuôi", "/admin/adoptions", <SolutionOutlined />),
    ]),

    getItem("Quản lý nội dung", "content", <FileTextOutlined />, [
      getItem("Quản lý bài viết", "/admin/posts", <FileTextOutlined />),
    ]),

    getItem("Cài đặt tài khoản", "/admin/account", <SettingOutlined />),
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={220}
    >
      <h1>Logo</h1>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]} // 👈 auto highlight
        defaultOpenKeys={["management", "operations", "content"]} // 👈 mở sẵn các menu con
        onClick={({ key }) => navigate(key)} // 👈 đổi route
        items={items}
      />
    </Sider>
  );
}
