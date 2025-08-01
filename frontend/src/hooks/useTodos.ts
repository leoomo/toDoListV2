// 待办事项管理 Hook
'use client';

import { useState, useEffect, useCallback } from 'react';
import { todoApi } from '@/lib/api';
import type { Todo, TodoCreate, TodoUpdate, FilterType } from '@/types/todo';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 获取所有待办事项
  const fetchTodos = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await todoApi.getTodos();
      setTodos(response.items);
    } catch (err) {
      console.error('获取待办事项失败:', err);
      setError('获取待办事项失败，请检查网络连接');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 根据筛选条件过滤待办事项
  useEffect(() => {
    let filtered: Todo[];
    switch (currentFilter) {
      case 'active':
        filtered = todos.filter(todo => !todo.completed);
        break;
      case 'completed':
        filtered = todos.filter(todo => todo.completed);
        break;
      default:
        filtered = todos;
    }
    setFilteredTodos(filtered);
  }, [todos, currentFilter]);

  // 组件挂载时获取数据
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // 添加待办事项
  const addTodo = useCallback(async (data: TodoCreate) => {
    try {
      setIsLoading(true);
      setError(null);
      const newTodo = await todoApi.createTodo(data);
      setTodos(prev => [...prev, newTodo]);
      return { success: true, data: newTodo };
    } catch (err) {
      console.error('添加待办事项失败:', err);
      setError('添加待办事项失败，请重试');
      return { success: false, error: '添加失败' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 更新待办事项
  const updateTodo = useCallback(async (id: number, data: TodoUpdate) => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedTodo = await todoApi.updateTodo(id, data);
      setTodos(prev => prev.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));
      return { success: true, data: updatedTodo };
    } catch (err) {
      console.error('更新待办事项失败:', err);
      setError('更新待办事项失败，请重试');
      return { success: false, error: '更新失败' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 切换完成状态
  const toggleComplete = useCallback(async (id: number, completed: boolean) => {
    return updateTodo(id, { completed });
  }, [updateTodo]);

  // 删除待办事项
  const deleteTodo = useCallback(async (id: number) => {
    try {
      setIsLoading(true);
      setError(null);
      await todoApi.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
      return { success: true };
    } catch (err) {
      console.error('删除待办事项失败:', err);
      setError('删除待办事项失败，请重试');
      return { success: false, error: '删除失败' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 清除已完成的待办事项
  const clearCompleted = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      await todoApi.deleteCompleted();
      setTodos(prev => prev.filter(todo => !todo.completed));
      return { success: true };
    } catch (err) {
      console.error('清除已完成待办事项失败:', err);
      setError('清除已完成待办事项失败，请重试');
      return { success: false, error: '清除失败' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 清除所有待办事项
  const clearAll = useCallback(async () => {
    if (!window.confirm('确定要删除所有待办事项吗？此操作不可撤销。')) {
      return { success: false, error: '操作已取消' };
    }
    
    try {
      setIsLoading(true);
      setError(null);
      await todoApi.deleteAll();
      setTodos([]);
      return { success: true };
    } catch (err) {
      console.error('清除所有待办事项失败:', err);
      setError('清除所有待办事项失败，请重试');
      return { success: false, error: '清除失败' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 计算统计信息
  const stats = {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    active: todos.filter(todo => !todo.completed).length,
  };

  return {
    // 数据
    todos,
    filteredTodos,
    currentFilter,
    isLoading,
    error,
    stats,
    
    // 操作
    addTodo,
    updateTodo,
    toggleComplete,
    deleteTodo,
    clearCompleted,
    clearAll,
    setCurrentFilter,
    setError,
    fetchTodos,
  };
};