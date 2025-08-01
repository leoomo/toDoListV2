import React from 'react';
import { FilterType } from '../types/todo';

interface TodoFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onClearCompleted: () => void;
  onClearAll: () => void;
  totalCount: number;
  completedCount: number;
  activeCount: number;
  isLoading?: boolean;
}

const TodoFilter: React.FC<TodoFilterProps> = ({
  currentFilter,
  onFilterChange,
  onClearCompleted,
  onClearAll,
  totalCount,
  completedCount,
  activeCount,
  isLoading = false
}) => {
  const filterButtons = [
    { key: 'all' as FilterType, label: '全部', count: totalCount },
    { key: 'active' as FilterType, label: '未完成', count: activeCount },
    { key: 'completed' as FilterType, label: '已完成', count: completedCount }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* 筛选按钮 */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filterButtons.map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            disabled={isLoading}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              currentFilter === key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {label} ({count})
          </button>
        ))}
      </div>

      {/* 统计信息 */}
      <div className="text-sm text-gray-600 mb-4">
        总计: {totalCount} 项 | 已完成: {completedCount} 项 | 未完成: {activeCount} 项
      </div>

      {/* 批量操作按钮 */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={onClearCompleted}
          disabled={completedCount === 0 || isLoading}
          className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
        >
          清除已完成
        </button>
        
        <button
          onClick={onClearAll}
          disabled={totalCount === 0 || isLoading}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
        >
          清除全部
        </button>
      </div>
    </div>
  );
};

export default TodoFilter; 