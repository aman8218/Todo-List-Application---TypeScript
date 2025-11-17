import axiosInstance from './axios';
import type { AuthResponse, User } from './../types';
import type { LoginInput, SignupInput, ForgotPasswordInput } from '../schemas/auth.schema';

export const authApi = {
  signup: async (data: SignupInput): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/auth/signup', data);
    return response.data;
  },

  login: async (data: LoginInput): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/auth/signin', data);
    return response.data;
  },

  forgotPassword: async (data: ForgotPasswordInput) => {
    const response = await axiosInstance.post('/auth/forgot-password', data);
    return response.data;
  },

  resetPassword: async (token: string, password: string) => {
    const response = await axiosInstance.put(`/auth/reset-password/${token}`, { password });
    return response.data;
  },

  getCurrentUser: async (): Promise<{ success: boolean; user: User }> => {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  },
};