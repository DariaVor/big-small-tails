import type { AxiosInstance } from 'axios';
import axiosInstance from './apiInstance';
import type { CategoryType, ColorType } from '../types/petTypes';

class DataService {
  constructor(private readonly apiInstance: AxiosInstance) {}

  async getCategories(): Promise<CategoryType[]> {
    const response = await this.apiInstance.get<CategoryType[]>('/pets/categories');
    return response.data;
  }

  async getColors(): Promise<ColorType[]> {
    const response = await this.apiInstance.get<ColorType[]>('/pets/colors');
    return response.data;
  }
}

export default new DataService(axiosInstance);
