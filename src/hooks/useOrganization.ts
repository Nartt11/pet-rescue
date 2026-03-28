import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { organizationService } from "../services/organizationService";
import type { Organization } from "../types/organization.type";
import { message } from "antd";

// Lấy danh sách có phân trang (bạn đã có)
export const useOrganization = (page: number, size: number) => {
  return useQuery({
    queryKey: ["organizations", page, size],
    queryFn: () => organizationService.getAllOrganizations(page, size),
    // staleTime: 1000 * 60 * 5,
  });
};

// Lấy chi tiết 1 organization
export const useOrganizationDetail = (id: string) => {
  return useQuery({
    queryKey: ["organization", id],
    queryFn: () => organizationService.getById(id),
    enabled: !!id, // chỉ chạy khi có id
  });
};

// Tạo mới organization
export const useCreateOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: Omit<Organization, "id">) =>
      organizationService.createOrganization(body),

    onSuccess: () => {
      // refetch lại list
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
};

// Cập nhật organization
export const useUpdateOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      id: string;
      data: Partial<Omit<Organization, "organizationId">>;
    }) => organizationService.updateOrganization(payload.id, payload.data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      queryClient.invalidateQueries({
        queryKey: ["organization", variables.id],
      });
    },
  });
};

export const useDeleteOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => organizationService.deleteOrganization(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      message.success("Organization deleted successfully");
    },
  });
};
