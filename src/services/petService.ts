import type {
  Pet,
  GetAllPetsResponse,
  CreatePetRequest,
  PetStatus,
} from "../types/pet.type";
import api from "./api";

const PETS_ENDPOINT = "/pets";

export const petService = {
  async getAllPets(page = 1, size = 10): Promise<GetAllPetsResponse> {
    const response = await api.get<GetAllPetsResponse>(PETS_ENDPOINT, {
      params: { page, size },
    });
    return response.data;
  },

  async getPetById(petId: string): Promise<Pet> {
    const response = await api.get<Pet>(`${PETS_ENDPOINT}/${petId}`);
    return response.data;
  },

  async createPet(body: CreatePetRequest): Promise<Pet> {
    const response = await api.post<Pet>(PETS_ENDPOINT, body);
    return response.data;
  },

  async updatePet(petId: string, body: Partial<Pet>): Promise<Pet> {
    const response = await api.put<Pet>(`${PETS_ENDPOINT}/${petId}`, body);
    return response.data;
  },

  async changePetStatus(petId: string, status: PetStatus): Promise<Pet> {
    const response = await api.patch<Pet>(`${PETS_ENDPOINT}/${petId}/status`, {
      status,
    });
    return response.data;
  },

  async deletePet(petId: string): Promise<void> {
    await api.delete(`${PETS_ENDPOINT}/${petId}`);
  },
};
