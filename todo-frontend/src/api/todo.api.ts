import axiosInstance from './axios';
import type { TodosResponse, TodoResponse } from '../types';
import type { TodoInput } from '../schemas/todo.schema';

export const todoApi = {
  getTodos: async (): Promise<TodosResponse> => {
    const response = await axiosInstance.get('/todos');
    return response.data;
  },

  getTodo: async (id: string): Promise<TodoResponse> => {
    const response = await axiosInstance.get(`/todos/${id}`);
    return response.data;
  },

  createTodo: async (data: TodoInput): Promise<TodoResponse> => {
    const response = await axiosInstance.post('/todos', data);
    return response.data;
  },

  updateTodo: async (id: string, data: Partial<TodoInput>): Promise<TodoResponse> => {
    const response = await axiosInstance.put(`/todos/${id}`, data);
    return response.data;
  },

  deleteTodo: async (id: string) => {
    const response = await axiosInstance.delete(`/todos/${id}`);
    return response.data;
  },

  toggleTodo: async (id: string): Promise<TodoResponse> => {
    const response = await axiosInstance.patch(`/todos/${id}/toggle`);
    return response.data;
  },
};