// 待办事项类型定义

export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface TodoCreate {
  title: string;
  description?: string;
}

export interface TodoUpdate {
  title?: string;
  description?: string;
  completed?: boolean;
}

export interface TodoListResponse {
  items: Todo[];
  total: number;
  limit: number;
  offset: number;
}

export type FilterType = 'all' | 'active' | 'completed';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}