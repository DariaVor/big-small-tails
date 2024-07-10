import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import type { UserFromBackendType, UserLoginType, UserRegisterType } from '../types/userTypes';
import axiosInstance from './apiInstance';

class AuthService {
  constructor(private readonly apiInstance: AxiosInstance) {}

  async register(formData: UserRegisterType): Promise<UserFromBackendType> {
    try {
      const { data } = await this.apiInstance.post<UserFromBackendType>('/auth/register', formData);
      return data;
    } catch (error) {
      const err = error as AxiosError<Error>;
      throw new Error(err.response?.data.message);
    }
  }

  async login(formData: UserLoginType): Promise<UserFromBackendType> {
    try {
      const { data } = await this.apiInstance.post<UserFromBackendType>('/auth/login', formData);
      return data;
    } catch (error) {
      const err = error as AxiosError<Error>;
      throw new Error(err.response?.data.message);
    }
  }

  async logout(): Promise<AxiosResponse> {
    return this.apiInstance('/auth/logout');
  }

  async check(): Promise<UserFromBackendType> {
    const { data } = await this.apiInstance<UserFromBackendType>('/tokens/refresh');
    return data;
  }
}

export default new AuthService(axiosInstance);