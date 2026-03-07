import { Button, Card, Flex, Space, Table, Tag, Input } from "antd";
import { useNavigate } from "react-router-dom";
import {
  SearchOutlined,
  FilterOutlined,
  DownloadOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";

const { Column } = Table;

interface DataType {
  id: string;
  image: string;
  name: string;
  gender: string;
  species: string;
  breed: string;
  age: number;
  organization: string;
  status: string[];
}

// map api response to this data type
// const tableData: DataType[] = apiData.data.content.map((pet) => ({
//   key: pet.id,
//   image: pet.imageUrl,
//   name: pet.name,
//   species: pet.species,
//   breed: pet.breed,
//   age: pet.age,
//   gender: pet.gender,
//   status: pet.status,
// }));

const data: DataType[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1558788353-f76d92427f16",
    name: "John",

    gender: "Male",
    species: "Dog",
    breed: "Golden Retriever",
    age: 32,
    organization: "New York Animal Shelter",
    status: ["AVAILABLE"],
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a",
    name: "Jim",
    gender: "Male",
    species: "Cat",
    breed: "British Shorthair",
    age: 42,
    organization: "London Pet Rescue",
    status: ["PENDING"],
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1561037404-61cd46aa615b",
    name: "Joe",
    gender: "Female",
    species: "Dog",
    breed: "Poodle",
    age: 32,
    organization: "Sydney Animal Care",
    status: ["ADOPTED"],
  },
];

const handleDelete = (id: string) => {
  console.log("Delete pet", id);
};

export default function ManagePetsPage() {
  const navigate = useNavigate();

  return (
    <div>
      <Card
        title="Pets List"
        style={{ width: "100%" }}
        extra={
          <Space>
            <Input
              placeholder="Search pets"
              prefix={<SearchOutlined />}
              style={{ width: 200 }}
            />

            <Button icon={<FilterOutlined />}>Filter</Button>

            <Button icon={<DownloadOutlined />}>Export</Button>

            <Button type="primary" icon={<PlusCircleFilled />}>
              Add Organization
            </Button>
          </Space>
        }
      >
        <Table<DataType>
          dataSource={data}
          onRow={(record) => ({
            onClick: () => navigate(`/admin/pets/${record.id}`),
          })}
        >
          <Column
            title="Image"
            dataIndex="image"
            key="image"
            render={(image: string) => (
              <img
                src={image}
                alt="pet"
                style={{
                  width: 60,
                  height: 60,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
            )}
          />
          <Column title="Name" dataIndex="name" key="name" />
          <Column title="Gender" dataIndex="gender" key="gender" />
          <Column title="Species" dataIndex="species" key="species" />
          <Column title="Breed" dataIndex="breed" key="breed" />
          <Column title="Age" dataIndex="age" key="age" />
          <Column
            title="Organization"
            dataIndex="organization"
            key="organization"
          />
          <Column
            title="status"
            dataIndex="status"
            key="status"
            render={(status: string[]) => (
              <Flex gap="small" align="center" wrap>
                {status.map((tag) => {
                  let color = tag.length > 5 ? "geekblue" : "green";
                  if (tag === "loser") {
                    color = "volcano";
                  }
                  return (
                    <Tag color={color} key={tag}>
                      {tag.toUpperCase()}
                    </Tag>
                  );
                })}
              </Flex>
            )}
          />
          <Column
            title="Action"
            key="action"
            render={(_, record: DataType) => (
              <Button danger onClick={() => handleDelete(record.name)}>
                Delete
              </Button>
            )}
          />
        </Table>
      </Card>
    </div>
  );
}
