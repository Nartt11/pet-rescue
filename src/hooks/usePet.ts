import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { petService } from "../services/petService";
import type { Pet, PetStatus } from "../types/pet.type";

// GET - Lấy danh sách pets
export const useGetAllPets = (page: number = 1, size: number = 10) => {
  return useQuery({
    queryKey: ["pets", page, size],
    queryFn: () => petService.getAllPets(page, size),
    staleTime: 1000 * 60 * 5,
  });
};

// GET - Lấy chi tiết pet theo ID
export const useGetPetById = (petId: string | null) => {
  return useQuery({
    queryKey: ["pet", petId],
    queryFn: () =>
      petId ? petService.getPetById(petId) : Promise.reject("No petId"),
    enabled: !!petId,
    staleTime: 1000 * 60 * 5,
  });
};

// POST - Tạo mới pet
export const useCreatePet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: Omit<Pet, "petId" | "createdAt" | "updatedAt">) =>
      petService.createPet(body),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });
    },
  });
};

// PUT - Cập nhật pet
export const useUpdatePet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { petId: string; data: Partial<Pet> }) =>
      petService.updatePet(payload.petId, payload.data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });
      queryClient.invalidateQueries({ queryKey: ["pet", variables.petId] });
    },
  });
};

// DELETE - Xóa pet
export const useDeletePet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (petId: string) => petService.deletePet(petId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });
    },
  });
};

// PATCH - Thay đổi status pet
export const useChangePetStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { petId: string; status: PetStatus }) =>
      petService.changePetStatus(payload.petId, payload.status),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });
      queryClient.invalidateQueries({ queryKey: ["pet", variables.petId] });
    },
  });
};
