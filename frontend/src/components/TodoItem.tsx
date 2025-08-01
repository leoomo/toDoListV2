// 待办事项卡片组件
'use client';

import type { Todo } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: number, completed: boolean) => Promise<{ success: boolean; error?: string }>;
  onDelete: (id: number) => Promise<{ success: boolean; error?: string }>;
  isLoading?: boolean;
}

export default function TodoItem({ 
  todo, 
  onToggleComplete, 
  onDelete, 
  isLoading = false 
}: TodoItemProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleToggle = () => {
    if (!isLoading) {
      onToggleComplete(todo.id, !todo.completed);
    }
  };

  const handleDelete = () => {
    if (!isLoading && window.confirm('确定要删除这个任务吗？')) {
      onDelete(todo.id);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border p-4 mb-3 transition-all duration-200 hover:shadow-md ${
      todo.completed ? 'opacity-75' : ''
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center mb-2">
            {/* 复选框 */}
            <button
              onClick={handleToggle}
              disabled={isLoading}
              className={`flex-shrink-0 w-5 h-5 rounded-full border-2 mr-3 transition-colors flex items-center justify-center ${
                todo.completed
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'border-gray-300 hover:border-green-400'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {todo.completed && (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            
            {/* 任务标题 */}
            <h3 className={`text-lg font-medium text-gray-900 truncate ${
              todo.completed ? 'line-through text-gray-500' : ''
            }`}>
              {todo.title}
            </h3>
          </div>
          
          {/* 任务描述 */}
          {todo.description && (
            <p className={`text-gray-600 mb-3 ml-8 ${
              todo.completed ? 'line-through' : ''
            }`}>
              {todo.description}
            </p>
          )}
          
          {/* 时间信息 */}
          <div className="text-xs text-gray-400 ml-8">
            创建时间: {formatDate(todo.created_at)}
            {todo.updated_at !== todo.created_at && (
              <span className="ml-4">更新时间: {formatDate(todo.updated_at)}</span>
            )}
          </div>
        </div>
        
        {/* 删除按钮 */}
        <div className="flex items-center ml-4">
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="删除任务"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}