export interface Organization {
  organizationId: string;
  name: string;
  type: string;
  status: OrganizationStatus;
  streetAddress: string;
  wardCode: string;
  ward: string;
  provinceCode: string;
  province: string;
  phone: string;
  email: string;
  officialLink: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  createBy: string;
}
export type OrganizationSummary = Omit<
  Organization,
  "latitude" | "longitude" | "createdAt" | "createBy"
>;

export type OrganizationStatus = "ACTIVE" | "INACTIVE" | "PENDING";
// export interface OrganizationResponse {
//   content: Organization[];
//   page: number;
//   size: number;
//   totalElements: number;
//   totalPages: number;
//   last: boolean;
// }
