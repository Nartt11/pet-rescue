import { useEffect } from "react";
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
  message,
} from "antd";
import type { TableColumnsType } from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import type {
  Organization,
  OrganizationSummary,
} from "../../types/organization.type";
import {
  useDeleteOrganization,
  useOrganization,
  useOrganizationDetail,
} from "../../hooks/useOrganization";
import { useSearchParams } from "react-router-dom";
import { DeleteConfirmButton } from "../../components/DeleteConfirmButton";

/* ================= COMPONENT ================= */

export default function ManageOrganizationsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 0;
  const pageSize = Number(searchParams.get("pageSize")) || 10;

  const handleChangePage = (page: number, pageSize: number) => {
    setSearchParams({
      page: String(page),
      pageSize: String(pageSize),
    });
  };

  useEffect(() => {
    if (!searchParams.get("page") || !searchParams.get("pageSize")) {
      setSearchParams({
        page: "0",
        pageSize: "10",
      });
    }
  }, []);

  const { isPending, error, data } = useOrganization(page, pageSize);
  console.log(data?.content);
  /* ================= HANDLE DELETE ================= */
  const { mutateAsync: deleteOrganization } = useDeleteOrganization();
  const handleDelete = async (id: string) => {
    try {
      await deleteOrganization(id);
    } catch (error: unknown) {
      // message.error("Failed to delete organization");
      message.error("Failed to delete organization: ");
      throw error;
    }
  };

  /* ================= TABLE COLUMNS ================= */

  const columns: TableColumnsType<OrganizationSummary> = [
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
      title: "Email",
      dataIndex: "email",
      key: "email",
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
      render: (_: null, record: OrganizationSummary) => (
        <Space>
          <Button type="primary" size="small" style={{ marginRight: 8 }}>
            Edit
          </Button>
          {/* <Button danger size="small">
            Delete
          </Button> */}
          <DeleteConfirmButton
            entityName={`organization "${record.name}"`}
            onConfirm={() => handleDelete(record.organizationId)}
          />
        </Space>
      ),
    },
  ];

  /* ================= EXPAND DETAIL ================= */
  const ExpandedRow = ({ id }: { id: string }) => {
    const { data, isPending } = useOrganizationDetail(id);

    if (isPending) return <Spin />;
    const organizationDetail: Organization = data as Organization;

    return (
      <div>
        <Card
          size="small"
          variant="outlined"
          title={
            <div className="py-2">
              <div className="flex items-center gap-2">
                <div style={{ fontWeight: 600 }}>{organizationDetail.name}</div>
                <Tag
                  color={
                    organizationDetail.status === "ACTIVE" ? "green" : "red"
                  }
                >
                  {organizationDetail.status}
                </Tag>
              </div>
              <div style={{ fontSize: 12, color: "#888" }}>
                Created at:{" "}
                {new Date(organizationDetail.createdAt).toLocaleString()} by:{" "}
                {organizationDetail.createBy}
              </div>
            </div>
          }
        >
          <Row gutter={16}>
            <Col span={12}>
              <Descriptions column={1} size="small">
                <Descriptions.Item label="Type">
                  {organizationDetail.type}
                </Descriptions.Item>

                <Descriptions.Item label="Phone">
                  {organizationDetail.phone}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {organizationDetail.email}
                </Descriptions.Item>

                <Descriptions.Item label="Official Link">
                  <a href={organizationDetail.officialLink} target="_blank">
                    {organizationDetail.officialLink}
                  </a>
                  {/* {organizationDetail.officialLink} */}
                </Descriptions.Item>

                <Descriptions.Item label="Address">
                  {`${organizationDetail.streetAddress}, ${organizationDetail.ward}, ${organizationDetail.province}`}
                </Descriptions.Item>
              </Descriptions>
            </Col>

            {/* map */}
            <Col span={12}></Col>
          </Row>
        </Card>
      </div>
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
        {error && <div style={{ color: "red" }}>{error.message}</div>}
        <Table<OrganizationSummary>
          loading={isPending}
          rowKey="organizationId"
          columns={columns}
          dataSource={data?.content}
          expandable={{
            expandedRowRender: (record) => (
              <ExpandedRow id={record.organizationId} />
            ),
          }}
          pagination={{
            current: page + 1,
            pageSize: pageSize,
            onChange: (p, ps) => handleChangePage(p, ps),
          }}
        />
      </Card>
    </div>
  );
}
