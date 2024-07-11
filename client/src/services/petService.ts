import type { AxiosInstance, AxiosResponse } from 'axios';
import axiosInstance from './apiInstance';
import type { PetFormType, PetType } from '../types/petTypes';

class PetsService {
  constructor(private readonly apiInstance: AxiosInstance) {}

  async getAllPets(): Promise<PetType[]> {
    const response = await this.apiInstance.get<PetType[]>('/pets');
    return response.data;
  }

  async getAllLostPets(): Promise<PetType[]> {
    const response = await this.apiInstance.get<PetType[]>('/pets/lost');
    return response.data;
  }

  async getAllFoundsPets(): Promise<PetType[]> {
    const response = await this.apiInstance.get<PetType[]>('/pets/found');
    return response.data;
  }

  async updateOnePet(id: number, petForm: PetFormType): Promise<PetType> {
    const response = await this.apiInstance.patch<PetType>(`/pets/${id}`, petForm);
    return response.data;
  }

  async deleteOnePet(id: number): Promise<void> {
    await this.apiInstance.delete(`/pets/${id}`);
  }

  // async getOnePet(id: number): Promise<PetType> {
  //   const response = await this.apiInstance.get<PetType>(`/pets/${id}`);
  //   return response.data;
  // }
}

export default new PetsService(axiosInstance);
