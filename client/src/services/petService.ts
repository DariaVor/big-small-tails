import type { AxiosInstance } from 'axios';
import axiosInstance from './apiInstance';
import type { PetFormDataType, PetType } from '../types/petTypes';

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

  async getAllFoundPets(): Promise<PetType[]> {
    const response = await this.apiInstance.get<PetType[]>('/pets/found');
    return response.data;
  }

  async updateOnePet(id: number, petForm: PetFormDataType): Promise<PetType> {
    const response = await this.apiInstance.patch<PetType>(`/pets/${id}`, petForm);
    return response.data;
  }

  async deleteOnePet(id: number): Promise<void> {
    await this.apiInstance.delete(`/pets/${id}`);
  }

  async addPet(formData: PetFormDataType): Promise<PetType> {
    console.log(formData)
    const response = await this.apiInstance.post<PetType>('/pets/add', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response.data);
    return response.data;
  }

  async getOnePet(id: number): Promise<PetType> {
    const response = await this.apiInstance.get<PetType>(`/pets/${id}`);
    return response.data;
  }
}

export default new PetsService(axiosInstance);
