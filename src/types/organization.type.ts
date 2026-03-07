export interface Organization {
  organizationId: string;
  name: string;
  type: string;
  status: string;
}
export interface OrganizationResponse {
  content: Organization[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}
