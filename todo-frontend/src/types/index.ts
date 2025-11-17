export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
  message?: string;
}

export interface Todo {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface TodosResponse {
  success: boolean;
  count: number;
  todos: Todo[];
}

export interface TodoResponse {
  success: boolean;
  todo: Todo;
  message?: string;
}

export interface ApiError {
  success: false;
  message: string;
}