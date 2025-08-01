import axios from 'axios';
import { Todo, TodoCreate, TodoUpdate, TodoListResponse } from '../types/todo';

const API_BASE_URL = 'http://localhost:8000/api/v1';

// 创建axios实例
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export const todoApi = {
  // 获取所有待办事项
  getTodos: async (params?: { 
    completed?: string; 
    limit?: number; 
    offset?: number 
  }): Promise<TodoListResponse> => {
    const response = await api.get('/todos/', { params });
    return response.data;
  },

  // 获取单个待办事项
  getTodo: async (id: number): Promise<Todo> => {
    const response = await api.get(`/todos/${id}`);
    return response.data;
  },

  // 创建待办事项
  createTodo: async (data: TodoCreate): Promise<Todo> => {
    const response = await api.post('/todos/', data);
    return response.data;
  },

  // 更新待办事项
  updateTodo: async (id: number, data: TodoUpdate): Promise<Todo> => {
    const response = await api.put(`/todos/${id}`, data);
    return response.data;
  },

  // 删除待办事项
  deleteTodo: async (id: number): Promise<void> => {
    await api.delete(`/todos/${id}`);
  },

  // 批量删除已完成的待办事项
  deleteCompleted: async (): Promise<void> => {
    await api.delete('/todos/completed');
  },

  // 批量删除所有待办事项
  deleteAll: async (): Promise<void> => {
    await api.delete('/todos/all');
  },
};

export default api; 