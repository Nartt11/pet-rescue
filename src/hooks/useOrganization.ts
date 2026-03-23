import { useQuery } from "@tanstack/react-query";
import { organizationService } from "../services/organizationService";

export const useOrganization = (page: number, size: number) => {
  return useQuery({
    queryKey: ["organizations", page, size],
    queryFn: () => organizationService.getAllOrganizations(page, size),
    staleTime: 1000 * 60 * 5,
  });
};
