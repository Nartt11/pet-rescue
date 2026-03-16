import {
  Card,
  Descriptions,
  Image,
  Row,
  Col,
  Timeline,
  List,
  Button,
} from "antd";
// import PetImageGallery from "../../components/pet/PetImageGallery";
import { EditOutlined } from "@ant-design/icons";
import { lazy, Suspense } from "react";

const PetImageGallery = lazy(() =>
  import("../../components/pet/PetImageGallery"),
);

/* ================= TYPES ================= */

interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  ageDisplay: string;
  gender: string;
  color: string;
  weight: number;
  description: string;
  status: string;
  imageUrls: string[];
}

interface MedicalRecord {
  recordId: string;
  description: string;
  vaccine: string;
  diagnosis: string;
  recordDate: string;
}

interface LocationRecord {
  locationId: string;
  latitude: number;
  longitude: number;
  source: string;
  recordedAt: string;
}

interface DiaryMedia {
  mediaId: string;
  url: string;
  type: "IMAGE" | "VIDEO";
  createdAt: string;
}

interface Ownership {
  ownerName: string;
  ownerType: string;
  fromTime: string;
  toTime: string;
}

/* ================= MOCK DATA ================= */

const pet: Pet = {
  id: "1",
  name: "Buddy",
  species: "Dog",
  breed: "Golden Retriever",
  ageDisplay: "3 years",
  gender: "MALE",
  color: "Golden",
  weight: 28,
  description: "Very friendly dog",
  status: "AVAILABLE",
  imageUrls: [
    "https://placedog.net/800/600?id=1",
    "https://placedog.net/800/600?id=2",
    "https://placedog.net/800/600?id=3",
    "https://placedog.net/800/600?id=4",
    "https://placedog.net/800/600?id=5",
  ],
};

const medicalRecords: MedicalRecord[] = [
  {
    recordId: "1",
    description: "Annual checkup",
    vaccine: "Rabies",
    diagnosis: "Healthy",
    recordDate: "2026-03-07",
  },
  {
    recordId: "2",
    description: "Vaccination",
    vaccine: "DHPP",
    diagnosis: "Healthy",
    recordDate: "2025-06-01",
  },
];

const locations: LocationRecord[] = [
  {
    locationId: "1",
    latitude: 10.762622,
    longitude: 106.660172,
    source: "GPS_TRACKER",
    recordedAt: "2026-03-07",
  },
];

const diary: DiaryMedia[] = [
  {
    mediaId: "1",
    url: "https://place-puppy.com/300x300",
    type: "IMAGE",
    createdAt: "2026-03-07",
  },
];

const ownerships: Ownership[] = [
  {
    ownerName: "Happy Paws Shelter",
    ownerType: "SHELTER",
    fromTime: "2024-01-01",
    toTime: "Present",
  },
];

/* ================= COMPONENT ================= */

export default function PetDetailPage() {
  const location = locations[0];

  return (
    <div>
      <Row gutter={[16, 16]}>
        {/* PET INFO */}
        <Col xs={24} lg={16}>
          <Card
            title="Pet Information"
            extra={<Button type="text" icon={<EditOutlined />} />}
          >
            <Row gutter={24}>
              {/* IMAGE COLUMN */}
              <Col xs={24} lg={12}>
                <Suspense fallback={<div>Loading images...</div>}>
                  <PetImageGallery images={pet.imageUrls} />
                </Suspense>
              </Col>

              {/* INFO COLUMN */}
              <Col xs={24} lg={12}>
                <Descriptions column={1}>
                  <Descriptions.Item label="Name">{pet.name}</Descriptions.Item>
                  <Descriptions.Item label="Species">
                    {pet.species}
                  </Descriptions.Item>
                  <Descriptions.Item label="Breed">
                    {pet.breed}
                  </Descriptions.Item>
                  <Descriptions.Item label="Age">
                    {pet.ageDisplay}
                  </Descriptions.Item>
                  <Descriptions.Item label="Gender">
                    {pet.gender}
                  </Descriptions.Item>
                  <Descriptions.Item label="Weight">
                    {pet.weight} kg
                  </Descriptions.Item>
                  <Descriptions.Item label="Color">
                    {pet.color}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* MEDICAL TIMELINE */}
        <Col xs={24} lg={8}>
          <Card
            title="Medical Records"
            extra={<Button type="text" icon={<EditOutlined />} />}
          >
            <Timeline>
              {medicalRecords.map((record) => (
                <Timeline.Item key={record.recordId}>
                  <b>{record.recordDate}</b>
                  <div>{record.description}</div>
                  <div>💉 {record.vaccine}</div>
                  <div>Diagnosis: {record.diagnosis}</div>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        </Col>

        {/* MAP */}
        <Col xs={24} lg={12}>
          <Card
            title="Last Known Location"
            extra={<Button type="text" icon={<EditOutlined />} />}
          >
            <div style={{ height: 300 }}>
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                src={`https://maps.google.com/maps?q=${location.latitude},${location.longitude}&z=15&output=embed`}
              />
            </div>
          </Card>
        </Col>

        {/* DIARY */}
        <Col xs={24} lg={6}>
          <Card
            title="Diary"
            extra={<Button type="text" icon={<EditOutlined />} />}
          >
            <List
              dataSource={diary}
              renderItem={(item) => (
                <List.Item>
                  <Image src={item.url} width={80} />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* OWNERSHIP */}
        <Col xs={24} lg={6}>
          <Card title="Ownership History">
            <Timeline>
              {ownerships.map((owner, i) => (
                <Timeline.Item key={i}>
                  <b>{owner.ownerName}</b>
                  <div>{owner.ownerType}</div>
                  <div>
                    {owner.fromTime} → {owner.toTime}
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
