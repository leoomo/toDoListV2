// 待办事项表单组件
'use client';

import { useState } from 'react';

import type { TodoCreate } from '@/types/todo';

interface TodoFormProps {
  onAddTodo: (data: TodoCreate) => Promise<{ success: boolean; error?: string }>;
  isLoading?: boolean;
}

export default function TodoForm({ onAddTodo, isLoading = false }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      return;
    }

    const result = await onAddTodo({
      title: title.trim(),
      description: description.trim() || undefined,
    });
    
    if (result.success) {
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            任务标题 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="输入任务标题..."
            required
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900 placeholder-gray-500"
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            任务描述
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="输入任务描述（可选）..."
            rows={3}
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed resize-none text-gray-900 placeholder-gray-500"
          />
        </div>
        
        <button
          type="submit"
          disabled={!title.trim() || isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
        >
          {isLoading ? '添加中...' : '添加任务'}
        </button>
      </form>
    </div>
  );
}