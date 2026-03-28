import type { ApiResponse, PaginatedResponse } from "../types/api.type";
import type {
  Organization,
  OrganizationStatus,
  OrganizationSummary,
} from "../types/organization.type";
import api from "./api";

export const organizationService = {
  getAllOrganizations: async (
    page: number,
    size: number,
  ): Promise<PaginatedResponse<OrganizationSummary>> => {
    const response = await api.get<
      ApiResponse<PaginatedResponse<OrganizationSummary>>
    >("/organizations", {
      params: { page, size }, // ✅ đúng cú pháp
    });

    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch organizations");
    }

    return response.data.data;
  },

  getById: async (id: string): Promise<Organization> => {
    const response = await api.get<ApiResponse<Organization>>(
      `/organizations/${id}`,
    );
    return response.data.data;
  },

  changeOrganizationStatus: async (
    id: string,
    newStatus: OrganizationStatus,
  ): Promise<ApiResponse<Organization>> => {
    const response = await api.patch<ApiResponse<Organization>>(
      `/organizations/${id}/status`,
      { status: newStatus },
    );
    return response.data;
  },

  createOrganization: async (orgData: Omit<Organization, "organizationId">) => {
    const response = await api.post<ApiResponse<Organization>>(
      "/organizations",
      orgData,
    );
    return response.data;
  },

  updateOrganization: async (
    id: string,
    orgData: Partial<Omit<Organization, "organizationId">>,
  ) => {
    const response = await api.put<ApiResponse<Organization>>(
      `/organizations/${id}`,
      orgData,
    );
    return response.data;
  },

  deleteOrganization: async (id: string) => {
    const response = await api.delete<ApiResponse<null>>(
      `/organizations/${id}`,
    );
    return response.data;
  },
};
