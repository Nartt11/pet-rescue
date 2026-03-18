import type { ApiResponse, PaginatedResponse } from "../types/api.type";
import type { Organization } from "../types/organization.type";
import api from "./api";

export const organizationService = {
  getAllOrganizations: async (
    page: number,
    size: number,
  ): Promise<PaginatedResponse<Organization>> => {
    const response = await api.get<
      ApiResponse<PaginatedResponse<Organization>>
    >("/organizations", {
      params: { page, size }, // ✅ đúng cú pháp
    });

    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch organizations");
    }

    return response.data.data;
  },
};
