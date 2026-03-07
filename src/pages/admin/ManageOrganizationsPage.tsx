import { useState } from "react";
import {
  Card,
  Button,
  Input,
  Space,
  Table,
  Tag,
  Row,
  Col,
  Descriptions,
  Spin,
} from "antd";
import type { TableColumnsType } from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

/* ================= TYPES ================= */

interface Organization {
  organizationId: string;
  name: string;
  type: string;
  status: string;
}

interface OrganizationDetail extends Organization {
  description?: string;
  createdAt?: string;
  address?: string;
}

/* ================= MOCK DATA ================= */

const organizations: Organization[] = [
  {
    organizationId: "1",
    name: "Happy Paws Shelter",
    type: "SHELTER",
    status: "ACTIVE",
  },
  {
    organizationId: "2",
    name: "Pet Rescue Center",
    type: "RESCUE",
    status: "ACTIVE",
  },
  {
    organizationId: "3",
    name: "Animal Care Group",
    type: "NGO",
    status: "INACTIVE",
  },
];

/* ================= COMPONENT ================= */

export default function ManageOrganizationsPage() {
  const [expandedData, setExpandedData] = useState<
    Record<string, OrganizationDetail>
  >({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  /* ================= MOCK API ================= */

  const fetchOrganizationDetail = async (
    id: string,
  ): Promise<OrganizationDetail> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          organizationId: id,
          name: "Happy Paws Shelter",
          type: "SHELTER",
          status: "ACTIVE",
          description: "A non-profit organization helping homeless pets.",
          address: "123 Rescue Street, New York",
          createdAt: "2023-05-10",
        });
      }, 800);
    });
  };

  /* ================= HANDLE EXPAND ================= */

  const handleExpand = async (expanded: boolean, record: Organization) => {
    if (!expanded) return;

    if (expandedData[record.organizationId]) return;

    setLoading((prev) => ({ ...prev, [record.organizationId]: true }));

    const detail = await fetchOrganizationDetail(record.organizationId);

    setExpandedData((prev) => ({
      ...prev,
      [record.organizationId]: detail,
    }));

    setLoading((prev) => ({ ...prev, [record.organizationId]: false }));
  };

  /* ================= TABLE COLUMNS ================= */

  const columns: TableColumnsType<Organization> = [
    {
      title: "Organization Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "ACTIVE" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space>
          <Button type="primary" size="small" style={{ marginRight: 8 }}>
            Edit
          </Button>
          <Button danger size="small">
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  /* ================= EXPAND DETAIL ================= */

  const renderExpandedRow = (record: Organization) => {
    const detail = expandedData[record.organizationId];
    const isLoading = loading[record.organizationId];

    if (isLoading) {
      return <Spin />;
    }

    if (!detail) return null;

    return (
      <Card size="small">
        <Row gutter={16}>
          <Col span={12}>
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Organization ID">
                {detail.organizationId}
              </Descriptions.Item>

              <Descriptions.Item label="Name">{detail.name}</Descriptions.Item>

              <Descriptions.Item label="Type">{detail.type}</Descriptions.Item>

              <Descriptions.Item label="Status">
                {detail.status}
              </Descriptions.Item>
            </Descriptions>
          </Col>

          <Col span={12}>
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Address">
                {detail.address}
              </Descriptions.Item>

              <Descriptions.Item label="Created At">
                {detail.createdAt}
              </Descriptions.Item>

              <Descriptions.Item label="Description">
                {detail.description}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Card>
    );
  };

  /* ================= UI ================= */

  return (
    <div>
      <Card
        title="Organization List"
        style={{ width: "100%" }}
        extra={
          <Space>
            <Input
              placeholder="Search organization"
              prefix={<SearchOutlined />}
              style={{ width: 200 }}
            />

            <Button icon={<FilterOutlined />}>Filter</Button>

            <Button icon={<DownloadOutlined />}>Export</Button>

            <Button type="primary">Add Organization</Button>
          </Space>
        }
      >
        <Table<Organization>
          rowKey="organizationId"
          columns={columns}
          dataSource={organizations}
          expandable={{
            expandedRowRender: renderExpandedRow,
            onExpand: handleExpand,
          }}
        />
      </Card>
    </div>
  );
}
