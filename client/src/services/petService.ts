import type { AxiosInstance } from 'axios';
import axiosInstance from './apiInstance';
import type { PetFormDataType, PetType } from '../types/petTypes';

class PetsService {
  constructor(private readonly apiInstance: AxiosInstance) {}

  async getAllPets(): Promise<PetType[]> {
    const response = await this.apiInstance.get<PetType[]>('/pets');
    return response.data;
  }

  async getAllPetsOfUser(): Promise<PetType[]> {
    const response = await this.apiInstance.get<PetType[]>('/account');
    return response.data;
  }

  async getAllLostPets(params: { page: number; limit: number; searchTerm?: string; selectedCategories?: number[]; selectedColors?: number[]; hasCollar?: boolean | null; startDate?: Date | null; endDate?: Date | null; }): Promise<{ pets: PetType[]; total: number; totalPages: number; currentPage: number }> {
    const queryParams = {
      page: params.page.toString(),
      limit: params.limit.toString(),
      searchTerm: params.searchTerm || '',
      selectedCategories: params.selectedCategories?.join(',') || '',
      selectedColors: params.selectedColors?.join(',') || '',
      hasCollar: params.hasCollar !== undefined && params.hasCollar !== null ? params.hasCollar.toString() : '',
      startDate: params.startDate ? params.startDate.toISOString() : '',
      endDate: params.endDate ? params.endDate.toISOString() : ''
    };

    const queryString = new URLSearchParams(queryParams).toString();
    
    const response = await this.apiInstance.get<{ pets: PetType[]; total: number; totalPages: number; currentPage: number }>(`/pets/lost?${queryString}`);
    return response.data;
  }

  async getAllFoundPets(params: { page: number; limit: number; searchTerm?: string; selectedCategories?: number[]; selectedColors?: number[]; hasCollar?: boolean | null; startDate?: Date | null; endDate?: Date | null; }): Promise<{ pets: PetType[]; total: number; totalPages: number; currentPage: number }> {
    const queryParams = {
      page: params.page.toString(),
      limit: params.limit.toString(),
      searchTerm: params.searchTerm || '',
      selectedCategories: params.selectedCategories?.join(',') || '',
      selectedColors: params.selectedColors?.join(',') || '',
      hasCollar: params.hasCollar !== undefined && params.hasCollar !== null ? params.hasCollar.toString() : '',
      startDate: params.startDate ? params.startDate.toISOString() : '',
      endDate: params.endDate ? params.endDate.toISOString() : ''
    };

    const queryString = new URLSearchParams(queryParams).toString();

    const response = await this.apiInstance.get<{ pets: PetType[]; total: number; totalPages: number; currentPage: number }>(`/pets/found?${queryString}`);
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

  async getPendingPets(): Promise<PetType[]> {
    const response = await this.apiInstance.get<PetType[]>('/pets/admin/approvals');
    return response.data;
  }

  async approvePet(id: number): Promise<PetType> {
    const response = await this.apiInstance.patch<PetType>(`/pets/admin/approve/${id}`);
    return response.data;
  }

  async rejectPet(id: number): Promise<PetType> {
    const response = await this.apiInstance.patch<PetType>(`/pets/admin/reject/${id}`);
    return response.data;
  }

}

export default new PetsService(axiosInstance);
