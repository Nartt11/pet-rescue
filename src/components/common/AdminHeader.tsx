import { Header } from "antd/es/layout/layout";
import { Input, Space, Badge, Avatar } from "antd";
import {
  SearchOutlined,
  AppstoreOutlined,
  SettingOutlined,
  BellOutlined,
} from "@ant-design/icons";
import React from "react";

type AdminHeaderProps = React.HTMLAttributes<HTMLElement>;

const AdminHeader: React.FC<AdminHeaderProps> = ({ style, ...rest }) => {
  return (
    <Header
      style={{
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        borderBottom: "1px solid #f0f0f0",
        ...style,
      }}
      {...rest}
    >
      {/* LEFT: SEARCH */}
      <p>DASHBOARD</p>
      {/* RIGHT: ICON + NOTI + AVATAR */}
      <Space size="large">
        <Input
          placeholder="Search..."
          prefix={<SearchOutlined />}
          style={{ width: 260 }}
        />
        <AppstoreOutlined style={{ fontSize: 18 }} />
        <SettingOutlined style={{ fontSize: 18 }} />

        <Badge count={1} size="small">
          <BellOutlined style={{ fontSize: 18 }} />
        </Badge>

        <Avatar size={36} src="https://i.pravatar.cc/40" />
      </Space>
    </Header>
  );
};

export default AdminHeader;
