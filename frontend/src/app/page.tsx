// TodoListV2 主页面
'use client';

import { useTodos } from '@/hooks/useTodos';
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';
import TodoFilter from '@/components/TodoFilter';
import LoadingOverlay from '@/components/LoadingOverlay';
import ErrorAlert from '@/components/ErrorAlert';

export default function Home() {
  const {
    filteredTodos,
    currentFilter,
    isLoading,
    error,
    stats,
    addTodo,
    toggleComplete,
    deleteTodo,
    clearCompleted,
    clearAll,
    setCurrentFilter,
    setError,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            TodoListV2
          </h1>
          <p className="text-gray-600">
            现代化的待办事项管理应用 - Next.js 版本
          </p>
        </div>

        {/* 错误提示 */}
        <ErrorAlert error={error} onDismiss={() => setError(null)} />

        {/* 添加表单 */}
        <TodoForm onAddTodo={addTodo} isLoading={isLoading} />

        {/* 筛选和批量操作 */}
        <TodoFilter
          currentFilter={currentFilter}
          onFilterChange={setCurrentFilter}
          onClearCompleted={clearCompleted}
          onClearAll={clearAll}
          stats={stats}
          isLoading={isLoading}
        />

        {/* 待办事项列表 */}
        <div className="mt-6">
          <TodoList
            todos={filteredTodos}
            onToggleComplete={toggleComplete}
            onDelete={deleteTodo}
            isLoading={isLoading}
          />
        </div>

        {/* 加载状态 */}
        <LoadingOverlay isVisible={isLoading} />
      </div>
    </div>
  );
}